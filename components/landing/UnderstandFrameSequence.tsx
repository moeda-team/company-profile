'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

/**
 * Scroll-scrubbed image-sequence player for the "Understand" workflow slide.
 *
 * Replaces the previous live Three.js scene with a canvas that plays back
 * the 300-frame JPG sequence in /public/images/understand-frame, scrubbing
 * frames in sync with scroll position (Apple/Awwwards-style scrollytelling
 * technique) instead of autoplaying like a video. useWorkflowAnimation
 * drives this by calling setProgress(0..1) on every scrub tick while the
 * "Understand" step owns the scroll.
 *
 * Design notes:
 * - Frames are plain <img> objects loaded directly from /public (bypassing
 *   next/image) so we get full control over preload order/timing.
 * - Frame 1 loads with priority so the first paint is never blank; the
 *   remaining frames stream in afterward in small idle-friendly batches.
 * - While scrubbing to a frame that hasn't finished loading yet, we draw
 *   the nearest already-loaded frame instead of leaving the canvas blank.
 * - The displayed frame eases toward the scroll-driven target frame each
 *   rAF tick (instead of snapping), which is what gives the playback its
 *   smooth, "buttery" feel rather than a stepped flipbook look.
 */

const FRAME_COUNT = 300;
const FRAME_SRC = (index: number) =>
  `/images/understand-frame/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

/** How quickly the drawn frame eases toward the scroll target (0-1, higher = snappier). */
const EASE = 0.16;
/** Number of frames fetched per idle batch while streaming in the rest of the sequence. */
const BATCH_SIZE = 8;

export interface FrameSequenceHandle {
  /** Scroll-driven target, 0 (first frame) to 1 (last frame). */
  setProgress: (progress: number) => void;
}

const UnderstandFrameSequence = forwardRef<FrameSequenceHandle>((_props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>(new Array(FRAME_COUNT).fill(null));
  const targetProgressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>();

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let img = imagesRef.current[index];
    if (!img) {
      // Nearest already-loaded frame, so scrubbing ahead of the preloader
      // never shows a blank canvas.
      for (let d = 1; d < FRAME_COUNT; d++) {
        const lo = index - d;
        const hi = index + d;
        if (lo >= 0 && imagesRef.current[lo]) {
          img = imagesRef.current[lo];
          break;
        }
        if (hi < FRAME_COUNT && imagesRef.current[hi]) {
          img = imagesRef.current[hi];
          break;
        }
      }
    }
    if (!img || !img.naturalWidth) return;

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
    const imgRatio = img.naturalWidth / img.naturalHeight;
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
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useImperativeHandle(ref, () => ({
    setProgress(progress: number) {
      targetProgressRef.current = Math.min(1, Math.max(0, progress));
    },
  }));

  // ── Preload: frame 0 first, then stream the rest in idle-friendly batches ──
  useEffect(() => {
    let cancelled = false;

    const loadOne = (index: number) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.decoding = 'async';
        img.onload = () => {
          if (!cancelled) {
            imagesRef.current[index] = img;
            if (index === 0) drawFrame(0);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = FRAME_SRC(index);
      });

    (async () => {
      await loadOne(0);
      for (let start = 1; start < FRAME_COUNT; start += BATCH_SIZE) {
        if (cancelled) return;
        const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);
        const batch: Promise<void>[] = [];
        for (let i = start; i < end; i++) batch.push(loadOne(i));
        await Promise.all(batch);
        // Yield a tick between batches so we never block scroll/input.
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // ── rAF loop: ease the drawn frame toward the scroll-driven target ──
  useEffect(() => {
    const tick = () => {
      const targetFrame = targetProgressRef.current * (FRAME_COUNT - 1);
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
  }, []);

  // ── Redraw on resize (canvas pixel size is layout-dependent) ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const resizeObserver = new ResizeObserver(() => {
      drawFrame(Math.round(currentFrameRef.current));
    });
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="understand-frame-sequence" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
});

UnderstandFrameSequence.displayName = 'UnderstandFrameSequence';

export default UnderstandFrameSequence;
