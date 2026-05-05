export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <a className="logo" href="#">
            <img className="logo-mark" src="/images/logo.png" alt="Hompimpa Logo" />
            Hompimpa
          </a>
          <div className="footer-copy">©2026 Hompimpa. All rights reserved.</div>
        </div>

        {/* Link columns */}
        <div className="footer-links">
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <a href="#">About</a>
            <a href="#">Social Media</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <a href="#">Web Development</a>
            <a href="#">Mobile App</a>
            <a href="#">AI & Automation</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <a href="mailto:hompimpa@gmail.com">hompimpa@gmail.com</a>
            <a href="tel:+6281330148318">+62 813-3014-8318</a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <div className="footer-col-title">Stay Updated</div>
          <p className="footer-newsletter-desc">Get insights & updates about AI and digital solutions.</p>
          <div className="footer-email-wrap">
            <input type="email" placeholder="Enter your email" className="footer-email-input" />
            <button className="footer-email-btn" aria-label="Subscribe">
              →
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
