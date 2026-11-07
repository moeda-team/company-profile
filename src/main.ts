import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { whenScrollIdle } from "./scroll-idle";
import { renderSiteFooter } from "./footer";
import { getLocale, languageSwitch, localizeDOM, mountLanguageSwitch, t } from './i18n';
import { mountThemeToggle, themeToggle } from './theme';
import { projects as projectDetails } from './projects';
import "./style.css";
import "./theme.css";
import {
  getAvailableSlots,
  submitContact,
  type AvailableSlot,
} from "./contact-api";

gsap.registerPlugin(ScrollTrigger);

const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11"/></svg>`;

const showcaseProjects = [
  {
    number: "00.01",
    title: "LowkeyThings",
    category: "Event Platform",
    image: "lowkeythings-catalog.png",
    slug: "lowkeythings",
    description: projectDetails[0].description,
  },
  {
    number: "00.02",
    title: "PapanClip",
    category: "Collaborative Project Management",
    image: "papanclip.webp",
    slug: "papanclip",
    description: projectDetails[1].description,
  },
  {
    number: "00.03",
    title: "SPRIN RUN 2027",
    category: "Charity Run Experience",
    image: "sprin-run-home.png",
    slug: "sprin-run",
    description: projectDetails[2].description,
  },
  {
    number: "00.04",
    title: "Dagora",
    category: "Connected Retail Operations",
    image: "dagora-login.png",
    slug: "chandradimuka",
    description: projectDetails[3].description,
  },
  {
    number: "00.05",
    title: "Momentoku",
    category: "Shared Event Memories",
    image: "momentoku-home.png",
    slug: "momentoku",
    description: projectDetails[4].description,
  },
  {
    number: "00.06",
    title: "Empatrima",
    category: "Live Interactive Quiz",
    image: "empatrima-lobby.png",
    slug: "empatrima",
    description: projectDetails[5].description,
  },
] as const;

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("App root not found");

