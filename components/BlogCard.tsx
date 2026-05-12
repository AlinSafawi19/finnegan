"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatBlogCardDateLabel, type Blog } from "@/data/blogs";
import { WorksAlbumViewCursor } from "@/components/WorksAlbumViewCursor";

const READ_BADGE = 58;

function readCursorPositionWithinCard(e: React.MouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;
  let left = px - READ_BADGE / 2;
  let top = py - READ_BADGE / 2;
  const maxLeft = Math.max(0, rect.width - READ_BADGE);
  const maxTop = Math.max(0, rect.height - READ_BADGE);
  left = Math.min(Math.max(0, left), maxLeft);
  top = Math.min(Math.max(0, top), maxTop);
  return { left, top };
}

type BlogCardProps = {
  post: Blog;
  imagePriority?: boolean;
  /** When false, the “Featured” pill is never shown (e.g. homepage). Default true on the `/blog` listing. */
  showFeaturedBadge?: boolean;
  /** `horizontal` — full column width, fixed 416px height (Featured t12/l12 · frame · stack). Default `vertical`. */
  variant?: "vertical" | "horizontal";
};

export function BlogCard({
  post,
  imagePriority = false,
  showFeaturedBadge = true,
  variant = "vertical",
}: BlogCardProps) {
  const [readCursor, setReadCursor] = useState({
    targetLeft: 0,
    targetTop: 0,
    visible: false,
  });

  const tagLabel = post.tags[0] ?? "";

  const linkClass = "blogs__card-link";

  if (variant === "horizontal") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={linkClass}
        aria-label={`${post.title} — read article`}
        onMouseEnter={(e) => {
          const p = readCursorPositionWithinCard(e);
          setReadCursor({ targetLeft: p.left, targetTop: p.top, visible: true });
        }}
        onMouseLeave={() => setReadCursor((c) => ({ ...c, visible: false }))}
        onMouseMove={(e) => {
          const p = readCursorPositionWithinCard(e);
          setReadCursor({ targetLeft: p.left, targetTop: p.top, visible: true });
        }}
      >
        <div className="blogs__card-horizontal">
          <div className="blogs__card-horizontal-row">
            {post.featured && showFeaturedBadge ? (
              <div className="blogs__card-horizontal-category" aria-hidden>
                <p className="body-1 blogs__card-horizontal-category-text">
                  Featured
                </p>
              </div>
            ) : null}
            <div className="blogs__card-horizontal-frame">
              <div className="blogs__card-horizontal-frame-media">
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  fill
                  priority={imagePriority}
                  sizes="(max-width: 809px) 100vw, 431px"
                  className="blogs__card-horizontal-frame-img"
                  quality={90}
                />
              </div>
            </div>
            <div className="blogs__card-horizontal-stack">
              <div className="blogs__card-horizontal-stack-inner">
                <h3 className="heading-3-s blogs__card-horizontal-title">
                  {post.title}
                </h3>
                <div className="blogs__card-horizontal-meta">
                  <div className="blogs__card-pill blogs__card-pill--soft">
                    <p className="body-1 blogs__card-pill-text">{tagLabel}</p>
                  </div>
                  <div className="blogs__card-pill blogs__card-pill--soft">
                    <p className="body-1 blogs__card-pill-text">
                      {formatBlogCardDateLabel(post.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WorksAlbumViewCursor
          targetLeft={readCursor.targetLeft}
          targetTop={readCursor.targetTop}
          visible={readCursor.visible}
          label="READ"
        />
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={linkClass}
      aria-label={`${post.title} — read article`}
      onMouseEnter={(e) => {
        const p = readCursorPositionWithinCard(e);
        setReadCursor({ targetLeft: p.left, targetTop: p.top, visible: true });
      }}
      onMouseLeave={() => setReadCursor((c) => ({ ...c, visible: false }))}
      onMouseMove={(e) => {
        const p = readCursorPositionWithinCard(e);
        setReadCursor({ targetLeft: p.left, targetTop: p.top, visible: true });
      }}
    >
      <div className="blogs__card-vertical">
        <div className="blogs__card-stack-outer">
          {post.featured && showFeaturedBadge ? (
            <div className="blogs__card-category-floating" aria-hidden>
              <p className="body-1 blogs__card-category-floating-text">
                Featured
              </p>
            </div>
          ) : null}
          <div className="blogs__card-frame">
            <div className="blogs__card-frame-media">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                fill
                priority={imagePriority}
                sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 34vw"
                className="blogs__card-frame-img"
                quality={90}
              />
            </div>
          </div>
          <div className="blogs__card-bottom">
            <div className="blogs__card-bottom-inner">
              <h3 className="heading-3-s blogs__card-title">{post.title}</h3>
              <div className="blogs__card-meta-row">
                <div className="blogs__card-pill blogs__card-pill--soft">
                  <p className="body-1 blogs__card-pill-text">{tagLabel}</p>
                </div>
                <div className="blogs__card-pill blogs__card-pill--soft">
                  <p className="body-1 blogs__card-pill-text">
                    {formatBlogCardDateLabel(post.publishedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WorksAlbumViewCursor
        targetLeft={readCursor.targetLeft}
        targetTop={readCursor.targetTop}
        visible={readCursor.visible}
        label="READ"
      />
    </Link>
  );
}
