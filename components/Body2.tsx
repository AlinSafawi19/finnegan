import type { ReactNode } from "react";
import type { HeadingSize } from "./heading-size";
import { body2SizeClass } from "./heading-size";

type Body2Props = {
  children: ReactNode;
  className?: string;
  /** `large` = full S→M→L; `medium` = desktop caps at M (30px); `small` = 24px everywhere. */
  size?: HeadingSize;
};

export function Body2({
  children,
  className,
  size = "large",
}: Body2Props) {
  const sizeClass = body2SizeClass(size);
  return (
    <p
      className={["body-2", sizeClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </p>
  );
}
