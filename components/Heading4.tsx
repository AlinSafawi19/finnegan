import type { ReactNode } from "react";

type Heading4Props = {
  children: ReactNode;
  className?: string;
};

/** Fourth-level heading; single-tier spec from design. */
export function Heading4({ children, className }: Heading4Props) {
  return (
    <h4 className={["heading-4", className].filter(Boolean).join(" ")}>
      {children}
    </h4>
  );
}
