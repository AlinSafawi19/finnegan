"use client";

/**
 * Next.js Phosphor icon wrapper.
 * Extend `icons` with more imports from `@phosphor-icons/react` as needed.
 */

import {
  ArrowDown,
  ArrowUpRight,
  BehanceLogo,
  FacebookLogo,
  Image,
  InstagramLogo,
  LinkedinLogo,
  Video,
  X,
  XCircle,
  YoutubeLogo,
  type IconProps as PhosphorIconProps,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

const icons = {
  ArrowDown,
  ArrowUpRight,
  BehanceLogo,
  FacebookLogo,
  Image,
  InstagramLogo,
  LinkedinLogo,
  Video,
  X,
  XCircle,
  YoutubeLogo,
} as const satisfies Record<string, ComponentType<PhosphorIconProps>>;

export type PhosphorIconName = keyof typeof icons;

export type IconProps = PhosphorIconProps & {
  name: PhosphorIconName;
};

export function Icon({ name, ...props }: IconProps) {
  const Cmp = icons[name];
  return <Cmp {...props} />;
}
