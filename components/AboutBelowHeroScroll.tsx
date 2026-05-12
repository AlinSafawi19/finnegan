"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { AboutBookSessionCTA } from "@/components/AboutBookSessionCTA";
import { AboutMoreDetailsSlideshow } from "@/components/AboutMoreDetailsSlideshow";
import { AboutScrollReveal } from "@/components/AboutScrollReveal";
import { ParagraphL } from "@/components/ParagraphL";
import { ParagraphS } from "@/components/ParagraphS";

/**
 * Top intro: scroll transform vs `#more-details` (Section in View).
 * From: opacity 1, scale 1, offset 0 — To: opacity 0, scale 0.5 (padding 100 top/bottom on `.aboutpage__top-text`).
 */
export function AboutBelowHeroScroll() {
  const moreDetailsRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: moreDetailsRef,
    offset: ["start end", "end start"],
  });

  /** Fade + scale in the first ~⅓ of the range so intro never sits semi-transparent over #more-details. */
  const opacityRaw = useTransform(
    scrollYProgress,
    [0, 0.08, 0.2, 0.34],
    [1, 0.92, 0.35, 0],
  );
  const scaleRaw = useTransform(
    scrollYProgress,
    [0, 0.08, 0.2, 0.34],
    [1, 0.97, 0.72, 0.5],
  );

  const introSpring = { stiffness: 72, damping: 26, mass: 1 };
  const opacity = useSpring(opacityRaw, introSpring);
  const scale = useSpring(scaleRaw, introSpring);

  return (
    <>
      <motion.section
        className="aboutpage__top-text"
        aria-label="Introduction"
        style={
          reduceMotion
            ? undefined
            : {
                opacity,
                scale,
                transformOrigin: "50% 50%",
              }
        }
      >
        <div className="aboutpage__top-text-inner">
          <ParagraphL className="aboutpage__top-text-body">
            Hi there! I&apos;m{" "}
            <span className="aboutpage__top-text-accent">Finnegan Manroe</span>, a
            passionate photographer based in the vibrant city of{" "}
            <span className="aboutpage__top-text-accent">Seattle</span>. With over a
            decade of experience behind the lens, I specialize in capturing the{" "}
            <span className="aboutpage__top-text-accent">
              unique beauty of life&apos;s fleeting moments
            </span>
            , from intimate portraits and breathtaking landscapes to dynamic product
            shots and lively events.
          </ParagraphL>
        </div>
      </motion.section>
      <section
        ref={moreDetailsRef}
        id="more-details"
        className="aboutpage__more-details"
        aria-label="More details"
      >
        <AboutMoreDetailsSlideshow />
        <div className="aboutpage__more-details-content">
          <AboutScrollReveal className="aboutpage__more-details-reveal">
            <ParagraphS>
              My journey into photography began as a curious child with a disposable camera, fascinated by the world&apos;s colors and light. Over the years, this hobby transformed into a full-blown love affair with visual storytelling. Each click of the shutter is my way of freezing time, preserving emotions, and narrating stories that words alone can&apos;t convey.
            </ParagraphS>
          </AboutScrollReveal>
          <AboutScrollReveal className="aboutpage__more-details-reveal">
            <ParagraphL>
              I&apos;ve had the privilege of working with{" "}
              <span className="aboutpage__more-details-accent">amazing clients</span>{" "}
              and have been{" "}
              <span className="aboutpage__more-details-accent">
                honored with several awards
              </span>{" "}
              for my work.
            </ParagraphL>
          </AboutScrollReveal>
          <AboutScrollReveal className="aboutpage__more-details-reveal">
            <ParagraphS>
              Let&apos;s create something extraordinary together. Whether you&apos;re looking to capture a special moment, need stunning visuals for your brand, or simply want to explore the world through my lens, I&apos;d love to hear from you! Feel free to reach out, and let&apos;s make magic happen.
            </ParagraphS>
          </AboutScrollReveal>
          <AboutBookSessionCTA />
        </div>
      </section>
    </>
  );
}
