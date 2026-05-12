import type { ReactNode } from "react";
import type { HeadingSize } from "./heading-size";
import { body3SizeClass } from "./heading-size";

type Body3Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** `large` = full S→M→L; `medium` = desktop caps at M (18px); `small` = 20px everywhere. */
  size?: HeadingSize;
};

export function Body3({
  children,
  className,
  id,
  size = "large",
}: Body3Props) {
  const sizeClass = body3SizeClass(size);
  return (
    <p
      id={id}
      className={["body-3", sizeClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </p>
  );
}
