"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Layer tracks vertical scroll at 60% rate (parallax factor = 1 − 0.6 on translateY). */
const SCROLL_SPEED = 0.6;
const PARALLAX_Y_FACTOR = 1 - SCROLL_SPEED;

type AlbumHeroImageScrollProps = {
  className?: string;
  style?: CSSProperties;
};

export function AlbumHeroImageScroll({
  className,
  style,
}: AlbumHeroImageScrollProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (latest) => latest * PARALLAX_Y_FACTOR);

  return (
    <motion.div
      className={className}
      style={reduceMotion ? style : { ...style, y }}
      aria-hidden="true"
    />
  );
}
