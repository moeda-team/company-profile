'use client';

import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-800 px-6 py-16 lg:px-16 lg:py-24 text-center">
          <div className="absolute inset-0 dot-grid opacity-10" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-400/30 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-floatReverse" />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Ready to build your system?
            </h2>
            <p className="text-lg text-blue-100 mb-8 text-balance">
              Describe your problem. We'll architect the solution. Launch in weeks, not months.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 animate-pulse-glow"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                See Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
