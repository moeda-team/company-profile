'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';

export interface WorkflowAnimationRefs {
  sectionRef: RefObject<HTMLElement>;
  trackRef: RefObject<HTMLDivElement>;
  /** Optional white overlay rendered on top of the section for a seamless entry fade-in. */
  overlayRef?: RefObject<HTMLDivElement>;
  stepCount: number;
  /**
   * Optional: fired every scrub tick, once per step, with that step's own
   * continuous 0-1 progress — 0 before it's reached, climbing to 1 across
   * its own scroll range, then held at 1 once scrolled past (and reversing
   * smoothly on scroll-up). Drives any step's image-sequence canvas.
   */
  onStepProgress?: (stepIndex: number, progress: number) => void;
}

const BREAKPOINT = 1024;
const RESIZE_DEBOUNCE_MS = 150;

/** Opacity for steps not yet reached (cumulative reveal — never fully hidden). */
const DIM_OPACITY = 0.35;

/**
 * How much scroll each step "owns", in viewport-heights. Higher = more
 * scrolling needed to move between steps (slower, more breathing room).
 * Lower = steps change in quicker succession. Tune this one value to
 * adjust the overall scroll pacing.
 */
const STEP_SCROLL_VH = 1.4;
/** Extra scroll room at the start/end of the pin so the first/last step
 *  isn't instantly at the edge of its transition. */
const SCROLL_BUFFER_VH = 0.5;

function getPinDistance(stepCount: number): string {
  return `+=${window.innerHeight * (stepCount * STEP_SCROLL_VH + SCROLL_BUFFER_VH)}`;
}

/**
 * Drives GSAP ScrollTrigger animations for WorkflowSection.
 *
 * Design:
 * - Reveal is CUMULATIVE — once a step is reached it stays fully visible;
 *   earlier steps never fade back out. Only steps ahead of the current one
 *   are dimmed.
 * - Step/illustration transitions are STATE-DRIVEN, not frame-driven: they
 *   fire exactly once when the active step index actually changes, never
 *   repeatedly on every scroll-scrub tick. This is what prevents flicker.
 * - The connector progress line is the only thing that tracks scroll
 *   continuously (cheap, direct style writes — no tween churn).
 * - Desktop: pins the section; illustration cross-fades with a small,
 *   GPU-only transform (translate/scale/rotate + opacity, brief blur).
 * - Mobile (<1024 px): same cumulative reveal + cross-fade, triggered by
 *   per-step ScrollTrigger boundaries, no pin.
 */
export function useWorkflowAnimation({
  sectionRef,
  trackRef,
  overlayRef,
  stepCount,
  onStepProgress,
}: WorkflowAnimationRefs) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const overlay = overlayRef?.current ?? null;
    if (!section || !track) return;

    let cancelled = false;
    let modeCleanup: (() => void) | undefined;
    let overlayCleanup: (() => void) | undefined;
    let currentMode: 'desktop' | 'mobile' | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let refreshRaf1 = 0;
    let refreshRaf2 = 0;
    let onResize: (() => void) | undefined;

    // ── Dynamic import keeps GSAP out of the SSR bundle ──────────────────
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Entry fade is independent of desktop/mobile mode — set up once.
        overlayCleanup = setupEntryOverlay(gsap, ScrollTrigger, section, overlay, prefersReduced);

        // Defer refresh until the browser has actually painted the current
        // layout — a single rAF can still land before paint, so we use two.
        const scheduleRefresh = () => {
          cancelAnimationFrame(refreshRaf1);
          cancelAnimationFrame(refreshRaf2);
          refreshRaf1 = requestAnimationFrame(() => {
            refreshRaf2 = requestAnimationFrame(() => {
              if (!cancelled) ScrollTrigger.refresh();
            });
          });
        };

        const runModeSetup = () => {
          modeCleanup?.();
          const isSmallScreen = window.innerWidth < BREAKPOINT;
          currentMode = isSmallScreen || prefersReduced ? 'mobile' : 'desktop';
          modeCleanup =
            currentMode === 'mobile'
              ? setupMobile(gsap, ScrollTrigger, section, stepCount, onStepProgress)
              : setupDesktop(gsap, ScrollTrigger, section, track, stepCount, onStepProgress);
          scheduleRefresh();
        };

        runModeSetup();

        // ── Resize: debounce, and only tear down / rebuild when the
        //    desktop/mobile breakpoint is actually crossed ─────────────
        onResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            const nextIsSmall = window.innerWidth < BREAKPOINT;
            const nextMode = nextIsSmall || prefersReduced ? 'mobile' : 'desktop';
            if (nextMode !== currentMode) {
              runModeSetup();
            } else {
              scheduleRefresh();
            }
          }, RESIZE_DEBOUNCE_MS);
        };
        window.addEventListener('resize', onResize);
      });
    });

    return () => {
      cancelled = true;
      if (onResize) window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(refreshRaf1);
      cancelAnimationFrame(refreshRaf2);
      modeCleanup?.();
      overlayCleanup?.();
    };
  }, []); // empty deps — only run once after mount
}

