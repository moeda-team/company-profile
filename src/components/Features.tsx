"use client";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "Automate Field Operation with AI",
    lines: ["AI-Driven predictive analytics", "Real-time task scheduling", "Automated field reporting"],
    benefits: ["Predictive analytics & reports", "Reduce human errors", "Boost operational efficiency"],
    image: "/images/contents/ai.png",
    icon: <img src="/images/icons/ai.png" alt="AI Icon" />,
  },
  {
    title: "Custom Website & Mobile App Development",
    lines: ["User-friendly UI/UX design", "High performance & mobile-first", "Cross-platform development"],
    benefits: ["Scalable & scalable solutions for your success", "High ROI solutions", "Fast & clean development"],
    image: "/images/contents/web.png",
    icon: <img src="/images/icons/web.png" alt="Web Icon" />,
  },
  {
    title: "Maintenance & Technical Support",
    lines: ["ERP system maintenance", "IT infrastructure setup", "Long-term technical support"],
    benefits: ["Business performance tuning", "Continuous updates & expert", "Proactive issue maintenance"],
    image: "/images/contents/support.png",
    icon: <img src="/images/icons/support.png" alt="Support Icon" />,
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
              <Image src={s.image} alt={s.title} width={400} height={250} className="service-image" />
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
