'use client';

import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-floatReverse" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-sky-200/20 rounded-full blur-3xl animate-float animation-delay-300" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur border border-slate-200 rounded-full text-sm font-medium text-slate-600 mb-8 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-blue-500" />
            New: AI-powered automation is here
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 text-balance leading-[1.05]">
            Build your system,{' '}
            <span className="gradient-text">describe your problem</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
            A powerful, flexible modular system that helps you organize work,
            track progress, and deliver results all in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 px-7 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
            >
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-slate-200 text-slate-900 font-semibold rounded-xl hover:bg-slate-50 transition-all hover:-translate-y-0.5"
            >
              Explore Features
            </a>
          </div>

          {/* Hero stats / social proof */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-500 animate-fadeIn animation-delay-700">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-sky-500 border-2 border-white"
                  />
                ))}
              </div>
              <span className="font-medium text-slate-700">10+ teams</span> onboarded this week
            </div>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="font-medium text-slate-700">4.9/5</span> from 200+ reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
