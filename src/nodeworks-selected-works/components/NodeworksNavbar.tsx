"use client";
import styles from "./NodeworksNavbar.module.css";

export default function NodeworksNavbar({ compact = false }: { compact?: boolean }) {
  return <header className={`${styles.header} ${compact ? styles.compact : ""}`}>
    <a href="/#home" className={styles.brand}><span className={styles.mark} aria-hidden="true">✳</span><strong>Nodeworks</strong></a>
    <nav className={styles.nav} aria-label="Main navigation">
      <a href="/#home">Home</a><a href="/#works" className={compact ? styles.active : ""}>Works</a>
      <a href="/#solutions">Solutions</a><a href="/#about">About</a><a href="/#contact">Contact</a>
    </nav>
    <a href="/#contact" className={styles.cta}>Build Your System ↗</a>
    <a href="/#works" className={styles.compactLink}>● Works</a>
    <details className={styles.menu}><summary aria-label="Open navigation menu">☰</summary><div className={styles.menuItems}><a href="/#home">Home</a><a href="/#works">Works</a><a href="/#solutions">Solutions</a><a href="/#about">About</a><a href="/#contact">Contact</a></div></details>
  </header>;
}
