import { cache } from "react";
import type { Album, AlbumImageAltSlot, AlbumImageSlot } from "@/data/albums";

const DEFAULT_ALBUMS_API_URL =
  "https://canopy-production-7f21.up.railway.app/api/v1/photolab/albums";

const SLOT_COUNT = 20;

function albumsApiUrl(): string {
  return process.env.ALBUMS_API_URL?.trim() || DEFAULT_ALBUMS_API_URL;
}

function cmsApiKey(): string {
  return process.env.NEXT_PUBLIC_CMS_API_KEY?.trim() ?? "";
}

type ApiEntry = {
  id: string;
  [key: string]: string | undefined;
};

type ApiResponse = {
  data?: ApiEntry[];
};

function normalizeCdnUrl(url: string): string {
  const u = url.trim();
  if (!u || u.includes("?")) return u;
  if (!u.includes("framerusercontent.com/images/")) return u;
  return `${u}?scale-down-to=2048`;
}

function slotImage(entry: ApiEntry, slot: number): AlbumImageSlot {
  const raw = entry[`Image ${slot}`];
  if (typeof raw !== "string" || raw.trim() === "") return null;
  return normalizeCdnUrl(raw);
}

function mapEntryToAlbum(entry: ApiEntry): Album {
  const images: AlbumImageSlot[] = [];
  const imageAlts: AlbumImageAltSlot[] = [];
  for (let i = 1; i <= SLOT_COUNT; i++) {
    images.push(slotImage(entry, i));
    imageAlts.push(null);
  }

  return {
    id: entry.id,
    title: entry["Title"] ?? "",
    slug: entry["Slug"] ?? "",
    overview: entry["Overview"] ?? "",
    year: entry["Year"] ?? "",
    location: entry["Location"] ?? "",
    camera: entry["Camera"] ?? "",
    lenses: entry["Lenses"] ?? "",
    otherDevices: entry["Other Devices"] ?? "",
    client: entry["Client"] ?? "",
    category: entry["Category"] ?? "",
    projectType: entry["Project Type"] ?? "",
    buttonText: entry["Button Text"] ?? "",
    buttonHref: entry["Button Link"] ?? "",
    youtubeUrl: entry["Youtube Link"] ?? "",
    coverImageUrl: slotImage(entry, 1) ?? "",
    images,
    imageAlts,
  };
}

async function fetchAlbums(): Promise<Album[]> {
  const url = albumsApiUrl();
  const key = cmsApiKey();

  try {
    const headers: Record<string, string> = {};
    if (key) headers["Authorization"] = `Bearer ${key}`;

    const res = await fetch(url, { headers, next: { revalidate: 60 } });

    if (!res.ok) {
      console.warn(`Albums API failed (${res.status}). Returning empty array.`);
      return [];
    }

    const data = (await res.json()) as ApiResponse;
    const entries = data.data ?? [];

    return entries.map(mapEntryToAlbum).filter((a) => a.slug !== "");
  } catch (error) {
    console.warn("Albums API unreachable. Returning empty array.", error);
    return [];
  }
}

/** One fetch per request / static render pass (shared by layouts, pages, `generateStaticParams`). */
export const getAlbums = cache(fetchAlbums);
