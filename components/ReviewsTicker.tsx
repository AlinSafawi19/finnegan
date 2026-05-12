import {
  FillButton,
  FillSplitIconInner,
  FillSplitLabel,
} from "@/components/FillButton";
import { Icon } from "@/components/phosphor_1";
import { ReviewTickerCard } from "@/components/ReviewTickerCard";
import { REVIEWS_TICKER_CARDS } from "@/data/reviews-ticker";

export function ReviewsTicker() {
  return (
    <section
      id="reviews"
      className="reviews-ticker"
      aria-label="Client reviews"
    >
      <div className="reviews-ticker__outer">
        <div className="reviews-ticker__inner">
          <div
            className="reviews-ticker__heading-spacer"
            aria-hidden
          />
          <div
            className="reviews-ticker__heading-wrap"
            role="group"
            aria-label="Reviews heading"
          >
            <h2 className="reviews-ticker__headline">
              <span className="heading-2-s reviews-ticker__title-s">
                Smiles and Stories from
              </span>
              <span className="heading-2-l reviews-ticker__title-l">
                My Clients
              </span>
            </h2>
          </div>
          <div className="reviews-ticker__viewport">
            <div className="reviews-ticker__strip-wrap">
              <div className="reviews-ticker__strip">
                {[...REVIEWS_TICKER_CARDS, ...REVIEWS_TICKER_CARDS].map(
                  (card, i) => (
                    <ReviewTickerCard
                      key={`${card.name}-${card.avatarSrc}-${i}`}
                      card={card}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="reviews-ticker__cta">
            <FillButton href="/reviews" variant="split">
              <FillSplitLabel>View all reviews</FillSplitLabel>
              <span className="btn-fill__icon" aria-hidden>
                <FillSplitIconInner>
                  <Icon
                    name="ArrowUpRight"
                    width={20}
                    height={22}
                    weight="regular"
                    mirrored={false}
                    color="currentColor"
                  />
                </FillSplitIconInner>
              </span>
            </FillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
