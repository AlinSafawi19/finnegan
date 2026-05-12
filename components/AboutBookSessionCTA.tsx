"use client";

import { Icon } from "@/components/phosphor_1";
import { AboutScrollReveal } from "@/components/AboutScrollReveal";
import {
  StrokeButton,
  StrokeSplitIconInner,
  StrokeSplitLabel,
} from "@/components/StrokeButton";

/** “Book a Session” stroke CTA — same scroll reveal as more-details copy. */
export function AboutBookSessionCTA() {
  return (
    <AboutScrollReveal className="aboutpage__book-cta">
      <StrokeButton href="/contact" variant="split" tone="outline">
        <StrokeSplitLabel>Book a Session</StrokeSplitLabel>
        <span className="btn-stroke__icon">
          <StrokeSplitIconInner>
            <Icon
              name="ArrowUpRight"
              width={20}
              height={22}
              weight="regular"
              mirrored={false}
              color="currentColor"
              aria-hidden
            />
          </StrokeSplitIconInner>
        </span>
      </StrokeButton>
    </AboutScrollReveal>
  );
}
