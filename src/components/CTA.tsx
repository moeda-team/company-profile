import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <ScrollReveal className="s-cta">
      <div className="cta-glow" />
      <div className="cta-kicker">Start Today</div>
      <h2 className="cta-h">The platform your<br />operations deserve.</h2>
      <p className="cta-p">Join 500+ enterprise teams using Hompimpa to cut costs, ensure compliance, and maintain full visibility across every site.</p>
      <div className="cta-acts">
        <button className="btn-dark">Start Free Trial</button>
        <button className="btn-out">Schedule a Demo</button>
      </div>
      <div className="cta-fine">No credit card required · SOC 2 Type II · Enterprise plans available</div>
    </ScrollReveal>
  );
}
