"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BRAND_LOGOS: Array<{ src: string; alt: string }> = [
  {
    src: "https://framerusercontent.com/images/ai5aTS5GwmknA02FMovLXZcdo.svg?width=40&height=40",
    alt: "Brand logo 1",
  },
  {
    src: "https://framerusercontent.com/images/63DQn8I4p3WgOvI4BM7roKIhhY.svg?width=218&height=40",
    alt: "Brand logo 2",
  },
  {
    src: "https://framerusercontent.com/images/giM6KbKs6r5PxXZrBII5liq9PoM.svg?width=202&height=40",
    alt: "Brand logo 3",
  },
  {
    src: "https://framerusercontent.com/images/ODBXEmKEOwlEN62SmqJ6KAeyM.svg?width=134&height=34",
    alt: "Brand logo 4",
  },
  {
    src: "https://framerusercontent.com/images/or0Wlg5UKFRZGfVPFnLR5bath6I.svg?width=163&height=42",
    alt: "Brand logo 5",
  },
  {
    src: "https://framerusercontent.com/images/gk7QZqkTE0Z8JusfQWLflnjHLdU.svg?width=72&height=40",
    alt: "Brand logo 6",
  },
  {
    src: "https://framerusercontent.com/images/Dxb7qkNUCWyGoFhyh79xOIQ3U.svg?width=155&height=40",
    alt: "Brand logo 7",
  },
  {
    src: "https://framerusercontent.com/images/JXpKtBJKpHK42NhZlu7pnrdSI8.svg?width=84&height=40",
    alt: "Brand logo 8",
  },
  {
    src: "https://framerusercontent.com/images/KWSiphSI3D6oqFCZInRrvKVFy4.svg?width=60&height=40",
    alt: "Brand logo 9",
  },
  {
    src: "https://framerusercontent.com/images/giM6KbKs6r5PxXZrBII5liq9PoM.svg?width=202&height=40",
    alt: "Brand logo 10",
  },
];

/** Avoid flicker when intersection ratio hovers around one threshold (Brands ↔ Works). */
const INVIEW_RATIO_ENTER = 0.2;
const INVIEW_RATIO_EXIT = 0.06;

export function Brands() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const r = entry.intersectionRatio;

        setInView((prev) => {
          if (r >= INVIEW_RATIO_ENTER) return true;
          if (!entry.isIntersecting || r <= INVIEW_RATIO_EXIT) return false;
          return prev;
        });
      },
      {
        root: null,
        threshold: [
          0, 0.05, 0.06, 0.08, 0.1, 0.12, 0.15, 0.18, 0.2, 0.25, 0.33, 0.5,
          0.66, 0.75, 1,
        ],
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="brands"
      data-inview={inView ? "true" : "false"}
      aria-label="Brands"
    >
      <div className="brands__inner">
        <div className="brands__heading">
          <h2 className="heading-2-s brands__title">
            Brands I have worked with
          </h2>
        </div>

        <div className="brands__logos" aria-label="Brand logos">
          {BRAND_LOGOS.map((logo, idx) => (
            <div className="brands__brand" key={`${logo.src}-${idx}`}>
              <div className="brands__brand-logo">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 809px) 50vw, (max-width: 1199px) 50vw, 20vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

