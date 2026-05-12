"use client";

import { motion } from "motion/react";
import { Body1 } from "@/components/Body1";
import { contactHoverSpring } from "@/components/ContactHoverScale";
import { Icon, type PhosphorIconName } from "@/components/phosphor_1";

export type SocialContactCardProps = {
  href: string;
  label: string;
  icon: PhosphorIconName;
  className?: string;
  /** Translate X on hover (px). Design: 0. */
  hoverTranslateX?: number;
  /** Translate Y on hover (px). Design: 218. */
  hoverTranslateY?: number;
};

/**
 * Social link as a compact contact card (variant 1): frosted white panel, Phosphor icon (34× fill, creamy white),
 * Body 1 label. Hover: scale 0.95 (same spring as email/phone on Contact), optional spring translate,
 * deep-orange border, deep-orange icon.
 * Expects a `position: relative` ancestor for absolute placement.
 */
export function SocialContactCard({
  href,
  label,
  icon,
  className,
  hoverTranslateX = 0,
  hoverTranslateY = 218,
}: SocialContactCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={["social-contact-card", "social-contact-card--v1", className]
        .filter(Boolean)
        .join(" ")}
      initial={{ x: 0, y: 0, scale: 1, borderColor: "transparent" }}
      whileHover={{
        x: hoverTranslateX,
        y: hoverTranslateY,
        scale: 0.95,
        borderColor: "var(--color-deep-orange)",
      }}
      transition={contactHoverSpring}
    >
      <span className="social-contact-card__icon">
        <Icon
          name={icon}
          size={34}
          weight="fill"
          color="currentColor"
          aria-hidden
        />
      </span>
      <Body1 className="social-contact-card__label">{label}</Body1>
    </motion.a>
  );
}
