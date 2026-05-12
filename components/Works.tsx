"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Album } from "@/data/albums";
import { WorksAlbumCard } from "@/components/WorksAlbumCard";

type WorksProps = {
  albums: Album[];
};

type ProjectAlbumsBlockProps = {
  albumsStart: number;
  albumsLimit: number;
  children?: ReactNode;
  /** When this row shows a single album, center the card on the main axis (horizontal). */
  centerProject?: boolean;
  /** Vertically center the block’s content inside the scroll row (e.g. fifth album). */
  centerY?: boolean;
};

/** Inner “Albums” stack for each projects scroll layer (vertical, gap 40, start / start). */
function ProjectAlbumsBlock({
  albumsStart,
  albumsLimit,
  children,
  centerProject,
  centerY,
}: ProjectAlbumsBlockProps) {
  return (
    <div
      className={[
        "works__projects-albums",
        centerProject ? "works__projects-albums--center-project" : "",
        centerY ? "works__projects-albums--center-y" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-albums-state="default"
      data-albums-start={albumsStart}
      data-albums-limit={albumsLimit}
    >
      {children}
    </div>
  );
}

export function Works({ albums }: WorksProps) {
  const featured = albums.slice(0, 5);
  const projectsRef = useRef<HTMLElement>(null);
  /** Sticky panel has stable 100vh geometry — IO on sticky is reliable; heading-only targets can misreport inside sticky. */
  const stickyPanelRef = useRef<HTMLDivElement>(null);
  const prevStickyIntersecting = useRef<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const [centered, setCentered] = useState(false);
  /** Bump on viewport re-entry (scroll down) so the CSS animation restarts from t=0. */
  const [titleReplayKey, setTitleReplayKey] = useState(1);
  /** Tablet/desktop only — avoids `data-centered` thrash on narrow viewports. */
  const [projectsCenterEnabled, setProjectsCenterEnabled] = useState(false);
  const lastScrollYRef = useRef(0);
  /** Last meaningful scroll direction — used to skip title replay when scrolling up into the sticky panel. */
  const scrollDirectionRef = useRef<"up" | "down" | "none">("none");

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollYRef.current;
      if (Math.abs(dy) < 2) return;
      scrollDirectionRef.current = dy > 0 ? "down" : "up";
      lastScrollYRef.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 810px)");
    const sync = () => {
      const on = mq.matches;
      setProjectsCenterEnabled(on);
      if (!on) setCentered(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = stickyPanelRef.current;
    if (!el) return;

    const applyEntry = (entry: IntersectionObserverEntry | undefined) => {
      if (!entry) return;
      const on = Boolean(entry.isIntersecting);
      setInView(on);

      if (prevStickyIntersecting.current === null) {
        prevStickyIntersecting.current = on;
        return;
      }

      if (!prevStickyIntersecting.current && on) {
        /* No replay when re-entering while scrolling bottom → top (upward). */
        if (scrollDirectionRef.current !== "up") {
          setTitleReplayKey((k) => k + 1);
        }
      }
      prevStickyIntersecting.current = on;
    };

    const io = new IntersectionObserver(
      (entries) => applyEntry(entries[0]),
      {
        threshold: [0, 0.01, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px",
      },
    );

    io.observe(el);

    const pending =
      typeof io.takeRecords === "function" ? io.takeRecords() : [];
    applyEntry(pending[0]);

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!projectsCenterEnabled) return;

    const el = projectsRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setCentered(Boolean(entry?.isIntersecting));
      },
      {
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [projectsCenterEnabled]);

  return (
    <section
      className="works"
      data-inview={inView ? "true" : "false"}
      data-centered={centered ? "true" : "false"}
      aria-label="Works"
    >
      <div ref={stickyPanelRef} className="works__sticky">
        <div className="works__inner">
          <div className="works__heading" aria-label="Albums heading">
            <div className="works__title-layer">
              <div className="works__title-reveal">
                <div
                  key={titleReplayKey}
                  className="works__title-reveal-clip"
                >
                  <div className="works__title-reveal-inner">
                    <h2 className="heading-2-l works__title works__title--base">
                      Albums
                    </h2>
                    <h2
                      className="heading-2-l works__title works__title--blur"
                      aria-hidden
                    >
                      Albums
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        id="works"
        ref={projectsRef}
        className="works__projects"
        aria-label="Projects"
      >
        <div className="works__projects-inner">
          <div className="works__projects-scroll">
            <ProjectAlbumsBlock albumsStart={0} albumsLimit={1} centerProject>
              {featured[0] ? (
                <WorksAlbumCard album={featured[0]} imagePriority />
              ) : null}
            </ProjectAlbumsBlock>
          </div>
          <div className="works__projects-scroll">
            <ProjectAlbumsBlock albumsStart={1} albumsLimit={1}>
              {featured[1] ? (
                <WorksAlbumCard album={featured[1]} cardLayout="slot2" />
              ) : null}
            </ProjectAlbumsBlock>
          </div>
          <div className="works__projects-scroll works__projects-scroll--between">
            <div className="works__projects-albums-pair">
              <ProjectAlbumsBlock albumsStart={2} albumsLimit={1}>
                {featured[2] ? (
                  <WorksAlbumCard album={featured[2]} cardLayout="pairLeft" />
                ) : null}
              </ProjectAlbumsBlock>
              <ProjectAlbumsBlock albumsStart={3} albumsLimit={1}>
                {featured[3] ? (
                  <WorksAlbumCard album={featured[3]} cardLayout="pairRight" />
                ) : null}
              </ProjectAlbumsBlock>
            </div>
          </div>
          <div className="works__projects-scroll">
            <ProjectAlbumsBlock
              albumsStart={4}
              albumsLimit={1}
              centerProject
              centerY
            >
              {featured[4] ? (
                <WorksAlbumCard album={featured[4]} cardLayout="slot5" />
              ) : null}
            </ProjectAlbumsBlock>
          </div>
        </div>
      </section>
    </section>
  );
}
