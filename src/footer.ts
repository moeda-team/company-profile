export function renderSiteFooter(baseUrl: string, onHomePage = false) {
  const section = (id: string) => `${onHomePage ? "" : baseUrl}#${id}`;

  return `
    <footer class="site-footer">
      <div class="container footer-links">
        <div class="footer-brand"><a class="footer-brand-link" href="${section("top")}" aria-label="Nodeworks home"><img src="${baseUrl}nodeworks-mark.svg" width="44" height="44" alt="" /><span>Nodeworks</span></a><p class="footer-tagline">We design and build digital solutions that help real businesses work smarter, move faster, and grow with confidence.</p></div>
        <div class="footer-link-group"><h3>Services</h3><a href="${section("services")}">Strategy</a><a href="${section("services")}">Design</a><a href="${section("services")}">Technology</a></div>
        <div class="footer-link-group"><h3>Studio</h3><a href="${section("work")}">Work</a><a href="${section("about")}">About</a><a href="${section("contact")}">Contact</a></div>
        <div class="footer-link-group"><h3>Connect</h3><a href="mailto:admin@nodeworks.co.id">Email</a><a href="https://www.linkedin.com/">LinkedIn</a></div>
      </div>
      <div class="container footer-bottom"><span>© ${new Date().getFullYear()} Nodeworks.</span><a href="${section("top")}">Back to top ↑</a></div>
    </footer>`;
}
