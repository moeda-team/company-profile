"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";

const services = ["ai", "web", "support"] as const;
const projects = [
  { key: "empatrima", image: "/images/contents/empatrima.png", tone: "lilac" },
  { key: "pos", image: "/images/contents/pos.png", tone: "mint" },
] as const;

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const languageAnimations = useRef<Animation[]>([]);
  const languageFrame = useRef<number | null>(null);

  useEffect(() => () => {
    if (languageFrame.current !== null) cancelAnimationFrame(languageFrame.current);
    languageAnimations.current.forEach((animation) => animation.cancel());
  }, []);

  function handleLanguageChange() {
    if (languageFrame.current !== null) cancelAnimationFrame(languageFrame.current);
    languageAnimations.current.forEach((animation) => animation.cancel());
    setLanguage(language === "en" ? "id" : "en");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    languageFrame.current = requestAnimationFrame(() => {
      const targets = document.querySelectorAll<HTMLElement>(
        ".main-nav, .hero-copy, .hero-dashboard, .hero-bottom, .section-heading, .services-grid, .work-grid, .contact-copy, .contact-form, .footer-main"
      );
      languageAnimations.current = Array.from(targets)
        .filter((element) => {
          const bounds = element.getBoundingClientRect();
          return bounds.width > 0 && bounds.bottom > 0 && bounds.top < window.innerHeight && Number(getComputedStyle(element).opacity) > 0.9;
        })
        .map((element) => element.animate([{ opacity: 0.65 }, { opacity: 1 }], { duration: 280, easing: "ease-out" }));
      languageFrame.current = null;
    });
  }

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const lines = [
      t("home.form.messageIntro"),
      t("home.form.name") + ": " + values.get("name"),
      t("home.form.email") + ": " + values.get("email"),
      t("home.form.projectType") + ": " + values.get("projectType"),
      t("home.form.budget") + ": " + (values.get("budget") || t("home.form.notSpecified")),
      t("home.form.details") + ": " + values.get("details"),
    ];
    window.open("https://wa.me/6281330148318?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <div className="dark-top" id="top">
        <header className="site-header">
          <div className="container nav-shell">
            <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)} aria-label="Hompimpa home">hompimpa<span>.</span></a>
            <nav className={"main-nav" + (menuOpen ? " is-open" : "")} id="main-nav" aria-label={t("home.nav.label")}>
              <a href="#services" onClick={() => setMenuOpen(false)}>{t("home.nav.services")}</a>
              <a href="#work" onClick={() => setMenuOpen(false)}>{t("home.nav.work")}</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>{t("home.nav.contact")}</a>
              <a className="nav-mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>{t("home.nav.cta")} <span aria-hidden="true">↗</span></a>
            </nav>
            <div className="nav-actions">
              <button className="language-button" type="button" onClick={handleLanguageChange} aria-label={t("home.nav.switchLanguage")}>{language === "en" ? "ID" : "EN"}</button>
              <a className="button button-lime nav-cta" href="#contact">{t("home.nav.cta")} <span aria-hidden="true">↗</span></a>
              <button className="menu-button" type="button" aria-label={menuOpen ? t("home.nav.closeMenu") : t("home.nav.openMenu")} aria-controls="main-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
            </div>
          </div>
        </header>

        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="availability"><span className="availability-dot" />{t("home.hero.eyebrow")}</div>
            <h1 id="hero-title">{t("home.hero.line1")}<br />{t("home.hero.line2")}<br /><span>{t("home.hero.line3")}</span></h1>
            <p>{t("home.hero.description")}</p>
            <div className="hero-buttons">
              <a className="button button-lime" href="#contact">{t("home.hero.primary")} <span aria-hidden="true">↗</span></a>
              <a className="button button-outline" href="#work">{t("home.hero.secondary")} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-dashboard" aria-hidden="true">
            <div className="dashboard-head"><span>{t("home.hero.dashboardTitle")}</span><span>{t("home.hero.dashboardStatus")}</span></div>
            <div className="dashboard-tiles">
              <div className="dashboard-tile"><span>01 / {t("home.hero.plan")}</span><strong>{t("home.hero.discover")}</strong><i /></div>
              <div className="dashboard-tile"><span>02 / {t("home.hero.build")}</span><strong>{t("home.hero.create")}</strong><i /></div>
            </div>
            <div className="dashboard-chart">
              <div className="chart-label"><span>{t("home.hero.progress")}</span><span>↗</span></div>
              <svg viewBox="0 0 450 142" preserveAspectRatio="none" role="presentation">
                <defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#c5f56b" stopOpacity=".22"/><stop offset="1" stopColor="#c5f56b" stopOpacity="0"/></linearGradient></defs>
                <path d="M0 124 C55 118 70 86 124 77 S193 99 245 81 S308 34 360 27 S421 9 450 5 L450 142 L0 142 Z" fill="url(#chart-fill)" />
                <path d="M0 124 C55 118 70 86 124 77 S193 99 245 81 S308 34 360 27 S421 9 450 5" fill="none" stroke="#c5f56b" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </section>
        <div className="hero-bottom container"><span>{t("home.hero.bottomLabel")}</span><span>{t("home.hero.bottomText")}</span></div>
      </div>

      <main className="light-content">
        <section className="section services-section container" id="services" aria-labelledby="services-title">
          <ScrollReveal className="section-heading"><span className="eyebrow">{t("home.services.eyebrow")}</span><h2 id="services-title">{t("home.services.title")}</h2><p>{t("home.services.description")}</p></ScrollReveal>
          <ScrollReveal className="services-grid">
            {services.map((key, index) => {
              const service = t("features.services." + key) as { title: string; lines: string[] };
              return <article className={"service-card" + (index === 0 ? " service-featured" : "")} key={key}>
                <span className="service-number">0{index + 1}</span>
                <div><h3>{service.title}</h3><p>{service.lines.join(" · ")}</p></div>
              </article>;
            })}
          </ScrollReveal>
        </section>

        <section className="section work-section container" id="work" aria-labelledby="work-title">
          <ScrollReveal className="section-heading section-heading-row"><div><span className="eyebrow">{t("home.work.eyebrow")}</span><h2 id="work-title">{t("home.work.title")}</h2></div><p>{t("home.work.description")}</p></ScrollReveal>
          <ScrollReveal className="work-grid">
            {projects.map((project) => {
              const data = t("product.projects." + project.key) as { title: string; description: string; tag: string };
              return <article className="work-card" key={project.key}>
                <div className={"work-image-wrap " + project.tone}><Image src={project.image} alt={data.title + " product interface"} width={1436} height={892} className="work-image" sizes="(max-width: 700px) 100vw, 50vw" /></div>
                <span className="work-tag">{data.tag}</span><h3>{data.title} <span aria-hidden="true">↗</span></h3><p>{data.description}</p>
              </article>;
            })}
          </ScrollReveal>
        </section>

        <section className="contact-section container" id="contact" aria-labelledby="contact-title">
          <ScrollReveal className="contact-copy">
            <span className="contact-eyebrow">{t("home.contact.eyebrow")}</span><h2 id="contact-title">{t("home.contact.title")}</h2><p>{t("home.contact.description")}</p>
            <a className="button button-dark" href="https://wa.me/6281330148318" target="_blank" rel="noopener noreferrer">{t("home.contact.whatsapp")} <span aria-hidden="true">↗</span></a>
            <small>{t("home.contact.emailPrompt")} <a href="mailto:hompimpa@gmail.com">hompimpa@gmail.com</a></small>
          </ScrollReveal>
          <ScrollReveal>
          <form className="contact-form" onSubmit={handleContact}>
            <label htmlFor="contact-name">{t("home.form.name")}</label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder={t("home.form.namePlaceholder")} required />
            <label htmlFor="contact-email">{t("home.form.email")}</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            <label htmlFor="contact-type">{t("home.form.projectType")}</label>
            <select id="contact-type" name="projectType" defaultValue="" required>
              <option value="" disabled>{t("home.form.chooseType")}</option>
              <option value={t("features.services.ai.title")}>{t("features.services.ai.title")}</option>
              <option value={t("features.services.web.title")}>{t("features.services.web.title")}</option>
              <option value={t("features.services.support.title")}>{t("features.services.support.title")}</option>
              <option value={t("home.form.other")}>{t("home.form.other")}</option>
            </select>
            <label htmlFor="contact-budget">{t("home.form.budget")}</label><input id="contact-budget" name="budget" type="text" placeholder={t("home.form.budgetPlaceholder")} />
            <label htmlFor="contact-details">{t("home.form.details")}</label><textarea id="contact-details" name="details" rows={4} placeholder={t("home.form.detailsPlaceholder")} required />
            <button className="button button-dark form-submit" type="submit">{t("home.form.submit")} <span aria-hidden="true">↗</span></button>
          </form>
          </ScrollReveal>
        </section>

        <footer className="site-footer container">
          <div className="footer-main">
            <div className="footer-brand"><a className="wordmark" href="#top">hompimpa<span>.</span></a><p>{t("home.footer.description")}</p></div>
            <div className="footer-columns">
              <div><strong>{t("home.footer.company")}</strong><a href="#services">{t("home.nav.services")}</a><a href="#work">{t("home.nav.work")}</a><a href="#contact">{t("home.nav.contact")}</a></div>
              <div><strong>{t("home.footer.connect")}</strong><a href="mailto:hompimpa@gmail.com">Email</a><a href="https://wa.me/6281330148318" target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
            </div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Hompimpa. {t("home.footer.rights")}</span><a href="#top">{t("home.footer.backToTop")} ↑</a></div>
        </footer>
      </main>
    </>
  );
}
