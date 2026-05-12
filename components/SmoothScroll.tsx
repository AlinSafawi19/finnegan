"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function readIntensity(): number {
  if (typeof document === "undefined") return 12;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--scroll-smooth-intensity")
    .trim();
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : 12;
}

function intensityToLerp(intensity: number): number {
  return Math.min(1, Math.max(0.01, intensity / 100));
}

/**
 * Global smooth scrolling via [Lenis](https://github.com/darkroomengineering/lenis).
 * `lerp` follows `--scroll-smooth-intensity` in `globals.css` (default 12 → 0.12).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lerp = intensityToLerp(readIntensity());
    const lenis = new Lenis({
      autoRaf: true,
      lerp,
      smoothWheel: true,
      syncTouch: true,
    });

    const CAPTURE = true;
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const a = target.closest('a[href^="#"]');
      if (!(a instanceof HTMLAnchorElement)) return;

      const href = a.getAttribute("href") ?? "";
      if (href === "#" || href === "#!") return;

      const id = href.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, { offset: 0 });
      history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onAnchorClick, { capture: CAPTURE });

    return () => {
      document.removeEventListener("click", onAnchorClick, { capture: CAPTURE });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
