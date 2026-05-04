export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <a className="logo" href="#">
            <svg className="logo-mark" viewBox="0 0 28 28" fill="none">
              <polygon points="14,1 27,8 27,20 14,27 1,20 1,8" fill="rgba(255,106,0,.1)" stroke="#FF6A00" strokeWidth="1.5"/>
              <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" fill="#FF6A00" opacity=".55"/>
              <polygon points="14,10.5 18,12.8 18,15.2 14,17.5 10,15.2 10,12.8" fill="#FF6A00"/>
            </svg>
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
            <input type="email" placeholder="Enter your email" className="footer-email-input"/>
            <button className="footer-email-btn" aria-label="Subscribe">→</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
