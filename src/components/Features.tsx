"use client";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Features() {
  const { t } = useLanguage();

  const services = [
    {
      key: "ai",
      image: "/images/contents/ai.png",
      icon: <img src="/images/icons/ai.png" alt="AI Icon" />,
    },
    {
      key: "web",
      image: "/images/contents/web.png",
      icon: <img src="/images/icons/web.png" alt="Web Icon" />,
    },
    {
      key: "support",
      image: "/images/contents/support.png",
      icon: <img src="/images/icons/support.png" alt="Support Icon" />,
    },
  ];

  return (
    <section className="s-features" id="about">
      <ScrollReveal className="s-intro">
        <h2 className="sh">
          {t("features.title").split(" ")[0]} {t("features.title").split(" ")[1]} {t("features.title").split(" ")[2]}{" "}
          <span className="text-highlight">{t("features.title").split(" ")[3]}</span>
        </h2>
        <p className="sp">&quot;{t("features.subtitle")}&quot;</p>
      </ScrollReveal>

      <ScrollReveal className="services-grid">
        {services.map((s, i) => {
          const serviceData = t(`features.services.${s.key}`) as any;
          return (
            <div key={i} className="service-card">
              <div className="service-header">
                <div className="service-icon">{s.icon}</div>
                <h3 className="service-title">{serviceData.title}</h3>
              </div>
              <div className="service-lines">
                {serviceData.lines.map((line: string, j: number) => (
                  <div key={j} className="service-line">
                    <span className="line-check">✓</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
              <div className="service-image-wrap">
                <Image src={s.image} alt={serviceData.title} width={400} height={250} className="service-image" />
              </div>
              <div className="service-benefits">
                <div className="benefits-title">{t("features.benefitsTitle")}</div>
                {serviceData.benefits.map((b: string, j: number) => (
                  <div key={j} className="benefit-item">
                    <span className="benefit-check">✓</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </ScrollReveal>
    </section>
  );
}