app.innerHTML = `
  <div class="site-shell">
    <div class="scroll-progress" aria-hidden="true"></div>

    <header class="site-header">
      <a class="wordmark" href="#top" aria-label="Nodeworks home"><span class="wordmark-icon" aria-hidden="true"><svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="14" cy="14" r="2.4" fill="currentColor"/><path d="M14 4v6M14 18v6M5.3 9l5.2 3M17.5 16l5.2 3M5.3 19l5.2-3M17.5 12l5.2-3"/><circle cx="14" cy="4" r="1.6" fill="currentColor"/><circle cx="14" cy="24" r="1.6" fill="currentColor"/><circle cx="5.3" cy="9" r="1.6" fill="currentColor"/><circle cx="22.7" cy="19" r="1.6" fill="currentColor"/><circle cx="5.3" cy="19" r="1.6" fill="currentColor"/><circle cx="22.7" cy="9" r="1.6" fill="currentColor"/></svg></span>Nodeworks</a>
      <nav class="desktop-nav" aria-label="Main navigation">
        <a href="#top" class="active">Home</a>
        <a href="#work">Works</a>
        <a href="#services">Solutions</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <a class="header-cta" href="#contact">Build Your System ${arrow}</a>
      ${languageSwitch()}
      ${themeToggle()}
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
        <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h14M4 15h14"/></svg>
      </button>
      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>
        <a href="#top" class="active">Home</a><a href="#work">Works</a><a href="#services">Solutions</a><a href="#about">About</a><a href="#contact">Contact</a>
        <a class="mobile-cta" href="#contact">Build Your System ${arrow}</a>
        ${languageSwitch()}
      </nav>
    </header>

    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero-halo" aria-hidden="true"></div>

      <div class="hero-content container">
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow">Software development partner</p>
          <h1 id="hero-title"><span class="hero-title-line">Build</span> <span class="hero-title-line">Your System</span> <span class="hero-title-line">with <span class="text-blue">Nodeworks.</span></span></h1>
          <p class="hero-description">${getLocale() === 'id' ? 'Membantu bisnis dan instansi membangun solusi digital yang tepat, terukur, dan siap berkembang.' : 'Helping businesses and institutions build digital solutions that fit, scale, and grow.'}</p>
          <a class="hero-brief-cta" href="#contact">
            <span class="hero-brief-icon" aria-hidden="true">&lt;/&gt;</span>
            <span>${getLocale() === 'id' ? 'Ceritakan kebutuhan Anda' : 'Tell us what you need'}</span>
            <span class="hero-brief-arrow">${arrow}</span>
          </a>
          <dl class="hero-stats" aria-label="Nodeworks highlights">
            <div><dt>50+</dt><dd>Project Delivered</dd></div>
            <div><dt>99%</dt><dd>On-Time Delivery</dd></div>
            <div><dt>24/7</dt><dd>Technical Support</dd></div>
          </dl>
        </div>
        <div class="hero-stage">
          <div class="hero-orbits" aria-hidden="true"></div>
          <div class="hero-visual">
            <img
              class="hero-asset"
              src="${import.meta.env.BASE_URL}images/work/nodeworks_blue_diorama.svg"
              width="1368"
              height="938"
              fetchpriority="high"
              decoding="async"
              alt="Nodeworks software company office diorama"
            />
          </div>
        </div>
      </div>
    </section>

    <main>
      <section class="work-section section" id="work" aria-labelledby="work-heading">
        <div class="container work-pin">
          <div class="work-heading">
            <p class="work-kicker">01 / What we’ve built</p>
            <h2 id="work-heading"><span>Selected</span><span>Works.</span></h2>
            <p class="work-intro">A selection of digital products<br />and systems we’ve brought to life.</p>
          </div>
          <div class="work-counter" aria-live="polite" aria-atomic="true">
            <span class="work-counter-value">00.01</span>
            <span class="work-counter-line" aria-hidden="true"></span>
          </div>
          <div class="project-track" id="all-projects">
            ${showcaseProjects
              .map(
                (project, index) => `
              <article class="project-scene${index === 0 ? " is-active" : ""}" data-project-index="${index}" aria-hidden="${index !== 0}">
                <div class="project-visual">
                  <img src="${import.meta.env.BASE_URL}images/work/${project.image}" width="2559" height="1324" loading="${index === 0 ? "eager" : "lazy"}" decoding="async" alt="Preview ${project.title}" />
                </div>
                <div class="project-scene-copy">
                  <p class="project-category">${project.category}</p>
                  <div class="project-meta-row">
                    <div class="project-title-group">
                      <h3>${project.title}</h3>
                      <a class="project-detail-link project-scene-link" href="${import.meta.env.BASE_URL}work/${project.slug}/">View project ${arrow}</a>
                    </div>
                    <p class="project-description">${project.description}</p>
                  </div>
                </div>
              </article>
            `,
              )
              .join("")}
          </div>
          <div class="work-progress" aria-label="Project progress">
            ${showcaseProjects.map((project, index) => `<span class="work-progress-item${index === 0 ? " is-active" : ""}" aria-label="${project.number} ${project.title}"></span>`).join("")}
          </div>
          <div class="work-navigation" aria-label="Project navigation">
            <button class="work-navigation-button work-previous" type="button" aria-label="Previous project" disabled><span aria-hidden="true">←</span><span>Previous</span></button>
            <button class="work-navigation-button work-next" type="button" aria-label="Next project"><span>Next</span><span aria-hidden="true">→</span></button>
          </div>
        </div>
      </section>

      <section class="services-section section" id="services" aria-labelledby="services-heading">
        <div class="container">
          <div class="services-top reveal">
            <div>
              <p class="eyebrow eyebrow-light">What we do</p>
              <h2 id="services-heading">Complex challenges.<br /><em>Clear solutions.</em></h2>
            </div>
            <p>From the first question to the next release, we connect strategy, design, and engineering into systems built to work in the real world.</p>
          </div>
          <div class="service-grid">
            <article class="service-card reveal">
              <div class="service-symbol symbol-platform" aria-hidden="true"><span></span><span></span><span></span></div>
              <span class="service-index">01 / Discover</span>
              <h3>Product strategy</h3>
              <p>Define the right problem, map the opportunity, and give every build a clear direction.</p>
              <span class="service-tag">Research · Roadmaps · Architecture</span>
            </article>
            <article class="service-card reveal">
              <div class="service-symbol symbol-experience" aria-hidden="true"><span></span><span></span><span></span></div>
              <span class="service-index">02 / Design</span>
              <h3>Digital experiences</h3>
              <p>Make complicated workflows feel natural through useful, memorable interfaces.</p>
              <span class="service-tag">UX · UI · Prototypes</span>
            </article>
            <article class="service-card reveal">
              <div class="service-symbol symbol-systems" aria-hidden="true"><span></span><span></span><span></span></div>
              <span class="service-index">03 / Build</span>
              <h3>Connected systems</h3>
              <p>Engineer platforms, integrations, and data foundations that keep moving with you.</p>
              <span class="service-tag">Web · Data · Integrations</span>
            </article>
          </div>
        </div>
      </section>

      <section class="approach-section section" id="about" aria-labelledby="approach-heading">
        <div class="container approach-layout">
          <div class="approach-sticky reveal">
            <p class="eyebrow">How we think</p>
            <h2 id="approach-heading">Built for the way business <span>actually moves.</span></h2>
            <p>Great digital products are never isolated screens. They connect people, decisions, and operations in a way that makes the whole business stronger.</p>
            <a class="inline-link" href="#contact">Start a conversation ${arrow}</a>
          </div>
          <div class="approach-steps">
            <article class="approach-step reveal"><span>01</span><div><h3>Understand the real work</h3><p>We start with the people, processes, and constraints behind the brief.</p></div></article>
            <article class="approach-step reveal"><span>02</span><div><h3>Design the whole system</h3><p>Interfaces, data, and technology are considered together from day one.</p></div></article>
            <article class="approach-step reveal"><span>03</span><div><h3>Build, learn, improve</h3><p>We ship in useful increments and keep refining what matters most.</p></div></article>
            <div class="approach-blueprint" aria-hidden="true"><span class="blueprint-ring ring-one"></span><span class="blueprint-ring ring-two"></span><span class="blueprint-core">N</span><span class="blueprint-dot dot-one"></span><span class="blueprint-dot dot-two"></span><span class="blueprint-dot dot-three"></span></div>
          </div>
        </div>
      </section>

      <section class="insights-section section" id="insights" aria-labelledby="insights-heading">
        <div class="container">
          <div class="section-heading insights-heading reveal">
            <h2 id="insights-heading">Ideas in motion</h2>
            <p class="section-intro">A few principles behind the way<br />we make digital work harder.</p>
          </div>
          <div class="insight-grid">
            <article class="insight-card reveal"><span class="insight-label">Perspective / 01</span><div class="insight-art insight-art-one" aria-hidden="true"><span></span><span></span><span></span></div><h3>Build around the work, not the tool.</h3><p>Technology creates value when it fits the decisions people need to make.</p></article>
            <article class="insight-card reveal"><span class="insight-label">Perspective / 02</span><div class="insight-art insight-art-two" aria-hidden="true"><span></span><span></span><span></span></div><h3>Good systems make room to grow.</h3><p>Clear foundations help teams move faster as their needs change.</p></article>
          </div>
        </div>
      </section>

      <section class="contact-section" id="contact" aria-labelledby="contact-heading">
        <div class="contact-wrap">
          <div class="contact-copy">
            <p class="contact-eyebrow">Have a challenge in mind?</p>
            <h2 id="contact-heading">Let’s build <span>what’s next.</span></h2>
            <p class="contact-lead">Tell us what you’re working on, what you want to improve, and where you hope to go. Whether you have a detailed brief or just an early idea, we’ll help you work out a clear next step.</p>
            <div class="contact-direct">
              <a href="mailto:admin@nodeworks.co.id">admin@nodeworks.co.id <small>Email</small></a>
              <a href="https://www.linkedin.com/">Nodeworks on LinkedIn <small>Message</small></a>
            </div>
          </div>
          <div class="contact-card">
            <div class="contact-card-header">
              <div class="contact-tabs" role="tablist" aria-label="How to reach us">
                <button class="contact-tab" role="tab" id="contact-t-call" aria-controls="contact-p-call" aria-selected="true">Book a call</button>
                <button class="contact-tab" role="tab" id="contact-t-brief" aria-controls="contact-p-brief" aria-selected="false" tabindex="-1">Send a brief</button>
              </div>
            </div>
            <div class="contact-stack" id="contact-stack">
              <form class="contact-panel" id="contact-p-call" role="tabpanel" aria-labelledby="contact-t-call" novalidate>
                <div hidden aria-hidden="true"><label>Leave this field empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
                <div class="contact-stage" id="contact-date-stage">
                  <div class="contact-step"><span>1. Pick a day</span><em>30-minute intro call</em></div>
                  <button class="contact-stage-summary" id="contact-date-summary" type="button" hidden></button>
                  <div class="contact-stage-content" id="contact-date-content">
                    <div class="contact-cal-head"><button type="button" class="contact-nav" id="contact-prev" aria-label="Previous month">‹</button><strong id="contact-month"></strong><button type="button" class="contact-nav" id="contact-next" aria-label="Next month">›</button></div>
                    <div class="contact-dow" aria-hidden="true"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                    <div class="contact-days" id="contact-days"></div>
                  </div>
                </div>
                <div class="contact-stage" id="contact-time-stage" hidden>
                  <div class="contact-step"><span>2. Pick a time</span></div>
                  <button class="contact-stage-summary" id="contact-time-summary" type="button" hidden></button>
                  <div class="contact-stage-content" id="contact-time-content">
                    <div class="contact-slots" id="contact-slots"></div>
                    <p class="contact-tz" id="contact-tz"></p>
                  </div>
                </div>
                <div class="contact-fields" id="contact-call-fields" hidden>
                  <div class="contact-two"><label>Name<input name="name" required autocomplete="name" placeholder="Your name"></label><label>Email<input name="email" type="email" required autocomplete="email" placeholder="you@company.com"></label></div>
                  <fieldset><legend>What is the call about?</legend><div class="contact-chips">
                    <label><input type="radio" name="topic" value="Strategy" checked><span>Strategy</span></label><label><input type="radio" name="topic" value="Design"><span>Design</span></label><label><input type="radio" name="topic" value="Technology"><span>Technology</span></label><label><input type="radio" name="topic" value="Not sure yet"><span>Not sure yet</span></label>
                  </div></fieldset>
                </div>
                <p class="contact-error" id="contact-err-call" role="alert"></p>
                <button class="contact-submit" type="submit">Confirm booking <span aria-hidden="true">↗</span></button>
              </form>
              <form class="contact-panel" id="contact-p-brief" role="tabpanel" aria-labelledby="contact-t-brief" hidden novalidate>
                <div hidden aria-hidden="true"><label>Leave this field empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
                <div class="contact-step">Tell us about it <em>We reply within max 2 working days</em></div>
                <div class="contact-fields contact-fields-grow">
                  <div class="contact-two"><label>Name<input name="name" required autocomplete="name" placeholder="Your name"></label><label>Email<input name="email" type="email" required autocomplete="email" placeholder="you@company.com"></label></div>
                  <label>Company<input name="company" autocomplete="organization" placeholder="Optional"></label>
                  <fieldset><legend>What do you need?</legend><div class="contact-chips">
                    <label><input type="checkbox" name="need" value="Design"><span>Design</span></label><label><input type="checkbox" name="need" value="Web or app"><span>Web or app</span></label><label><input type="checkbox" name="need" value="Integrations"><span>Integrations</span></label><label><input id="contact-other-need-toggle" type="checkbox" name="need" value="Other" aria-controls="contact-other-need-field"><span>Other</span></label>
                  </div></fieldset>
                  <label id="contact-other-need-field" hidden>Please tell us what you need<input id="contact-other-need" name="needOther" placeholder="Describe your need"></label>
                  <label>Timeline<select name="timeline"><option>As soon as possible</option><option>Within 2 weeks</option><option>Within 1 month</option><option>1 to 3 months</option><option>3 to 6 months</option><option>6+ months</option><option>Flexible</option><option>Not sure yet</option></select></label>
                  <label>Project details<textarea name="message" required placeholder="What problem are you trying to solve?"></textarea></label>
                </div>
                <p class="contact-error" id="contact-err-brief" role="alert"></p><button class="contact-submit" type="submit">Send brief <span aria-hidden="true">↗</span></button>
              </form>
              <div class="contact-panel contact-done" id="contact-done" hidden><h3 id="contact-done-title">Request received</h3><p id="contact-done-text"></p><button type="button" id="contact-again">Make another request</button></div>
            </div>
          </div>
        </div>
      </section>
    </main>

    ${renderSiteFooter(import.meta.env.BASE_URL, true)}
  </div>


`;

