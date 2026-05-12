"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";

const ABOUT_ME_ID = "about-me";
const HEADING_ID = "heading";

/** Default hero background (Framer Photographer template asset). */
export const HERO_DEFAULT_VIDEO_SRC =
  "https://framerusercontent.com/assets/tNiKvAWEjMnsRZpXzJEPoMkDX28.mp4";

/** Black 1×1 GIF — poster until the first frame is ready (`poster` enabled). */
const HERO_VIDEO_POSTER_BLACK =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

type HeroProps = {
  /** Descriptive copy + CTA — top sub-layer (max-width 400px, aligned end). */
  headingDescriptive?: ReactNode;
  /** Main H1 block — `id="heading"`, Heading 1 Large; scroll-margin from globals. */
  headingTitle?: ReactNode;
  /** Optional row under the title (horizontal, space-between); scroll-linked to `#heading` in view. */
  headingOther?: ReactNode;
  /** Block below the pinned video stage (scroll target `#about` lives on Services sticky). */
  about?: ReactNode;
  /** Background MP4; defaults to `HERO_DEFAULT_VIDEO_SRC`. Pass `null` or `""` for placeholder only. */
  videoSrc?: string | null;
  /** Poster image URL; default black frame until video paints. */
  videoPoster?: string | null;
  videoAriaLabel?: string;
};

/**
 * Figma-style hero: one tall scroll track (`hero__stage`) contains (1) sticky full-viewport
 * video, (2) absolute heading over the first screen, (3) about block in normal flow below.
 * The video stays pinned while about scrolls over it; a **#000** scrim follows
 * **window scroll** from 0 to **opacity 1** (100% black) by the time `#about-me` reaches
 * the viewport top — not gated on section intersections.
 */
export function Hero({
  headingDescriptive = null,
  headingTitle = null,
  headingOther = null,
  about = null,
  videoSrc = HERO_DEFAULT_VIDEO_SRC,
  videoPoster = HERO_VIDEO_POSTER_BLACK,
  videoAriaLabel = "Background video",
}: HeroProps) {
  const resolvedSrc =
    videoSrc === null || videoSrc === "" ? null : videoSrc;
  const resolvedPoster =
    videoPoster === null || videoPoster === ""
      ? undefined
      : videoPoster;
  const stageRef = useRef<HTMLDivElement>(null);
  const videoInnerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const headingOtherRef = useRef<HTMLDivElement>(null);

  const updateScrollTransform = useCallback(() => {
    const stage = stageRef.current;
    const inner = videoInnerRef.current;
    const scrim = scrimRef.current;
    if (!stage || !inner) return;

    const rect = stage.getBoundingClientRect();
    const vh = typeof window !== "undefined" ? window.innerHeight : 1;

    const stageTop = rect.top;
    const stageHeight = rect.height;

    let t = 0;
    if (stageHeight > vh) {
      const scrolled = Math.min(
        Math.max(-stageTop, 0),
        Math.max(stageHeight - vh, 1),
      );
      t = scrolled / Math.max(stageHeight - vh, 1);
    }

    const translateY = t * -24;
    const scale = 1 + t * 0.04;
    inner.style.transform = `rotate(0deg) translateY(${translateY}px) scale(${scale})`;

    /**
     * Scrim: tied to **document scroll** — opacity > 0 as soon as `scrollY` > 0;
     * reaches **100% black** (`opacity: 1`, `#000`) when scroll reaches `#about-me`’s
     * document position (its top hits the viewport top).
     */
    if (scrim) {
      const me = document.getElementById(ABOUT_ME_ID);
      if (!me) {
        scrim.style.opacity = "0";
      } else {
        const scrollY =
          typeof window !== "undefined"
            ? window.scrollY || document.documentElement.scrollTop || 0
            : 0;
        const meDocY = me.getBoundingClientRect().top + scrollY;
        const end = Math.max(1, meDocY);
        const p = Math.max(0, Math.min(1, scrollY / end));
        scrim.style.opacity = String(p);
      }
    }
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    updateScrollTransform();
    const onScroll = () => updateScrollTransform();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onScroll)
        : null;
    ro?.observe(stage);
    const aboutMeObs = document.getElementById(ABOUT_ME_ID);
    if (aboutMeObs) ro?.observe(aboutMeObs);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro?.disconnect();
    };
  }, [updateScrollTransform]);

  /** When `#heading` crosses the viewport center band, mark the “other” row (identity transform per spec). */
  useEffect(() => {
    const titleEl = document.getElementById(HEADING_ID);
    const otherEl = headingOtherRef.current;
    if (!titleEl || !otherEl) return;

    const apply = (inCenter: boolean) => {
      otherEl.dataset.headingInView = inCenter ? "true" : "false";
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          apply(e.isIntersecting);
        }
      },
      {
        root: null,
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    io.observe(titleEl);
    return () => io.disconnect();
  }, [headingTitle, headingOther]);

  return (
    <section className="hero" aria-label="Hero">
      <div ref={stageRef} className="hero__stage">
        <div className="hero__video-wrap">
          <div ref={videoInnerRef} className="hero__video-inner">
            <div className="hero__video-layer">
              {resolvedSrc ? (
                <video
                  className="hero__video-media"
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="auto"
                  controls={false}
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                  poster={resolvedPoster}
                  aria-label={videoAriaLabel}
                >
                  <source src={resolvedSrc} type="video/mp4" />
                </video>
              ) : (
                <div className="hero__video-placeholder" aria-hidden />
              )}
            </div>
          </div>
          <div
            ref={scrimRef}
            className="hero__video-scrim"
            aria-hidden
          />
        </div>

        <div className="hero__heading">
          <header className="hero__header">
            <div className="hero__heading-descriptive">{headingDescriptive}</div>
            <div className="hero__heading-headline">
              <div id={HEADING_ID} className="hero__heading-headline-title">
                {headingTitle}
              </div>
              <div
                ref={headingOtherRef}
                className="hero__heading-headline-other"
                {...(headingOther == null
                  ? { "aria-hidden": true as const }
                  : {})}
              >
                {headingOther}
              </div>
            </div>
          </header>
        </div>

        <div className="hero__about">
          {about}
        </div>
      </div>
    </section>
  );
}
