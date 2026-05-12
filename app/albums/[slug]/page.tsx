import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { AlbumHeroImageScroll } from "@/components/AlbumHeroImageScroll";
import { AlbumButtonLink } from "@/components/AlbumButtonLink";
import { AlbumMoreAlbumsSection } from "@/components/AlbumMoreAlbumsSection";
import { AlbumGallery } from "@/components/AlbumGallery";
import { AlbumVideoSection } from "@/components/AlbumVideoSection";
import { AlbumInformationCard } from "@/components/AlbumInformationCard";
import { AlbumHeroTitle } from "@/components/AlbumHeroTitle";
import { getAlbumBySlug } from "@/data/albums";
import { getAlbums } from "@/lib/fetch-albums";
import "../album-page.css";

export async function generateStaticParams() {
  const albums = await getAlbums();
  return albums.map((a) => ({ slug: a.slug }));
}

type AlbumPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug } = await params;
  const albums = await getAlbums();
  const album = getAlbumBySlug(albums, slug);
  if (!album) notFound();

  const heroImageUrl = album.images[0] ?? album.coverImageUrl;
  const otherAlbums = albums.filter((a) => a.slug !== slug);

  return (
    <main
      id="album"
      className="album-page__main"
      data-album-slug={album.slug}
    >
      <section className="album-page__hero" aria-labelledby="album-hero-title">
        <div className="album-page__hero-inner">
          <AlbumHeroImageScroll
            className="album-page__hero-image1"
            style={
              heroImageUrl
                ? ({
                  "--album-hero-image1": `url(${JSON.stringify(heroImageUrl)})`,
                } as CSSProperties)
                : undefined
            }
          />
        </div>
        <AlbumHeroTitle
          id="album-hero-title"
          className="heading-1 album-page__hero-title"
        >
          {album.title}
        </AlbumHeroTitle>
      </section>

      <section className="album-page__overview" aria-label="Overview">
        <p className="paragraph-l album-page__overview-text">{album.overview}</p>
        <div className="album-page__overview-wrapper">
          <AlbumInformationCard album={album} variant={1} />
          <AlbumButtonLink href={album.buttonHref}>
            {album.buttonText}
          </AlbumButtonLink>
        </div>
      </section>

      <AlbumGallery album={album} />

      <AlbumVideoSection album={album} />

      {otherAlbums.length > 0 ? (
        <AlbumMoreAlbumsSection albums={otherAlbums} />
      ) : null}
    </main>
  );
}