localizeDOM(app);
mountLanguageSwitch();
mountThemeToggle();

// Contact section: live booking availability and contact submissions.
const contactRoot = document.querySelector<HTMLElement>(".contact-section");
if (contactRoot) {
  const $contact = <T extends HTMLElement>(selector: string) =>
    contactRoot.querySelector<T>(selector)!;
  const monthFormat = new Intl.DateTimeFormat(getLocale() === 'id' ? 'id-ID' : 'en', {
    month: "long",
    year: "numeric",
  });
  const dayFormat = new Intl.DateTimeFormat(getLocale() === 'id' ? 'id-ID' : 'en', {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  $contact("#contact-tz").textContent = t("Times shown in Asia/Jakarta");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  let viewedMonth = new Date(monthStart);
  let selectedDate: Date | null = null;
  let selectedTime: string | null = null;
  let availableSlots: AvailableSlot[] = [];
  let loadingSlots = false;
  const callForm = $contact<HTMLFormElement>("#contact-p-call");
  const briefForm = $contact<HTMLFormElement>("#contact-p-brief");
  const callFields = $contact<HTMLElement>("#contact-call-fields");
  const otherNeedToggle = $contact<HTMLInputElement>(
    "#contact-other-need-toggle",
  );
  const otherNeedField = $contact<HTMLElement>("#contact-other-need-field");
  const otherNeedInput = $contact<HTMLInputElement>("#contact-other-need");
  const dateContent = $contact<HTMLElement>("#contact-date-content");
  const timeStage = $contact<HTMLElement>("#contact-time-stage");
  const timeContent = $contact<HTMLElement>("#contact-time-content");
  const dateSummary = $contact<HTMLButtonElement>("#contact-date-summary");
  const timeSummary = $contact<HTMLButtonElement>("#contact-time-summary");
  let dateExpanded = true;
  let timeExpanded = true;
  const tabs = [
    $contact<HTMLButtonElement>("#contact-t-call"),
    $contact<HTMLButtonElement>("#contact-t-brief"),
  ];
  const panels = [callForm, briefForm];
  const renderCalendar = () => {
    $contact("#contact-month").textContent = monthFormat.format(viewedMonth);
    $contact<HTMLButtonElement>("#contact-prev").disabled =
      viewedMonth <= monthStart;
    const first = new Date(
      viewedMonth.getFullYear(),
      viewedMonth.getMonth(),
      1,
    );
    const total = new Date(
      viewedMonth.getFullYear(),
      viewedMonth.getMonth() + 1,
      0,
    ).getDate();
    const grid = $contact("#contact-days");
    grid.replaceChildren();
    for (let i = 0; i < (first.getDay() + 6) % 7; i++) {
      const blank = document.createElement("span");
      blank.className = "contact-blank";
      grid.append(blank);
    }
    for (let n = 1; n <= total; n++) {
      const date = new Date(
        viewedMonth.getFullYear(),
        viewedMonth.getMonth(),
        n,
      );
      const button = document.createElement("button");
      button.type = "button";
      button.className = "contact-day";
      button.textContent = String(n);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
      const hasAvailableSlots = availableSlots.some(
        (slot) => slot.startsAt.startsWith(key) && slot.available,
      );
      button.disabled = loadingSlots || date < today || !hasAvailableSlots;
      button.setAttribute(
        "aria-pressed",
        String(!!selectedDate && +selectedDate === +date),
      );
      button.setAttribute(
        "aria-label",
        `${dayFormat.format(date)}, ${hasAvailableSlots ? "available" : "unavailable"}`,
      );
      if (!hasAvailableSlots) button.title = "No available times";
      if (+date === +today) button.classList.add("today");
      button.addEventListener("click", () => {
        selectedDate = date;
        selectedTime = null;
        dateExpanded = false;
        timeExpanded = true;
        renderCalendar();
        renderTimes();
        updateBookingSteps();
        void loadMonth();
      });
      grid.append(button);
    }
  };
  const renderTimes = () => {
    const grid = $contact("#contact-slots");
    grid.replaceChildren();
    if (!selectedDate) return;
    if (loadingSlots) {
      const hint = document.createElement("p");
      hint.className = "contact-hint";
      hint.textContent = "Checking available times…";
      grid.append(hint);
      return;
    }
    const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    const times = availableSlots.filter((slot) =>
      slot.startsAt.startsWith(key),
    );
    if (!times.length) {
      const hint = document.createElement("p");
      hint.className = "contact-hint";
      hint.textContent = "No times are available on this day.";
      grid.append(hint);
    }
    times.forEach((slot) => {
      const time = slot.startsAt.slice(11, 16);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "contact-slot";
      button.textContent = time;
      button.disabled = !slot.available;
      button.setAttribute(
        "aria-label",
        `${time}, ${slot.available ? "available" : "unavailable"}`,
      );
      button.setAttribute("aria-pressed", String(selectedTime === time));
      if (!slot.available) button.title = "This time is unavailable";
      button.addEventListener("click", () => {
        selectedTime = time;
        timeExpanded = false;
        renderTimes();
        updateBookingSteps();
      });
      grid.append(button);
    });
  };
  const updateBookingSteps = () => {
    const dateCollapsed = !!selectedDate && !dateExpanded;
    dateContent.hidden = dateCollapsed;
    dateSummary.hidden = !dateCollapsed;
    dateSummary.replaceChildren();
    if (selectedDate) {
      const action = document.createElement("span");
      action.className = "contact-stage-summary-action";
      action.textContent = "Change day";
      dateSummary.append(
        document.createTextNode(dayFormat.format(selectedDate)),
        action,
      );
    }
    timeStage.hidden = !selectedDate;
    const timeCollapsed = !!selectedTime && !timeExpanded;
    timeContent.hidden = timeCollapsed;
    timeSummary.hidden = !timeCollapsed;
    timeSummary.replaceChildren();
    if (selectedTime) {
      const action = document.createElement("span");
      action.className = "contact-stage-summary-action";
      action.textContent = "Change time";
      timeSummary.append(document.createTextNode(selectedTime), action);
    }
    callFields.hidden = !selectedTime || timeExpanded;
  };
  dateSummary.addEventListener("click", () => {
    dateExpanded = true;
    timeExpanded = true;
    selectedTime = null;
    renderTimes();
    updateBookingSteps();
  });
  timeSummary.addEventListener("click", () => {
    timeExpanded = true;
    updateBookingSteps();
  });
  let availabilityRequest = 0;
  const loadMonth = async () => {
    const requestId = ++availabilityRequest;
    const month = `${viewedMonth.getFullYear()}-${String(viewedMonth.getMonth() + 1).padStart(2, "0")}`;
    loadingSlots = true;
    renderCalendar();
    try {
      const slots = await getAvailableSlots(month);
      if (requestId !== availabilityRequest) return;
      availableSlots = slots;
      if (selectedDate) {
        const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
        if (
          !availableSlots.some(
            (slot) => slot.startsAt.startsWith(key) && slot.available,
          )
        )
          selectedTime = null;
      }
      $contact("#contact-err-call").textContent = "";
    } catch (error) {
      if (requestId !== availabilityRequest) return;
      availableSlots = [];
      $contact("#contact-err-call").textContent =
        error instanceof Error
          ? error.message
          : "Could not load available times.";
    } finally {
      if (requestId === availabilityRequest) {
        loadingSlots = false;
        renderCalendar();
        renderTimes();
        updateBookingSteps();
      }
    }
  };
  $contact("#contact-prev").addEventListener("click", () => {
    viewedMonth = new Date(
      viewedMonth.getFullYear(),
      viewedMonth.getMonth() - 1,
      1,
    );
    selectedDate = null;
    selectedTime = null;
    renderCalendar();
    updateBookingSteps();
    void loadMonth();
  });
  $contact("#contact-next").addEventListener("click", () => {
    viewedMonth = new Date(
      viewedMonth.getFullYear(),
      viewedMonth.getMonth() + 1,
      1,
    );
    selectedDate = null;
    selectedTime = null;
    renderCalendar();
    updateBookingSteps();
    void loadMonth();
  });
  const showTab = (index: number) => {
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    $contact("#contact-done").hidden = true;
    $contact(".contact-card-header").hidden = false;
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showTab(index));
    tab.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const next = 1 - index;
        showTab(next);
        tabs[next].focus();
      }
    });
  });
  otherNeedToggle.addEventListener("change", () => {
    otherNeedField.hidden = !otherNeedToggle.checked;
    otherNeedInput.required = otherNeedToggle.checked;
    if (!otherNeedToggle.checked) otherNeedInput.value = "";
  });
  briefForm.addEventListener("reset", () => {
    window.setTimeout(() => {
      otherNeedField.hidden = true;
      otherNeedInput.required = false;
      otherNeedInput.value = "";
    });
  });
  const finish = (title: string, message: string) => {
    panels.forEach((panel) => {
      panel.hidden = true;
    });
    $contact(".contact-card-header").hidden = true;
    $contact("#contact-done-title").textContent = title;
    $contact("#contact-done-text").textContent = message;
    $contact("#contact-done").hidden = false;
  };
  $contact("#contact-again").addEventListener("click", () => {
    panels.forEach((panel) => panel.reset());
    selectedDate = null;
    selectedTime = null;
    dateExpanded = true;
    timeExpanded = true;
    renderCalendar();
    renderTimes();
    updateBookingSteps();
    showTab(0);
    void loadMonth();
  });
  callForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(callForm);
    const email = String(data.get("email") ?? "");
    const error = $contact("#contact-err-call");
    if (!selectedDate || !selectedTime) {
      error.textContent = "Pick a day and a time first.";
      return;
    }
    if (!callForm.checkValidity()) {
      error.textContent = "Add your name and a valid email.";
      return;
    }
    const day = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    const selectedSlot = availableSlots.find(
      (slot) =>
        slot.startsAt.startsWith(`${day}T${selectedTime}`) && slot.available,
    );
    if (!selectedSlot) {
      error.textContent =
        "That time is no longer available. Please choose another.";
      await loadMonth();
      return;
    }
    try {
      await submitContact("booking", {
        name: String(data.get("name") ?? ""),
        email,
        startsAt: selectedSlot.startsAt,
        timezone,
        topic: String(data.get("topic") ?? ""),
        website: String(data.get("website") ?? ""),
      });
      error.textContent = "";
      finish(
        t("You’re booked"),
        getLocale() === 'id'
          ? `${dayFormat.format(selectedDate)} pukul ${selectedTime} (Asia/Jakarta). Kami akan menghubungi Anda melalui ${email}.`
          : `${dayFormat.format(selectedDate)} at ${selectedTime} (Asia/Jakarta). We’ll be in touch at ${email}.`,
      );
    } catch (submissionError) {
      error.textContent =
        submissionError instanceof Error
          ? submissionError.message
          : "Could not submit your booking.";
      if (error.textContent.includes("already booked")) await loadMonth();
    }
  });
  briefForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(briefForm);
    const error = $contact("#contact-err-brief");
    if (!briefForm.checkValidity()) {
      error.textContent = "Add your name, a valid email and a few details.";
      return;
    }
    try {
      await submitContact("brief", {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        company: String(data.get("company") ?? ""),
        need: data.getAll("need").map(String),
        needOther: String(data.get("needOther") ?? ""),
        timeline: String(data.get("timeline") ?? ""),
        message: String(data.get("message") ?? ""),
        website: String(data.get("website") ?? ""),
      });
      error.textContent = "";
      finish(
        t("Brief received"),
        getLocale() === 'id'
          ? `Terima kasih, ${String(data.get("name")).split(" ")[0]}. Kami akan membalas ke ${String(data.get("email"))} dalam 2 hari kerja.`
          : `Thanks ${String(data.get("name")).split(" ")[0]}. We will reply to ${String(data.get("email"))} within 2 working days.`,
      );
    } catch (submissionError) {
      error.textContent =
        submissionError instanceof Error
          ? submissionError.message
          : "Could not submit your brief.";
    }
  });
  renderCalendar();
  renderTimes();
  updateBookingSteps();
  void loadMonth();
}

