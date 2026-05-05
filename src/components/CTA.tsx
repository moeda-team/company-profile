import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <section className="s-cta" id="contact">
      <ScrollReveal className="cta-grid">
        <div className="cta-left">
          <h2 className="cta-h">
            Why Work With
            <br />
            Hompimpa?
          </h2>
          <p className="cta-p">
            &quot;We help businesses transform complex operations into efficient, automated systems—powered by AI, built
            for scale, and supported for the long run.&quot;
          </p>
        </div>
        <img className="cta-arrow" src="/images/others/arrow-ornament.jpg" alt="Arrow" />
        <div className="cta-right">
          <div className="cta-card">
            <img className="cta-shade" src="/images/others/shade-connect.png" alt="" />
            <h3 className="cta-card-title">Build Your Custom Business System Today</h3>
            <p className="cta-card-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
            <button className="btn-cta-connect">Let&apos;s Connect →</button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
