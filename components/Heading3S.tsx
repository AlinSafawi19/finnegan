import type { ReactNode } from "react";

type Heading3SProps = {
  children: ReactNode;
  className?: string;
};

/** Smaller Heading 3 style (20px). Design is single-tier; no `size` prop. */
export function Heading3S({ children, className }: Heading3SProps) {
  return (
    <h5
      className={["heading-3-s", className].filter(Boolean).join(" ")}
    >
      {children}
    </h5>
  );
}
