'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';

export interface PortfolioAnimationParams {
  /** The <section> to pin. */
  sectionRef: RefObject<HTMLElement>;
  /** The split-card container (must be position:relative, overflow:hidden). */
  cardRef: RefObject<HTMLDivElement>;
  /** The big left hero area the thumbnails "fly into". */
  heroRef: RefObject<HTMLDivElement>;
  /** Number of projects. */
  count: number;
  /** Fired when the scroll-driven active index changes. */
  onStepChange: (index: number) => void;
  /** Fired once when scroll-driven mode engages/disengages (desktop only). */
  onModeChange?: (scrollDriven: boolean) => void;
}

const BREAKPOINT = 1024;
const RESIZE_DEBOUNCE_MS = 150;
/** Scroll each step "owns", in viewport-heights. */
const STEP_SCROLL_VH = 0.85;

/**
 * Scroll-driven showcase for the Portfolio section (desktop only).
 *
 * Pins the section; each scroll step advances to the next project. The
 * transition is a FLIP-style overlay: the incoming project's thumbnail
 * card visually detaches from the right panel and flies/morphs into the
 * big left hero frame (and flies back out when scrolling up). The morph
 * itself is a real-time tween (state-driven, fired once per step change)
 * so it stays smooth regardless of scroll velocity.
 *
 * Mobile / reduced-motion: does nothing — the section keeps its regular
 * click + autoplay behaviour.
 */
