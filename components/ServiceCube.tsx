"use client";

import { useCallback } from "react";
import { Heading3 } from "@/components/Heading3";
import { ParagraphS } from "@/components/ParagraphS";
import { SERVICE_CUBE_COPY } from "@/data/service-cube";

const STACK_ORDER = [
  ["long", "short", "short", "short"],
  ["short", "long", "short", "short"],
  ["short", "short", "long", "short"],
  ["short", "short", "short", "long"],
] as const;

type ServiceCubeProps = {
  /** 0–3: sync with background images / scroll sections (`#services` + `#services-2`…`#services-4`). */
  activeVariant: number;
};

function scrollToServiceVariant(variantIndex: number) {
  // Variant 0: `#about` is a full-viewport sticky block — `scrollIntoView` often does nothing
  // when already in the services band. `#services` + `start` reliably returns to the first band.
  const id =
    variantIndex === 0 ? "services" : `services-${variantIndex + 1}`;
  const el = document.getElementById(id);
  if (!el) return;
  const smooth =
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block: variantIndex === 0 ? "start" : "center",
  });
}

function CardDesktopLight({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="service-cube-card service-cube-card--desktop-light">
      <Heading3 className="service-cube-card__title-abs">
        {title}
      </Heading3>
      <ParagraphS className="service-cube-card__desc-abs service-cube-card__desc--light">
        {description}
      </ParagraphS>
    </div>
  );
}

function CardDesktopDark({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="service-cube-card service-cube-card--desktop-dark">
      <Heading3 className="service-cube-card__title-abs">
        {title}
      </Heading3>
      <ParagraphS className="service-cube-card__desc-abs">
        {description}
      </ParagraphS>
    </div>
  );
}

function CardPhoneLight({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="service-cube-card service-cube-card--phone-light">
      <Heading3 className="service-cube-card__title-abs">
        {title}
      </Heading3>
      <ParagraphS className="service-cube-card__desc-abs service-cube-card__desc--light">
        {description}
      </ParagraphS>
    </div>
  );
}

function CardPhoneDark({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="service-cube-card service-cube-card--phone-dark">
      <Heading3 className="service-cube-card__title-abs">
        {title}
      </Heading3>
      <ParagraphS className="service-cube-card__desc-abs">
        {description}
      </ParagraphS>
    </div>
  );
}

export function ServiceCube({ activeVariant }: ServiceCubeProps) {
  const v = Math.max(0, Math.min(3, activeVariant)) as 0 | 1 | 2 | 3;
  const rxDeg = v * 90;
  const stackPattern = STACK_ORDER[v];
  const [s0, s1, s2, s3] = SERVICE_CUBE_COPY;

  const onVariantClick = useCallback((index: number) => {
    scrollToServiceVariant(index);
  }, []);

  return (
    <div
      className="service-cube"
      role="region"
      aria-label="Service offerings cube"
      data-cube-variant={v + 1}
    >
      {/* Desktop: centered 3D block (matches heading width); dots anchored outside shell */}
      <div className="service-cube__variant service-cube__variant--desktop">
        <div className="service-cube__desktop-center">
          <div className="service-cube__desktop-shell">
            <div className="service-cube__perspective">
              <div
                className="service-cube__frame-rotator"
                data-cube-rx={String(rxDeg)}
              >
                <div className="service-cube__cube">
                  <div className="service-cube__face service-cube__face--right">
                    <CardDesktopDark title={s3.title} description={s3.description} />
                  </div>
                  <div className="service-cube__face service-cube__face--left">
                    <CardDesktopDark title={s0.title} description={s0.description} />
                  </div>
                  <div className="service-cube__face service-cube__face--front">
                    <CardDesktopLight title={s0.title} description={s0.description} />
                  </div>
                  <div className="service-cube__face service-cube__face--bottom">
                    <CardDesktopDark title={s1.title} description={s1.description} />
                  </div>
                  <div className="service-cube__face service-cube__face--back">
                    <CardDesktopLight title={s2.title} description={s2.description} />
                  </div>
                  <div className="service-cube__face service-cube__face--top">
                    <CardDesktopDark title={s3.title} description={s3.description} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="service-cube__stack"
            role="group"
            aria-label="Service variants"
          >
            <div className="service-cube__stack-inner">
              {stackPattern.map((kind, i) => (
                <button
                  key={i}
                  type="button"
                  className="service-cube__stack-hit"
                  aria-label={`Scroll to ${SERVICE_CUBE_COPY[i].title}`}
                  aria-current={v === i ? "true" : undefined}
                  onClick={() => onVariantClick(i)}
                >
                  <span
                    className={
                      kind === "long"
                        ? "service-cube__stack-dash service-cube__stack-dash--long"
                        : "service-cube__stack-dash"
                    }
                    aria-hidden
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phone: stacked panels */}
      <div className="service-cube__variant service-cube__variant--phone">
        <div className="service-cube-phone__stack">
          <div className="service-cube-phone__panel service-cube-phone__panel--top">
            <CardPhoneDark title={s0.title} description={s0.description} />
          </div>
          <div className="service-cube-phone__panel service-cube-phone__panel--back">
            <CardPhoneLight title={s1.title} description={s1.description} />
          </div>
          <div className="service-cube-phone__panel service-cube-phone__panel--bottom">
            <CardPhoneDark title={s2.title} description={s2.description} />
          </div>
          <div className="service-cube-phone__panel service-cube-phone__panel--front">
            <CardPhoneLight title={s3.title} description={s3.description} />
          </div>
        </div>
      </div>
    </div>
  );
}
