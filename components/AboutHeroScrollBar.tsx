"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Body1 } from "@/components/Body1";
import { Icon } from "@/components/phosphor_1";

function readScrollY(): number {
  if (typeof window === "undefined") return 0;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/**
 * About hero bottom bar (same markup as home hero headline-other).
 * Desktop / tablet: opacity 1 → 0 over the first stretch of page scroll.
 */
export function AboutHeroScrollBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const mqMobile = window.matchMedia("(max-width: 809px)");

    const fadeDistancePx = () =>
      Math.min(420, Math.max(200, window.innerHeight * 0.42));

    const apply = () => {
      if (mqMobile.matches) {
        bar.style.removeProperty("opacity");
        bar.style.removeProperty("pointer-events");
        return;
      }
      const y = readScrollY();
      const end = fadeDistancePx();
      const o = Math.max(0, Math.min(1, 1 - y / end));
      bar.style.opacity = String(o);
      bar.style.pointerEvents = o < 0.03 ? "none" : "";
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    mqMobile.addEventListener("change", apply);

    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      mqMobile.removeEventListener("change", apply);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="hero__heading-headline-other aboutpage__hero-scroll-bar"
      role="presentation"
    >
      <div className="hero__heading-headline-other-label">
        <Body1>FINNEGAN MONROE PHOTOGRAPHY</Body1>
      </div>
      <div
        className="hero__heading-headline-other-stack"
        role="group"
        aria-label="Scroll to explore"
      >
        <span className="hero__heading-headline-stack-icon">
          <Icon
            name="ArrowDown"
            width={12}
            height={12}
            weight="bold"
            mirrored={false}
            color="currentColor"
            aria-hidden
          />
        </span>
        <div className="hero__heading-headline-stack-text">
          <Body1>Scroll to Explore</Body1>
        </div>
      </div>
      <div className="hero__heading-headline-other-cta">
        <Link
          href="/contact"
          className="body-1 link-light aboutpage__hero-scroll-cta-link"
        >
          WORK WITH ME
        </Link>
      </div>
    </div>
  );
}
