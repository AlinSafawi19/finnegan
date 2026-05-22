"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import "./album-button-link.css";

/** Spring transition: stiffness 500, damping 60, mass 1, delay 0. */
const HOVER_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 60,
  mass: 1,
  delay: 0,
} as const;

const REDUCED_MOTION_TRANSITION = {
  type: "tween" as const,
  duration: 0.01,
  ease: "linear" as const,
};

const MotionLink = motion.create(Link);

const linkVariants = {
  rest: { zIndex: 0 },
  hover: { zIndex: 167 },
} as const;

export type AlbumButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function AlbumButtonLink({
  href,
  children,
  className,
}: AlbumButtonLinkProps) {
  const reduceMotion = useReducedMotion();
  const transition = useMemo((): Transition => {
    if (reduceMotion) {
      return REDUCED_MOTION_TRANSITION;
    }
    return HOVER_SPRING;
  }, [reduceMotion]);

  const linkRef = useRef<HTMLAnchorElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  hoveredRef.current = hovered;

  const [narrowPx, setNarrowPx] = useState(0);
  const [widePx, setWidePx] = useState(0);
  /** Circle diameter so the frame covers the whole button (rect diagonal + bleed). */
  const [fillDiameter, setFillDiameter] = useState(222);

  const measureWidths = useCallback(() => {
    const link = linkRef.current;
    const row = rowRef.current;
    if (!link || !row) return;

    const cs = getComputedStyle(link);
    const pl = parseFloat(cs.paddingLeft) || 0;
    const pr = parseFloat(cs.paddingRight) || 0;
    const inner = link.clientWidth - pl - pr;
    setWidePx(Math.max(0, inner));

    if (!hoveredRef.current) {
      const prev = row.style.width;
      row.style.width = "max-content";
      setNarrowPx(row.getBoundingClientRect().width);
      row.style.width = prev;
    }

    const w = link.clientWidth;
    const h = link.clientHeight;
    setFillDiameter(Math.ceil(Math.hypot(w, h) + 4));
  }, []);

  useLayoutEffect(() => {
    const link = linkRef.current;
    if (!link || typeof ResizeObserver === "undefined") return;

    measureWidths();
    const ro = new ResizeObserver(measureWidths);
    ro.observe(link);
    return () => ro.disconnect();
  }, [measureWidths, children]);

  const frameRest = useMemo(
    () => ({
      width: 0,
      height: 0,
      top: 29,
      left: "50%",
      x: "-50%",
      y: 0,
      opacity: 0,
    }),
    [],
  );

  const frameHover = useMemo(
    () => ({
      width: fillDiameter,
      height: fillDiameter,
      top: "50%",
      left: "50%",
      x: "-50%",
      y: "-50%",
      opacity: 1,
    }),
    [fillDiameter],
  );

  const rowWidth =
    narrowPx > 0 && widePx > 0 ? (hovered ? widePx : narrowPx) : undefined;

  const classes = ["album-btn-link", className].filter(Boolean).join(" ");

  return (
    <MotionLink
      ref={linkRef}
      href={href}
      className={classes}
      variants={linkVariants}
      animate={hovered ? "hover" : "rest"}
      initial="rest"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      transition={transition}
    >
      <motion.span
        className="album-btn-link__frame"
        animate={hovered ? frameHover : frameRest}
        transition={transition}
        aria-hidden
      />
      <motion.div
        ref={rowRef}
        className="album-btn-link__row"
        animate={{
          width: rowWidth ?? "auto",
        }}
        transition={transition}
      >
        <span className="album-btn-link__label">{children}</span>
        <motion.span
          className="album-btn-link__icon"
          animate={{ rotate: hovered ? -45 : 0 }}
          transition={transition}
          aria-hidden
        >
          <ArrowRight size={27} weight="regular" aria-hidden />
        </motion.span>
      </motion.div>
    </MotionLink>
  );
}
