"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type FooterNavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  children: ReactNode;
  className?: string;
};

function isFooterNavActive(href: string, pathname: string): boolean {
  if (href.startsWith("http")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function FooterNavLink({
  children,
  className,
  href,
  ...rest
}: FooterNavLinkProps) {
  const pathname = usePathname();
  const hrefStr = typeof href === "string" ? href : href.pathname ?? "";
  const active = hrefStr ? isFooterNavActive(hrefStr, pathname) : false;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={["footer-nav", "link-light", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Link>
  );
}
