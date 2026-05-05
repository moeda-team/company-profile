"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const nav = document.getElementById("nav");
    const handler = () => nav?.classList.toggle("stuck", window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 60;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav id="nav">
      <a className="logo" href="#">
        <img className="logo-mark" src="/images/logo.png" alt="Hompimpa Logo" />
        Hompimpa
      </a>
      <div className="nav-mobile-actions">
        <button className="btn-lang-mobile" onClick={() => setLanguage(language === "en" ? "id" : "en")}>
          {language === "en" ? "ID" : "EN"}
        </button>
        <button className="btn-nav-cta-mobile" onClick={() => scrollToSection("contact")}>
          {t("nav.getStarted")}
        </button>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
        </button>
      </div>
      <ul className={`nav-mid ${menuOpen ? "nav-mid-open" : ""}`}>
        <li>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
          >
            {t("nav.home")}
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
          >
            {t("nav.about")}
          </a>
        </li>
        <li>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("portfolio");
            }}
          >
            {t("nav.portfolio")}
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            {t("nav.contact")}
          </a>
        </li>
        <li className="nav-mid-cta">
          <button className="btn-nav-cta" onClick={() => scrollToSection("contact")}>
            {t("nav.getStarted")}
          </button>
        </li>
      </ul>
      <div className="nav-r">
        <button className="btn-lang" onClick={() => setLanguage(language === "en" ? "id" : "en")}>
          {language === "en" ? "ID" : "EN"}
        </button>
        <button className="btn-nav-cta" onClick={() => scrollToSection("contact")}>
          {t("nav.getStarted")}
        </button>
      </div>
    </nav>
  );
}
