"use client";

import { motion, useReducedMotion } from "motion/react";
import { WorkVideoEmbed } from "@/components/WorkVideoEmbed";
import type { Album } from "@/data/albums";
import { albumPageSectionMotionProps } from "@/lib/album-page-section-motion";
import { parseYoutubeVideoId } from "@/lib/youtube-id";

type AlbumVideoSectionProps = {
  album: Album;
};

export function AlbumVideoSection({ album }: AlbumVideoSectionProps) {
  const videoId = parseYoutubeVideoId(album.youtubeUrl);
  const reduceMotion = useReducedMotion();

  if (!videoId) return null;

  const motionProps = albumPageSectionMotionProps(reduceMotion);

  return (
    <motion.section
      className="album-page__video"
      aria-label="Video"
      {...motionProps}
    >
      <div className="album-page__video-player">
        <WorkVideoEmbed
          videoId={videoId}
          title={`${album.title} — video`}
          playHoverAccent="red"
          disableScrollAnimation
        />
      </div>
    </motion.section>
  );
}
