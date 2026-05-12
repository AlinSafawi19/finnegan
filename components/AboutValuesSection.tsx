"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

/** Framer scroll-transform spring (all value rows). */
const VALUE_SCROLL_SPRING = {
  stiffness: 232,
  damping: 60,
  mass: 1,
};

/**
 * Scroll progress (0→1 across the section) at which rotation reaches its target.
 * Lower = full tilt earlier (more rotation while the row is still moving, before sticky dominates).
 */
const VALUE_ROTATE_PROGRESS_AT_FULL = 0.32;

const VALUES: { key: string; label: string }[] = [
  { key: "creative-vision", label: "Creative Vision" },
  { key: "professionalism", label: "Professionalism" },
  { key: "passion", label: "Passion" },
  { key: "adaptability", label: "Adaptability" },
];

/**
 * Framer “Section in View” + viewport center: progress 0 when section start
 * hits viewport center, 1 when section end hits viewport center.
 * From rotate 0 → To rotate `rotateToDeg`; target angle is reached by
 * `VALUE_ROTATE_PROGRESS_AT_FULL` of section progress (then held).
 */
function AboutValueScrollRow({
  sectionId,
  label,
  zIndex,
  rotateToDeg,
  reduceMotion,
}: {
  sectionId: string;
  label: string;
  zIndex: number;
  rotateToDeg: number;
  reduceMotion: boolean | null;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const rotateRaw = useTransform(
    scrollYProgress,
    [0, VALUE_ROTATE_PROGRESS_AT_FULL, 1],
    [0, rotateToDeg, rotateToDeg],
  );
  const rotateSpring = useSpring(rotateRaw, VALUE_SCROLL_SPRING);

  return (
    <div
      ref={sectionRef}
      id={sectionId}
      className="aboutpage__values-item"
      style={{ zIndex }}
    >
      <motion.div
        className="aboutpage__value-card"
        style={
          reduceMotion
            ? undefined
            : {
                rotate: rotateSpring,
              }
        }
      >
        <p className="aboutpage__value-card-title">{label}</p>
      </motion.div>
    </div>
  );
}

export function AboutValuesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="aboutpage__values"
      aria-labelledby="about-values-heading"
    >
      <div className="aboutpage__values-heading-wrap">
        <h2
          id="about-values-heading"
          className="heading-2-s aboutpage__values-title"
        >
          What you will find in me
        </h2>
      </div>

      <AboutValueScrollRow
        sectionId="value-1"
        label={VALUES[0].label}
        zIndex={2}
        rotateToDeg={10}
        reduceMotion={reduceMotion}
      />
      <AboutValueScrollRow
        sectionId="value-2"
        label={VALUES[1].label}
        zIndex={3}
        rotateToDeg={-5}
        reduceMotion={reduceMotion}
      />
      <AboutValueScrollRow
        sectionId="value-3"
        label={VALUES[2].label}
        zIndex={4}
        rotateToDeg={4}
        reduceMotion={reduceMotion}
      />
      <AboutValueScrollRow
        sectionId="value-4"
        label={VALUES[3].label}
        zIndex={5}
        rotateToDeg={-6}
        reduceMotion={reduceMotion}
      />
    </section>
  );
}
