import type { ReactNode } from "react";
import type { HeadingSize } from "./heading-size";
import { heading2lSizeClass } from "./heading-size";

type Heading2LProps = {
  children: ReactNode;
  className?: string;
  /** `large` = full S→M→L; `medium` = desktop caps at M; `small` = S only everywhere. */
  size?: HeadingSize;
};

export function Heading2L({
  children,
  className,
  size = "large",
}: Heading2LProps) {
  const sizeClass = heading2lSizeClass(size);
  return (
    <h2
      className={["heading-2-l", sizeClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </h2>
  );
}
