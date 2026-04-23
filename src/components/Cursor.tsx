"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const crsr = document.getElementById("crsr");
    const ring = document.getElementById("crsr-ring");
    if (!crsr || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      crsr.style.left = mx + "px";
      crsr.style.top = my + "px";
    };

    document.addEventListener("mousemove", onMouseMove);

    function rloop() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring!.style.left = rx + "px";
      ring!.style.top = ry + "px";
      raf = requestAnimationFrame(rloop);
    }
    rloop();

    const handleEnter = () => {
      ring!.style.width = "52px";
      ring!.style.height = "52px";
      ring!.style.borderColor = "rgba(255,106,0,.5)";
    };
    const handleLeave = () => {
      ring!.style.width = "38px";
      ring!.style.height = "38px";
      ring!.style.borderColor = "rgba(255,106,0,.3)";
    };

    const attachHover = () => {
      const els = document.querySelectorAll("button, a, .feat, .ptab, .lg, .soc");
      els.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    // Give components time to mount
    setTimeout(attachHover, 500);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      const els = document.querySelectorAll("button, a, .feat, .ptab, .lg, .soc");
      els.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="crsr" />
      <div id="crsr-ring" />
    </>
  );
}
