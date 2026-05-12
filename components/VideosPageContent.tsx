"use client";

import type { Album } from "@/data/albums";
import { AlbumsModeSwitch } from "@/components/AlbumsModeSwitch";
import { WorkVideoEmbed } from "@/components/WorkVideoEmbed";

export type AlbumWithVideoId = {
  album: Album;
  videoId: string;
};

type VideosPageContentProps = {
  items: AlbumWithVideoId[];
};

export function VideosPageContent({ items }: VideosPageContentProps) {
  return (
    <>
      <section
        className="albums-page__switch"
        aria-label="Album type filter"
      >
        <AlbumsModeSwitch />
      </section>

      <section className="albums-page__albums" aria-label="Work videos">
        <div className="albums-page__albums-inner videos-page__albums-inner">
          <div className="albums-page__grid">
            {items.map(({ album, videoId }) => (
              <WorkVideoEmbed
                key={`${album.id}-${videoId}`}
                videoId={videoId}
                title={album.title}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
