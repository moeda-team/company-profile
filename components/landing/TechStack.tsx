'use client';

import { Layout, Cpu, Server, Database } from 'lucide-react';

const layers = [
  {
    icon: Layout,
    name: 'Presentation Layer',
    description: 'Responsive, accessible UI built with modern component systems.',
    tags: ['React', 'Next.js', 'TailwindCSS'],
    color: 'from-blue-500 to-sky-400',
  },
  {
    icon: Cpu,
    name: 'Business Layer',
    description: 'Domain logic, orchestration, and workflow automation.',
    tags: ['TypeScript', 'Node.js', 'GSAP'],
    color: 'from-sky-500 to-blue-400',
  },
  {
    icon: Server,
    name: 'API Layer',
    description: 'RESTful and real-time endpoints with edge functions.',
    tags: ['Edge Functions', 'REST', 'WebSockets'],
    color: 'from-blue-600 to-sky-500',
  },
  {
    icon: Database,
    name: 'Database Layer',
    description: 'Relational storage with row-level security and audit trails.',
    tags: ['PostgreSQL', 'RLS', 'Realtime'],
    color: 'from-sky-600 to-blue-500',
  },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-20 reveal">
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Technology Stack
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
            Built on a solid foundation
          </h2>
          <p className="text-lg text-slate-300 text-balance">
            A layered architecture that scales from prototype to enterprise, without rewrites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.name}
                className="reveal group relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-mono text-slate-500 mb-2">LAYER 0{i + 1}</div>
                <h3 className="text-lg font-bold text-white mb-2">{layer.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{layer.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {layer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
