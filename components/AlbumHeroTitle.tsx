"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Framer Appear → Enter: offset Y −150, spring physics */
const APPEAR_SPRING = {
  type: "spring" as const,
  stiffness: 59,
  damping: 37,
  mass: 1,
  delay: 0,
};

type AlbumHeroTitleProps = {
  id: string;
  className: string;
  children: ReactNode;
};

export function AlbumHeroTitle({ id, className, children }: AlbumHeroTitleProps) {
  const reduceMotion = useReducedMotion();

  const title = reduceMotion ? (
    <h1 id={id} className={className}>
      {children}
    </h1>
  ) : (
    <motion.h1
      id={id}
      className={className}
      initial={{ y: -150 }}
      whileInView={{ y: 0 }}
      transition={APPEAR_SPRING}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.h1>
  );

  /* Centering stays on a non-motion wrapper so Motion’s transform never overrides `translateX(-50%)` (avoids a horizontal slide on hard refresh). */
  return <div className="album-page__hero-title-anchor">{title}</div>;
}
