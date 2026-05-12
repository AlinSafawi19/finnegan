import type { ReactNode } from "react";
import type { HeadingSize } from "./heading-size";
import { heading2sSizeClass } from "./heading-size";

type Heading2SProps = {
  children: ReactNode;
  className?: string;
  /** `large` = full S→M (L same as M); `medium` = same as large for this style; `small` = 19px everywhere. */
  size?: HeadingSize;
};

export function Heading2S({
  children,
  className,
  size = "large",
}: Heading2SProps) {
  const sizeClass = heading2sSizeClass(size);
  return (
    <h3
      className={["heading-2-s", sizeClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </h3>
  );
}
