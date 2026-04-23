"use client";
import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "", delay = "" }: { children: React.ReactNode; className?: string; delay?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("vis"); obs.unobserve(el); }
    }, { threshold: 0.07, rootMargin: "0px 0px -50px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`rvy ${delay} ${className}`}>{children}</div>;
}
