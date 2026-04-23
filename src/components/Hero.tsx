"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let cW = 0, cH = 0, t = 0, raf = 0;

    const PARTICLES = Array.from({ length: 100 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 1000,
      r: Math.random() * 2.2 + 0.4,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .22,
      a: Math.random() * .18 + .03,
    }));

    function resize() {
      cW = canvas!.width = window.innerWidth;
      cH = canvas!.height = document.getElementById("hero")?.offsetHeight ?? window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, cW, cH);
      t += .004;
      const g1 = ctx.createRadialGradient(cW*.65, cH*.4, 0, cW*.65, cH*.4, cW*.55);
      g1.addColorStop(0, "rgba(255,160,80,0.07)"); g1.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, cW, cH);
      const g2 = ctx.createRadialGradient(cW*.2, cH*.7, 0, cW*.2, cH*.7, cW*.4);
      g2.addColorStop(0, "rgba(255,140,60,0.04)"); g2.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, cW, cH);

      [
        { sx:-cW*.1, sy:cH*.2, cp1x:cW*.25, cp1y:cH*.05, cp2x:cW*.5, cp2y:cH*.55, ex:cW*.85, ey:cH*.3, op:`rgba(255,106,0,${.055+Math.sin(t)*.015})`, lw:1.5 },
        { sx:-cW*.05, sy:cH*.35, cp1x:cW*.3, cp1y:cH*.12+Math.sin(t*.7)*8, cp2x:cW*.55, cp2y:cH*.62, ex:cW*.9, ey:cH*.38, op:`rgba(255,130,0,${.038+Math.cos(t*.8)*.01})`, lw:1.2 },
        { sx:-cW*.15, sy:cH*.55, cp1x:cW*.2, cp1y:cH*.35+Math.sin(t*.6)*10, cp2x:cW*.6, cp2y:cH*.75, ex:cW*.95, ey:cH*.5, op:`rgba(255,180,100,${.03+Math.sin(t*1.1)*.008})`, lw:1 },
      ].forEach(c => {
        ctx.beginPath(); ctx.moveTo(c.sx, c.sy);
        ctx.bezierCurveTo(c.cp1x, c.cp1y, c.cp2x, c.cp2y, c.ex, c.ey);
        ctx.strokeStyle = c.op; ctx.lineWidth = c.lw; ctx.stroke();
      });

      PARTICLES.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = cW + 10; if (p.x > cW + 10) p.x = -10;
        if (p.y < -10) p.y = cH + 10; if (p.y > cH + 10) p.y = -10;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,106,0,${p.a})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    const parallaxEls = [
      { el: document.getElementById("dash-wrap"), floatAmp: 6, floatFreq: 1, phase: 0, speed: 0.10 },
      { el: document.getElementById("phone-wrap"), floatAmp: 10, floatFreq: 1.2, phase: 1.5, speed: 0.22 },
      { el: document.getElementById("robot-wrap"), floatAmp: 8, floatFreq: 0.9, phase: 0.8, speed: 0.18 },
      { el: document.getElementById("cctv-wrap"), floatAmp: 5, floatFreq: 0.7, phase: 2.1, speed: 0.06 },
      { el: document.getElementById("report-card"), floatAmp: 7, floatFreq: 1.1, phase: 3.2, speed: 0.14 },
      { el: document.getElementById("stack-wrap"), floatAmp: 4, floatFreq: 1.3, phase: 1.0, speed: 0.08 },
      { el: document.getElementById("orb-wrap"), floatAmp: 12, floatFreq: 1.4, phase: 0.5, speed: 0.20 },
    ];
    let scrollY = 0, animT = 0, raf2 = 0, raf3 = 0;
    let lmx = window.innerWidth / 2, lmy = window.innerHeight / 2;
    const onScroll = () => { scrollY = window.scrollY; };
    const onMove = (e: MouseEvent) => { lmx = e.clientX; lmy = e.clientY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousemove", onMove);

    const dashEl = document.getElementById("dash-wrap");
    function animLoop() {
      animT += 0.012;
      parallaxEls.forEach(item => {
        if (!item.el) return;
        const floatY = Math.sin(animT * item.floatFreq + item.phase) * item.floatAmp;
        item.el.style.transform = `translateY(calc(${floatY}px + ${scrollY * item.speed}px))`;
      });
      raf2 = requestAnimationFrame(animLoop);
    }
    function tiltLoop() {
      if (scrollY < window.innerHeight * .8 && dashEl) {
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        const dx = (lmx - cx) / cx, dy = (lmy - cy) / cy;
        const floatY = Math.sin(animT * 1 + 0) * 6;
        dashEl.style.transform = `translate(-50%,-50%) translateY(calc(${floatY}px + ${scrollY * 0.10}px)) perspective(1100px) rotateY(${dx * 3}deg) rotateX(${-dy * 1.8}deg)`;
      }
      raf3 = requestAnimationFrame(tiltLoop);
    }
    animLoop(); tiltLoop();

    const dots = document.querySelectorAll<HTMLElement>(".sdot");
    let di = 0;
    const dotInterval = setInterval(() => {
      dots.forEach(d => d.classList.remove("on"));
      di = (di + 1) % dots.length;
      dots[di].classList.add("on");
    }, 2400);

    return () => {
      cancelAnimationFrame(raf2); cancelAnimationFrame(raf3);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMove);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas id="hero-canvas" ref={canvasRef} />
      <div className="hero-text">
        <h1>Smart Facility Management<br />Solutions Powered by AI</h1>
        <p>Monitor, analyze, and optimize your facilities in real-time with Hompimpa&apos;s advanced AI dashboard.</p>
        <div className="hero-ctas">
          <button className="btn-hero">Get Started</button>
        </div>
        <div className="slide-dots">
          <div className="sdot on" /><div className="sdot" /><div className="sdot" /><div className="sdot" />
        </div>
      </div>

      <div className="hero-stage">
        {/* Robot */}
        <div id="robot-wrap">
          <svg viewBox="0 0 110 140" fill="none">
            <ellipse cx="55" cy="105" rx="28" ry="10" fill="rgba(255,106,0,0.08)"/>
            <rect x="38" y="110" width="10" height="18" rx="5" fill="#E8E0D5"/><rect x="62" y="110" width="10" height="18" rx="5" fill="#E8E0D5"/>
            <rect x="36" y="125" width="14" height="7" rx="3.5" fill="#D5CFC8"/><rect x="60" y="125" width="14" height="7" rx="3.5" fill="#D5CFC8"/>
            <rect x="28" y="70" width="54" height="44" rx="14" fill="white" stroke="#E8E0D5" strokeWidth="1.5"/>
            <rect x="36" y="78" width="38" height="26" rx="7" fill="#FFF4EC"/>
            <polyline points="40,96 46,88 52,92 58,82 64,87 70,80" fill="none" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="8" y="72" width="20" height="10" rx="5" fill="#E8E0D5"/>
            <ellipse cx="8" cy="77" rx="7" ry="7" fill="#F0EAE2" stroke="#E8E0D5" strokeWidth="1"/>
            <ellipse cx="6" cy="77" rx="3" ry="3" fill="#D5CFC8"/>
            <rect x="82" y="72" width="20" height="10" rx="5" fill="#E8E0D5"/>
            <ellipse cx="102" cy="77" rx="7" ry="7" fill="#F0EAE2" stroke="#E8E0D5" strokeWidth="1"/>
            <rect x="47" y="58" width="16" height="14" rx="6" fill="#E8E0D5"/>
            <rect x="22" y="20" width="66" height="52" rx="20" fill="white" stroke="#E8E0D5" strokeWidth="1.5"/>
            <rect x="28" y="26" width="54" height="40" rx="14" fill="#FFF8F3"/>
            <ellipse cx="42" cy="42" rx="9" ry="9" fill="white" stroke="#E8E0D5" strokeWidth="1"/>
            <ellipse cx="68" cy="42" rx="9" ry="9" fill="white" stroke="#E8E0D5" strokeWidth="1"/>
            <ellipse cx="42" cy="42" rx="5" ry="5" fill="#FF6A00"/><ellipse cx="68" cy="42" rx="5" ry="5" fill="#FF6A00"/>
            <ellipse cx="44" cy="40" rx="2" ry="2" fill="white" opacity=".7"/><ellipse cx="70" cy="40" rx="2" ry="2" fill="white" opacity=".7"/>
            <line x1="55" y1="20" x2="55" y2="6" stroke="#E8E0D5" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="55" cy="4" r="4" fill="#FF6A00" opacity=".8"/><circle cx="55" cy="4" r="2" fill="#FF6A00"/>
            <circle cx="22" cy="44" r="4" fill="#E8E0D5"/><circle cx="88" cy="44" r="4" fill="#E8E0D5"/>
            <path d="M44 54 Q55 60 66 54" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".5"/>
            <rect x="90" y="70" width="14" height="16" rx="4" fill="#FFF4EC" stroke="#E8E0D5" strokeWidth="1"/>
            <path d="M104 75 Q108 75 108 79 Q108 83 104 83" stroke="#E8E0D5" strokeWidth="1" fill="none"/>
            <rect x="92" y="67" width="10" height="4" rx="2" fill="#E8E0D5"/>
          </svg>
        </div>

        {/* CCTV */}
        <div id="cctv-wrap">
          <svg viewBox="0 0 96 80" fill="none">
            <rect x="38" y="0" width="20" height="18" rx="5" fill="#E8E0D5"/>
            <rect x="42" y="14" width="12" height="28" rx="4" fill="#D5CFC8"/>
            <rect x="14" y="32" width="60" height="28" rx="10" fill="white" stroke="#E8E0D5" strokeWidth="1.5"/>
            <ellipse cx="26" cy="46" rx="11" ry="11" fill="#F0EAE2" stroke="#E8E0D5" strokeWidth="1.5"/>
            <ellipse cx="26" cy="46" rx="7" ry="7" fill="#E8E0D5"/>
            <ellipse cx="26" cy="46" rx="4" ry="4" fill="#1A1816"/>
            <ellipse cx="24.5" cy="44.5" rx="1.5" ry="1.5" fill="white" opacity=".6"/>
            <rect x="40" y="40" width="22" height="4" rx="2" fill="#F0EAE2"/>
            <rect x="40" y="48" width="16" height="4" rx="2" fill="#F0EAE2"/>
            <circle cx="68" cy="42" r="3" fill="#22C55E" opacity=".8"/>
            <circle cx="68" cy="42" r="5" fill="rgba(34,197,94,.15)"/>
            <rect x="40" y="56" width="28" height="6" rx="3" fill="rgba(255,106,0,.1)"/>
            <rect x="16" y="64" width="64" height="12" rx="6" fill="#FFF4EC" stroke="rgba(255,106,0,.2)" strokeWidth="1"/>
            <circle cx="26" cy="70" r="3" fill="#FF6A00" opacity=".8"/>
            <rect x="32" y="68" width="24" height="4" rx="2" fill="#F0EAE2"/>
            <rect x="58" y="68" width="16" height="4" rx="2" fill="#F0EAE2" opacity=".5"/>
          </svg>
        </div>

        {/* Dashboard */}
        <div id="dash-wrap">
          <div className="dash-trail2" /><div className="dash-trail1" />
          <div className="dash-shell">
            <div className="dash-bar">
              <div className="db-l">
                <div className="dots"><div className="dot dot-r"/><div className="dot dot-y"/><div className="dot dot-g"/></div>
                <span className="db-title">Dashboard</span>
              </div>
              <div className="db-l">
                <div className="db-logo">
                  <svg className="db-logo-gem" viewBox="0 0 16 16" fill="none"><polygon points="8,1 15,5 15,11 8,15 1,11 1,5" fill="rgba(255,106,0,.15)" stroke="#FF6A00" strokeWidth="1"/><polygon points="8,4 12,6.5 12,9.5 8,12 4,9.5 4,6.5" fill="#FF6A00" opacity=".6"/></svg>
                  <span className="db-logo-name">Hompimpa</span>
                </div>
              </div>
              <div className="db-status"><div className="db-sdot"/>Live</div>
            </div>
            <div className="db-layout">
              <div className="db-nav">
                <div className="dbn-grp">
                  <div className="dbn-lbl">Main</div>
                  <div className="dbn-item on"><svg className="dbn-icon" viewBox="0 0 13 13" fill="none"><rect x=".5" y=".5" width="5" height="5" rx="1" fill="#FF6A00"/><rect x="7.5" y=".5" width="5" height="5" rx="1" fill="#FF6A00"/><rect x=".5" y="7.5" width="5" height="5" rx="1" fill="#FF6A00"/><rect x="7.5" y="7.5" width="5" height="5" rx="1" fill="#FF6A00"/></svg>Overview</div>
                  <div className="dbn-item"><svg className="dbn-icon" viewBox="0 0 13 13" fill="none"><path d="M1 10L3.5 6.5l3 3 3-5 2.5 3.5" stroke="#8A8880" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>Dashboards</div>
                  <div className="dbn-item"><svg className="dbn-icon" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="11" height="11" rx="2" stroke="#8A8880" strokeWidth="1.1"/><path d="M3.5 7h6M3.5 5h4" stroke="#8A8880" strokeWidth="1" strokeLinecap="round"/></svg>Projects</div>
                  <div className="dbn-item"><svg className="dbn-icon" viewBox="0 0 13 13" fill="none"><path d="M2 10.5L6.5 2 11 10.5H2z" stroke="#8A8880" strokeWidth="1" strokeLinejoin="round"/></svg>Activities</div>
                </div>
                <div className="dbn-grp">
                  <div className="dbn-lbl">Monitor</div>
                  <div className="dbn-item"><svg className="dbn-icon" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#8A8880" strokeWidth="1.1"/><circle cx="6.5" cy="6.5" r="2" fill="#8A8880"/></svg>Analytics</div>
                </div>
              </div>
              <div className="db-main">
                <div className="db-kpis">
                  <div className="kpi">
                    <div className="kpi-l">System Status</div>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginTop:3}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:"#22C55E",boxShadow:"0 0 0 3px rgba(34,197,94,.15)",flexShrink:0}}/>
                      <span style={{fontFamily:"var(--font-bricolage),sans-serif",fontSize:12,fontWeight:800,color:"var(--ink)"}}>Operational</span>
                    </div>
                    <div className="kpi-d">↑ 99.8% uptime</div>
                  </div>
                  <div className="kpi"><div className="kpi-l">Active Projects</div><div className="kpi-v">24</div><div className="kpi-d">↑ 3 this week</div></div>
                  <div className="kpi"><div className="kpi-l">AI Insights</div><div className="kpi-v">59<span style={{fontSize:11,fontWeight:400,color:"var(--g5)"}}>%</span></div><div className="kpi-d warn">+2 pts</div></div>
                </div>
                <div className="db-chart">
                  <div className="dbc-h">
                    <div className="dbc-t">Performance Overview</div>
                    <div className="dbc-tabs"><button className="dbtab on">7D</button><button className="dbtab">30D</button><button className="dbtab">90D</button></div>
                  </div>
                  <svg width="100%" height="72" viewBox="0 0 420 72" preserveAspectRatio="none">
                    <defs><linearGradient id="cf1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF6A00" stopOpacity=".18"/><stop offset="100%" stopColor="#FF6A00" stopOpacity="0"/></linearGradient></defs>
                    <line x1="0" y1="18" x2="420" y2="18" stroke="#F0EEE9" strokeWidth="1"/>
                    <line x1="0" y1="36" x2="420" y2="36" stroke="#F0EEE9" strokeWidth="1"/>
                    <line x1="0" y1="54" x2="420" y2="54" stroke="#F0EEE9" strokeWidth="1"/>
                    <polygon points="0,54 50,44 100,50 160,34 210,42 270,24 330,32 390,16 420,20 420,68 0,68" fill="url(#cf1)"/>
                    <polyline points="0,54 50,44 100,50 160,34 210,42 270,24 330,32 390,16 420,20" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="420" cy="20" r="4" fill="#FF6A00"/>
                  </svg>
                </div>
                <div className="db-activity">
                  <div className="dba-h">Recent Activities</div>
                  <div className="dba-list">
                    <div className="dba-r"><div className="dba-ico ico-g"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.3 2.3 5-5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/></svg></div><div><div className="dba-t">Inspection #11323 Completed</div><div className="dba-time">3 min ago</div></div></div>
                    <div className="dba-r"><div className="dba-ico ico-o"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 2L10 9H1L5.5 2z" stroke="#FF6A00" strokeWidth="1.1"/><path d="M5.5 5v2" stroke="#FF6A00" strokeWidth="1.1" strokeLinecap="round"/></svg></div><div><div className="dba-t">Alert Detected</div><div className="dba-time">8 min ago</div></div></div>
                    <div className="dba-r"><div className="dba-ico ico-b"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#1D4ED8" strokeWidth="1.1"/><path d="M5.5 5v2" stroke="#1D4ED8" strokeWidth="1.1" strokeLinecap="round"/></svg></div><div><div className="dba-t">EventCounter Alert</div><div className="dba-time">15 min ago</div></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div id="phone-wrap">
          <div className="phone-shell">
            <div className="phone-inner">
              <div className="phone-bar"><div className="phone-notch"/></div>
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="phone-logo">Hompimpa</div>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="#E2DFDA" strokeWidth="1"/><path d="M5 3v2l1.5 1.5" stroke="#8A8880" strokeWidth=".8" strokeLinecap="round"/></svg>
                </div>
                <div className="phone-lbl">Active monitors</div>
                <div className="phone-stat">35<sup>+0</sup></div>
                <div className="phone-sublbl">Active monitors</div>
                <div className="phone-bars">
                  {[{h:12,o:.3},{h:18,o:.5},{h:14,o:.4},{h:24,o:.8},{h:20,o:.6},{h:28,o:1},{h:22,o:.7},{h:16,o:.5}].map((b,i)=>(
                    <div key={i} className="pb" style={{height:b.h,background:"#FF6A00",opacity:b.o}}/>
                  ))}
                </div>
                <div style={{marginTop:5,display:"flex",flexDirection:"column",gap:3}}>
                  <div style={{height:6,background:"var(--g2)",borderRadius:3,width:"90%"}}/>
                  <div style={{height:6,background:"var(--g2)",borderRadius:3,width:"70%"}}/>
                  <div style={{height:6,background:"var(--g2)",borderRadius:3,width:"80%"}}/>
                </div>
                <div className="phone-nav">
                  <div className="pnav-ico on"/><div className="pnav-ico"/><div className="pnav-ico"/><div className="pnav-ico"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Card */}
        <div id="report-card">
          <div className="rc-row">
            <div className="rc-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="2" stroke="#FF6A00" strokeWidth="1.2"/><path d="M5 5h6M5 8h6M5 11h4" stroke="#FF6A00" strokeWidth="1.2" strokeLinecap="round"/></svg></div>
            <div><div className="rc-title">Report Generated</div><div className="rc-sub">Q2 Operations · All Sites</div></div>
          </div>
          <div className="rc-time">5 min ago</div>
        </div>

        {/* Stack */}
        <div id="stack-wrap">
          <svg viewBox="0 0 72 56" fill="none">
            <ellipse cx="36" cy="46" rx="28" ry="8" fill="#FFD4B0" opacity=".4"/>
            <ellipse cx="36" cy="36" rx="28" ry="8" fill="#FFB87A" opacity=".5"/>
            <rect x="8" y="28" width="56" height="16" rx="2" fill="#FFA050" opacity=".7"/>
            <ellipse cx="36" cy="28" rx="28" ry="8" fill="#FF8C38"/>
            <ellipse cx="36" cy="24" rx="28" ry="8" fill="#FFB87A" opacity=".8"/>
            <rect x="8" y="16" width="56" height="16" rx="2" fill="#FF9020" opacity=".6"/>
            <ellipse cx="36" cy="16" rx="28" ry="8" fill="#FF6A00"/>
            <ellipse cx="36" cy="12" rx="28" ry="8" fill="#FF8C38"/>
            <ellipse cx="36" cy="4" rx="28" ry="8" fill="#FFAE60"/>
          </svg>
        </div>

        {/* Orb */}
        <div id="orb-wrap">
          <svg viewBox="0 0 32 32" fill="none">
            <defs><radialGradient id="og" cx="35%" cy="30%"><stop offset="0%" stopColor="#FFB87A"/><stop offset="100%" stopColor="#FF6A00"/></radialGradient></defs>
            <circle cx="16" cy="16" r="15" fill="url(#og)" opacity=".7"/>
            <ellipse cx="12" cy="12" rx="5" ry="3" fill="white" opacity=".3"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
