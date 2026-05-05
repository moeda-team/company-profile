"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let cW = 0,
      cH = 0,
      raf = 0;

    const PARTICLES = Array.from({ length: 50 }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1000,
      r: Math.random() * 2 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.12 + 0.02,
    }));

    function resize() {
      cW = canvas!.width = window.innerWidth;
      cH = canvas!.height = document.getElementById("hero")?.offsetHeight ?? window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, cW, cH);
      PARTICLES.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = cW + 10;
        if (p.x > cW + 10) p.x = -10;
        if (p.y < -10) p.y = cH + 10;
        if (p.y > cH + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas id="hero-canvas" ref={canvasRef} />

      {/* Decorative floating 3D boxes */}
      <div className="hero-deco hero-box-1">
        <svg viewBox="0 0 60 60" fill="none" width="52">
          <rect
            x="10"
            y="20"
            width="40"
            height="30"
            rx="4"
            fill="rgba(255,255,255,0.25)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
          />
          <rect
            x="10"
            y="15"
            width="40"
            height="8"
            rx="2"
            fill="rgba(255,255,255,0.35)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
          />
          <rect
            x="22"
            y="5"
            width="26"
            height="20"
            rx="2"
            fill="rgba(255,255,255,0.2)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="hero-deco hero-box-2">
        <svg viewBox="0 0 50 50" fill="none" width="42">
          <rect
            x="8"
            y="18"
            width="34"
            height="24"
            rx="4"
            fill="rgba(255,255,255,0.2)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
          />
          <rect
            x="18"
            y="8"
            width="24"
            height="14"
            rx="2"
            fill="rgba(255,255,255,0.28)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
          />
        </svg>
      </div>
      {/* CCTV Camera - top right */}
      <div className="hero-deco hero-cctv">
        <Image src="/images/others/cctv.png" alt="CCTV Camera" width={200} height={180} />
      </div>
      {/* Drone - middle left */}
      <div className="hero-deco hero-drone">
        <Image src="/images/others/drone.png" alt="Drone" width={400} height={380} />
      </div>

      <div className="hero-inner">
        <div className="hero-text">
          <h1>
            Scalable AI & Automation
            <br />
            Systems for <span className="hero-highlight">Real-World Operations</span>
          </h1>
          <p>&quot;Reduce downtime, automate inspections, and improve project visibility.&quot;</p>
          <div className="hero-ctas">
            <button className="btn-hero">Get Your Proposal &gt;</button>
            <button className="btn-hero-ghost">See Our Work &gt;</button>
          </div>
        </div>

        <div className="hero-mockups">
          <Image
            src="/images/contents/hero.png"
            alt="Hompimpa Platform"
            width={1300}
            height={900}
            className="hero-img"
            priority
          />
        </div>
      </div>
    </section>
  );
}
