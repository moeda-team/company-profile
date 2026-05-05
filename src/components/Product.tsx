"use client";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "EMPATRIMA",
    description: "An educational quiz game for schools, communities, and corporate teams.",
    image: "/images/contents/empatrima.png",
    tag: "Education",
  },
  {
    title: "POS - Moeda",
    description: "A point of sale system built for small to medium restaurants and cafes.",
    image: "/images/contents/pos.png",
    tag: "Retail",
  },
];

export default function Product() {
  return (
    <section className="s-product" id="portfolio">
      <ScrollReveal>
        <div className="product-header">
          <h2 className="sh">
            Our <span className="text-highlight">Project</span>
          </h2>
          <p className="sp">
            &quot;We build integrated systems that simplify complex processes, enhance productivity, and create smooth,
            reliable experiences for both businesses and users.&quot;
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="projects-grid">
        {projects.map((p, i) => (
          <div key={i} className="project-card">
            <div className="project-image-wrap">
              <Image src={p.image} alt={p.title} width={600} height={500} className="project-image" />
              <div className="project-tag">{p.tag}</div>
            </div>
            <div className="project-info">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              <button className="project-btn">Read More →</button>
            </div>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}
