"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Split label as `<p>` — valid inside `FillButton` with `href` (`<a>`). Do not use inside `<button>`; use `FillSplitLabelSpan` instead. */
export function FillSplitLabel({ children }: { children: ReactNode }) {
  return <p className="btn-fill__label">{children}</p>;
}

/** Same styles as the label, as `<span>` for `FillButton` without `href` (native `<button>` cannot contain `<p>`). */
export function FillSplitLabelSpan({ children }: { children: ReactNode }) {
  return <span className="btn-fill__label">{children}</span>;
}

/** Wraps the Phosphor icon in the split right column (20×22, rotate 45°, cream — see `buttons.css`). */
export function FillSplitIconInner({ children }: { children: ReactNode }) {
  return <span className="btn-fill__icon-inner">{children}</span>;
}

type FillButtonProps = {
  children: ReactNode;
  className?: string;
  /** When set, renders Next.js `Link`; otherwise a `<button>`. */
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** `split` — label left, icon in a fixed right column with a divider. */
  variant?: "default" | "split";
};

export function FillButton({
  children,
  className,
  href,
  type = "button",
  disabled,
  variant = "default",
}: FillButtonProps) {
  const classes = [
    "btn-fill",
    variant === "split" && "btn-fill--split",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  if (href) {
    return (
      <Link href={href} className={classes}>
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
