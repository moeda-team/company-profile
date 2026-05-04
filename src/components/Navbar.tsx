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
        <svg className="logo-mark" viewBox="0 0 28 28" fill="none">
          <polygon points="14,1 27,8 27,20 14,27 1,20 1,8" fill="rgba(255,106,0,.1)" stroke="#FF6A00" strokeWidth="1.5" />
          <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" fill="#FF6A00" opacity=".55" />
          <polygon points="14,10.5 18,12.8 18,15.2 14,17.5 10,15.2 10,12.8" fill="#FF6A00" />
        </svg>
        Hompimpa
      </a>
      <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
      </button>
      <ul className={`nav-mid ${menuOpen ? "nav-mid-open" : ""}`}>
        <li><a href="#hero" onClick={() => setMenuOpen(false)}>Home</a></li>
        <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
        <li><a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a></li>
        <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
      </ul>
      <div className="nav-r">
        <button className="btn-nav-cta">Get Started</button>
      </div>
    </nav>
  );
}
