"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/phosphor_1";
import type { PhosphorIconName } from "@/components/phosphor_1";

type SocialItem = {
  label: string;
  href: string;
  icon: PhosphorIconName;
};

const SOCIAL: SocialItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: "InstagramLogo" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: "FacebookLogo" },
  { label: "Twitter", href: "https://twitter.com/", icon: "X" },
  { label: "Linkedin", href: "https://www.linkedin.com/", icon: "LinkedinLogo" },
];

function SocialLink({ label, href, icon }: SocialItem) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={href}
      className="site-footer__cta-social-link"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <span className="site-footer__cta-social-link__icon" aria-hidden>
        <Icon
          name={icon}
          width={26}
          height={26}
          weight={hover ? "fill" : "regular"}
          color="currentColor"
        />
      </span>
      <span className="site-footer__cta-social-link__label">{label}</span>
    </Link>
  );
}

export function FooterCtaLinks() {
  return (
    <div className="site-footer__cta-links">
      <a
        href="mailto:finneganmonroe@email.com"
        className="body-2 link-dark site-footer__cta-links-email"
        target="_blank"
        rel="noopener noreferrer"
      >
        Finnegan@email.com
      </a>
      <div className="site-footer__cta-links-social">
        {SOCIAL.map((item) => (
          <SocialLink key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}
