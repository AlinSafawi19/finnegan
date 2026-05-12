import Link from "next/link";
import { Body1 } from "@/components/Body1";
import { Hero } from "@/components/Hero";
import { Heading1 } from "@/components/Heading1";
import { Heading2L } from "@/components/Heading2L";
import { ParagraphL } from "@/components/ParagraphL";
import { ParagraphS } from "@/components/ParagraphS";
import { Icon } from "@/components/phosphor_1";
import {
  StrokeButton,
  StrokeSplitIconInner,
  StrokeSplitLabel,
} from "@/components/StrokeButton";
import { StatCounter } from "@/components/StatCounter";
import { Brands } from "@/components/Brands";
import { Works } from "@/components/Works";
import { getAlbums } from "@/lib/fetch-albums";
import { Services } from "@/components/Services";
import { ReviewsTicker } from "@/components/ReviewsTicker";
import { Blogs } from "@/components/Blogs";
import { Faq } from "@/components/Faq";

const DESCRIPTIVE_COPY =
  "HI, FINNEGAN MONROE HERE. I'M A FREELANCE PHOTOGRAPHER IN NY AND THE SHUTTERBUG  CAPTURING LIFE'S MAGICAL MOMENTS ONE CLICK AT A TIME.";

const HEADLINE = "Capturing Life's  Best Moments";

export default async function Home() {
  const albums = await getAlbums();

  return (
    <div className="min-h-screen bg-black-100">
      <main className="page-main">
        <Hero
          headingDescriptive={
            <>
              <div className="hero__heading-descriptive-text">
                <ParagraphS>{DESCRIPTIVE_COPY}</ParagraphS>
              </div>
              <div className="hero__heading-descriptive-cta">
                <StrokeButton
                  href="https://framer.link/LvEWI8I"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="split"
                  tone="outline"
                >
                  <StrokeSplitLabel>Get Template</StrokeSplitLabel>
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
              </div>
            </>
          }
          headingTitle={
            <Heading1 size="large">{HEADLINE}</Heading1>
          }
          headingOther={
            <>
              <div className="hero__heading-headline-other-label">
                <Body1>FINNEGAN MONROE PHOTOGRAPHY</Body1>
              </div>
              <div
                className="hero__heading-headline-other-stack"
                role="group"
                aria-label="Scroll to explore"
              >
                <span className="hero__heading-headline-stack-icon">
                  <Icon
                    name="ArrowDown"
                    width={12}
                    height={12}
                    weight="bold"
                    mirrored={false}
                    color="currentColor"
                    aria-hidden
                  />
                </span>
                <div className="hero__heading-headline-stack-text">
                  <Body1>Scroll to Explore</Body1>
                </div>
              </div>
              <div className="hero__heading-headline-other-cta">
                <Link
                  href="/contact"
                  className="body-1 link-light hero__heading-headline-other-link"
                >
                  WORK WITH ME
                </Link>
              </div>
            </>
          }
          about={
            <div className="hero__about-inner">
              <div className="hero__about-statistics" aria-label="Statistics">
                <div className="hero__about-statistics-row hero__about-statistics-row--1">
                  <div className="hero__stat hero__stat--v1 hero__stat--v2 hero__stat--grow-1-5">
                    <div className="hero__stat-v1-stack hero__stat-v1-stack--1">
                      <p className="paragraph-s hero__stat-v1-label">
                        Hours Behind the Lens
                      </p>
                    </div>
                    <div className="hero__stat-v1-stack hero__stat-v1-stack--2">
                      <StatCounter
                        className="hero__stat-v1-value"
                        value={9}
                        min={0}
                        max={1000}
                        stiffness={50}
                        damping={44}
                      />
                      <p className="hero__stat-v1-suffix">K+</p>
                    </div>
                  </div>
                  <div className="hero__stat hero__stat--v1 hero__stat--v2 hero__stat--grow-1">
                    <div className="hero__stat-v1-stack hero__stat-v1-stack--1">
                      <p className="paragraph-s hero__stat-v1-label">
                        Years of Experience
                      </p>
                    </div>
                    <div className="hero__stat-v1-stack hero__stat-v1-stack--2">
                      <StatCounter
                        className="hero__stat-v1-value"
                        value={15}
                        min={0}
                        max={1000}
                        stiffness={50}
                        damping={44}
                      />
                      <p className="hero__stat-v1-suffix">+</p>
                    </div>
                  </div>
                </div>
                <div className="hero__about-statistics-row hero__about-statistics-row--2">
                  <div className="hero__stat hero__stat--v1 hero__stat--v2 hero__stat--grow-1">
                    <div className="hero__stat-v1-stack hero__stat-v1-stack--1">
                      <p className="paragraph-s hero__stat-v1-label">
                        Awards and Recognitions
                      </p>
                    </div>
                    <div className="hero__stat-v1-stack hero__stat-v1-stack--2">
                      <StatCounter
                        className="hero__stat-v1-value"
                        value={13}
                        min={0}
                        max={1000}
                        stiffness={50}
                        damping={44}
                      />
                      <p className="hero__stat-v1-suffix">+</p>
                    </div>
                  </div>
                  <div className="hero__stat hero__stat--v1 hero__stat--v2 hero__stat--grow-1-5">
                    <div className="hero__stat-v1-stack hero__stat-v1-stack--1">
                      <p className="paragraph-s hero__stat-v1-label">
                        Happy Clients Served
                      </p>
                    </div>
                    <div className="hero__stat-v1-stack hero__stat-v1-stack--2">
                      <StatCounter
                        className="hero__stat-v1-value"
                        value={200}
                        min={0}
                        max={1000}
                        stiffness={50}
                        damping={44}
                      />
                      <p className="hero__stat-v1-suffix">+</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="about-me"
                className="hero__about-me"
                aria-label="About me"
              >
                <Heading2L className="hero__about-me-title">
                  I am …
                </Heading2L>
                <div className="hero__about-me-content">
                  <ParagraphL className="hero__about-me-body">
                    {`           a passionate photographer dedicated to capturing life's most precious moments. With a keen eye for detail and a `}
                    <span className="hero__about-me-accent">
                      love for storytelling
                    </span>
                    {`, I strive to create images that are not just beautiful, but that also evoke emotion and tell a compelling story.`}
                  </ParagraphL>
                  <StrokeButton
                    href="/about"
                    variant="split"
                    tone="outline"
                  >
                    <StrokeSplitLabel>More About Me</StrokeSplitLabel>
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
                </div>
              </div>
            </div>
          }
        />
        <Brands />
        <Works albums={albums} />
        <Services />
        <ReviewsTicker />
        <Blogs />
        <Faq />
      </main>
    </div>
  );
}
