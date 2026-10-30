'use client';

import { Mountain, HardHat, Factory, HeartPulse, GraduationCap, Landmark } from 'lucide-react';

const industries = [
  {
    icon: Mountain,
    title: 'Mining',
    description: 'Resource extraction, fleet management, and site safety systems.',
  },
  {
    icon: HardHat,
    title: 'Construction',
    description: 'Project tracking, contractor coordination, and progress monitoring.',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Production scheduling, inventory control, and quality assurance.',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare',
    description: 'Patient workflows, compliance tracking, and staff coordination.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Student records, course management, and institutional reporting.',
  },
  {
    icon: Landmark,
    title: 'Government',
    description: 'Citizen services, document management, and public-sector workflows.',
  },
];

export default function Industries() {
  return (
    <section id="industries" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16 reveal">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Industries We Serve
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Built for every business domain
          </h2>
          <p className="text-lg text-slate-600 text-balance">
            From extraction to education, our modular approach adapts to the way you work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.title}
                className="reveal card-hover group bg-white rounded-2xl p-8 border border-slate-100"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300 group-hover:rotate-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{industry.title}</h3>
                <p className="text-slate-600 leading-relaxed">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