/* ─── Entry fade-in overlay ──────────────────────────────────────────────── */
function setupEntryOverlay(
  gsap: any,
  ScrollTrigger: any,
  section: HTMLElement,
  overlay: HTMLDivElement | null,
  prefersReduced: boolean,
): () => void {
  if (!overlay) return () => {};

  if (prefersReduced) {
    gsap.set(overlay, { opacity: 0 });
    return () => {};
  }

  gsap.set(overlay, { opacity: 1 });

  const trigger = ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(overlay, { opacity: 0, duration: 0.5, ease: 'power2.out' });
    },
  });

  return () => trigger.kill();
}

/* ─── Desktop ────────────────────────────────────────────────────────────── */
function setupDesktop(
  gsap: any,
  ScrollTrigger: any,
  section: HTMLElement,
  track: HTMLDivElement,
  stepCount: number,
  onStepProgress?: (stepIndex: number, progress: number) => void,
): () => void {
  const triggers: any[] = [];
  const slides = track.querySelectorAll<HTMLElement>('.artwork-slide');

  // ── 1. Pin the section for ~N × viewport scrolling ───────────────────
  const pinTrigger = ScrollTrigger.create({
    id: 'workflow-pin',
    trigger: section,
    start: 'top top',
    end: () => getPinDistance(stepCount),
    pin: true,
    pinSpacing: true,
    anticipatePin: 0,
  });
  triggers.push(pinTrigger);

  // ── 2. Set initial state — Step 1 active immediately, no scroll needed,
  //       no animation on mount (instant, since the section may be
  //       off-screen at this point). ────────────────────────────────────
  let activeStep = 0;
  setSlideState(gsap, slides, 0, { animate: false });
  applyStepState(gsap, section, 0, stepCount, { animate: false });
  if (onStepProgress) {
    for (let i = 0; i < stepCount; i++) onStepProgress(i, 0);
  }

  // ── 3. Scrub-driven trigger: continuous connector progress, but the
  //       step/illustration transition only fires once per index change. ──
  const scrubTrigger = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => getPinDistance(stepCount),
    scrub: 1,
    onUpdate: (self: any) => {
      const rawStep = self.progress * stepCount;
      const nextStep = Math.min(Math.floor(rawStep), stepCount - 1);
      const stepFraction = rawStep - nextStep;

      // Continuous, cheap — updates the connector fill line every frame.
      updateConnectorProgress(section, nextStep, stepFraction, stepCount);

      // Continuous, cheap — drives any step's image-sequence canvas: each
      // step's own progress is 0 before it's reached, climbs to 1 across
      // its own scroll range, then holds at 1 once scrolled past (and
      // reverses smoothly on scroll-up).
      if (onStepProgress) {
        for (let i = 0; i < stepCount; i++) {
          const p = i < nextStep ? 1 : i === nextStep ? stepFraction : 0;
          onStepProgress(i, p);
        }
      }

      // Discrete — only runs when the active step actually changes.
      if (nextStep !== activeStep) {
        const previousStep = activeStep;
        activeStep = nextStep;
        applyStepState(gsap, section, activeStep, stepCount, { animate: true });
        setSlideState(gsap, slides, activeStep, { animate: true, fromIndex: previousStep });
      }
    },
  });
  triggers.push(scrubTrigger);

  // ── 4. Floating micro-animations (idle, independent of step transitions) ──
  const floatTweens: any[] = [];
  track.querySelectorAll<HTMLElement>('.artwork-image-inner').forEach((el) => {
    const duration = 4 + Math.random() * 2;
    const tween = gsap.to(el, {
      y: -8,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    floatTweens.push(tween);
  });

  return () => {
    triggers.forEach((t) => t.kill());
    floatTweens.forEach((t) => t.kill());
  };
}

/* ─── Cumulative step reveal (left panel) ───────────────────────────────── */
function applyStepState(
  gsap: any,
  section: HTMLElement,
  activeIndex: number,
  stepCount: number,
  { animate }: { animate: boolean },
) {
  for (let i = 0; i < stepCount; i++) {
    const stepEl = section.querySelector<HTMLElement>(`.workflow-step[data-step="${i}"]`);
    const dot = section.querySelector<HTMLElement>(`[data-dot="${i}"]`);
    if (!stepEl || !dot) continue;

    const isRevealed = i <= activeIndex; // cumulative — never re-hidden
    const isCurrent = i === activeIndex;
    const isCompleted = i < activeIndex;
    const targetOpacity = isRevealed ? 1 : DIM_OPACITY;

    if (animate) {
      gsap.to(stepEl, {
        opacity: targetOpacity,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    } else {
      gsap.set(stepEl, { opacity: targetOpacity });
    }

    stepEl.classList.toggle('is-active', isCurrent);
    dot.classList.toggle('completed', isCompleted);
    dot.classList.toggle('active', isCurrent);

    // One-shot settle-in for the newly current step's text — never
    // re-triggered while it stays active (that's what caused the flicker).
    if (isCurrent) {
      const els = [
        section.querySelector(`[data-step-number="${i}"]`),
        section.querySelector(`[data-step-title="${i}"]`),
        section.querySelector(`[data-step-desc="${i}"]`),
      ].filter(Boolean);

      if (animate) {
        gsap.fromTo(
          els,
          { y: 8 },
          { y: 0, duration: 0.55, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' },
        );
      } else {
        gsap.set(els, { y: 0 });
      }
    }
  }
}

/* ─── Continuous connector fill (cheap, runs every scrub frame) ─────────── */
function updateConnectorProgress(
  section: HTMLElement,
  activeIndex: number,
  stepFraction: number,
  stepCount: number,
) {
  for (let i = 0; i < stepCount; i++) {
    const fill = section.querySelector<HTMLElement>(`[data-fill="${i}"]`);
    if (!fill) continue;
    const pct = i < activeIndex ? 100 : i === activeIndex ? stepFraction * 100 : 0;
    fill.style.height = `${pct}%`;
  }
}

/* ─── Illustration cross-fade (subtle, GPU-only transforms) ─────────────── */
function setSlideState(
  gsap: any,
  slides: NodeListOf<HTMLElement>,
  activeIndex: number,
  { animate, fromIndex }: { animate: boolean; fromIndex?: number },
) {
  const outgoingIndex = fromIndex ?? activeIndex;

  slides.forEach((slide, i) => {
    if (i === activeIndex) {
      if (animate && i !== outgoingIndex) {
        // Enter — rises in gently from just below, tiny tilt, brief blur.
        gsap.fromTo(
          slide,
          { opacity: 0, y: 60, scale: 0.95, rotate: 1.2, filter: 'blur(8px)', zIndex: 2 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'expo.out',
            overwrite: 'auto',
          },
        );
      } else {
        gsap.set(slide, { opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)', zIndex: 2 });
      }
    } else if (i === outgoingIndex && animate) {
      // Exit — settles slightly up and out, no big jump.
      gsap.to(slide, {
        opacity: 0,
        y: -28,
        scale: 0.97,
        rotate: -1,
        filter: 'blur(6px)',
        duration: 0.6,
        ease: 'power3.inOut',
        overwrite: 'auto',
        zIndex: 1,
      });
    } else {
      gsap.set(slide, { opacity: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)', zIndex: 1 });
    }
  });

  syncSlideVideos(slides, activeIndex);
}

/* ─── Play only the active slide's <video> (if any); pause the rest ─────── */
function syncSlideVideos(slides: NodeListOf<HTMLElement>, activeIndex: number) {
  slides.forEach((slide, i) => {
    const video = slide.querySelector<HTMLVideoElement>('video');
    if (!video) return;
    if (i === activeIndex) {
      video.muted = true; // required for autoplay in every major browser
      const playPromise = video.play();
      if (playPromise) playPromise.catch(() => {}); // ignore autoplay-blocked rejections
    } else {
      video.pause();
    }
  });
}

/* ─── Mobile: cumulative reveal + cross-fade per step boundary ──────────── */
function setupMobile(
  gsap: any,
  ScrollTrigger: any,
  section: HTMLElement,
  stepCount: number,
  onStepProgress?: (stepIndex: number, progress: number) => void,
): () => void {
  const triggers: any[] = [];
  const slides = section.querySelectorAll<HTMLElement>('.artwork-slide');

  setSlideState(gsap, slides, 0, { animate: false });
  applyStepState(gsap, section, 0, stepCount, { animate: false });
  if (onStepProgress) {
    for (let i = 0; i < stepCount; i++) onStepProgress(i, 0);
  }

  // No pin on mobile, so give every step its own continuous scrub tied to
  // that step's own transit through the viewport — any of them can drive
  // an image-sequence canvas (only steps that actually have one care).
  // The artwork is sticky at the TOP of the viewport on mobile, so the
  // scrub ends around the artwork's bottom edge (~55% of the viewport):
  // the sequence finishes while the step text is still visible, instead
  // of playing its tail after the step has slid underneath the artwork.
  if (onStepProgress) {
    for (let i = 0; i < stepCount; i++) {
      const stepEl = section.querySelector<HTMLElement>(`.workflow-step[data-step="${i}"]`);
      if (!stepEl) continue;
      const idx = i;
      const progressTrigger = ScrollTrigger.create({
        trigger: stepEl,
        start: 'top bottom',
        end: 'bottom 55%',
        scrub: true,
        onUpdate: (self: any) => onStepProgress(idx, self.progress),
      });
      triggers.push(progressTrigger);
    }
  }

  for (let i = 1; i < stepCount; i++) {
    const stepEl = section.querySelector<HTMLElement>(`.workflow-step[data-step="${i}"]`);
    if (!stepEl) continue;

    const idx = i; // capture for closure
    // With the sticky artwork occupying the top of the viewport, a step
    // becomes "current" as it enters the readable zone below the artwork.
    const t = ScrollTrigger.create({
      trigger: stepEl,
      start: 'top 70%',
      onEnter: () => {
        applyStepState(gsap, section, idx, stepCount, { animate: true });
        setSlideState(gsap, slides, idx, { animate: true, fromIndex: idx - 1 });
      },
      onLeaveBack: () => {
        applyStepState(gsap, section, idx - 1, stepCount, { animate: true });
        setSlideState(gsap, slides, idx - 1, { animate: true, fromIndex: idx });
      },
    });
    triggers.push(t);
  }

  return () => triggers.forEach((t) => t.kill());
}
