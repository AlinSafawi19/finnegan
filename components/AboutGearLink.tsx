"use client";

import {
  Aperture,
  Asterisk,
  Camera,
  Laptop,
  type IconProps as PhosphorIconProps,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useState, type ComponentType } from "react";
import type { GearIconKind } from "@/data/about-gears";

/** Framer Transition: Spring, Physics — stiffness 500, damping 60, mass 1, delay 0. */
const GEAR_LINK_HOVER_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 60,
  mass: 1,
  delay: 0,
} as const;

const GEAR_LINK_HOVER_TWEEN = {
  type: "tween" as const,
  duration: 0.12,
  ease: "easeOut" as const,
};

const gearIcons = {
  camera: Camera,
  aperture: Aperture,
  asterisk: Asterisk,
  laptop: Laptop,
} as const satisfies Record<
  GearIconKind,
  ComponentType<PhosphorIconProps>
>;

export type AboutGearLinkProps = {
  href: string;
  text: string;
  icon: GearIconKind;
};

export function AboutGearLink({ href, text, icon }: AboutGearLinkProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const transition = reduceMotion ? GEAR_LINK_HOVER_TWEEN : GEAR_LINK_HOVER_SPRING;

  const IconCmp = gearIcons[icon];

  return (
    <motion.a
      href={href}
      className="aboutpage__gear-link"
      target="_blank"
      rel="noopener noreferrer"
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <span className="aboutpage__gear-icon-wrap" aria-hidden>
        <IconCmp
          size={22}
          weight="duotone"
          color="var(--color-deep-orange)"
        />
      </span>
      <motion.span
        className="paragraph-s aboutpage__gear-text"
        initial={{ color: "var(--color-gray-mid)" }}
        animate={{
          color: active
            ? "var(--color-light-orange)"
            : "var(--color-gray-mid)",
        }}
        transition={transition}
      >
        {text}
      </motion.span>
    </motion.a>
  );
}
