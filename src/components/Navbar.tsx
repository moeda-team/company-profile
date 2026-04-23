"use client";
import { useEffect } from "react";

export default function Navbar() {
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
      <ul className="nav-mid">
        <li><a href="#">Solutions</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">Pricing</a></li>
      </ul>
      <div className="nav-r">
        <button className="btn-nav-ghost">Sign in</button>
        <button className="btn-nav-cta">Contact Sales</button>
      </div>
    </nav>
  );
}
