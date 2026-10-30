'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const solutionImg = (filename: string) => `/images/solution/${encodeURIComponent(filename)}`;

type RowColor = {
  lineStroke: string;
  dot: string;
  buttonBorder: string;
  buttonText: string;
  buttonHoverBg: string;
};

const colors: Record<'violet' | 'emerald' | 'amber', RowColor> = {
  violet: {
    lineStroke: 'stroke-blue-500',
    dot: 'bg-blue-500',
    buttonBorder: 'border-blue-200',
    buttonText: 'text-blue-600',
    buttonHoverBg: 'group-hover:bg-blue-600',
  },
  emerald: {
    lineStroke: 'stroke-blue-500',
    dot: 'bg-blue-500',
    buttonBorder: 'border-blue-200',
    buttonText: 'text-blue-600',
    buttonHoverBg: 'group-hover:bg-blue-600',
  },
  amber: {
    lineStroke: 'stroke-blue-500',
    dot: 'bg-blue-500',
    buttonBorder: 'border-blue-200',
    buttonText: 'text-blue-600',
    buttonHoverBg: 'group-hover:bg-blue-600',
  },
};

const rows: {
  color: keyof typeof colors;
  left: { image: string; title: string; description: string };
  right: { image: string; title: string; description: string };
}[] = [
  {
    color: 'violet',
    left: {
      image: 'enterprise-system.png',
      title: 'Enterprise Systems',
      description: 'End-to-end enterprise solutions to streamline operations and drive business growth.',
    },
    right: {
      image: 'AI intelegent systems.png',
      title: 'AI & Intelligent Solutions',
      description: 'AI-powered systems that automate processes, analyze data, and enhance decision making.',
    },
  },
  {
    color: 'emerald',
    left: {
      image: 'ERP.png',
      title: 'ERP & Business Management',
      description: 'Integrated ERP, HRIS, and business management systems tailored to your workflows.',
    },
    right: {
      image: 'mobile applications.png',
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    },
  },
  {
    color: 'amber',
    left: {
      image: 'Data & Analytics.png',
      title: 'Data & Analytics',
      description: 'Transform your data into actionable insights with dashboards, reports, and advanced analytics.',
    },
    right: {
      image: 'cloud & integrations.png',
      title: 'Cloud & Integration',
      description: 'Scalable cloud solutions and seamless integrations to connect your systems and tools.',
    },
  },
];

function SolutionCard({
  image,
  title,
  description,
  c,
  delay,
  direction,
}: {
  image: string;
  title: string;
  description: string;
  c: RowColor;
  delay: number;
  direction: 'left' | 'right';
}) {
  return (
    <div
      className={`${direction === 'left' ? 'reveal-left' : 'reveal-right'} group flex bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/60 card-hover overflow-hidden`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Column 1: image, full height, never cropped */}
      <div className="relative w-36 sm:w-40 flex-shrink-0 bg-gradient-to-br from-slate-50 to-white p-3">
        <Image src={solutionImg(image)} alt={title} fill sizes="160px" className="object-contain" />
      </div>

      {/* Column 2: text + button */}
      <div className="flex-1 min-w-0 flex items-center gap-4 p-6">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{description}</p>
        </div>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full border ${c.buttonBorder} flex items-center justify-center ${c.buttonHoverBg} transition-colors`}
        >
          <ArrowRight className={`w-4 h-4 ${c.buttonText} group-hover:text-white transition-colors`} />
        </div>
      </div>
    </div>
  );
}

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: '#FAFBFF' }}>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-20 reveal">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Solutions
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Powerful systems around your needs
          </h2>
          <p className="text-lg text-slate-600 text-balance">
            Everything connects to a central hub that orchestrates your entire operation.
          </p>
        </div>

        {/* Desktop: hub-and-spoke layout */}
        {/*
          Coordinate system: the middle column is a fixed 340px-wide box whose
          height always stretches (via CSS grid) to match the card columns.
          Widening this column also narrows the two 1fr card columns, which is
          what pulls the cards in and gives the dashed connectors room to read.
          Row centers are expressed as a % of that shared height (14 / 50 / 86),
          which stays correct regardless of actual rendered height since all
          three cards are forced to the same height via line-clamp-2. The hub
          circle is a fixed 176px (11rem) circle centered in that same box, so
          every path below is drawn to land exactly on its edge.
        */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_340px_1fr]">
          <div className="flex flex-col gap-10">
            {rows.map((row, i) => (
              <SolutionCard key={row.left.title} {...row.left} c={colors[row.color]} delay={i * 100} direction="left" />
            ))}
          </div>

          {/* Connector column: lines + hub */}
          <div className="relative">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 340 100"
              preserveAspectRatio="none"
            >
              {rows.map((row, i) => {
                const c = colors[row.color];
                const y = i === 0 ? 14 : i === 1 ? 50 : 86;
                const leftPath = i === 1 ? 'M 0 50 H 82' : `M 0 ${y} H 130 V 50 H 82`;
                const rightPath = i === 1 ? 'M 340 50 H 258' : `M 340 ${y} H 210 V 50 H 258`;
                return (
                  <g key={row.left.title}>
                    <path
                      d={leftPath}
                      fill="none"
                      className={`${c.lineStroke} animate-dash-flow`}
                      strokeWidth={2}
                      strokeDasharray="5 6"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                    <path
                      d={rightPath}
                      fill="none"
                      className={`${c.lineStroke} animate-dash-flow`}
                      strokeWidth={2}
                      strokeDasharray="5 6"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Dots at card edges and where lines meet the hub */}
            {rows.map((row, i) => {
              const c = colors[row.color];
              const yPct = i === 0 ? 14 : i === 1 ? 50 : 86;
              return (
                <div key={row.left.title}>
                  <span
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${c.dot}`}
                    style={{ left: '0%', top: `${yPct}%`, boxShadow: '0 0 0 4px #FAFBFF' }}
                  />
                  <span
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${c.dot}`}
                    style={{ left: '100%', top: `${yPct}%`, boxShadow: '0 0 0 4px #FAFBFF' }}
                  />
                  <span
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${c.dot}`}
                    style={{ left: `${(82 / 340) * 100}%`, top: '50%', boxShadow: '0 0 0 4px #FAFBFF' }}
                  />
                  <span
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${c.dot}`}
                    style={{ left: `${(258 / 340) * 100}%`, top: '50%', boxShadow: '0 0 0 4px #FAFBFF' }}
                  />
                </div>
              );
            })}

            {/* Center hub — fixed 176px (11rem) so it always matches the 88px radius used in the paths above */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="reveal-scale relative w-44 h-44 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center"
                style={{ backgroundColor: '#FAFBFF' }}
              >
                <div className="relative w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-xl shadow-slate-300/60">
                  <div className="relative w-20 h-20">
                    <Image src={solutionImg('center.png')} alt="Central hub" fill sizes="80px" className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {rows.map((row, i) => (
              <SolutionCard key={row.right.title} {...row.right} c={colors[row.color]} delay={i * 100} direction="right" />
            ))}
          </div>
        </div>

        {/* Mobile / tablet: simple stacked cards */}
        <div className="lg:hidden flex flex-col gap-6">
          {rows.flatMap((row, i) => {
            const c = colors[row.color];
            return [
              <SolutionCard key={row.left.title} {...row.left} c={c} delay={i * 100} direction="left" />,
              <SolutionCard key={row.right.title} {...row.right} c={c} delay={i * 100} direction="right" />,
            ];
          })}
        </div>
      </div>
    </section>
  );
}
