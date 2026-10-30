'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

/**
 * Generic scroll-scrubbed image-sequence player for WorkflowSection artwork
 * slides. Preloads a numbered JPG sequence (ezgif-frame-001.jpg, 002, ...)
 * from /public/images/<folder>, draws it to a canvas with object-fit
 * contain, and exposes setProgress(0..1) via ref so useWorkflowAnimation
 * can scrub frames in sync with scroll position instead of autoplaying.
 *
 * Optional chromaKey: some exports (e.g. the Execute sequence) are on a
 * solid green-screen background. When enabled, each frame gets a one-time
 * green-screen removal pass (color-distance threshold + soft edge feather
 * + green-spill suppression) right after it loads, producing a
 * transparent-background canvas that's cached and reused as the drawable
 * source — the keying math runs once per frame during preload, never on
 * the animation's hot path.
 */

const EASE = 0.16;
const BATCH_SIZE = 8;

export interface FrameSequenceHandle {
  /** Scroll-driven target, 0 (first frame) to 1 (last frame). */
  setProgress: (progress: number) => void;
}

interface FrameSequenceCanvasProps {
  /** Folder under /public/images/ containing the frames. */
  folder: string;
  /** Total frame count. Files are named ezgif-frame-001.<ext> .. frameCount (3-digit, zero-padded). */
  frameCount: number;
  /** File extension of the source frames (no dot). Defaults to 'jpg'. */
  extension?: string;
  /** Strip a solid green-screen background so the illustration floats on the page background. */
  chromaKey?: boolean;
  /** Extra class on the outer wrapper, for slide-specific CSS hooks (e.g. color grading). */
  className?: string;
}

type Drawable = HTMLImageElement | HTMLCanvasElement;

function naturalSize(source: Drawable): { w: number; h: number } {
  if (source instanceof HTMLImageElement) {
    return { w: source.naturalWidth, h: source.naturalHeight };
  }
  return { w: source.width, h: source.height };
}

/**
 * Removes a solid green-screen background in place on the given canvas
 * context, using a color-distance threshold with a soft feather band (to
 * avoid jagged edges) plus spill suppression on semi-transparent edge
 * pixels (pulls the green channel down so no green fringe survives).
 */
function keyOutGreen(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const px = imageData.data;
  const LOW = 26; // below this "greenness": fully opaque, definitely not background
  const HIGH = 75; // above this "greenness": fully transparent, definitely background
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const greenness = g - Math.max(r, b);
    if (greenness <= LOW) continue;
    const t = Math.min(1, (greenness - LOW) / (HIGH - LOW));
    px[i + 3] = Math.round(px[i + 3] * (1 - t));
    if (t < 1) {
      // Edge pixel — suppress green spill so no fringe remains once composited.
      const avg = (r + b) / 2;
      if (g > avg) px[i + 1] = avg;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

const FrameSequenceCanvas = forwardRef<FrameSequenceHandle, FrameSequenceCanvasProps>(
  ({ folder, frameCount, extension = 'jpg', chromaKey = false, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const framesRef = useRef<Array<Drawable | null>>(new Array(frameCount).fill(null));
    const targetProgressRef = useRef(0);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number>();

    const frameSrc = (index: number) =>
      `/images/${folder}/ezgif-frame-${String(index + 1).padStart(3, '0')}.${extension}`;

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      let source = framesRef.current[index];
      if (!source) {
        // Nearest already-loaded frame, so scrubbing ahead of the
        // preloader never shows a blank canvas.
        for (let d = 1; d < frameCount; d++) {
          const lo = index - d;
          const hi = index + d;
          if (lo >= 0 && framesRef.current[lo]) {
            source = framesRef.current[lo];
            break;
          }
          if (hi < frameCount && framesRef.current[hi]) {
            source = framesRef.current[hi];
            break;
          }
        }
      }
      if (!source) return;

      const { w: naturalW, h: naturalH } = naturalSize(source);
      if (!naturalW || !naturalH) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      if (cw === 0 || ch === 0) return;

      const targetW = Math.round(cw * dpr);
      const targetH = Math.round(ch * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      // object-fit: contain
      const imgRatio = naturalW / naturalH;
      const boxRatio = cw / ch;
      let dw: number, dh: number, dx: number, dy: number;
      if (imgRatio > boxRatio) {
        dw = cw;
        dh = cw / imgRatio;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * imgRatio;
        dy = 0;
        dx = (cw - dw) / 2;
      }
      ctx.drawImage(source, dx, dy, dw, dh);
    };

    useImperativeHandle(ref, () => ({
      setProgress(progress: number) {
        targetProgressRef.current = Math.min(1, Math.max(0, progress));
      },
    }));

    // ── Preload: frame 0 first, then stream the rest in idle-friendly batches ──
    // Gated behind an IntersectionObserver — the section this sits in is
    // below the hero, so starting hundreds of large image fetches the
    // instant the page mounts (regardless of scroll position) competes
    // with the initial page load for bandwidth. We only start once the
    // container is within ~1 viewport of coming into view.
    useEffect(() => {
      let cancelled = false;
      let started = false;
      const container = containerRef.current;

      const loadOne = (index: number) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.decoding = 'async';
          img.onload = () => {
            if (cancelled) {
              resolve();
              return;
            }
            if (chromaKey) {
              const off = document.createElement('canvas');
              off.width = img.naturalWidth;
              off.height = img.naturalHeight;
              const octx = off.getContext('2d');
              if (octx) {
                octx.drawImage(img, 0, 0);
                keyOutGreen(octx, off.width, off.height);
              }
              framesRef.current[index] = off;
            } else {
              framesRef.current[index] = img;
            }
            if (index === 0) drawFrame(0);
            resolve();
          };
          img.onerror = () => resolve();
          img.src = frameSrc(index);
        });

      const runPreload = async () => {
        if (started) return;
        started = true;
        await loadOne(0);
        for (let start = 1; start < frameCount; start += BATCH_SIZE) {
          if (cancelled) return;
          const end = Math.min(start + BATCH_SIZE, frameCount);
          const batch: Promise<void>[] = [];
          for (let i = start; i < end; i++) batch.push(loadOne(i));
          await Promise.all(batch);
          // Yield a tick between batches so we never block scroll/input.
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      };

      if (!container || typeof IntersectionObserver === 'undefined') {
        // No container yet / no IO support — fall back to loading right away.
        runPreload();
        return () => {
          cancelled = true;
        };
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            runPreload();
            observer.disconnect();
          }
        },
        { rootMargin: '600px 0px 600px 0px' },
      );
      observer.observe(container);

      return () => {
        cancelled = true;
        observer.disconnect();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [folder, frameCount, extension, chromaKey]);

    // ── rAF loop: ease the drawn frame toward the scroll-driven target ──
    useEffect(() => {
      const tick = () => {
        const targetFrame = targetProgressRef.current * (frameCount - 1);
        const current = currentFrameRef.current;
        const delta = targetFrame - current;
        const next = Math.abs(delta) < 0.05 ? targetFrame : current + delta * EASE;
        currentFrameRef.current = next;
        drawFrame(Math.round(next));
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frameCount]);

    // ── Redraw on resize (canvas pixel size is layout-dependent) ──
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const resizeObserver = new ResizeObserver(() => {
        drawFrame(Math.round(currentFrameRef.current));
      });
      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        ref={containerRef}
        className={`frame-sequence-canvas${className ? ` ${className}` : ''}`}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} />
      </div>
    );
  }
);

FrameSequenceCanvas.displayName = 'FrameSequenceCanvas';

export default FrameSequenceCanvas;
