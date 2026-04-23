"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const tabs = [
  { n:"01", title:"Real-time visibility", body:"Live dashboards across every facility — updated the moment anything changes on the ground." },
  { n:"02", title:"AI-driven alerting", body:"Machine learning detects patterns before problems — sending smart alerts to the right people instantly." },
  { n:"03", title:"Automated reporting", body:"Generate compliance reports and executive briefings automatically — zero manual effort required." },
  { n:"04", title:"Multi-site management", body:"Manage thousands of locations from one view — drill into any site, building, or device in seconds." },
];

export default function Product() {
  const [active, setActive] = useState(0);
  return (
    <section className="s-product">
      <ScrollReveal className="prod-grid">
        <div>
          <div className="kicker">Command Center</div>
          <h2 className="sh">One platform.<br />Every site.</h2>
          <div className="prod-tabs">
            {tabs.map((t, i) => (
              <div key={t.n} className={`ptab${i === active ? " on" : ""}`} onClick={() => setActive(i)}>
                <div className="ptn">{t.n}</div>
                <div><div className="ptitle">{t.title}</div><div className="pbody">{t.body}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="prod-vis rd2">
          <div className="pv-bar">
            <div className="pv-dots"><div className="pv-d" style={{background:"#FF5F57"}}/><div className="pv-d" style={{background:"#FEBC2E"}}/><div className="pv-d" style={{background:"#28C840"}}/></div>
            <div className="pv-url">app.hompimpa.io/command-center</div>
          </div>
          <div className="pv-body">
            <div className="pv-mets">
              <div className="pv-m"><div className="pv-ml">Facilities</div><div className="pv-mv">2,418</div><div className="pv-md">↑ 12.4%</div></div>
              <div className="pv-m"><div className="pv-ml">Sensors</div><div className="pv-mv">18.3K</div><div className="pv-md">↑ 8.1%</div></div>
              <div className="pv-m"><div className="pv-ml">Uptime</div><div className="pv-mv">98.7%</div><div className="pv-md" style={{color:"var(--o)"}}>→ stable</div></div>
              <div className="pv-m"><div className="pv-ml">Alerts</div><div className="pv-mv">3</div><div className="pv-md" style={{color:"#DC2626"}}>↑ 1 new</div></div>
            </div>
            <div className="pv-chart">
              <div className="pv-ch"><div className="pv-ct">30-Day Trend</div><span style={{fontSize:10.5,color:"var(--g5)"}}>Apr 2026</span></div>
              <svg width="100%" height="110" viewBox="0 0 560 110" preserveAspectRatio="none">
                <defs><linearGradient id="pvf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF6A00" stopOpacity=".18"/><stop offset="100%" stopColor="#FF6A00" stopOpacity="0"/></linearGradient></defs>
                <line x1="0" y1="27" x2="560" y2="27" stroke="#F0EEE9" strokeWidth="1"/>
                <line x1="0" y1="54" x2="560" y2="54" stroke="#F0EEE9" strokeWidth="1"/>
                <line x1="0" y1="81" x2="560" y2="81" stroke="#F0EEE9" strokeWidth="1"/>
                <polygon points="0,84 37,72 75,78 112,62 150,70 187,52 225,60 262,44 300,52 337,36 375,44 412,28 450,36 487,20 525,28 560,22 560,107 0,107" fill="url(#pvf)"/>
                <polyline points="0,84 37,72 75,78 112,62 150,70 187,52 225,60 262,44 300,52 337,36 375,44 412,28 450,36 487,20 525,28 560,22" fill="none" stroke="#FF6A00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="0,98 75,90 150,94 225,84 300,90 375,76 450,82 525,70 560,74" fill="none" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity=".45"/>
                <circle cx="560" cy="22" r="4" fill="#FF6A00"/>
              </svg>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
