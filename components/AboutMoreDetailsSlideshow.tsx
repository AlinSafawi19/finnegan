"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_ADVANCE_MS = 5000;
const AUTO_ADVANCE_MS_REDUCED_MOTION = 9000;

/** Transition panel — variant change (Physics): stiffness 59, damping 60, mass 1, delay 0. */
const variantSpring = {
  type: "spring" as const,
  stiffness: 59,
  damping: 60,
  mass: 1,
  delay: 0,
};

/** Scroll-linked transform settle — Transition panel: stiffness 258, damping 60, mass 1. */
const scrollSpringConfig = {
  stiffness: 258,
  damping: 60,
  mass: 1,
};

const FRAMER_IMAGES = [
  "https://framerusercontent.com/images/VnwD1MTZjQzM6ulzcuSc4Mp68tM.jpg?scale-down-to=1024",
  "https://framerusercontent.com/images/4iUrWWv7CAxK6Uy73hlsQp7OA.jpg?scale-down-to=1024",
  "https://framerusercontent.com/images/ZrFf4uKrKE1wIU6EOdvaWrU.jpg?scale-down-to=1024",
] as const;

const VARIANT_IMAGES: [string, string, string][] = [
  [FRAMER_IMAGES[0], FRAMER_IMAGES[1], FRAMER_IMAGES[2]],
  [FRAMER_IMAGES[1], FRAMER_IMAGES[2], FRAMER_IMAGES[0]],
  [FRAMER_IMAGES[2], FRAMER_IMAGES[0], FRAMER_IMAGES[1]],
];

type VariantStackProps = {
  images: [string, string, string];
  stackKey: number;
};

function VariantStack({ images, stackKey }: VariantStackProps) {
  const reduceMotion = useReducedMotion();
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start end", "end start"],
  });

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 156]);

  const scale = useSpring(scaleRaw, reduceMotion ? { stiffness: 400, damping: 40 } : scrollSpringConfig);
  const y = useSpring(yRaw, reduceMotion ? { stiffness: 400, damping: 40 } : scrollSpringConfig);

  return (
    <div ref={scrollTargetRef} className="aboutpage__slideshow-variant-inner">
      <motion.div
        className="aboutpage__slideshow-motion-root"
        style={{ scale, y }}
      >
        {images.map((src, index) => (
          <div
            key={`${stackKey}-${src}-${index}`}
            className="aboutpage__slideshow-image-layer"
            style={{ backgroundImage: `url(${src})`, zIndex: index }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function AboutMoreDetailsSlideshow() {
  const [variantIndex, setVariantIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const goNext = useCallback(() => {
    setVariantIndex((i) => (i + 1) % 3);
  }, []);

  useEffect(() => {
    const ms = reduceMotion ? AUTO_ADVANCE_MS_REDUCED_MOTION : AUTO_ADVANCE_MS;
    const id = window.setInterval(() => {
      setVariantIndex((i) => (i + 1) % 3);
    }, ms);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const blendTransition = reduceMotion
    ? {
        opacity: { duration: 0.22, ease: "easeInOut" as const },
        scale: { duration: 0.2, ease: "easeOut" as const },
      }
    : {
        opacity: { duration: 0.58, ease: [0.45, 0, 0.55, 1] as [number, number, number, number] },
        scale: variantSpring,
      };

  const enterInitial = reduceMotion
    ? { opacity: 0, scale: 1 }
    : { opacity: 0, scale: 1.3 };

  return (
    <div className="aboutpage__more-details-slideshow" role="region" aria-label="Image slideshow">
      <button
        type="button"
        className="aboutpage__slideshow-frame"
        aria-label="Next slideshow variant"
        onClick={goNext}
      >
        <div className="aboutpage__slideshow-perspective">
          <div className="aboutpage__slideshow-blend">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={variantIndex}
                className="aboutpage__slideshow-variant-layer"
                initial={enterInitial}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={blendTransition}
              >
                <VariantStack stackKey={variantIndex} images={VARIANT_IMAGES[variantIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </button>
    </div>
  );
}
