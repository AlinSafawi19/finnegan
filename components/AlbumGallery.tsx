import Image from "next/image";
import type { Album } from "@/data/albums";

type AlbumGalleryProps = {
  album: Album;
};

/**
 * Masonry-style split: items in display order (0,2,4…) → column 1,
 * (1,3,5…) → column 2. Alt text is only what the CMS sends (`album.imageAlts`);
 * empty or missing alt becomes an empty string (no generated fallback).
 */
export function AlbumGallery({ album }: AlbumGalleryProps) {
  const items: { src: string; slot: number; alt: string }[] = [];
  album.images.forEach((src, i) => {
    if (src != null && src !== "") {
      const fromData = album.imageAlts[i];
      const alt =
        typeof fromData === "string" ? fromData.trim() : "";
      items.push({ src, slot: i + 1, alt });
    }
  });
  if (items.length === 0) return null;

  const colOdd = items.filter((_, i) => i % 2 === 0);
  const colEven = items.filter((_, i) => i % 2 === 1);

  return (
    <section className="album-page__gallery" aria-label={`${album.title} gallery`}>
      <div className="album-page__gallery-inner">
        <div className="album-page__gallery-col album-page__gallery-col--1">
          {colOdd.map(({ src, slot, alt }) => (
            <Image
              key={`c1-${slot}`}
              src={src}
              alt={alt}
              width={1600}
              height={1067}
              sizes="(max-width: 809px) 100vw, min(50vw, 950px)"
              className="album-page__gallery-img"
            />
          ))}
        </div>
        <div className="album-page__gallery-col album-page__gallery-col--2">
          {colEven.map(({ src, slot, alt }) => (
            <Image
              key={`c2-${slot}`}
              src={src}
              alt={alt}
              width={1600}
              height={1067}
              sizes="(max-width: 809px) 100vw, min(50vw, 950px)"
              className="album-page__gallery-img"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
