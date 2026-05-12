"use client";

import { useEffect, useRef, type ReactNode } from "react";

function readScrollY(): number {
  if (typeof window === "undefined") return 0;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/**
 * Scroll-linked to `#heading`: offset Y 0, speed 120% / 110% vs scroll position from section top.
 */
export function AboutPageHeading({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!section || !l1 || !l2) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (mq.matches) {
        l1.style.removeProperty("transform");
        l2.style.removeProperty("transform");
        return;
      }
      const scrollY = readScrollY();
      const sectionTop = section.getBoundingClientRect().top + scrollY;
      const rel = scrollY - sectionTop;
      l1.style.transform = `translate3d(0, ${rel * (1.2 - 1)}px, 0)`;
      l2.style.transform = `translate3d(0, ${rel * (1.1 - 1)}px, 0)`;
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    mq.addEventListener("change", apply);

    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      mq.removeEventListener("change", apply);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="heading"
      className="aboutpage__heading-wrapper"
    >
      <div className="aboutpage__image-slot">{children}</div>
      <h1 className="aboutpage__heading-title">
        <span className="aboutpage__heading-line-wrap aboutpage__heading-line-wrap--1">
          <span ref={line1Ref} className="aboutpage__heading-line-parallax">
            <span className="heading-1 aboutpage__heading-line--1">Finnegan</span>
          </span>
        </span>
        <span className="aboutpage__heading-line-wrap aboutpage__heading-line-wrap--2">
          <span ref={line2Ref} className="aboutpage__heading-line-parallax">
            <span className="heading-1 aboutpage__heading-line--2">Manroe</span>
          </span>
        </span>
      </h1>
    </div>
  );
}
