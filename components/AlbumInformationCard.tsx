"use client";

import {
  Aperture,
  Calendar,
  Camera,
  Devices,
  MapPin,
  Triangle,
  User,
  UserFocus,
  type IconProps as PhosphorIconProps,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";
import type { Album } from "@/data/albums";
import "./album-information-card.css";

const ICON_SIZE = 18;

type RowConfig = {
  Icon: ComponentType<PhosphorIconProps>;
  label: string;
  getValue: (album: Album) => string;
};

/** Phosphor has no `MapPen`; `MapPin` matches location. */
const rows: RowConfig[] = [
  { Icon: UserFocus, label: "Category", getValue: (a) => a.category },
  { Icon: Triangle, label: "Project Type", getValue: (a) => a.projectType },
  { Icon: Camera, label: "Camera", getValue: (a) => a.camera },
  { Icon: Aperture, label: "Lenses", getValue: (a) => a.lenses },
  { Icon: Devices, label: "Other Devices", getValue: (a) => a.otherDevices },
  { Icon: MapPin, label: "Location", getValue: (a) => a.location },
  { Icon: Calendar, label: "Time", getValue: (a) => a.year },
  { Icon: User, label: "Client", getValue: (a) => a.client },
];

export type AlbumInformationCardProps = {
  album: Album;
  /** Layout variant; only `1` is implemented. */
  variant?: 1;
};

function hasInfoValue(raw: string): boolean {
  return raw.trim().length > 0;
}

export function AlbumInformationCard({
  album,
  variant = 1,
}: AlbumInformationCardProps) {
  if (variant !== 1) {
    return null;
  }

  const visibleRows = rows.filter((row) => hasInfoValue(row.getValue(album)));

  if (visibleRows.length === 0) {
    return null;
  }

  return (
    <div className="album-page__overview-info">
      {visibleRows.map(({ Icon, label, getValue }) => (
        <div
          key={label}
          className="album-info-card--v1"
        >
          <div className="album-info-card__stack">
            <span className="album-info-card__icon" aria-hidden>
              <Icon size={ICON_SIZE} weight="thin" />
            </span>
            <span className="body-3 album-info-card__label">{label}</span>
          </div>
          <p className="paragraph-s album-info-card__value">
            {getValue(album).trim()}
          </p>
        </div>
      ))}
    </div>
  );
}