const heroAsset = document.querySelector<HTMLImageElement>(".hero-asset");
if (!heroAsset) throw new Error("Hero asset not found");
const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const mobileNav = document.querySelector<HTMLElement>(".mobile-nav");
const siteHeader = document.querySelector<HTMLElement>(".site-header");
function setMenu(open: boolean) {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileNav.hidden = !open;
}
menuToggle?.addEventListener("click", () =>
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true"),
);
mobileNav
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 1100) setMenu(false);
});

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
let lenis: Lenis | undefined;
let workSnapTrigger: ScrollTrigger | undefined;
let workSnapInProgress = false;
const scrollEasing = (t: number) => 1 - Math.pow(1 - t, 4);
function scrollToWorkCard(targetIndex: number) {
  if (!workSnapTrigger || !lenis || workSnapInProgress) return;
  const { start, end } = workSnapTrigger;
  const targetScroll =
    start + (targetIndex / (showcaseProjects.length - 1)) * (end - start);
  workSnapInProgress = true;
  lenis.scrollTo(targetScroll, {
    duration: 1.35,
    easing: scrollEasing,
    lock: true,
    force: true,
    onComplete: () => {
      workSnapTrigger?.animation?.progress(
        targetIndex / (showcaseProjects.length - 1),
        false,
      );
      workSnapInProgress = false;
      setActiveProject(targetIndex);
    },
  });
}

