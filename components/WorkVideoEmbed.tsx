"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Best-first YouTube still URLs (`maxres` / `sd` often 404 on older or auto thumbs — fall back). */
function youtubePosterCandidates(videoId: string) {
  return [
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  ];
}

type WorkVideoEmbedProps = {
  videoId: string;
  title: string;
  /** `/videos` default: play glyph only gains opacity on hover. Album: fill turns brand red/orange. */
  playHoverAccent?: "default" | "red";
  /** When true, no in-view motion on the tile (e.g. album page animates the outer section). */
  disableScrollAnimation?: boolean;
};

/** Scroll enter: spring physics (stiffness 400, damping 80, mass 1, delay 0.1s). */
const videoScrollSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 80,
  mass: 1,
  delay: 0.1,
};

/** YouTube poster play glyph (same paths as their player UI). */
function YoutubePlayGlyph() {
  return (
    <svg
      className="videos-page__yt-play-svg"
      height="100%"
      version="1.1"
      viewBox="0 0 68 48"
      width="100%"
      aria-hidden
    >
      <path
        className="videos-page__yt-play-bg"
        d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
        fill="#212121"
        fillOpacity={0.8}
      />
      <path d="M 45,24 27,14 27,34" fill="#fff" />
    </svg>
  );
}

/**
 * Thumbnail + YouTube-style play SVG; click loads iframe with autoplay.
 */
export function WorkVideoEmbed({
  videoId,
  title,
  playHoverAccent = "default",
  disableScrollAnimation = false,
}: WorkVideoEmbedProps) {
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const posterCandidates = useMemo(
    () => youtubePosterCandidates(videoId),
    [videoId],
  );
  const [posterIndex, setPosterIndex] = useState(0);
  const thumbSrc = posterCandidates[posterIndex] ?? posterCandidates[0];
  const onPosterError = useCallback(() => {
    setPosterIndex((i) =>
      i + 1 < posterCandidates.length ? i + 1 : i,
    );
  }, [posterCandidates.length]);

  useEffect(() => {
    setPosterIndex(0);
  }, [videoId]);

  const embedSrc = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&mute=0&modestbranding=1&rel=0&playsinline=1`;

  const tileClass =
    playHoverAccent === "red"
      ? "videos-page__tile videos-page__tile--play-red"
      : "videos-page__tile";

  const inner = (
    <div className="videos-page__frame">
      <div className="videos-page__aspect">
        {active ? (
          <iframe
            src={embedSrc}
            title={title}
            className="videos-page__iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="videos-page__poster"
            onClick={() => setActive(true)}
            aria-label={`Play video: ${title}`}
          >
            <Image
              key={thumbSrc}
              src={thumbSrc}
              alt=""
              fill
              className="videos-page__thumb"
              sizes="(max-width: 1199px) 100vw, min(1200px, 90vw)"
              quality={92}
              onError={onPosterError}
            />
            <span className="videos-page__play-btn" aria-hidden>
              <YoutubePlayGlyph />
            </span>
          </button>
        )}
      </div>
    </div>
  );

  if (disableScrollAnimation) {
    return <article className={tileClass}>{inner}</article>;
  }

  return (
    <motion.article
      className={tileClass}
      initial={
        reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 100, scale: 1 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        reduceMotion
          ? { duration: 0.2, ease: "easeOut" as const }
          : videoScrollSpring
      }
      viewport={{ once: true, amount: 0.15 }}
    >
      {inner}
    </motion.article>
  );
}
