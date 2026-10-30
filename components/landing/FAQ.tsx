'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'What services do you offer?',
    a: 'We deliver end-to-end software systems: workflow automation, real-time analytics, secure data management, and AI-powered tooling. Our modular approach means you can start with one module and expand as needed.',
  },
  {
    q: 'What is the typical project timeline?',
    a: 'Most engagements run 6–12 weeks from kickoff to launch. Smaller modules can ship in as little as 2 weeks. We provide a detailed roadmap after a discovery call so you know exactly what to expect.',
  },
  {
    q: 'How does pricing work?',
    a: 'Pricing scales with the modules you use and the number of seats. We offer transparent monthly subscriptions with no hidden fees, and enterprise plans with custom SLAs and on-premise options.',
  },
  {
    q: 'What kind of support do you provide?',
    a: 'Every plan includes email support and a knowledge base. Pro and Enterprise tiers add priority Slack channels, dedicated success managers, and 24/7 incident response with guaranteed response times.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We use row-level security, encrypted storage, audit logging, and SOC 2-ready controls. Role-based access lets you tightly scope who can see what across your organization.',
  },
  {
    q: 'Can I integrate with existing tools?',
    a: 'Absolutely. We expose REST and real-time endpoints, plus pre-built connectors for common platforms. If you have a custom stack, our edge functions can bridge the gap.',
  },
];

function Item({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-900">{q}</span>
        <Plus
          className={`flex-shrink-0 w-5 h-5 text-slate-500 transition-transform duration-300 ${
            isOpen ? 'rotate-45 text-blue-600' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-slate-600 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            FAQ
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Questions, answered
          </h2>
          <p className="text-lg text-slate-600 text-balance">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="space-y-3 reveal">
          {faqs.map((faq, i) => (
            <Item
              key={faq.q}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
