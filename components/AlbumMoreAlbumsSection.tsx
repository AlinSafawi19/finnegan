"use client";

import { motion, useReducedMotion } from "motion/react";
import { AlbumMoreAlbumsTicker } from "@/components/AlbumMoreAlbumsTicker";
import {
  StrokeButton,
  StrokeSplitIconInner,
  StrokeSplitLabel,
} from "@/components/StrokeButton";
import { Icon } from "@/components/phosphor_1";
import type { Album } from "@/data/albums";
import { albumPageSectionMotionProps } from "@/lib/album-page-section-motion";

type AlbumMoreAlbumsSectionProps = {
  albums: Album[];
};

export function AlbumMoreAlbumsSection({ albums }: AlbumMoreAlbumsSectionProps) {
  const reduceMotion = useReducedMotion();
  const motionProps = albumPageSectionMotionProps(reduceMotion);

  return (
    <motion.section
      className="album-page__more-albums"
      aria-labelledby="album-more-albums-heading"
      {...motionProps}
    >
      <h2
        id="album-more-albums-heading"
        className="heading-2-l album-page__more-albums-title"
      >
        More Albums
      </h2>
      <AlbumMoreAlbumsTicker albums={albums} />
      <div className="album-page__more-albums-cta">
        <StrokeButton href="/albums" variant="split" tone="outline">
          <StrokeSplitLabel>All Albums</StrokeSplitLabel>
          <span className="btn-stroke__icon">
            <StrokeSplitIconInner>
              <Icon
                name="ArrowUpRight"
                width={20}
                height={22}
                weight="regular"
                mirrored={false}
                color="currentColor"
                aria-hidden
              />
            </StrokeSplitIconInner>
          </span>
        </StrokeButton>
      </div>
    </motion.section>
  );
}
