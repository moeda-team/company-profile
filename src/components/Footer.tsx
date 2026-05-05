"use client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <a className="logo" href="#">
            <img className="logo-mark" src="/images/logo.png" alt="Hompimpa Logo" />
            Hompimpa
          </a>
          <div className="footer-copy">{t("footer.copyright")}</div>
        </div>

        {/* Link columns */}
        <div className="footer-links">
          <div className="footer-col">
            <div className="footer-col-title">{t("footer.company")}</div>
            <a href="#">{t("footer.links.about")}</a>
            <a href="#">{t("footer.links.socialMedia")}</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">{t("footer.services")}</div>
            <a href="#">{t("footer.links.webDevelopment")}</a>
            <a href="#">{t("footer.links.mobileApp")}</a>
            <a href="#">{t("footer.links.aiAutomation")}</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">{t("footer.contact")}</div>
            <a href="mailto:hompimpa@gmail.com">hompimpa@gmail.com</a>
            <a href="tel:+6281330148318">+62 813-3014-8318</a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <div className="footer-col-title">{t("footer.stayUpdated")}</div>
          <p className="footer-newsletter-desc">{t("footer.newsletterDesc")}</p>
          <div className="footer-email-wrap">
            <input type="email" placeholder={t("footer.emailPlaceholder")} className="footer-email-input" />
            <button className="footer-email-btn" aria-label="Subscribe">
              →
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