function onWorkWheel(event: WheelEvent) {
  if (
    reduceMotion ||
    !workSnapTrigger ||
    Math.abs(event.deltaY) < 6 ||
    event.ctrlKey
  )
    return;
  const { start, end } = workSnapTrigger;
  const scroll = window.scrollY;
  if (scroll < start - 2 || scroll > end + 2) return;
  if (workSnapInProgress) {
    event.preventDefault();
    return;
  }
  const direction = Math.sign(event.deltaY);
  const currentIndex = Math.round(
    workSnapTrigger.progress * (showcaseProjects.length - 1),
  );
  const targetIndex = Math.max(
    0,
    Math.min(showcaseProjects.length - 1, currentIndex + direction),
  );
  if (targetIndex === currentIndex) return;
  event.preventDefault();
  scrollToWorkCard(targetIndex);
}

lenis = new Lenis({
  duration: 1.45,
  easing: scrollEasing,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  respectReducedMotion: true,
});
window.addEventListener("wheel", onWorkWheel, {
  passive: false,
  capture: true,
});
function updateStickyHeader(scroll: number) {
  siteHeader?.classList.toggle("is-sticky", scroll > 56);
}
updateStickyHeader(window.scrollY);
lenis.on("scroll", ({ scroll, direction }) => {
  ScrollTrigger.update();
  updateStickyHeader(scroll);
  // Wheel input and fixed controls own discrete scene navigation. Keeping the
  // general Lenis callback passive prevents a completed button transition
  // from scheduling a second, unintended project change.
  void direction;
});
const tickSmoothScroll = (time: number) => lenis?.raf(time * 1000);
gsap.ticker.add(tickSmoothScroll);
gsap.ticker.lagSmoothing(0);

