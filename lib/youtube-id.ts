/** Extract an 11-character YouTube video id from common URL shapes. */
export function parseYoutubeVideoId(url: string | null | undefined): string | null {
  if (url == null || typeof url !== "string") return null;
  const u = url.trim();
  if (!u) return null;

  const isId = (s: string) => /^[\w-]{11}$/.test(s);

  try {
    const parsed = new URL(u);

    if (parsed.hostname.replace(/^www\./, "") === "youtu.be") {
      const id = parsed.pathname.replace(/^\//, "").split("/")[0];
      return id && isId(id) ? id : null;
    }

    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtube-nocookie.com")
    ) {
      const v = parsed.searchParams.get("v");
      if (v && isId(v)) return v;
      const embed = parsed.pathname.match(/\/embed\/([\w-]{11})/);
      if (embed?.[1] && isId(embed[1])) return embed[1];
    }
  } catch {
    return null;
  }

  return null;
}
