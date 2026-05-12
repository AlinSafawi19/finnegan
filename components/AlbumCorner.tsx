import type { ReactNode } from "react";

export type AlbumCornerVariant = "light" | "dark";

export type AlbumCornerPlacement = "tl" | "tr" | "bl" | "br";

/** default: 40×40 L · small: 9×8 L (9px horizontal arm, 8px vertical, 1px stroke). */
export type AlbumCornerSize = "default" | "small";

/**
 * Fixed design positions (single accent on a relative parent). Card quadrants use preset `card`.
 * dark → left 125px, top -7px · small → left 79px, top -7px (typically with size `small`).
 */
export type AlbumCornerPositionPreset = "card" | "dark" | "small";

type AlbumCornerProps = {
  variant: AlbumCornerVariant;
  placement: AlbumCornerPlacement;
  size?: AlbumCornerSize;
  /** `card` = Works tile corners · `dark` / `small` = fixed x/y (see album-corner.css). */
  positionPreset?: AlbumCornerPositionPreset;
  className?: string;
};

/**
 * Decorative album corner: sharp 90° L (1px arms).
 * Default: 40×40 · small: 9×8. Light / dark line color.
 * Visibility: `.works__album-card-link:hover` for card preset (see `album-corner.css`).
 */
export function AlbumCorner({
  variant,
  placement,
  size = "default",
  positionPreset = "card",
  className,
}: AlbumCornerProps) {
  const accent = positionPreset !== "card";

  return (
    <div
      className={[
        "works__album-corner",
        size === "small" && "works__album-corner--size-small",
        `works__album-corner--${variant}`,
        `works__album-corner--${placement}`,
        positionPreset === "dark" && "works__album-corner--preset-dark",
        positionPreset === "small" && "works__album-corner--preset-small",
        accent && "works__album-corner--accent",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <span className="works__album-corner__arm works__album-corner__arm--h" />
      <span className="works__album-corner__arm works__album-corner__arm--v" />
    </div>
  );
}

type AlbumCardProps = {
  children: ReactNode;
  /** Corner line color: light = creamy white, dark = black 100%. */
  cornerVariant?: AlbumCornerVariant;
  /** default: 40×40 · small: 9×8 L on each corner. */
  cornerSize?: AlbumCornerSize;
  className?: string;
};

/**
 * Relative wrapper so corners sit on the card; hover state is the parent link (Works album tile).
 */
export function AlbumCard({
  children,
  cornerVariant = "light",
  cornerSize = "default",
  className,
}: AlbumCardProps) {
  return (
    <article
      className={["works__album-card", className].filter(Boolean).join(" ")}
    >
      {children}
      <AlbumCorner variant={cornerVariant} placement="tl" size={cornerSize} />
      <AlbumCorner variant={cornerVariant} placement="tr" size={cornerSize} />
      <AlbumCorner variant={cornerVariant} placement="bl" size={cornerSize} />
      <AlbumCorner variant={cornerVariant} placement="br" size={cornerSize} />
    </article>
  );
}
