"use client";

import type { Album } from "@/data/albums";
import { WorksAlbumCard } from "@/components/WorksAlbumCard";
import { AlbumsModeSwitch } from "@/components/AlbumsModeSwitch";

type AlbumsPageContentProps = {
  albums: Album[];
};

export function AlbumsPageContent({ albums }: AlbumsPageContentProps) {
  return (
    <>
      <section
        className="albums-page__switch"
        aria-label="Album type filter"
      >
        <AlbumsModeSwitch />
      </section>

      <section className="albums-page__albums" aria-label="Album gallery">
        <div className="albums-page__albums-inner">
          <div className="albums-page__grid">
            {albums.map((album, i) => (
              <WorksAlbumCard
                key={album.id}
                album={album}
                imagePriority={i === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
