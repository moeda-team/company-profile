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

  return (
    <nav id="nav">
      <a className="logo" href="#">
        <img className="logo-mark" src="/images/logo.png" alt="Hompimpa Logo" />
        Hompimpa
      </a>
      <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
      </button>
      <ul className={`nav-mid ${menuOpen ? "nav-mid-open" : ""}`}>
        <li>
          <a href="#hero" onClick={() => setMenuOpen(false)}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
        </li>
        <li>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>
            Portfolio
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </li>
      </ul>
      <div className="nav-r">
        <button className="btn-nav-cta">Get Started</button>
      </div>
    </nav>
  );
}
