import { cache } from "react";
import type { Album, AlbumImageAltSlot, AlbumImageSlot } from "@/data/albums";

const DEFAULT_ALBUMS_API_URL =
  "http://localhost:5173/api/public/v1/projects/p-mp36lhoa-1/categories/cat-mp4hhusn-1";

const SLOT_COUNT = 20;

function albumsApiUrl(): string {
  const fromEnv = process.env.ALBUMS_API_URL?.trim();
  return fromEnv || DEFAULT_ALBUMS_API_URL;
}

type ApiEntry = {
  id: string;
  values: Record<string, string | undefined>;
};

type CategoryField = {
  key: string;
};

type ApiResponse = {
  category?: {
    entries?: ApiEntry[];
    fields?: CategoryField[];
  };
};

/** Per-slot keys as declared on `category.fields` (same strings `values` uses). */
type SlotKeys = {
  slot: number;
  imageKey: string;
  altKey: string;
};

/**
 * Builds slot 1…20 using the API’s `category.fields[].key` entries
 * (`image_1`, `image_1_alt`, …), so renames in the CMS stay in sync.
 * Falls back to `image_N` / `image_N_alt` if `fields` is missing.
 */
function slotKeysFromCategoryFields(
  fields: CategoryField[] | undefined,
): SlotKeys[] {
  const bySlot = new Map<number, { image?: string; alt?: string }>();

  if (fields?.length) {
    for (const { key } of fields) {
      const imageOnly = /^image_(\d+)$/.exec(key);
      if (imageOnly) {
        const slot = Number.parseInt(imageOnly[1], 10);
        const cur = bySlot.get(slot) ?? {};
        cur.image = key;
        bySlot.set(slot, cur);
        continue;
      }
      const withAlt = /^image_(\d+)_alt$/.exec(key);
      if (withAlt) {
        const slot = Number.parseInt(withAlt[1], 10);
        const cur = bySlot.get(slot) ?? {};
        cur.alt = key;
        bySlot.set(slot, cur);
      }
    }
  }

  const out: SlotKeys[] = [];
  for (let slot = 1; slot <= SLOT_COUNT; slot += 1) {
    const cur = bySlot.get(slot);
    out.push({
      slot,
      imageKey: cur?.image ?? `image_${slot}`,
      altKey: cur?.alt ?? `image_${slot}_alt`,
    });
  }
  return out;
}

/**
 * Bare `framerusercontent.com/images/…` URLs often point at full-resolution
 * masters (10k+ px, tens of MB). Next.js `<Image>` optimization then fails or
 * times out. Append Framer’s resize hint when the API omits query params.
 */
function normalizeFramerCdnUrl(url: string): string {
  const u = url.trim();
  if (!u || u.includes("?")) return u;
  if (!u.includes("framerusercontent.com/images/")) return u;
  return `${u}?scale-down-to=2048`;
}

function slotImage(
  values: Record<string, string | undefined>,
  imageKey: string,
): AlbumImageSlot {
  const raw = values[imageKey];
  if (typeof raw !== "string" || raw.trim() === "") return null;
  return normalizeFramerCdnUrl(raw);
}

function slotAlt(
  values: Record<string, string | undefined>,
  altKey: string,
): AlbumImageAltSlot {
  const raw = values[altKey];
  if (typeof raw !== "string" || raw.trim() === "") return null;
  return raw.trim();
}

function mapEntryToAlbum(entry: ApiEntry, slotKeys: SlotKeys[]): Album {
  const v = entry.values;
  const images: AlbumImageSlot[] = [];
  const imageAlts: AlbumImageAltSlot[] = [];
  for (const { imageKey, altKey } of slotKeys) {
    images.push(slotImage(v, imageKey));
    imageAlts.push(slotAlt(v, altKey));
  }
  const firstImageKey = slotKeys[0]?.imageKey ?? "image_1";

  return {
    id: entry.id,
    title: v.title ?? "",
    slug: v.slug ?? "",
    overview: v.overview ?? "",
    year: v.year ?? "",
    location: v.location ?? "",
    camera: v.camera ?? "",
    lenses: v.lenses ?? "",
    otherDevices: v.other_devices ?? "",
    client: v.client ?? "",
    category: v.category ?? "",
    projectType: v.project_type ?? "",
    buttonText: v.button_text ?? "",
    buttonHref: v.button_link ?? "",
    youtubeUrl: v.youtube_link ?? "",
    coverImageUrl: slotImage(v, firstImageKey) ?? "",
    images,
    imageAlts,
  };
}

async function fetchAlbums(): Promise<Album[]> {
  const url = albumsApiUrl();
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Albums API ${res.status}: ${url}`);
  }
  const data = (await res.json()) as ApiResponse;
  const slotKeys = slotKeysFromCategoryFields(data.category?.fields);
  const entries = data.category?.entries ?? [];
  return entries.map((e) => mapEntryToAlbum(e, slotKeys)).filter((a) => a.slug !== "");
}

/** One fetch per request / static render pass (shared by layouts, pages, `generateStaticParams`). */
export const getAlbums = cache(fetchAlbums);
