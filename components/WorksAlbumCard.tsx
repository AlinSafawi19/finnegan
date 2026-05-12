"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Album } from "@/data/albums";
import { AlbumCard } from "@/components/AlbumCorner";
import { Heading3 } from "@/components/Heading3";
import { Icon } from "@/components/phosphor_1";
import { WorksAlbumViewCursor } from "@/components/WorksAlbumViewCursor";

type WorksAlbumCardProps = {
  album: Album;
  /** Pass for the first Works tile so Next.js marks one hero image for LCP. */
  imagePriority?: boolean;
  /**
   * `slot2` — second row (718×446).
   * `pairLeft` / `pairRight` — third row pair: 451×446 and 505×716.
   * `slot5` — fifth row (653×446).
   */
  cardLayout?: "default" | "slot2" | "pairLeft" | "pairRight" | "slot5";
};

const VIEW_BADGE = 58;

function viewCursorPositionWithinCard(e: React.MouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;
  /* Center badge on pointer, clamp so the 58×58 box stays inside the link/card */
  let left = px - VIEW_BADGE / 2;
  let top = py - VIEW_BADGE / 2;
  const maxLeft = Math.max(0, rect.width - VIEW_BADGE);
  const maxTop = Math.max(0, rect.height - VIEW_BADGE);
  left = Math.min(Math.max(0, left), maxLeft);
  top = Math.min(Math.max(0, top), maxTop);
  return { left, top };
}

/** Works section album tile: cover image, category / type pills, title, link to `/albums/[slug]`. */
export function WorksAlbumCard({
  album,
  imagePriority = false,
  cardLayout = "default",
}: WorksAlbumCardProps) {
  const imageUrl = album.images[0] ?? album.coverImageUrl;
  const [viewCursor, setViewCursor] = useState({
    targetLeft: 0,
    targetTop: 0,
    visible: false,
  });

  return (
    <Link
      href={`/albums/${album.slug}`}
      className="works__album-card-link"
      aria-label={`${album.title} — ${album.category}, ${album.projectType}`}
      onMouseEnter={(e) => {
        const p = viewCursorPositionWithinCard(e);
        setViewCursor({ targetLeft: p.left, targetTop: p.top, visible: true });
      }}
      onMouseLeave={() => setViewCursor((c) => ({ ...c, visible: false }))}
      onMouseMove={(e) => {
        const p = viewCursorPositionWithinCard(e);
        setViewCursor({ targetLeft: p.left, targetTop: p.top, visible: true });
      }}
    >
      <AlbumCard
        className={[
          "works__album-card--works",
          cardLayout === "slot2" ? "works__album-card--works-slot2" : "",
          cardLayout === "pairLeft" ? "works__album-card--works-pair-left" : "",
          cardLayout === "pairRight" ? "works__album-card--works-pair-right" : "",
          cardLayout === "slot5" ? "works__album-card--works-slot5" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        cornerVariant="light"
      >
        <div className="works__album-card__media">
          <Image
            src={imageUrl}
            alt=""
            fill
            quality={90}
            className="works__album-card__image"
            sizes={
              cardLayout === "slot2"
                ? "(max-width: 809px) 100vw, 718px"
                : cardLayout === "pairLeft"
                  ? "(max-width: 809px) 100vw, 451px"
                  : cardLayout === "pairRight"
                    ? "(max-width: 809px) 100vw, 505px"
                    : cardLayout === "slot5"
                      ? "(max-width: 809px) 100vw, 653px"
                      : "(max-width: 809px) 100vw, 600px"
            }
            priority={imagePriority}
          />
        </div>
        <div className="works__album-card__stack">
          <div className="works__album-card__stack-row works__album-card__stack-row--pills">
            <div className="works__album-card__pill">
              <p className="body-1 works__album-card__pill-text">{album.category}</p>
            </div>
            <div className="works__album-card__pill">
              <p className="body-1 works__album-card__pill-text">{album.projectType}</p>
            </div>
          </div>
          <div className="works__album-card__stack-row works__album-card__stack-row--title">
            <Heading3 className="works__album-card__title">{album.title}</Heading3>
            <Icon
              name="ArrowUpRight"
              size={26}
              weight="thin"
              className="works__album-card__icon"
              aria-hidden
            />
          </div>
        </div>
      </AlbumCard>
      <WorksAlbumViewCursor
        targetLeft={viewCursor.targetLeft}
        targetTop={viewCursor.targetTop}
        visible={viewCursor.visible}
      />
    </Link>
  );
}
