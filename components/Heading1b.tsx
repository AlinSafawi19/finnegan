import type { ReactNode } from "react";
import type { HeadingSize } from "./heading-size";
import { heading1bSizeClass } from "./heading-size";

type Heading1bProps = {
  children: ReactNode;
  className?: string;
  /** `large` = full S→M→L; `medium` = desktop caps at M; `small` = S only everywhere. */
  size?: HeadingSize;
};

export function Heading1b({
  children,
  className,
  size = "large",
}: Heading1bProps) {
  const sizeClass = heading1bSizeClass(size);
  return (
    <p
      className={["heading-1b", sizeClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </p>
  );
}
