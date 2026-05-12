import type { ReactNode } from "react";
import type { HeadingSize } from "./heading-size";
import { heading1SizeClass } from "./heading-size";

type Heading1Props = {
  children: ReactNode;
  className?: string;
  /** `large` = full S→M→L; `medium` = desktop caps at M; `small` = S only everywhere. */
  size?: HeadingSize;
};

export function Heading1({
  children,
  className,
  size = "large",
}: Heading1Props) {
  const sizeClass = heading1SizeClass(size);
  return (
    <h1
      className={["heading-1", sizeClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </h1>
  );
}
