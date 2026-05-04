"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let cW = 0, cH = 0, raf = 0;

    const PARTICLES = Array.from({ length: 50 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 1000,
      r: Math.random() * 2 + 0.3,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .18,
      a: Math.random() * .12 + .02,
    }));

    function resize() {
      cW = canvas!.width = window.innerWidth;
      cH = canvas!.height = document.getElementById("hero")?.offsetHeight ?? window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, cW, cH);
      PARTICLES.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = cW + 10; if (p.x > cW + 10) p.x = -10;
        if (p.y < -10) p.y = cH + 10; if (p.y > cH + 10) p.y = -10;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    let animT = 0, raf2 = 0;
    const dashEl = document.getElementById("dash-wrap");
    const phoneEl = document.getElementById("phone-wrap");
    function animLoop() {
      animT += 0.01;
      const floatY = Math.sin(animT) * 7;
      if (dashEl) dashEl.style.transform = `translateY(${floatY}px)`;
      if (phoneEl) phoneEl.style.transform = `translateY(${-floatY * 0.8}px)`;
      raf2 = requestAnimationFrame(animLoop);
    }
    animLoop();
    return () => cancelAnimationFrame(raf2);
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas id="hero-canvas" ref={canvasRef} />

      {/* Decorative floating 3D boxes */}
      <div className="hero-deco hero-box-1">
        <svg viewBox="0 0 60 60" fill="none" width="52">
          <rect x="10" y="20" width="40" height="30" rx="4" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
          <rect x="10" y="15" width="40" height="8" rx="2" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <rect x="22" y="5" width="26" height="20" rx="2" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        </svg>
      </div>
      <div className="hero-deco hero-box-2">
        <svg viewBox="0 0 50 50" fill="none" width="42">
          <rect x="8" y="18" width="34" height="24" rx="4" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
          <rect x="18" y="8" width="24" height="14" rx="2" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        </svg>
      </div>
      {/* CCTV Camera - top right, bullet camera on wall bracket */}
      <div className="hero-deco hero-cctv">
        <svg viewBox="0 0 110 100" fill="none" width="95">
          {/* Wall bracket arm */}
          <rect x="80" y="10" width="14" height="50" rx="5" fill="rgba(255,255,255,0.45)"/>
          <rect x="74" y="8" width="26" height="10" rx="4" fill="rgba(255,255,255,0.55)"/>
          {/* Camera tilt bracket */}
          <rect x="72" y="52" width="20" height="14" rx="5" fill="rgba(255,255,255,0.5)"/>
          {/* Camera body - bullet style horizontal */}
          <rect x="8" y="48" width="72" height="26" rx="10" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"/>
          {/* Lens outer ring */}
          <circle cx="20" cy="61" r="12" fill="rgba(255,255,255,0.45)" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"/>
          {/* Lens inner */}
          <circle cx="20" cy="61" r="7" fill="rgba(255,255,255,0.5)"/>
          {/* Lens pupil */}
          <circle cx="20" cy="61" r="4" fill="rgba(150,70,0,0.9)"/>
          {/* Lens highlight */}
          <circle cx="18" cy="59" r="1.5" fill="rgba(255,255,255,0.6)"/>
          {/* IR LEDs */}
          <circle cx="44" cy="56" r="3" fill="rgba(255,100,100,0.7)"/>
          <circle cx="44" cy="66" r="3" fill="rgba(255,100,100,0.7)"/>
          <circle cx="52" cy="56" r="3" fill="rgba(255,100,100,0.7)"/>
          <circle cx="52" cy="66" r="3" fill="rgba(255,100,100,0.7)"/>
          {/* Status LED green */}
          <circle cx="68" cy="55" r="4" fill="rgba(60,220,80,0.95)"/>
          <circle cx="68" cy="55" r="7" fill="rgba(60,220,80,0.2)"/>
          {/* Bottom info bar */}
          <rect x="10" y="78" width="84" height="14" rx="6" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <circle cx="22" cy="85" r="3.5" fill="rgba(255,100,0,0.85)"/>
          <rect x="30" y="82" width="28" height="5" rx="2" fill="rgba(255,255,255,0.45)"/>
          <rect x="62" y="82" width="18" height="5" rx="2" fill="rgba(255,255,255,0.3)"/>
        </svg>
      </div>


      <div className="hero-inner">
        <div className="hero-text">
          <h1>Scalable AI & Automation<br />Systems for <span className="hero-highlight">Real-World Oprations</span></h1>
          <p>&quot;Reduce downtime, automate inspections, and improve project visibility.&quot;</p>
          <div className="hero-ctas">
            <button className="btn-hero">Get Your Proposal →</button>
            <button className="btn-hero-ghost">See Our Work →</button>
          </div>
        </div>

        <div className="hero-mockups">
          <div id="phone-wrap" className="hero-phone-wrap">
            <Image
              src="/images/phone.png"
              alt="Hompimpa Mobile"
              width={160}
              height={320}
              className="hero-phone-img"
            />
          </div>
          <div id="dash-wrap" className="hero-dash-wrap">
            <Image
              src="/images/dashboard.png"
              alt="Hompimpa Dashboard"
              width={720}
              height={480}
              className="hero-dash-img"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
