import type { ReactNode } from "react";
import type { HeadingSize } from "./heading-size";
import { heading3SizeClass } from "./heading-size";

type Heading3Props = {
  children: ReactNode;
  className?: string;
  /** `large` = full S→M→L; `medium` = desktop caps at M (32px); `small` = S only everywhere. */
  size?: HeadingSize;
};

export function Heading3({
  children,
  className,
  size = "large",
}: Heading3Props) {
  const sizeClass = heading3SizeClass(size);
  return (
    <h3
      className={["heading-3", sizeClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </h3>
  );
}
