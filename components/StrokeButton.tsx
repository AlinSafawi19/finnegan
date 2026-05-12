"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Split label as `<p>` — valid inside `StrokeButton` with `href` (`<a>`). Do not use inside `<button>`; use `StrokeSplitLabelSpan` instead. */
export function StrokeSplitLabel({ children }: { children: ReactNode }) {
  return <p className="btn-stroke__label">{children}</p>;
}

/** Same styles as the label, as `<span>` for `StrokeButton` without `href` (native `<button>` cannot contain `<p>`). */
export function StrokeSplitLabelSpan({ children }: { children: ReactNode }) {
  return <span className="btn-stroke__label">{children}</span>;
}

/** Wraps the Phosphor icon in the split right column (20×22, rotate 45°, Creamy White — see `buttons.css`). */
export function StrokeSplitIconInner({ children }: { children: ReactNode }) {
  return <span className="btn-stroke__icon-inner">{children}</span>;
}

type StrokeButtonProps = {
  children: ReactNode;
  className?: string;
  /** When set, renders Next.js `Link`; otherwise a `<button>`. */
  href?: string;
  /** Passed through to `Link` (e.g. `target="_blank"` for external URLs). */
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** `split` — label left, icon in a fixed right column with a divider. */
  variant?: "default" | "split";
  /** With `split`: `outline` = transparent on dark; `primary` = cream fill + dark text. */
  tone?: "outline" | "primary";
};

export function StrokeButton({
  children,
  className,
  href,
  target,
  rel,
  type = "button",
  disabled,
  variant = "default",
  tone = "outline",
}: StrokeButtonProps) {
  const classes = [
    "btn-stroke",
    variant === "split" && "btn-stroke--split",
    variant === "split" && tone === "primary" && "btn-stroke--primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
