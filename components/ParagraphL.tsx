import type { ReactNode } from "react";
import type { HeadingSize } from "./heading-size";
import { paragraphLSizeClass } from "./heading-size";

type ParagraphLProps = {
  children: ReactNode;
  className?: string;
  /** `large` = full S→M→L; `medium` = desktop caps at M (32px); `small` = 28px everywhere. */
  size?: HeadingSize;
};

export function ParagraphL({
  children,
  className,
  size = "large",
}: ParagraphLProps) {
  const sizeClass = paragraphLSizeClass(size);
  return (
    <p
      className={["paragraph-l", sizeClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </p>
  );
}