function onAnchorClick(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  const link =
    event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
      : null;
  if (
    !link ||
    link.hasAttribute("download") ||
    (link.target && link.target !== "_self")
  )
    return;
  const target = document.getElementById(
    decodeURIComponent(link.hash.slice(1)),
  );
  if (!target || !lenis) return;
  event.preventDefault();
  if (window.location.hash !== link.hash)
    history.pushState(null, "", link.hash);
  lenis.resize();
  lenis.scrollTo(target, { duration: 1.6, easing: scrollEasing });
}
document.addEventListener("click", onAnchorClick);

if (!reduceMotion) {
  gsap.fromTo(
    ".hero-eyebrow, #hero-title, .hero-description, .hero-brief-cta, .hero-stats",
    { autoAlpha: 0, y: 30 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.085,
      ease: "power3.out",
      delay: 0.1,
    },
  );
  gsap.fromTo(
    ".hero-visual",
    { autoAlpha: 0, y: 18 },
    { autoAlpha: 1, y: 0, duration: 1.35, ease: "power2.out", delay: 0.15 },
  );

  gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 32 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
      },
    );
  });
}

const projectScenes = gsap.utils.toArray<HTMLElement>(".project-scene");
const projectVisuals = projectScenes.map(
  (scene) => scene.querySelector<HTMLElement>(".project-visual")!,
);
const projectImages = projectScenes.map(
  (scene) => scene.querySelector<HTMLImageElement>(".project-visual img")!,
);
const projectCopies = projectScenes.map(
  (scene) => scene.querySelector<HTMLElement>(".project-scene-copy")!,
);
const projectTitles = projectScenes.map(
  (scene) => scene.querySelector<HTMLElement>("h3")!,
);
const projectTrack = document.querySelector<HTMLElement>(".project-track");
const workCounter = document.querySelector<HTMLElement>(".work-counter-value");
const workProgressItems = gsap.utils.toArray<HTMLElement>(".work-progress-item");
const previousProject = document.querySelector<HTMLButtonElement>(".work-previous");
const nextProject = document.querySelector<HTMLButtonElement>(".work-next");
let activeProjectIndex = 0;

