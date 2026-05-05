"use client";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="s-cta" id="contact">
      <ScrollReveal className="cta-grid">
        <div className="cta-left">
          <h2 className="cta-h">
            {t("cta.title").split(" Hompimpa?")[0]}
            <br />
            Hompimpa?
          </h2>
          <p className="cta-p">&quot;{t("cta.subtitle")}&quot;</p>
        </div>
        <img className="cta-arrow" src="/images/others/arrow-ornament.jpg" alt="Arrow" />
        <div className="cta-right">
          <div className="cta-card">
            <img className="cta-shade" src="/images/others/shade-connect.png" alt="" />
            <h3 className="cta-card-title">{t("cta.cardTitle")}</h3>
            <p className="cta-card-desc">{t("cta.cardDescription")}</p>
            <button className="btn-cta-connect">{t("cta.button")}</button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
