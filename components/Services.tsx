"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Heading2L } from "@/components/Heading2L";
import { ServiceCube } from "@/components/ServiceCube";

const SERVICE_IMAGES = [
  {
    src: "https://framerusercontent.com/images/QYuVqRAxUi0MftDQcaQd3I9e76E.jpg?scale-down-to=1024&width=6720&height=4480",
    alt: "Documentary photography service",
  },
  {
    src: "https://framerusercontent.com/images/aiel3WtTgXPAKPqTLdFFaO8JNEA.jpg?scale-down-to=1024&width=6749&height=5203",
    alt: "Landscape photography service",
  },
  {
    src: "https://framerusercontent.com/images/MJs0yMA8eL0lMKdn787qmQJy8.jpg?scale-down-to=1024&width=5436&height=3840",
    alt: "Product photography service",
  },
  {
    src: "https://framerusercontent.com/images/9V3jYmjzIjUhJVkMIMsNC9zBIc.jpg?scale-down-to=1024&width=4032&height=3024",
    alt: "Real estate photography service",
  },
] as const;

const MORE_SERVICES = [
  {
    titleLines: ["Event", "Photography"] as const,
    description:
      "Tell powerful stories through our event photography, capturing real-life events and moments.",
  },
  {
    titleLines: ["Aerial", "Photography"] as const,
    description:
      "Get a bird’s-eye view with stunning aerial photography captured via drones, perfect for real estate, events, and landscapes.",
  },
  {
    titleLines: ["Corporate", "Photography"] as const,
    description:
      "Enhance your brand image with professional corporate photography for headshots, team photos, and company events.",
  },
  {
    titleLines: ["Editorial", "Photography"] as const,
    description:
      "Bring your stories to life with compelling editorial photography for magazines, blogs, and publications.",
  },
] as const;

/** `#services` scroll progress → scale 0.7 … 1.2 */
function servicesScrollScale(sectionEl: HTMLElement): number {
  const rect = sectionEl.getBoundingClientRect();
  const vh =
    typeof window !== "undefined" ? window.innerHeight : rect.height;
  const h = rect.height;
  if (h <= 0 || vh <= 0) return 0.7;
  const raw = (vh - rect.top) / (vh + h);
  const progress = Math.max(0, Math.min(1, raw));
  return 0.7 + progress * (1.2 - 0.7);
}

/** Same vertical band as the old variant IO (`-42%` top/bottom) — middle ~16% of viewport. */
function variantBandEdges(vh: number): { bandTop: number; bandBot: number } {
  return { bandTop: vh * 0.42, bandBot: vh * 0.58 };
}

function variantSectionHitsBand(
  r: DOMRect,
  bandTop: number,
  bandBot: number,
): boolean {
  return r.bottom > bandTop && r.top < bandBot;
}

/**
 * Max variant index (0–3) from scroll layout: same “max intersecting id − 1” rule as before,
 * but when nothing hits the narrow band we keep the last index unless we’re clearly back
 * in the intro (first band hasn’t reached the band yet) — avoids Lenis/IO gaps on scroll up.
 */
function computeActiveServiceImageIndex(lastIndex: number): number {
  if (typeof window === "undefined") return 0;
  const vh = window.innerHeight;
  if (vh <= 0) return 0;
  const { bandTop, bandBot } = variantBandEdges(vh);

  let hitId = 0;
  for (const id of [2, 3, 4] as const) {
    const el = document.getElementById(`services-${id}`);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (variantSectionHitsBand(r, bandTop, bandBot)) {
      hitId = Math.max(hitId, id);
    }
  }

  if (hitId >= 2) return hitId - 1;

  const el2 = document.getElementById("services-2");
  const r2 = el2?.getBoundingClientRect();
  if (r2 && r2.top > bandBot) return 0;

  return lastIndex;
}

function moreTriggerActive(entry: IntersectionObserverEntry): boolean {
  if (!entry.isIntersecting) return false;
  const vh =
    typeof window !== "undefined" ? window.innerHeight : entry.rootBounds?.height ?? 0;
  if (vh <= 0) return false;
  const r = entry.boundingClientRect;
  const bandTop = vh * 0.72;
  return r.top < vh && r.bottom > bandTop;
}

export function Services() {
  const servicesRef = useRef<HTMLElement>(null);
  const scaleWrapRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const [moreVisible, setMoreVisible] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const displayedImageIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const applyServicesScrollFrame = useCallback(() => {
    const section = servicesRef.current;
    const scaleEl = scaleWrapRef.current;
    if (section && scaleEl) {
      const s = servicesScrollScale(section);
      scaleEl.style.transform = `scale(${s}) translate(0px, 0px)`;
    }

    const last = displayedImageIndexRef.current;
    const next = computeActiveServiceImageIndex(last);
    displayedImageIndexRef.current = next;
    if (next !== last) setActiveImageIndex(next);
  }, []);

  useEffect(() => {
    const moreEl = moreRef.current;
    if (!moreEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        setMoreVisible(moreTriggerActive(e));
      },
      {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.95, 1],
      },
    );

    observer.observe(moreEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        applyServicesScrollFrame();
      });
    };

    applyServicesScrollFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [applyServicesScrollFrame]);

  return (
    <section
      ref={servicesRef}
      id="services"
      className="services"
      aria-label="Services"
    >
      <div className="services__inner">
        <div
          id="about"
          className="services__sticky"
          data-more-visible={moreVisible ? "true" : "false"}
        >
          <div className="services__image-layer">
            <div
              ref={scaleWrapRef}
              className="services__service-image-scale services__service-image-scale--v1"
            >
              {SERVICE_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  className={[
                    "services__service-image-slide",
                    idx === activeImageIndex
                      ? "services__service-image-slide--active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  {...(idx !== activeImageIndex
                    ? { "aria-hidden": true as const }
                    : {})}
                >
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="100vw"
                    quality={90}
                    className="services__service-image-img"
                    draggable={false}
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="services__sticky-stack">
            <div className="services__heading-wrap">
              <Heading2L className="services__heading-title">
                My Expertise
              </Heading2L>
            </div>
            <div className="services__cube-area">
              <ServiceCube activeVariant={activeImageIndex} />
            </div>
          </div>
        </div>
        <div ref={moreRef} id="more" className="services__details">
          <div id="services-2" className="services__variant-section" />
          <div id="services-3" className="services__variant-section" />
          <div id="services-4" className="services__variant-section" />
          <div className="services__more-triggers">
            <div className="services__more-services">
              <div className="services__more-container">
                <div className="services__more-content">
                  <Heading2L className="services__more-heading">
                    Wait… <br />
                    There&apos;s more!
                  </Heading2L>
                  <div className="services__more-cards-wrap">
                    <div
                      className="services__more-grid"
                      role="list"
                      aria-label="Additional photography services"
                    >
                      {MORE_SERVICES.map((item, i) => (
                        <article
                          key={i}
                          className="services__more-card"
                          role="listitem"
                        >
                          <h3 className="services__more-card-title">
                            {item.titleLines.join("\n")}
                          </h3>
                          <p className="services__more-card-desc">
                            {item.description}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
