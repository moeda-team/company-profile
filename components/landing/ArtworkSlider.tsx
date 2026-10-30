'use client';

import React, { forwardRef } from 'react';
import Image from 'next/image';
import FrameSequenceCanvas, { type FrameSequenceHandle } from './FrameSequenceCanvas';


/* ─── ArtworkSlider ──────────────────────────────────────────────────────── */

type Artwork =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster?: string; alt: string }
  | {
      type: 'sequence';
      alt: string;
      folder: string;
      frameCount: number;
      extension?: string;
      chromaKey?: boolean;
      className?: string;
    };

const ARTWORKS: Artwork[] = [
  // Describe your problem — scroll-scrubbed image sequence (canvas), synced
  // to the step's own scroll range via useWorkflowAnimation's onStepProgress.
  // Source frames are compressed JPG (lighter than the earlier PNG pass) on
  // a green-screen background.
  {
    type: 'sequence',
    alt: 'Describe your problem — tell us what’s broken, slow, or missing',
    folder: 'describe-your-problem',
    frameCount: 56,
    chromaKey: true,
    className: 'understand-frame-sequence',
  },
  // Build your system — same scroll-scrubbed sequence, source frames are on
  // a green-screen background, so chromaKey strips it to transparent.
  {
    type: 'sequence',
    alt: 'Build your system — clean architecture, tested, production-ready',
    folder: 'execute',
    frameCount: 56,
    chromaKey: true,
    className: 'execute-frame-sequence',
  },
  // Use your system — same treatment: green-screen source, chromaKey strips it.
  {
    type: 'sequence',
    alt: 'Use your system — launch, monitor, and keep improving',
    folder: 'use-your-system',
    frameCount: 34,
    chromaKey: true,
    className: 'deliver-frame-sequence',
  },
];

interface ArtworkSliderProps {
  /** titles for aria-label */
  stepTitles: string[];
  /** Imperative handles for each sequence slide's canvas, keyed by slide index. */
  sequenceRefs?: Partial<Record<number, React.Ref<FrameSequenceHandle>>>;
}

/**
 * Stacked artwork slides — GSAP cross-fades/translates each slide on the
 * Y axis (bottom → top) while the section is pinned, swapping the visible
 * illustration in sync with the active step. Supports static images,
 * looping video clips, and scroll-scrubbed image-sequence canvases;
 * useWorkflowAnimation plays/pauses <video> elements automatically based
 * on which slide is active and drives each sequence canvas's frame via
 * sequenceRefs.
 */
const ArtworkSlider = forwardRef<HTMLDivElement, ArtworkSliderProps>(
  ({ stepTitles, sequenceRefs }, ref) => {
    return (
      <div className="artwork-track" ref={ref} aria-live="polite">
        {ARTWORKS.map((art, i) => (
          <div
            key={i}
            className={`artwork-slide artwork-slide-${i}`}
            data-artwork={i}
            aria-label={stepTitles[i] ?? art.alt}
            role="img"
          >
            <div className="artwork-card">
              <div className="artwork-image-inner">
                {art.type === 'sequence' ? (
                  <FrameSequenceCanvas
                    ref={sequenceRefs?.[i]}
                    folder={art.folder}
                    frameCount={art.frameCount}
                    extension={art.extension}
                    chromaKey={art.chromaKey}
                    className={art.className}
                  />
                ) : art.type === 'video' ? (
                  <video
                    className="artwork-video"
                    src={art.src}
                    poster={art.poster}
                    muted
                    loop
                    playsInline
                    autoPlay={i === 0}
                    preload={i === 0 ? 'auto' : 'metadata'}
                    aria-hidden="true"
                  />
                ) : (
                  <Image
                    src={art.src}
                    alt={art.alt}
                    fill
                    sizes="(max-width: 1023px) 90vw, 55vw"
                    style={{ objectFit: 'contain' }}
                    priority={i === 0}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

ArtworkSlider.displayName = 'ArtworkSlider';

export default ArtworkSlider;
