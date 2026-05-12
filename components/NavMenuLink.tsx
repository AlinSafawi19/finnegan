import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import type { HeadingSize } from "./heading-size";
import { navMenuSizeClass } from "./heading-size";

type NavMenuLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Marks the current route for `aria-current` (pair with active styles in CSS). */
  isActive?: boolean;
  /** `large` = full S→M→L; `medium` = desktop caps at M (80px); `small` = 40px everywhere. */
  size?: HeadingSize;
};

export function NavMenuLink({
  href,
  children,
  className,
  onClick,
  isActive = false,
  size = "large",
}: NavMenuLinkProps) {
  const sizeClass = navMenuSizeClass(size);
  return (
    <Link
      href={href}
      className={["nav-menu", sizeClass, className].filter(Boolean).join(" ")}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
