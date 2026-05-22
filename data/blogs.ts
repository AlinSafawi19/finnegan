import { cache } from "react";

const DEFAULT_BLOGS_API_URL =
  "https://cms-api-production-e357.up.railway.app/api/public/v1/projects/prj-mpgoaaki-42/categories/cat-mpgoaaki-41";

export type Blog = {
  id: string;
  featured: boolean;
  title: string;
  slug: string;
  /** ISO 8601 date (`YYYY-MM-DD`) for sorting and structured data. */
  publishedAt: string;
  imageUrl: string;
  imageAlt: string;
  tags: readonly string[];
  /** HTML returned by the public CMS API. */
  content: string;
};

type ApiEntry = {
  id: string;
  values: Record<string, string | undefined>;
};

type ApiResponse = {
  category?: {
    entries?: ApiEntry[];
  };
};

type ParsedImage = {
  url: string;
  alt?: string;
};

function blogsApiUrl(): string {
  const fromEnv = process.env.BLOGS_API_URL?.trim();
  return fromEnv || DEFAULT_BLOGS_API_URL;
}

function parseBoolean(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === "true";
}

function parseTags(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeCdnUrl(url: string): string {
  const u = url.trim();
  if (!u || u.includes("?")) return u;
  if (!u.includes("framerusercontent.com/images/")) return u;
  return `${u}?scale-down-to=2048`;
}

function parseImage(value: string | undefined): ParsedImage {
  if (!value?.trim()) return { url: "" };

  try {
    const parsed = JSON.parse(value) as Partial<ParsedImage>;
    return {
      url: typeof parsed.url === "string" ? normalizeCdnUrl(parsed.url) : "",
      alt: typeof parsed.alt === "string" ? parsed.alt : undefined,
    };
  } catch {
    return { url: normalizeCdnUrl(value) };
  }
}

function byPublishedDateDesc(a: Blog, b: Blog): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

function mapEntryToBlog(entry: ApiEntry): Blog {
  const v = entry.values;
  const image = parseImage(v.image);
  const title = v.title?.trim() ?? "";

  return {
    id: entry.id,
    featured: parseBoolean(v.featured),
    title,
    slug: v.slug?.trim() ?? "",
    publishedAt: v.date?.trim() ?? "",
    imageUrl: image.url,
    imageAlt: image.alt?.trim() || title,
    tags: parseTags(v.tags),
    content: v.content ?? "",
  };
}

async function fetchBlogs(): Promise<Blog[]> {
  const url = blogsApiUrl();
  if (!url) return [];

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      console.warn(`Blogs API failed (${res.status}). Returning empty array.`);
      return [];
    }

    const data = (await res.json()) as ApiResponse;
    const entries = data.category?.entries ?? [];

    return entries
      .map(mapEntryToBlog)
      .filter((blog) => blog.slug !== "" && blog.title !== "");
  } catch (error) {
    console.warn("Blogs API unreachable. Returning empty array.", error);
    return [];
  }
}

export const getBlogs = cache(fetchBlogs);

/** Homepage blogs strip: featured API posts, newest first, max 3. */
export async function getHeroBlogs(): Promise<readonly Blog[]> {
  const sorted = [...(await getBlogs())].sort(byPublishedDateDesc);
  const featured = sorted.filter((blog) => blog.featured);
  return (featured.length > 0 ? featured : sorted).slice(0, 3);
}

/** e.g. `2024-04-19` -> `APRIL 19, 2024` */
export function formatBlogCardDateLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  const date = new Date(y, m - 1, d);
  const month = date
    .toLocaleString("en-US", { month: "long" })
    .toUpperCase();
  return `${month} ${d}, ${y}`;
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const blogs = await getBlogs();
  return blogs.find((blog) => blog.slug === slug);
}

/**
 * Suggestions for "read other" on a post page: same primary tag (`tags[0]`) first,
 * then other posts by `publishedAt` descending. Always excludes the current `slug`.
 */
export async function getRelatedBlogsForSlug(
  slug: string,
  limit = 3,
): Promise<Blog[]> {
  const blogs = await getBlogs();
  const current = blogs.find((blog) => blog.slug === slug);
  if (!current) return [];

  const primary = current.tags[0];
  const candidates = blogs.filter((blog) => blog.slug !== slug);
  const samePrimary =
    primary !== undefined
      ? candidates.filter((blog) => blog.tags.includes(primary))
      : [];
  const rest =
    primary !== undefined
      ? candidates.filter((blog) => !blog.tags.includes(primary))
      : candidates;

  samePrimary.sort(byPublishedDateDesc);
  rest.sort(byPublishedDateDesc);

  return [...samePrimary, ...rest].slice(0, limit);
}

export async function getFeaturedBlogs(): Promise<readonly Blog[]> {
  const blogs = await getBlogs();
  return blogs.filter((blog) => blog.featured);
}

/** `/blog` listing: first featured API post as hero row; remaining posts by date. */
export async function getBlogListingFeaturedAndRest(): Promise<{
  featured: Blog | undefined;
  rest: readonly Blog[];
}> {
  const sorted = [...(await getBlogs())].sort(byPublishedDateDesc);
  const featured = sorted.find((blog) => blog.featured) ?? sorted[0];
  const rest = featured
    ? sorted.filter((blog) => blog.id !== featured.id)
    : sorted;
  return { featured, rest };
}
