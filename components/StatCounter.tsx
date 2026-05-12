"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: number;
  min?: number;
  max?: number;
  stiffness?: number;
  damping?: number;
  className?: string;
  /**
   * Intersection threshold used to trigger the animation.
   * Higher values reduce accidental retriggers while scrolling.
   */
  inViewThreshold?: number;
};

/**
 * Counts up to `value` with a damped spring (stiffness / damping match design spec).
 */
export function StatCounter({
  value,
  min = 0,
  max = 1000,
  stiffness = 50,
  damping = 44,
  className,
  inViewThreshold = 0.45,
}: StatCounterProps) {
  const [display, setDisplay] = useState(min);
  const rafRef = useRef<number>(0);
  const elRef = useRef<HTMLSpanElement>(null);
  const [playId, setPlayId] = useState(0);
  const prefersReducedMotionRef = useRef(false);
  const wasInViewRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = Boolean(mql?.matches);
    const onChange = () => {
      prefersReducedMotionRef.current = Boolean(mql?.matches);
    };
    if (mql?.addEventListener) mql.addEventListener("change", onChange);
    else mql?.addListener?.(onChange);
    return () => {
      if (mql?.removeEventListener) mql.removeEventListener("change", onChange);
      else mql?.removeListener?.(onChange);
    };
  }, []);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: animate immediately if IO isn't available.
      setPlayId((x) => x + 1);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        const inView = e.isIntersecting;
        const wasInView = wasInViewRef.current;
        wasInViewRef.current = inView;

        if (inView && !wasInView) setPlayId((x) => x + 1);
        if (!inView && wasInView) {
          cancelAnimationFrame(rafRef.current);
          setDisplay(min);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: [inViewThreshold],
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inViewThreshold, min]);

  useEffect(() => {
    const target = Math.min(max, Math.max(min, value));
    if (prefersReducedMotionRef.current) {
      cancelAnimationFrame(rafRef.current);
      setDisplay(target);
      return;
    }

    let pos = min;
    let vel = 0;
    const dt = 1 / 60;
    const mass = 1;
    let frames = 0;
    const maxFrames = 360;

    const tick = () => {
      const accel = (stiffness * (target - pos) - damping * vel) / mass;
      vel += accel * dt;
      pos += vel * dt;
      pos = Math.min(max, Math.max(min, pos));
      setDisplay(Math.round(pos));
      frames += 1;

      if (
        frames >= maxFrames ||
        (Math.abs(target - pos) < 0.01 && Math.abs(vel) < 0.05)
      ) {
        setDisplay(target);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playId, value, min, max, stiffness, damping]);

  return (
    <span ref={elRef} className={className} aria-live="polite">
      {display}
    </span>
  );
}
