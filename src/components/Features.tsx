import ScrollReveal from "./ScrollReveal";

const features = [
  { n:"01", title:"Automated Monitoring", body:"24/7 continuous surveillance across all sites with threshold-based alerting and AI-powered anomaly detection.", icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="7.5" stroke="#FF6A00" strokeWidth="1.4"/><path d="M11 7.5v3.5l2.5 2" stroke="#FF6A00" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { n:"02", title:"Data Analytics", body:"AI models surface actionable insights from operational data, enabling proactive maintenance before issues arise.", icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 16l4-7.5 4 5 4-9.5 4 6" stroke="#FF6A00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { n:"03", title:"Smart Integration", body:"Bi-directional API sync with existing BMS, ERP, and CMMS systems — plus 200+ pre-built connectors.", icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="6.5" height="6.5" rx="1.5" stroke="#FF6A00" strokeWidth="1.4"/><rect x="12.5" y="3" width="6.5" height="6.5" rx="1.5" stroke="#FF6A00" strokeWidth="1.4"/><rect x="3" y="12.5" width="6.5" height="6.5" rx="1.5" stroke="#FF6A00" strokeWidth="1.4"/><path d="M15.75 12.5v6.5M12.5 15.75h6.5" stroke="#FF6A00" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { n:"04", title:"Secure Alerts", body:"End-to-end encryption, role-based access, and full audit trails — meeting all enterprise and regulatory standards.", icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2.5L4 7v5.5c0 3.8 2.9 7.4 7 8.5 4.1-1.1 7-4.7 7-8.5V7L11 2.5z" stroke="#FF6A00" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 11l2 2 4-4" stroke="#FF6A00" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { n:"05", title:"AI Inspection Engine", body:"Computer vision-assisted inspection workflows auto-log findings, score compliance, and generate reports instantly.", icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="9" cy="7" r="3" stroke="#FF6A00" strokeWidth="1.4"/><path d="M3 19c0-3.3 2.7-6 6-6" stroke="#FF6A00" strokeWidth="1.4" strokeLinecap="round"/><path d="M14 13l2 2 4-4" stroke="#FF6A00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { n:"06", title:"IoT Device Registry", body:"Manage thousands of sensors — firmware updates, health diagnostics, and geo-tracking in one unified view.", icon:<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="5" width="18" height="13" rx="2" stroke="#FF6A00" strokeWidth="1.4"/><path d="M7 2l-2 3M15 2l2 3" stroke="#FF6A00" strokeWidth="1.4" strokeLinecap="round"/><path d="M7 11h8M7 14h5" stroke="#FF6A00" strokeWidth="1.1" strokeLinecap="round"/></svg> },
];

export default function Features() {
  return (
    <section className="s-features">
      <ScrollReveal className="s-intro">
        <div>
          <div className="kicker">Platform Capabilities</div>
          <h2 className="sh">Built for real-world<br />operations at scale.</h2>
        </div>
        <p className="sp">Every feature engineered around enterprise facility complexity — where uptime, compliance, and intelligence aren&apos;t optional. They&apos;re the baseline.</p>
      </ScrollReveal>
      <ScrollReveal className="f-grid">
        {features.map(f => (
          <div key={f.n} className="feat">
            <div className="feat-bar" />
            <div className="fn">{f.n}</div>
            <div className="fi">{f.icon}</div>
            <div className="ft">{f.title}</div>
            <p className="fb">{f.body}</p>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}