function setActiveProject(index: number) {
  if (index === activeProjectIndex && workCounter?.textContent === showcaseProjects[index].number) return;
  activeProjectIndex = index;
  projectScenes.forEach((scene, sceneIndex) => {
    const active = sceneIndex === index;
    scene.classList.toggle("is-active", active);
    scene.setAttribute("aria-hidden", String(!active));
  });
  workProgressItems.forEach((item, itemIndex) =>
    (item.classList.toggle("is-active", itemIndex === index),
    item.classList.toggle("is-past", itemIndex < index)),
  );
  if (workCounter) workCounter.textContent = showcaseProjects[index].number;
  if (previousProject) previousProject.disabled = index === 0;
  if (nextProject) nextProject.disabled = index === projectScenes.length - 1;
}

if (!reduceMotion && projectScenes.length > 1) {
  gsap.set(projectScenes, { autoAlpha: 0, clipPath: "inset(100% 0 0 0)", zIndex: 1 });
  gsap.set(projectScenes[0], { autoAlpha: 1, clipPath: "inset(0% 0 0 0)", zIndex: 2 });
  gsap.set(projectImages, { scale: 1, yPercent: 0 });
  gsap.set(projectCopies.slice(1), { yPercent: 55 });

  const workScrollDistance = () =>
    `+=${Math.max(window.innerHeight * 1.35 * (projectScenes.length - 1), 1900)}`;
  const workTimeline = gsap.timeline({
    defaults: { duration: 1, ease: "power3.inOut" },
    scrollTrigger: {
      trigger: ".work-pin",
      start: "top top",
      end: workScrollDistance,
      pin: true,
      scrub: 0.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const visualProgress = self.animation?.progress() ?? self.progress;
        setActiveProject(
          Math.min(
            projectScenes.length - 1,
            Math.round(visualProgress * (projectScenes.length - 1)),
          ),
        );
      },
    },
  });
  workSnapTrigger = workTimeline.scrollTrigger;

  for (let index = 1; index < projectScenes.length; index += 1) {
    const position = index - 1;
    const outgoingScene = projectScenes[index - 1];
    const incomingScene = projectScenes[index];

    workTimeline
      .set(incomingScene, { zIndex: 3 }, position)
      .to(
        outgoingScene,
        { clipPath: "inset(0 0 100% 0)", autoAlpha: 1, duration: 1 },
        position,
      )
      .to(
        projectTitles[index - 1],
        { yPercent: -95, duration: 0.82, ease: "power3.in" },
        position,
      )
      .to(
        projectImages[index - 1],
        { yPercent: -16, scale: 1.13, duration: 1 },
        position,
      )
      .fromTo(
        incomingScene,
        { clipPath: "inset(100% 0 0 0)", autoAlpha: 1 },
        { clipPath: "inset(0% 0 0 0)", autoAlpha: 1, duration: 1 },
        position,
      )
      .fromTo(
        projectVisuals[index],
        { yPercent: 10 },
        { yPercent: 0, duration: 1 },
        position,
      )
      .fromTo(
        projectImages[index],
        { yPercent: 18, scale: 1.14 },
        { yPercent: 0, scale: 1, duration: 1 },
        position,
      )
      .fromTo(
        projectCopies[index],
        { yPercent: 70 },
        { yPercent: 0, duration: 0.82, ease: "power3.out" },
        position + 0.18,
      )
      .fromTo(
        projectTitles[index],
        { yPercent: 48 },
        { yPercent: 0, duration: 0.78, ease: "power3.out" },
        position + 0.22,
      )
      .set(outgoingScene, { zIndex: 1 }, position + 1)
      .set(incomingScene, { zIndex: 2 }, position + 1);
  }
}

