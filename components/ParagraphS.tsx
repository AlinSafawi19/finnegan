import type { ReactNode } from "react";

type ParagraphSProps = {
  children: ReactNode;
  className?: string;
};

/** Smaller paragraph style; single-tier spec from design. */
export function ParagraphS({ children, className }: ParagraphSProps) {
  return (
    <p
      className={["paragraph-s", className].filter(Boolean).join(" ")}
    >
      {children}
    </p>
  );
}
