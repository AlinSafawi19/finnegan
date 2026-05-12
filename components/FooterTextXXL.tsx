import type { ReactNode } from "react";
import type { HeadingSize } from "./heading-size";
import { footerTextXxlSizeClass } from "./heading-size";

type FooterTextXXLProps = {
  children: ReactNode;
  className?: string;
  /** `large` = full S→M→L; `medium` = desktop caps at M (202px); `small` = 164px everywhere. */
  size?: HeadingSize;
};

export function FooterTextXXL({
  children,
  className,
  size = "large",
}: FooterTextXXLProps) {
  const sizeClass = footerTextXxlSizeClass(size);
  return (
    <p
      className={["footer-text-xxl", sizeClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </p>
  );
}
