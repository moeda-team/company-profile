"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SelectedWorks.module.css";

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  url: string;
  imageAlt?: string;
};

// Replace sample images and links with your own /public/projects/* assets.
export const defaultProjects: Project[] = [
  {
    id: "papanclip",
    name: "PAPANCLIP",
    category: "COLLABORATIVE PROJECT MANAGEMENT",
    description: "Platform kolaborasi untuk manajemen proyek, progres, dan koordinasi tim dalam satu tempat.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
    url: "/works/papanclip",
  },
  {
    id: "momentoku",
    name: "MOMENTOKU",
    category: "EVENT & TICKETING PLATFORM",
    description: "Pengalaman tiket dan event digital yang cepat, nyaman, dan mudah diakses.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85",
    url: "/works/momentoku",
  },
  {
    id: "finance",
    name: "FINANCE",
    category: "FINANCIAL MANAGEMENT SYSTEM",
    description: "Sistem finansial yang membuat data, transaksi, dan laporan lebih mudah dipahami.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    url: "/works/finance",
  },
  {
    id: "pos",
    name: "POS SYSTEM",
    category: "RETAIL & POINT OF SALE",
    description: "Point-of-sale untuk membantu operasional toko berjalan lebih efisien.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85",
    url: "/works/pos",
  },
];

type Props = {
  projects?: Project[];
  /** Fired when the section intersects the top portion of viewport. */
  onActiveChange?: (active: boolean) => void;
};

const EXIT_MS = 390;
const ENTER_MS = 760;

export default function SelectedWorks({ projects = defaultProjects, onActiveChange }: Props) {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const busy = phase !== "idle";

  const schedule = useCallback((fn: () => void, delay: number) => {
    const timer = setTimeout(fn, delay);
    timers.current.push(timer);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !onActiveChange) return;
    const observer = new IntersectionObserver(
      ([entry]) => onActiveChange(entry.isIntersecting),
      { rootMargin: "-18% 0px -45% 0px", threshold: 0 },
    );
    observer.observe(sectionRef.current);
    return () => { observer.disconnect(); onActiveChange(false); };
  }, [onActiveChange]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const switchTo = useCallback((target: number) => {
    if (busy || target < 0 || target >= projects.length || target === index) return;
    if (reducedMotion) { setIndex(target); setMagnet({ x: 0, y: 0 }); return; }
    setNextIndex(target);
    setPhase("exit");
    setMagnet({ x: 0, y: 0 });
    schedule(() => {
      setIndex(target);
      setPhase("enter");
      schedule(() => { setPhase("idle"); setNextIndex(null); }, ENTER_MS);
    }, EXIT_MS);
  }, [busy, index, projects.length, reducedMotion, schedule]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || busy || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMagnet({ x: x * 14, y: y * 12 });
  };

  if (!projects.length) return null;
  const current = projects[index];
  const progressIndex = nextIndex ?? index;
  const number = String(index + 1).padStart(2, "0");

  return (
    <section ref={sectionRef} id="works" className={styles.section} aria-label="Selected works">
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div>
            <p className={styles.eyebrow}>01 / WHAT WE’VE BUILT</p>
            <h2 className={styles.heading}>SELECTED<br /><span>WORKS.</span></h2>
            <p className={styles.intro}>A selection of digital products and systems we’ve brought to life.</p>
          </div>
          <div className={styles.pagination}>
            <p className={styles.counter} aria-live="polite"><span>00.</span><span className={styles.counterDigit} key={number}>{number}</span></p>
            <div className={styles.progressTrack} role="progressbar" aria-label="Project position" aria-valuemin={1} aria-valuemax={projects.length} aria-valuenow={progressIndex + 1}>
              <span className={styles.progressFill} style={{ width: `${((progressIndex + 1) / projects.length) * 100}%` }} />
            </div>
            <div className={styles.buttons}>
              <button type="button" className={styles.arrow} onClick={() => switchTo(index - 1)} disabled={busy || index === 0} aria-label="Previous project">←</button>
              <button type="button" className={styles.arrow} onClick={() => switchTo(index + 1)} disabled={busy || index === projects.length - 1} aria-label="Next project">→</button>
            </div>
          </div>
        </aside>
        <div className={styles.featured}>
          <div className={styles.imageFrame} onPointerMove={handleMove} onPointerLeave={() => setMagnet({ x: 0, y: 0 })}>
            <div className={`${styles.imageSurface} ${phase === "exit" ? styles.imageExit : ""} ${phase === "enter" ? styles.imageEnter : ""}`} style={{ transform: `translate3d(${magnet.x}px, ${magnet.y}px, 0) scale(1.035)` }}>
              {/* Plain img allows external sample URLs; switch to next/image if images are local. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={current.id} src={current.image} alt={current.imageAlt || `${current.name} project preview`} draggable={false} className={styles.image} />
            </div>
            <a className={styles.viewProject} href={current.url} aria-label={`View ${current.name} project`}>VIEW PROJECT <span aria-hidden="true">↗</span></a>
          </div>
          <div className={`${styles.meta} ${phase === "exit" ? styles.metaExit : ""} ${phase === "enter" ? styles.metaEnter : ""}`} key={`${current.id}-${phase}`}>
            <div className={styles.titleWrap}>
              <p className={styles.category}>{current.category}</p>
              <h3 className={styles.projectName}>{current.name}</h3>
            </div>
            <p className={styles.description}>{current.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
