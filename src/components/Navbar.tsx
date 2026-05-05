"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <button className="btn-nav-cta-mobile" onClick={() => scrollToSection("contact")}>
          Get Started
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
            Home
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
            About
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
            Portfolio
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
            Contact
          </a>
        </li>
        <li className="nav-mid-cta">
          <button className="btn-nav-cta" onClick={() => scrollToSection("contact")}>
            Get Started
          </button>
        </li>
      </ul>
      <div className="nav-r">
        <button className="btn-nav-cta" onClick={() => scrollToSection("contact")}>
          Get Started
        </button>
      </div>
    </nav>
  );
}
