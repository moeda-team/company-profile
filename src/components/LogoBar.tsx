import ScrollReveal from "./ScrollReveal";

export default function LogoBar() {
  return (
    <ScrollReveal className="s-logos">
      <div className="logos-lbl">Trusted by industry leaders</div>
      <div className="logos-row">
        {["Collters","BOSCH","Honeywell","SIEMENS","CBRE","JLL"].map(n => (
          <span key={n} className="lg">{n}</span>
        ))}
      </div>
    </ScrollReveal>
  );
}
