"use client";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "Automate Field Operation with AI",
    lines: [
      "AI-Driven predictive analytics",
      "Real-time task scheduling",
      "Smart inventory tracking",
      "Automated field reporting",
    ],
    benefits: ["Predictive analytics & reports", "Reduce human errors", "Boost operational efficiency"],
    image: "/images/field-operations.png",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="11" r="7" stroke="#FF6A00" strokeWidth="1.6" />
        <path d="M13 8v3l2 1.5" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 22c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Custom Website & Mobile App Development",
    lines: ["User-friendly UI/UX design", "High performance & mobile-first", "Cross-platform development"],
    benefits: ["Scalable & scalable solutions for your success", "High ROI solutions", "Fast & clean development"],
    image: "/images/web-mobile-dev.png",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="2" y="4" width="22" height="14" rx="2.5" stroke="#FF6A00" strokeWidth="1.6" />
        <path d="M9 22h8M13 18v4" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 11l3 3 3-4 3 2.5" stroke="#FF6A00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Maintenance & Technical Support",
    lines: ["ERP system maintenance", "IT infrastructure setup", "Long-term technical support"],
    benefits: ["Business performance tuning", "Continuous updates & expert", "Proactive issue maintenance"],
    image: "/images/maintenance.png",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M21 5.5l-3 3-2-2 3-3A6 6 0 005 11a6 6 0 006 6l8-8z"
          stroke="#FF6A00"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 15l-5 5a1.4 1.4 0 002 2l5-5"
          stroke="#FF6A00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="s-features" id="about">
      <ScrollReveal className="s-intro">
        <h2 className="sh">
          Built for Real-World <span className="text-highlight">Impact</span>
        </h2>
        <p className="sp">
          &quot;From intelligent automation to scalable system development and reliable support, we help businesses
          streamline operations and maximize performance.&quot;
        </p>
      </ScrollReveal>

      <ScrollReveal className="services-grid">
        {services.map((s, i) => (
          <div key={i} className="service-card">
            <div className="service-header">
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
            </div>
            <div className="service-lines">
              {s.lines.map((line, j) => (
                <div key={j} className="service-line">
                  <span className="line-check">✓</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
            <div className="service-image-wrap">
              <Image src={s.image} alt={s.title} width={400} height={220} className="service-image" />
            </div>
            <div className="service-benefits">
              <div className="benefits-title">Benefits</div>
              {s.benefits.map((b, j) => (
                <div key={j} className="benefit-item">
                  <span className="benefit-check">✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}
