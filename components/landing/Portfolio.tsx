'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePortfolioAnimation } from '@/hooks/usePortfolioAnimation';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Palette,
  ShoppingBag,
  HardHat,
  MapPin,
} from 'lucide-react';

/**
 * Local mockup screenshots live in /public/images/portfolio/.
 *
 * `objectPosition` controls which part of the shot stays visible once it's
 * cropped into the wide hero frame — portrait mockups (e.g. a phone screen)
 * are pinned to the top so the page header/hero reads like a web view
 * instead of showing the device bezel.
 */
const projects = [
  {
    title: 'Pallet Ross',
    category: 'Marketplace',
    icon: Palette,
    image: '/images/portfolio/card2.png',
    objectPosition: 'center',
    description:
      'Art marketplace where creators showcase their work and buyers discover pieces that resonate.',
    metric: '3.2x longer session time',
  },
  {
    title: 'Bike Store',
    category: 'E-Commerce',
    icon: ShoppingBag,
    image: '/images/portfolio/card3.png',
    objectPosition: 'center',
    description:
      'Premium e-bike storefront with spec explorer, test-ride booking, and rider reviews.',
    metric: '2.4x conversion uplift',
  },
  {
    title: 'Darnit2',
    category: 'Corporate',
    icon: HardHat,
    image: '/images/portfolio/card1.png',
    // Portrait source — pin to the top so the hero section stays in frame.
    objectPosition: 'top center',
    description:
      'Bold dark-theme site for a road works contractor, built around services and equipment.',
    metric: '2x inbound quote requests',
  },
];

export default function Portfolio() {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  // True while the desktop pin + scroll-step showcase is engaged — disables
  // autoplay and makes the hero swap instantly (it happens fully covered by
  // the flying-card overlay, so no cross-fade is needed).
  const [scrollDriven, setScrollDriven] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const next = () => setActive((p) => (p + 1) % projects.length);
  const prev = () => setActive((p) => (p - 1 + projects.length) % projects.length);

  usePortfolioAnimation({
    sectionRef,
    cardRef,
    heroRef,
    count: projects.length,
    onStepChange: useCallback((i: number) => setActive(i), []),
    onModeChange: useCallback((engaged: boolean) => {
      setScrollDriven(engaged);
      setAutoPlay(!engaged);
    }, []),
  });

  useEffect(() => {
    if (!autoPlay || scrollDriven) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [autoPlay, scrollDriven]);

  const project = projects[active];

  return (
    <section ref={sectionRef} id="portfolio" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16 reveal">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Best Project
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Work that speaks for itself
          </h2>
          <p className="text-lg text-slate-600 text-balance">
            A selection of systems we've shipped — and the results they delivered.
          </p>
        </div>

        {/* Split card — hero showcase left, discover panel right */}
        <div
          ref={cardRef}
          className="reveal relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] rounded-[2rem] overflow-hidden bg-white shadow-2xl shadow-slate-300/40 border border-slate-100"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(!scrollDriven)}
        >
          {/* ── LEFT: full-bleed hero of the active project ── */}
          <div ref={heroRef} className="relative min-h-[440px] lg:min-h-[600px] overflow-hidden lg:rounded-r-[2rem]">
            {projects.map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.title}
                src={p.image}
                alt={p.title}
                style={{ objectPosition: p.objectPosition }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                  scrollDriven ? 'duration-0' : 'duration-700'
                } ${i === active ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-slate-900/25" />

            {/* Brand label */}
            <span className="absolute top-7 left-7 lg:top-9 lg:left-9 text-white text-sm font-semibold tracking-widest lowercase">
              portfolio<span className="text-blue-400">.</span>
            </span>

            {/* Category chip */}
            <span className="absolute top-7 right-7 lg:top-9 lg:right-9 px-3 py-1 bg-white/15 backdrop-blur border border-white/20 rounded-full text-xs font-semibold text-white">
              {project.category}
            </span>

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-7 pt-24 lg:p-10 lg:pt-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 text-balance">
                {project.title}
              </h2>
              <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-md mb-3">
                {project.description}
              </p>
              <div className="inline-flex items-center gap-2 text-blue-300 text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                {project.metric}
              </div>

              <div className="flex items-center justify-between gap-6">
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-blue-900/30"
                >
                  View case study
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {/* Slide counter + progress */}
                <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                  <span>{String(active + 1).padStart(2, '0')}</span>
                  <div className="w-20 sm:w-28 h-px bg-white/30 relative overflow-hidden">
                    <span
                      className="absolute inset-y-0 left-0 bg-white transition-all duration-500"
                      style={{ width: `${((active + 1) / projects.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-white/50">{String(projects.length).padStart(2, '0')}</span>
                  <button
                    onClick={next}
                    aria-label="Next project"
                    className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: discover panel ── */}
          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            {/* Search */}
            <label className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-8 text-slate-400 focus-within:text-blue-600 focus-within:border-blue-300 transition-colors">
              <Search className="w-4 h-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search projects"
                className="w-full text-sm text-slate-700 bg-transparent outline-none placeholder:text-slate-400"
              />
            </label>

            <h3 className="text-2xl font-bold text-slate-900 mb-6">Discover</h3>

            {/* Project thumbnail cards — a queue of UPCOMING projects (the
                active one lives in the hero). The front card is the one
                that flies into the hero frame; the rest shift forward to
                take its place. */}
            <div className="flex gap-4 overflow-hidden -mx-1 px-1">
              {Array.from({ length: projects.length - 1 }, (_, j) => {
                const idx = (active + 1 + j) % projects.length;
                const p = projects[idx];
                return (
                  <button
                    key={p.title}
                    data-portfolio-thumb={idx}
                    onClick={() => setActive(idx)}
                    aria-label={`Show ${p.title}`}
                    className="relative flex-shrink-0 w-36 sm:w-40 lg:w-[calc((100%-1rem)/2)] h-52 rounded-2xl overflow-hidden group text-left opacity-90 hover:opacity-100 transition-opacity"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{ objectPosition: p.objectPosition }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <div className="text-white text-sm font-semibold leading-snug mb-1">{p.title}</div>
                      <div className="flex items-center gap-1 text-white/70 text-[11px]">
                        <MapPin className="w-3 h-3" />
                        {p.category}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Prev / next */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={prev}
                aria-label="Previous project"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next project"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Industries icon row */}
            <div className="mt-auto pt-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-900">Industries</span>
                <a href="#industries" className="text-xs text-slate-400 hover:text-blue-600 transition-colors">
                  Show all
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {projects.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.category}
                      onClick={() => setActive(i)}
                      aria-label={`Show ${p.category} project`}
                      className={`flex flex-col items-center gap-2 py-3 rounded-xl border transition-colors ${
                        i === active
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200 hover:text-slate-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[9px] font-semibold tracking-wide uppercase">
                        {p.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* See all projects */}
        <div className="reveal mt-12 text-center">
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-slate-300/50"
          >
            See all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
