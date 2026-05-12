"use client";

import Image from "next/image";
import { Star } from "@phosphor-icons/react";
import { AlbumCorner } from "@/components/AlbumCorner";
import { Body3 } from "@/components/Body3";
import { ParagraphS } from "@/components/ParagraphS";
import type { ReviewTickerCard as ReviewTickerCardData } from "@/data/reviews-ticker";

type ReviewTickerCardProps = {
  card: ReviewTickerCardData;
};

export function ReviewTickerCard({ card }: ReviewTickerCardProps) {
  const vClass =
    card.variant === 2
      ? "reviews-ticker__card--v2"
      : "reviews-ticker__card--v1";

  return (
    <article
      className={["reviews-ticker__card", vClass].join(" ")}
      aria-label={`Review from ${card.name}`}
    >
      <div className="reviews-ticker__stack reviews-ticker__stack--1">
        <div className="reviews-ticker__avatar works__album-card">
          <div className="reviews-ticker__avatar-frame">
            <Image
              src={card.avatarSrc}
              alt={card.avatarAlt}
              fill
              sizes="63px"
              className="reviews-ticker__avatar-img"
              draggable={false}
            />
          </div>
          <AlbumCorner variant="light" placement="tl" size="small" positionPreset="card" />
          <AlbumCorner variant="light" placement="tr" size="small" positionPreset="card" />
          <AlbumCorner variant="light" placement="bl" size="small" positionPreset="card" />
          <AlbumCorner variant="light" placement="br" size="small" positionPreset="card" />
        </div>
        <ParagraphS className="reviews-ticker__card-text">{card.text}</ParagraphS>
      </div>

      <div className="reviews-ticker__stack reviews-ticker__stack--2">
        <Body3 className="reviews-ticker__card-name">{card.name}</Body3>
        <p className="reviews-ticker__card-details">{card.moreDetails}</p>
        <div
          className="reviews-ticker__stars"
          role="img"
          aria-label={`${card.rating} out of 5 stars`}
        >
          {Array.from({ length: card.rating }, (_, i) => (
            <span key={i} className="reviews-ticker__star-wrap">
              <Star
                className="reviews-ticker__star-icon"
                weight="fill"
                size={22}
                color="var(--color-deep-orange, #ff6017)"
                aria-hidden
              />
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
