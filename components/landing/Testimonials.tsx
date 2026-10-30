'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'COO, Nordic Mining Co.',
    rating: 5,
    text: 'ACME transformed how we track site safety. The automated workflows cut our incident response time by 40% in the first quarter.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120',
    featured: true,
  },
  {
    name: 'Marcus Reed',
    role: 'Project Director, BuildRight',
    rating: 5,
    text: 'The coordination dashboard is a game-changer. We saved over 200 admin hours per month across our contractors.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
  {
    name: 'Aisha Patel',
    role: 'Plant Manager, AutoParts Inc.',
    rating: 5,
    text: 'Production throughput jumped 18% after rolling out FactoryIQ. The real-time analytics are genuinely insightful.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
  {
    name: 'Dr. James Okafor',
    role: 'Medical Director, CareClinics',
    rating: 5,
    text: 'Compliance tracking that actually works. We hit 99.8% audit compliance without adding headcount.',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
  {
    name: 'Lena Müller',
    role: 'Registrar, State University',
    rating: 5,
    text: 'Enrollment is 3x faster. Students love how intuitive the portal feels compared to our old system.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
];

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div
      className={`break-inside-avoid mb-6 bg-white rounded-2xl p-6 border border-slate-100 card-hover ${
        t.featured ? 'shadow-lg' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <Quote className="w-8 h-8 text-blue-100" />
        <div className="flex text-amber-400">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-slate-700 leading-relaxed mb-5">"{t.text}"</p>
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.avatar}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
          <div className="text-slate-500 text-xs">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // Split into two masonry columns
  const col1 = testimonials.filter((_, i) => i % 2 === 0);
  const col2 = testimonials.filter((_, i) => i % 2 === 1);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16 reveal">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Trusted by teams worldwide
          </h2>
          <p className="text-lg text-slate-600 text-balance">
            Real outcomes from real organizations using ACME every day.
          </p>
        </div>

        <div className="columns-1 md:columns-2 gap-6 reveal">
          {testimonials.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
