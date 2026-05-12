"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Scroll animation — Spring: stiffness 362, damping 100, mass 1, delay 0. */
export const aboutScrollRevealSpring = {
  type: "spring" as const,
  stiffness: 362,
  damping: 100,
  mass: 1,
  delay: 0,
};

type AboutScrollRevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Layer in view: from Y 170 → 0, opacity 1, spring above; replay off (`viewport.once`).
 * Matches Framer “Enter” (offset Y 170) + start when layer enters viewport.
 */
export function AboutScrollReveal({ children, className }: AboutScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { y: 170, opacity: 1 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={
        reduceMotion
          ? { type: "tween", duration: 0.2, ease: "easeOut" }
          : aboutScrollRevealSpring
      }
    >
      {children}
    </motion.div>
  );
}
