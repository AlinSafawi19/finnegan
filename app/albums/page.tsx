import type { Metadata } from "next";
import { Heading1 } from "@/components/Heading1";
import { AlbumsPageContent } from "@/components/AlbumsPageContent";
import { getAlbums } from "@/lib/fetch-albums";
import "./albums-page.css";

export const metadata: Metadata = {
  title: "Albums",
};

export default async function AlbumsPage() {
  const albums = await getAlbums();

  return (
    <div className="albums-page">
      <main className="albums-page__main">
        <header className="albums-page__heading">
          <Heading1 className="albums-page__heading-title" size="large">
            Albums
          </Heading1>
        </header>

        <AlbumsPageContent albums={albums} />
      </main>
    </div>
  );
}