let magneticScene: HTMLElement | null = null;
const magneticX = projectVisuals.map((visual) => gsap.quickTo(visual, "x", { duration: .55, ease: "power3.out" }));
const magneticY = projectVisuals.map((visual) => gsap.quickTo(visual, "y", { duration: .55, ease: "power3.out" }));
function onProjectPointerMove(event: PointerEvent) {
  if (reduceMotion || event.pointerType === "touch" || !projectTrack) return;
  const scene = projectScenes[activeProjectIndex];
  if (!scene) return;
  const rect = projectTrack.getBoundingClientRect();
  magneticScene = scene;
  magneticX[activeProjectIndex](((event.clientX - rect.left) / rect.width - .5) * 18);
  magneticY[activeProjectIndex](((event.clientY - rect.top) / rect.height - .5) * 14);
}
function resetProjectMagnet() {
  if (!magneticScene) return;
  const index = projectScenes.indexOf(magneticScene);
  magneticX[index]?.(0);
  magneticY[index]?.(0);
  magneticScene = null;
}
projectTrack?.addEventListener("pointermove", onProjectPointerMove, { passive: true });
projectTrack?.addEventListener("pointerleave", resetProjectMagnet);

previousProject?.addEventListener("click", () => {
  if (!workSnapInProgress) scrollToWorkCard(Math.max(0, activeProjectIndex - 1));
});
nextProject?.addEventListener("click", () => {
  if (!workSnapInProgress)
    scrollToWorkCard(Math.min(projectScenes.length - 1, activeProjectIndex + 1));
});
setActiveProject(0);

ScrollTrigger.create({
  trigger: ".work-section",
  start: "top 35%",
  end: "bottom 35%",
  onToggle: (self) => siteHeader?.classList.toggle("is-work-compact", self.isActive),
});

const progress = document.querySelector<HTMLElement>(".scroll-progress");
ScrollTrigger.create({
  start: 0,
  end: "max",
  onUpdate: (self) => {
    if (progress) progress.style.transform = `scaleX(${self.progress})`;
  },
});

const navLinks = document.querySelectorAll<HTMLAnchorElement>(".desktop-nav a, .mobile-nav a:not(.mobile-cta)");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-30% 0px -60% 0px" },
);
document
  .querySelectorAll<HTMLElement>(".hero[id], main section[id]")
  .forEach((section) => sectionObserver.observe(section));

function finishInitialNavigation() {
  ScrollTrigger.refresh();
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target || !lenis) return;

  // The home page is rendered by a dynamic import, so native hash scrolling
  // can run before the target exists. Start from the top after layout settles.
  lenis.scrollTo(0, { immediate: true, force: true });
  lenis.resize();
  lenis.scrollTo(target, {
    duration: 1.6,
    easing: scrollEasing,
    immediate: reduceMotion,
    force: true,
  });
}

if (document.readyState === "complete") {
  requestAnimationFrame(finishInitialNavigation);
} else {
  window.addEventListener("load", finishInitialNavigation, { once: true });
}

// Keep smooth-scroll measurements aligned with the responsive hero asset.
let cancelLayoutRefresh = () => {};
const heroLayoutObserver = new ResizeObserver(() => {
  cancelLayoutRefresh();
  cancelLayoutRefresh = whenScrollIdle(() => {
    lenis?.resize();
    ScrollTrigger.refresh();
  });
});
heroLayoutObserver.observe(document.querySelector(".hero")!);

import.meta.hot?.dispose(() => {
  window.removeEventListener("wheel", onWorkWheel, { capture: true });
  cancelLayoutRefresh();
  heroLayoutObserver.disconnect();
  gsap.ticker.remove(tickSmoothScroll);
  document.removeEventListener("click", onAnchorClick);
  projectTrack?.removeEventListener("pointermove", onProjectPointerMove);
  projectTrack?.removeEventListener("pointerleave", resetProjectMagnet);
  lenis?.destroy();
  sectionObserver.disconnect();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
