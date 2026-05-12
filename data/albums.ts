/**
 * Album types and helpers. Records come from the CMS API (`getAlbums` in `@/lib/fetch-albums`).
 */

import { parseYoutubeVideoId } from "@/lib/youtube-id";

export const ALBUM_IMAGE_SLOTS = 20 as const;

export type AlbumImageSlot = string | null;

/** Alt for each gallery slot; index 0 = `image_1_alt` … index 19 = `image_20_alt`. */
export type AlbumImageAltSlot = string | null;

export type Album = {
  id: string;
  title: string;
  slug: string;
  overview: string;
  year: string;
  location: string;
  camera: string;
  lenses: string;
  otherDevices: string;
  client: string;
  category: string;
  projectType: string;
  buttonText: string;
  buttonHref: string;
  youtubeUrl: string;
  extraYoutubeUrls?: string[];
  coverImageUrl: string;
  images: AlbumImageSlot[];
  imageAlts: AlbumImageAltSlot[];
};

export function getAlbumVideoEmbedItems(
  albums: Album[],
): { album: Album; videoId: string }[] {
  const items: { album: Album; videoId: string }[] = [];
  for (const album of albums) {
    const urls = [album.youtubeUrl, ...(album.extraYoutubeUrls ?? [])];
    for (const url of urls) {
      if (!url) continue;
      const videoId = parseYoutubeVideoId(url);
      if (videoId) items.push({ album, videoId });
    }
  }
  return items;
}

export function getAlbumBySlug(
  albums: Album[],
  slug: string,
): Album | undefined {
  return albums.find((a) => a.slug === slug);
}

export function albumImagesFilled(album: Album): string[] {
  return album.images.filter((u): u is string => u != null && u !== "");
}
