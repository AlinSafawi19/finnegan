/** Matches design S / M / L tiers; controls how far type scales on wider viewports. */
export type HeadingSize = "small" | "medium" | "large";

export function heading1SizeClass(size: HeadingSize): string {
  if (size === "small") return "heading-1--sm";
  if (size === "medium") return "heading-1--md";
  return "";
}

export function heading1bSizeClass(size: HeadingSize): string {
  if (size === "small") return "heading-1b--sm";
  if (size === "medium") return "heading-1b--md";
  return "";
}

export function heading2lSizeClass(size: HeadingSize): string {
  if (size === "small") return "heading-2-l--sm";
  if (size === "medium") return "heading-2-l--md";
  return "";
}

export function heading2sSizeClass(size: HeadingSize): string {
  if (size === "small") return "heading-2-s--sm";
  if (size === "medium") return "heading-2-s--md";
  return "";
}

export function heading3SizeClass(size: HeadingSize): string {
  if (size === "small") return "heading-3--sm";
  if (size === "medium") return "heading-3--md";
  return "";
}

export function body2SizeClass(size: HeadingSize): string {
  if (size === "small") return "body-2--sm";
  if (size === "medium") return "body-2--md";
  return "";
}

export function body3SizeClass(size: HeadingSize): string {
  if (size === "small") return "body-3--sm";
  if (size === "medium") return "body-3--md";
  return "";
}

export function paragraphLSizeClass(size: HeadingSize): string {
  if (size === "small") return "paragraph-l--sm";
  if (size === "medium") return "paragraph-l--md";
  return "";
}

export function navMenuSizeClass(size: HeadingSize): string {
  if (size === "small") return "nav-menu--sm";
  if (size === "medium") return "nav-menu--md";
  return "";
}

export function footerTextXxlSizeClass(size: HeadingSize): string {
  if (size === "small") return "footer-text-xxl--sm";
  if (size === "medium") return "footer-text-xxl--md";
  return "";
}
