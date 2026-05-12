"use client";

import { useReducedMotion } from "motion/react";
import type { Album } from "@/data/albums";
import { WorksAlbumCard } from "@/components/WorksAlbumCard";

type AlbumMoreAlbumsTickerProps = {
  albums: Album[];
};

/**
 * Horizontal marquee of `WorksAlbumCard` tiles (duplicated strip for seamless loop).
 */
export function AlbumMoreAlbumsTicker({ albums }: AlbumMoreAlbumsTickerProps) {
  const reduceMotion = useReducedMotion();
  const loop = reduceMotion ? albums : [...albums, ...albums];

  return (
    <div className="album-page__more-albums-ticker-wrap">
      <div
        className="album-page__more-albums-ticker-viewport"
        role="region"
        aria-label="More albums, scrolling"
      >
        <div
          className={
            reduceMotion
              ? "album-page__more-albums-ticker-strip album-page__more-albums-ticker-strip--static"
              : "album-page__more-albums-ticker-strip"
          }
        >
          {loop.map((album, i) => (
            <WorksAlbumCard
              key={`${album.id}-${i}`}
              album={album}
              imagePriority={i === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
