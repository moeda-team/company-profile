'use client';

import { useEffect, useRef, useState } from 'react';
import { FolderKanban, Users, Smile, Calendar } from 'lucide-react';

const stats = [
  { icon: FolderKanban, value: 10, suffix: '+', label: 'Projects Delivered' },
  { icon: Users, value: 20, suffix: '+', label: 'Happy Clients' },
  { icon: Smile, value: 99, suffix: '%', label: 'Satisfaction' },
  { icon: Calendar, value: 10, suffix: '+', label: 'Years Experience' },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="py-20 bg-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-800/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="inline-flex w-14 h-14 bg-white/15 rounded-2xl items-center justify-center mb-4 backdrop-blur">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-1">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
