import { projects, projectUrl } from "./projects";
import { renderSiteFooter } from "./footer";
import "./style.css";
import "./work-detail.css";

const baseUrl = import.meta.env.BASE_URL;
const basePath = baseUrl.replace(/\/$/, "");
const slug = window.location.pathname.slice(basePath.length).match(/^\/work\/([^/]+)\/?$/)?.[1];
const projectIndex = projects.findIndex((project) => project.slug === slug);
const project = projects[projectIndex];
const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("App root not found");

if (!project) {
  document.title = "Work not found | Nodeworks";
  app.innerHTML = `<main class="detail-not-found"><a class="detail-wordmark" href="${baseUrl}"><img src="${baseUrl}nodeworks-mark.svg" alt="" width="40" height="40" />Nodeworks</a><p>404 / Work</p><h1>Project not found.</h1><a class="detail-button" href="${baseUrl}#work">Back to selected works <span aria-hidden="true">↗</span></a></main>`;
} else {
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const titleWords = project.title.split(" ");
  const accentWord = titleWords.pop();
  const headingStart = titleWords.join(" ");
  const accessBadge = `<span class="detail-access-badge detail-access-${project.access.status}">${project.access.status.toUpperCase()}</span>`;
  const productLink = project.access.status === "public"
    ? `<a class="detail-button detail-button-primary" href="${project.access.url}" target="_blank" rel="noopener noreferrer">Open product <span aria-hidden="true">↗</span></a>`
    : "";
  const privateNote = `<span class="detail-private-note">Internal product, not publicly accessible.</span>`;
  document.title = `${project.title} | Nodeworks`;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", project.description);
  app.innerHTML = `
    <div class="detail-page">
      <header class="detail-header container">
        <a class="detail-wordmark" href="${baseUrl}" aria-label="Nodeworks home"><img src="${baseUrl}nodeworks-mark.svg" alt="" width="40" height="40" />Nodeworks</a>
        <nav aria-label="Work navigation"><a href="${baseUrl}#work">All works</a><a href="${baseUrl}#services">Services</a><a href="${baseUrl}#about">About</a><a class="detail-nav-cta" href="${baseUrl}#contact">Start a project <span aria-hidden="true">↗</span></a></nav>
      </header>

      <main>
        <section class="detail-hero container" aria-labelledby="detail-title">
          <a class="detail-back" href="${baseUrl}#work"><span aria-hidden="true">←</span> Back to selected works</a>
          <div class="detail-hero-grid">
            <div class="detail-hero-copy">
              <p class="detail-project-tag">Selected work ${project.number} · ${project.category}</p>
              <h1 id="detail-title">${headingStart} <em>${accentWord}</em></h1>
              <p class="detail-lead">${project.description}</p>
              <div class="detail-hero-actions">${project.access.status === "public" ? productLink : `<div class="detail-private-access">${accessBadge}${privateNote}</div>`}<a class="detail-button detail-button-outline" href="${baseUrl}#contact">Start a conversation <span aria-hidden="true">↗</span></a></div>
            </div>
            <figure class="detail-hero-visual"><img src="${baseUrl}images/work/${project.image}" width="1320" height="760" alt="Preview ${project.title}" /></figure>
          </div>
        </section>

        <div class="detail-facts container" aria-label="Project details">
          <div><span class="detail-fact-label">Project</span><strong>${project.number} / 05</strong></div>
          <div><span class="detail-fact-label">Category</span><strong>${project.category}</strong></div>
          <div><span class="detail-fact-label">Focus areas</span><strong>${String(project.focus.length).padStart(2, "0")} core areas</strong></div>
          <div><span class="detail-fact-label">Solution</span><strong>Digital platform</strong></div>
          <div><span class="detail-fact-label">Access</span>${accessBadge}</div>
        </div>

        <section class="detail-story container" aria-labelledby="detail-overview-title">
          <div class="detail-section-label">01 / Overview</div>
          <div class="detail-story-grid">
            <h2 id="detail-overview-title">Built around<br /><em>real work.</em></h2>
            <div><p>${project.overview}</p></div>
          </div>
        </section>

        <section class="detail-problem container" aria-labelledby="detail-problem-title">
          <div class="detail-section-label">02 / The problem</div>
          <h2 id="detail-problem-title">From scattered to<br /><em>connected.</em></h2>
          <div class="detail-problem-grid"><div class="detail-problem-card"><span>The challenge</span><p>${project.challenge}</p></div><div class="detail-problem-card"><span>The approach</span><p>${project.approach}</p></div></div>
        </section>

        <section class="detail-focus" aria-labelledby="detail-focus-title">
          <div class="container">
            <div class="detail-section-label">03 / Focus areas</div>
            <h2 id="detail-focus-title">What the system<br />brings together.</h2>
            <div class="detail-focus-list">${project.focus.map((item, index) => `<div><span>0${index + 1}</span><h3>${item}</h3></div>`).join("")}</div>
          </div>
        </section>

        <section class="detail-system container" id="system" aria-labelledby="detail-system-title">
          <div class="detail-section-label">04 / The system</div>
          <div class="detail-system-heading"><h2 id="detail-system-title">Inside the <em>workspace.</em></h2><div class="detail-system-access">${accessBadge}${project.access.status === "public" ? productLink : privateNote}</div></div>
          <div class="detail-gallery">${Array.from({ length: 6 }, (_, index) => `<figure class="detail-gallery-item"><div class="detail-gallery-frame"><span>Screen preview ${String(index + 1).padStart(2, "0")}</span></div><figcaption>${project.focus[index % project.focus.length]}</figcaption></figure>`).join("")}</div>
        </section>

        <section class="detail-next container" aria-labelledby="detail-next-title">
          <div class="detail-section-label">Explore more</div>
          <a class="detail-next-card" href="${projectUrl(nextProject)}">
            <div><p>Next project / ${nextProject.number}</p><h2 id="detail-next-title">${nextProject.title}</h2><span>View project ↗</span></div>
            <img src="${baseUrl}images/work/${nextProject.image}" width="1320" height="760" loading="lazy" alt="" />
          </a>
        </section>

        <section class="detail-contact"><div class="container"><div><p>Have a project in mind?</p><h2>Let’s build <br/>what’s next.</h2></div><a href="${baseUrl}#contact">Start a conversation  <span aria-hidden="true">↗</span></a></div></section>
      </main>
      ${renderSiteFooter(baseUrl)}
    </div>`;
}
