"use client";

import { useEffect, useRef } from "react";

function readScrollY(): number {
  if (typeof window === "undefined") return 0;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/**
 * Scroll speed 90% → layer lags page scroll by 10% (Framer-style parallax).
 */
export function AboutPageImage() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (mq.matches) {
        el.style.removeProperty("transform");
        return;
      }
      const scrollY = readScrollY();
      const y = scrollY * (1 - 0.9);
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    mq.addEventListener("change", apply);

    return () => {
      window.removeEventListener("scroll", apply);
      mq.removeEventListener("change", apply);
    };
  }, []);

  return (
    <div className="aboutpage__image-parallax" ref={parallaxRef}>
      <div className="aboutpage__image" />
    </div>
  );
}
