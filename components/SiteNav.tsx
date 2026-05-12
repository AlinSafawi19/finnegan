"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { NavMenuLink } from "@/components/NavMenuLink";
import { Icon } from "@/components/phosphor_1";

const LOGO_SRC =
  "https://framerusercontent.com/images/FckyL3tMi0QMkjvlQZRbiGVnrE.png";

const BRAND_ARIA =
  "View my full photography portfolio including landscape, portrait, and travel photography.";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/albums", label: "Works" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blogs" },
  { href: "/contact", label: "Contact" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    shortLabel: "IG",
    href: "https://instagram.com",
  },
  {
    label: "Twitter",
    shortLabel: "TW",
    href: "https://twitter.com",
  },
  {
    label: "Facebook",
    shortLabel: "FB",
    href: "https://facebook.com",
  },
  {
    label: "Youtube",
    shortLabel: "YT",
    href: "https://youtube.com",
  },
] as const;

/** Strip trailing slash except root; `usePathname()` can be null/empty before hydration. */
function normalizePathnameSegment(path: string): string {
  if (!path) return "";
  if (path === "/") return "/";
  return path.replace(/\/$/, "") || "/";
}

function isOverlayNavActive(
  href: string,
  pathname: string,
  hash: string,
): boolean {
  const path = normalizePathnameSegment(pathname);
  const h = hash || "";

  if (href.startsWith("#")) {
    return path === "/" && h === href;
  }
  if (href === "/") {
    if (path !== "/") return false;
    if (h === "#about" || h === "#reviews") return false;
    return true;
  }
  if (!path) return false;
  return path === href || path.startsWith(`${href}/`);
}

function useResolvedPathname(): string {
  const fromNext = usePathname();
  return useMemo(() => {
    const raw =
      fromNext != null && fromNext !== ""
        ? fromNext
        : typeof window !== "undefined"
          ? window.location.pathname
          : "";
    return normalizePathnameSegment(raw);
  }, [fromNext]);
}

function OverlaySocialRow({
  onNavigate,
  isPhoneOverlay = false,
}: {
  onNavigate: () => void;
  isPhoneOverlay?: boolean;
}) {
  return (
    <div
      className={`site-nav-overlay__stack site-nav-overlay__stack--social${isPhoneOverlay ? " site-nav-overlay__stack--social-phone" : ""}`}
    >
      {SOCIAL_LINKS.map((item, index) => (
        <Fragment key={item.href}>
          <a
            href={item.href}
            className="site-nav-overlay__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            onClick={onNavigate}
          >
            <span className="site-nav-overlay__social-link__label">
              {isPhoneOverlay ? item.shortLabel : item.label}
            </span>
            {!isPhoneOverlay ? (
              <span
                className="site-nav-overlay__social-link__icon"
                aria-hidden
              >
                <Icon
                  name="ArrowUpRight"
                  width={23}
                  height={23}
                  weight="regular"
                  mirrored={false}
                  color="currentColor"
                />
              </span>
            ) : null}
          </a>
          {index < SOCIAL_LINKS.length - 1 ? (
            <span className="site-nav-overlay__social-rule" aria-hidden />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

function OverlayNavBlocks({
  onNavigate,
  pathname,
  routeHash,
  isPhoneOverlay = false,
}: {
  onNavigate: () => void;
  pathname: string;
  routeHash: string;
  isPhoneOverlay?: boolean;
}) {
  return (
    <>
      <div className="site-nav-overlay__stack site-nav-overlay__stack--links">
        {NAV_ITEMS.map((item) => {
          const active = isOverlayNavActive(item.href, pathname, routeHash);
          return (
            <NavMenuLink
              key={item.href}
              href={item.href}
              size="large"
              className={
                active
                  ? "site-nav-overlay__link site-nav-overlay__link--active"
                  : "site-nav-overlay__link"
              }
              isActive={active}
              onClick={onNavigate}
            >
              {item.label}
            </NavMenuLink>
          );
        })}
      </div>
      <OverlaySocialRow
        onNavigate={onNavigate}
        isPhoneOverlay={isPhoneOverlay}
      />
    </>
  );
}

/**
 * Fixed top navigation (exclusion blend, inner max 1200px). Breakpoints: phone ≤809, tablet 810–1199, desktop ≥1200.
 * Full-screen overlay from menu control; manual two-dash icon → X when open.
 */
export function SiteNav() {
  const pathname = useResolvedPathname();
  const [routeHash, setRouteHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayMounted, setOverlayMounted] = useState(false);
  const [overlayShown, setOverlayShown] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    setRouteHash(window.location.hash);
    const onHash = () => setRouteHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      setOverlayMounted(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setOverlayShown(true));
      });
      return () => cancelAnimationFrame(id);
    }
    setOverlayShown(false);
    const t = window.setTimeout(() => setOverlayMounted(false), 300);
    return () => window.clearTimeout(t);
  }, [menuOpen]);

  useEffect(() => {
    if (!overlayMounted) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.classList.add("site-nav-scroll-locked");
    body.classList.add("site-nav-scroll-locked");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.classList.remove("site-nav-scroll-locked");
      body.classList.remove("site-nav-scroll-locked");
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [overlayMounted]);

  useEffect(() => {
    if (!overlayMounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [overlayMounted, closeMenu]);

  const overlay =
    overlayMounted ? (
      <div
        id="site-nav-overlay"
        className={`site-nav-overlay${overlayShown ? " site-nav-overlay--shown" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className="site-nav-overlay__menu">
          <div className="site-nav-overlay__desktop">
            <OverlayNavBlocks
              onNavigate={closeMenu}
              pathname={pathname}
              routeHash={routeHash}
            />
          </div>
          <div className="site-nav-overlay__tablet">
            <OverlayNavBlocks
              onNavigate={closeMenu}
              pathname={pathname}
              routeHash={routeHash}
            />
          </div>
          <div className="site-nav-overlay__phone">
            <OverlayNavBlocks
              onNavigate={closeMenu}
              pathname={pathname}
              routeHash={routeHash}
              isPhoneOverlay
            />
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <header className="site-nav-shell">
        <nav className="site-nav site-nav--v1 site-nav--v2" aria-label="Primary">
          <Link href="/" className="site-nav__brand" aria-label={BRAND_ARIA}>
            <span className="site-nav__brand-icon">
              <Image
                src={LOGO_SRC}
                alt=""
                width={97}
                height={25}
                quality={90}
                priority
              />
            </span>
          </Link>

          <button
            type="button"
            className="site-nav__menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            {...{ "aria-expanded": menuOpen ? "true" : "false" }}
            aria-haspopup="dialog"
            aria-controls="site-nav-overlay"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="site-nav__menu-icon"
              data-open={menuOpen ? "true" : "false"}
              aria-hidden
            >
              <div className="site-nav__menu-dashes">
                <span className="site-nav__menu-dash site-nav__menu-dash--top" />
                <span className="site-nav__menu-dash site-nav__menu-dash--bottom" />
              </div>
            </span>
          </button>
        </nav>
      </header>
      {typeof document !== "undefined" && overlay
        ? createPortal(overlay, document.body)
        : null}
    </>
  );
}
