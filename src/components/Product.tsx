"use client";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Product() {
  const { t } = useLanguage();

  const projects = [
    {
      key: "empatrima",
      image: "/images/contents/empatrima.png",
    },
    {
      key: "pos",
      image: "/images/contents/pos.png",
    },
  ];

  return (
    <section className="s-product" id="portfolio">
      <ScrollReveal>
        <div className="product-header">
          <h2 className="sh">
            {t("product.title").split(" ")[0]}{" "}
            <span className="text-highlight">{t("product.title").split(" ")[1]}</span>
          </h2>
          <p className="sp">&quot;{t("product.subtitle")}&quot;</p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="projects-grid">
        {projects.map((p, i) => {
          const projectData = t(`product.projects.${p.key}`) as any;
          return (
            <div key={i} className="project-card">
              <div className="project-image-wrap">
                <Image src={p.image} alt={projectData.title} width={600} height={500} className="project-image" />
                <div className="project-tag">{projectData.tag}</div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{projectData.title}</h3>
                <p className="project-desc">{projectData.description}</p>
                <button className="project-btn">{t("product.readMore")}</button>
              </div>
            </div>
          );
        })}
      </ScrollReveal>
    </section>
  );
}
