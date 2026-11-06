"use client";
import { useCallback, useState } from "react";
import SelectedWorks from "../components/SelectedWorks";
import NodeworksNavbar from "../components/NodeworksNavbar";

export default function Page() {
  const [worksActive, setWorksActive] = useState(false);
  const onActiveChange = useCallback((active: boolean) => setWorksActive(active), []);
  return <main>
    <NodeworksNavbar compact={worksActive} />
    {/* Your actual hero goes here. This div is a placeholder for the demo. */}
    <section id="home" style={{ minHeight: "100svh", display: "grid", placeItems: "center", background: "#ffffff", color: "#0b1945", textAlign: "center", padding: 24 }}>
      <div><p style={{ color: "#2454f4", letterSpacing: ".18em", fontWeight: 800 }}>NODEWORKS</p><h1 style={{ fontSize: "clamp(40px, 8vw, 108px)", lineHeight: 1, margin: "16px auto" }}>BUILD BETTER<br />SYSTEMS.</h1><a href="#works" style={{ color: "#2454f4" }}>Explore selected works ↓</a></div>
    </section>
    <SelectedWorks onActiveChange={onActiveChange} />
  </main>;
}
