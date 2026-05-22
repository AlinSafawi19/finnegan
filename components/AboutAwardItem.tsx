"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  useId,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

/** Spring transition: stiffness 500, damping 60, mass 1, delay 0. */
const AWARD_ITEM_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 60,
  mass: 1,
  delay: 0,
} as const;

const AWARD_ITEM_TWEEN = {
  type: "tween" as const,
  duration: 0.2,
  ease: "easeOut" as const,
};

export type AboutAwardItemProps = {
  /** Optional leading date column (Body 1). */
  date?: string;
  /** Award index / code (Body 1). */
  serial: string;
  /** Award name (Body 3). */
  title: string;
  /** Trailing column, opposite `justify-content: space-between` (Body 1). */
  year: string;
  imageSrc: string;
  imageAlt: string;
  defaultOpen?: boolean;
};

export function AboutAwardItem({
  date,
  serial,
  title,
  year,
  imageSrc,
  imageAlt,
  defaultOpen = false,
}: AboutAwardItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [hovered, setHovered] = useState(false);
  const contentId = useId();
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? AWARD_ITEM_TWEEN : AWARD_ITEM_SPRING;

  const padClosed = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
  };
  const padClosedHover = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
  };

  const toggle = () => setOpen((v) => !v);

  const onAwardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-controls={contentId}
      aria-label={`${title}, ${year}`}
      className={
        open
          ? "aboutpage__award-item aboutpage__award-item--open"
          : "aboutpage__award-item aboutpage__award-item--closed"
      }
      style={
        {
          "--about-award-image": `url("${imageSrc}")`,
        } as CSSProperties
      }
      initial={false}
      animate={{
        ...(open ? padClosed : hovered ? padClosedHover : padClosed),
      }}
      transition={transition}
      onClick={toggle}
      onKeyDown={onAwardKeyDown}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="aboutpage__award-header">
        <span className="aboutpage__award-cluster">
          {date ? (
            <span className="body-1 aboutpage__award-date">{date}</span>
          ) : null}
          <span className="aboutpage__award-serial-title">
            <span className="body-1 aboutpage__award-serial">{serial}</span>
            <span className="body-3 aboutpage__award-title-text">{title}</span>
          </span>
        </span>
        <span className="body-1 aboutpage__award-year">{year}</span>
      </div>

      <motion.div
        id={contentId}
        className="aboutpage__award-image-slot"
        role="group"
        aria-label={imageAlt}
        aria-hidden={!open}
        initial={false}
        animate={
          open
            ? { height: 525, opacity: 1, marginTop: 10 }
            : { height: 0, opacity: 0, marginTop: 0 }
        }
        transition={transition}
      >
        <div className="aboutpage__award-image" />
      </motion.div>

      <motion.div
        className="aboutpage__award-image-hover"
        aria-hidden
        initial={false}
        animate={{
          opacity: !open && hovered ? 1 : 0,
        }}
        transition={transition}
      />
    </motion.div>
  );
}
