import type { ReactNode } from "react";

type Body1Props = {
  children: ReactNode;
  className?: string;
};

export function Body1({ children, className }: Body1Props) {
  return (
    <p className={["body-1", className].filter(Boolean).join(" ")}>{children}</p>
  );
}
