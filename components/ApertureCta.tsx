"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

function ApertureBladeSvg() {
  return (
    <svg
      className="aperture-cta__blade-svg"
      width={118}
      height={103}
      viewBox="0 0 118 103"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g transform="translate(1.73 2.89)">
        <path
          className="aperture-cta__blade-path"
          d="M57.1575 0 L114.315 99 L0 99 Z"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  );
}

/** Spring transition: stiffness 170, damping 47, mass 4.5, delay 0. */
function useApertureSpring() {
  const reduce = useReducedMotion();
  return useMemo(
    () =>
      reduce
        ? { type: "tween" as const, duration: 0.12, ease: "easeOut" as const }
        : {
            type: "spring" as const,
            stiffness: 170,
            damping: 47,
            mass: 4.5,
            delay: 0,
          },
    [reduce],
  );
}

/** Stack fill: no visible color cross-fade (spring would smear transparent → cream). */
const STACK_FILL_TRANSITION = {
  backgroundColor: { type: "tween" as const, duration: 0, ease: "linear" as const },
  zIndex: { type: "tween" as const, duration: 0, ease: "linear" as const },
};

/**
 * Aperture-style CTA (variant 1): circular chrome, six triangular blades, centered label.
 */
export function ApertureCta() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = hovered || focused;
  const transition = useApertureSpring();

  return (
    <Link
      href="/contact"
      className="aperture-cta aperture-cta--v1"
      aria-label="Contact — Let's talk"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <motion.div
        className="aperture-cta__surface"
        initial="idle"
        animate={active ? "hover" : "idle"}
        transition={transition}
        style={{ position: "absolute", inset: 0 }}
      >
        <motion.div
          className="aperture-cta__blade aperture-cta__blade--1"
          aria-hidden
          variants={{
            idle: { top: 4, left: -46, zIndex: -2 },
            hover: { top: 24, left: -30, zIndex: 1 },
          }}
          transition={transition}
        >
          <ApertureBladeSvg />
        </motion.div>
        <motion.div
          className="aperture-cta__blade aperture-cta__blade--2"
          aria-hidden
          variants={{
            idle: { top: -45, left: 39, zIndex: -2 },
            hover: { top: -25, left: 23, zIndex: 1 },
          }}
          transition={transition}
        >
          <ApertureBladeSvg />
        </motion.div>
        <motion.div
          className="aperture-cta__blade aperture-cta__blade--3"
          aria-hidden
          variants={{
            idle: { top: -2, right: -40, zIndex: -2 },
            hover: { top: -3, right: -17, zIndex: 1 },
          }}
          transition={transition}
        >
          <ApertureBladeSvg />
        </motion.div>
        <motion.div
          className="aperture-cta__blade aperture-cta__blade--4"
          aria-hidden
          variants={{
            idle: { bottom: 4, right: -42, zIndex: -2 },
            hover: { bottom: 21, right: -32, zIndex: 1 },
          }}
          transition={transition}
        >
          <ApertureBladeSvg />
        </motion.div>
        <motion.div
          className="aperture-cta__blade aperture-cta__blade--5"
          aria-hidden
          variants={{
            idle: { bottom: -45, right: 39, zIndex: -2 },
            hover: { bottom: -24, right: 24, zIndex: 1 },
          }}
          transition={transition}
        >
          <ApertureBladeSvg />
        </motion.div>
        <motion.div
          className="aperture-cta__blade aperture-cta__blade--6"
          aria-hidden
          variants={{
            idle: { bottom: -4, left: -42, zIndex: -2 },
            hover: { bottom: -6, left: -16, zIndex: 1 },
          }}
          transition={transition}
        >
          <ApertureBladeSvg />
        </motion.div>
        <div className="aperture-cta__frame">
          <motion.div
            className="aperture-cta__stack"
            variants={{
              idle: {
                backgroundColor: "rgba(250, 245, 235, 0)",
                zIndex: 0,
              },
              hover: {
                backgroundColor: "var(--color-creamy-white)",
                zIndex: 0,
              },
            }}
            transition={STACK_FILL_TRANSITION}
          >
            <span className="aperture-cta__text">Let&apos;s Talk</span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
