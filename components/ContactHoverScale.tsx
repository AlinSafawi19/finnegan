"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Spring from design: stiffness 39, damping 19, mass 1, delay 0 — hover scale 0.95. */
export const contactHoverSpring = {
  type: "spring" as const,
  stiffness: 39,
  damping: 19,
  mass: 1,
  delay: 0,
} as const;

type ContactHoverScaleProps = {
  children: ReactNode;
  className?: string;
};

export function ContactHoverScale({ children, className }: ContactHoverScaleProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1 }}
      whileHover={{ scale: 0.95 }}
      transition={contactHoverSpring}
    >
      {children}
    </motion.div>
  );
}
