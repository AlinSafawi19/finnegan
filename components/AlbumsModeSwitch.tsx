"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Icon, type PhosphorIconName } from "@/components/phosphor_1";

/** Spring transition: stiffness 500, damping 60, mass 1, delay 0. */
export const albumsToggleHoverSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 60,
  mass: 1,
  delay: 0,
} as const;

export type AlbumsMode = "photos" | "videos";

type AlbumsModeSwitchProps = {
  className?: string;
};

type SegmentProps = {
  active: boolean;
  href: string;
  label: string;
  icon: PhosphorIconName;
};

function SwitchSegment({ active, href, label, icon }: SegmentProps) {
  const reduceMotion = useReducedMotion();
  const hoverTransition = reduceMotion
    ? { type: "tween" as const, duration: 0.12, ease: "easeOut" as const }
    : albumsToggleHoverSpring;

  const innerActive = (
    <span className="albums-page__toggle-inner albums-page__toggle-inner--active">
      <span className="albums-page__toggle-icon" aria-hidden>
        <Icon name={icon} size={26} weight="fill" />
      </span>
      <span className="albums-page__toggle-label">{label}</span>
    </span>
  );

  const innerIdle = (
    <motion.span
      className="albums-page__toggle-inner albums-page__toggle-inner--idle"
      initial={false}
      animate={{ opacity: 0.41 }}
      whileHover={{ opacity: 0.72 }}
      transition={hoverTransition}
    >
      <span className="albums-page__toggle-icon" aria-hidden>
        <Icon name={icon} size={26} weight="fill" />
      </span>
      <span className="albums-page__toggle-label">{label}</span>
    </motion.span>
  );

  return (
    <Link
      href={href}
      className={
        active
          ? "albums-page__toggle albums-page__toggle--active albums-page__toggle-link"
          : "albums-page__toggle albums-page__toggle--idle albums-page__toggle-link"
      }
      aria-current={active ? "page" : undefined}
    >
      {active ? innerActive : innerIdle}
    </Link>
  );
}

/** Route-aware segmented control: `/albums` vs `/videos` (Photos · Videos). */
export function AlbumsModeSwitch({ className }: AlbumsModeSwitchProps) {
  const pathname = usePathname();
  const normalized = (pathname ?? "").replace(/\/$/, "") || "/";
  const photosActive = normalized === "/albums";
  const videosActive = normalized === "/videos";

  const photos = (
    <SwitchSegment
      key="photos"
      active={photosActive}
      href="/albums"
      label="Photos"
      icon="Image"
    />
  );
  const videos = (
    <SwitchSegment
      key="videos"
      active={videosActive}
      href="/videos"
      label="Videos"
      icon="Video"
    />
  );

  return (
    <div
      className={["albums-page__switch-track", className].filter(Boolean).join(" ")}
      role="group"
      aria-label="Album view"
    >
      {photos}
      {videos}
    </div>
  );
}
