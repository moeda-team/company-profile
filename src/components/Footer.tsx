export default function Footer() {
  return (
    <footer>
      <a className="logo" href="#" style={{ fontSize: 17 }}>
        <svg className="logo-mark" viewBox="0 0 28 28" fill="none">
          <polygon points="14,1 27,8 27,20 14,27 1,20 1,8" fill="rgba(255,106,0,.1)" stroke="#FF6A00" strokeWidth="1.5" />
          <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" fill="#FF6A00" opacity=".55" />
          <polygon points="14,10.5 18,12.8 18,15.2 14,17.5 10,15.2 10,12.8" fill="#FF6A00" />
        </svg>
        Hompimpa
      </a>
      <div className="foot-copy">© 2026 Hompimpa Technologies. All rights reserved.</div>
      <div className="foot-links">
        <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a><a href="#">Status</a><a href="#">Docs</a>
      </div>
      <div className="foot-socials">
        <div className="soc">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1 2.5L5.5 7v5M5.5 7L12 1" stroke="#8A8880" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="soc">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="1" width="11" height="11" rx="3" stroke="#8A8880" strokeWidth="1.1" />
            <circle cx="6.5" cy="6.5" r="2.3" stroke="#8A8880" strokeWidth="1.1" />
            <circle cx="9.5" cy="3.5" r=".7" fill="#8A8880" />
          </svg>
        </div>
        <div className="soc">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1.5 12L5 7.5 1 1h4l2.5 4L11 1h2L9.5 5.5 13 12H9L6 8l-3.5 4H1.5z" stroke="#8A8880" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
