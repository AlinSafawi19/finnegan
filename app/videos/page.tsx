import type { Metadata } from "next";
import { Heading1 } from "@/components/Heading1";
import { VideosPageContent } from "@/components/VideosPageContent";
import { getAlbumVideoEmbedItems } from "@/data/albums";
import { getAlbums } from "@/lib/fetch-albums";
import "../albums/albums-page.css";
import "./videos-page.css";

export const metadata: Metadata = {
  title: "Videos",
};

export default async function VideosPage() {
  const albums = await getAlbums();
  const items = getAlbumVideoEmbedItems(albums);

  return (
    <div className="albums-page">
      <main className="albums-page__main">
        <header className="albums-page__heading">
          <Heading1 className="albums-page__heading-title" size="large">
            Videos
          </Heading1>
        </header>

        <VideosPageContent items={items} />
      </main>
    </div>
  );
}