export function usePortfolioAnimation({
  sectionRef,
  cardRef,
  heroRef,
  count,
  onStepChange,
  onModeChange,
}: PortfolioAnimationParams) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const card = cardRef.current;
    const hero = heroRef.current;
    if (!section || !card || !hero) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let onResize: (() => void) | undefined;
    let engaged = false;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* ── Fly a card into (or out of) the hero frame ────────────── */
        const GAP = 16; // matches the strip's gap-4
        let overlayEl: HTMLDivElement | null = null;
        let overlayTl: any = null;

        const getThumbs = () =>
          Array.from(card.querySelectorAll<HTMLElement>('[data-portfolio-thumb]'));
        const getHeroImgs = () =>
          Array.from(hero.querySelectorAll<HTMLImageElement>('img'));

        /** Remove any inline GSAP props so React's classes take over again. */
        const resetInlineProps = () => {
          const els = [...getThumbs(), ...getHeroImgs()];
          if (els.length) gsap.set(els, { clearProps: 'transform,opacity,visibility' });
        };

        const killOverlay = () => {
          overlayTl?.kill();
          overlayTl = null;
          overlayEl?.remove();
          overlayEl = null;
          resetInlineProps();
        };

        const relRect = (r: DOMRect, c: DOMRect) => ({
          left: r.left - c.left,
          top: r.top - c.top,
          width: r.width,
          height: r.height,
        });

        const makeOverlay = (src: string): HTMLDivElement => {
          const el = document.createElement('div');
          Object.assign(el.style, {
            position: 'absolute',
            zIndex: '30',
            overflow: 'hidden',
            pointerEvents: 'none',
            willChange: 'left, top, width, height',
            boxShadow: '0 24px 48px -12px rgba(15, 23, 42, 0.35)',
          });
          const img = document.createElement('img');
          Object.assign(img.style, {
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          });
          img.src = src;
          img.alt = '';
          el.appendChild(img);
          card.appendChild(el);
          return el;
        };

        /** Commit the step to React, then clear inline props AFTER the
         *  re-render so the freshly reordered queue isn't offset by the
         *  transforms we applied to the old DOM nodes. */
        const commitStep = (idx: number) => () => {
          onStepChange(idx);
          requestAnimationFrame(() => requestAnimationFrame(resetInlineProps));
        };

        const flyTo = (nextIdx: number, prevIdx: number) => {
          const forward = nextIdx > prevIdx;
          killOverlay();

          const thumbs = getThumbs();
          const heroImgs = getHeroImgs();
          const cRect = card.getBoundingClientRect();
          const heroBox = relRect(hero.getBoundingClientRect(), cRect);

          if (forward) {
            // The FRONT card (nearest the hero) flies in; the rest of the
            // queue slides forward to fill its slot.
            const thumb = card.querySelector<HTMLElement>(
              `[data-portfolio-thumb="${nextIdx}"]`,
            );
            const thumbImg = thumb?.querySelector<HTMLImageElement>('img');
            if (!thumb || !thumbImg) {
              onStepChange(nextIdx);
              return;
            }
            const tRect = thumb.getBoundingClientRect();
            const thumbBox = relRect(tRect, cRect);
            const slot = tRect.width + GAP;
            const rest = thumbs.slice(thumbs.indexOf(thumb) + 1);

            overlayEl = makeOverlay(thumbImg.src);
            gsap.set(overlayEl, {
              ...thumbBox,
              borderRadius: 16,
              autoAlpha: 1,
              transformOrigin: 'center center',
            });
            gsap.set(thumb, { autoAlpha: 0 }); // overlay takes its place

            overlayTl = gsap.timeline({ onComplete: killOverlay });
            overlayTl
              // 1. Magnetic grab — the card lifts and tilts as it's caught.
              .to(overlayEl, { scale: 1.03, rotate: -2, duration: 0.15, ease: 'power2.out' }, 0)
              // 2. Suction — slow grip, hard accelerating pull, decelerating
              //    landing (expo.inOut), on a slight arc instead of a
              //    straight line.
              .to(
                overlayEl,
                { ...heroBox, borderRadius: 32, duration: 0.65, ease: 'expo.inOut' },
                0.15,
              )
              .to(overlayEl, { keyframes: { y: [0, -22, 0] }, duration: 0.65, ease: 'sine.inOut' }, 0.15)
              .to(overlayEl, { rotate: 1.2, duration: 0.65, ease: 'sine.inOut' }, 0.15);
            if (rest.length) {
              // Conveyor glide — finishes just before the step commits.
              overlayTl.to(
                rest,
                { x: `-=${slot}`, duration: 0.8, ease: 'power2.inOut' },
                0,
              );
            }
            overlayTl
              // Swap the hero underneath once the overlay fully covers it.
              .call(commitStep(nextIdx), undefined, 0.82)
              // 3. Magnetic lock — tiny elastic wobble as it snaps in place.
              .to(overlayEl, { scale: 1, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.55)' }, 0.82)
              .to(overlayEl, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' }, 1.15);
          } else {
            // Reverse: the hero image shrinks back into the FRONT slot of
            // the queue while the cards slide back to make room for it.
            const front = thumbs[0];
            const src = heroImgs[prevIdx]?.src;
            if (!front || !src) {
              onStepChange(nextIdx);
              return;
            }
            const frontBox = relRect(front.getBoundingClientRect(), cRect);
            const slot = frontBox.width + GAP;

            overlayEl = makeOverlay(src);
            gsap.set(overlayEl, {
              ...heroBox,
              borderRadius: 32,
              autoAlpha: 1,
              transformOrigin: 'center center',
            });
            // Overlay now covers the hero — reveal the previous project
            // beneath it right away (inline; committed to React later).
            heroImgs.forEach((im, i) =>
              gsap.set(im, { opacity: i === nextIdx ? 1 : 0 }),
            );

            overlayTl = gsap.timeline({ onComplete: killOverlay });
            overlayTl
              // 1. Magnetic release — slight lift off the hero frame.
              .to(overlayEl, { scale: 1.02, rotate: 1, duration: 0.12, ease: 'power2.out' }, 0)
              // 2. Suction back into the front slot, on a slight arc.
              .to(
                overlayEl,
                { ...frontBox, borderRadius: 16, duration: 0.63, ease: 'expo.inOut' },
                0.12,
              )
              .to(overlayEl, { keyframes: { y: [0, -16, 0] }, duration: 0.63, ease: 'sine.inOut' }, 0.12)
              .to(
                thumbs,
                { x: `+=${slot}`, duration: 0.72, ease: 'power2.inOut' },
                0,
              )
              .call(commitStep(nextIdx), undefined, 0.78)
              // 3. Magnetic lock into the slot.
              .to(overlayEl, { scale: 1, rotate: 0, duration: 0.45, ease: 'elastic.out(1, 0.55)' }, 0.78)
              .to(overlayEl, { autoAlpha: 0, duration: 0.28, ease: 'power2.out' }, 1.1);
          }
        };

        /* ── Pin + step driver ─────────────────────────────────────── */
        const setupDesktop = (): (() => void) => {
          let current = 0;
          engaged = true;
          onModeChange?.(true);
          onStepChange(0);

          const st = ScrollTrigger.create({
            trigger: section,
            start: 'center center',
            end: () => `+=${window.innerHeight * (count - 1) * STEP_SCROLL_VH}`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self: any) => {
              const step = Math.round(self.progress * (count - 1));
              if (step !== current) {
                const prev = current;
                current = step;
                flyTo(step, prev);
              }
            },
          });

          return () => {
            st.kill();
            killOverlay();
            engaged = false;
            onModeChange?.(false);
          };
        };

        const runModeSetup = () => {
          teardown?.();
          teardown = undefined;
          const isDesktop = window.innerWidth >= BREAKPOINT && !prefersReduced;
          if (isDesktop) teardown = setupDesktop();
          ScrollTrigger.refresh();
        };

        runModeSetup();

        onResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            const shouldEngage = window.innerWidth >= BREAKPOINT && !prefersReduced;
            if (shouldEngage !== engaged) runModeSetup();
          }, RESIZE_DEBOUNCE_MS);
        };
        window.addEventListener('resize', onResize);
      });
    });

    return () => {
      cancelled = true;
      if (onResize) window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      teardown?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
