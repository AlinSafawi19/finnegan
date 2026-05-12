import { Heading1 } from "@/components/Heading1";
import { ReviewTickerCard } from "@/components/ReviewTickerCard";
import {
  REVIEWS_PAGE_SECOND_COLUMN,
  REVIEWS_PAGE_THIRD_COLUMN,
  REVIEWS_TICKER_CARDS,
} from "@/data/reviews-ticker";
import "../reviews.css";

const COL_OFFSETS = [0, 1, 2] as const;

function columnCards(columnIndex: number) {
  if (columnIndex === 1) {
    return REVIEWS_PAGE_SECOND_COLUMN.map((card) => ({
      ...card,
      variant: 2 as const,
    }));
  }
  if (columnIndex === 2) {
    return REVIEWS_PAGE_THIRD_COLUMN.map((card) => ({
      ...card,
      variant: 2 as const,
    }));
  }
  const n = REVIEWS_TICKER_CARDS.length;
  return Array.from({ length: 4 }, (_, row) => {
    const card = REVIEWS_TICKER_CARDS[(COL_OFFSETS[columnIndex] + row) % n];
    return { ...card, variant: 2 as const };
  });
}

export default function ReviewsPage() {
  return (
    <div className="reviews-page">
      <main className="reviews-page__main">
        <header className="reviews-page__heading">
          <div className="reviews-page__heading-inner">
            <Heading1 size="large">Reviews</Heading1>
          </div>
        </header>
        <section className="reviews-page__reviews" aria-label="Client reviews">
          <div className="reviews-page__container">
            {COL_OFFSETS.map((_, colIndex) => (
              <div key={colIndex} className="reviews-page__column">
                {columnCards(colIndex).map((card, rowIndex) => (
                  <div
                    key={`${colIndex}-${rowIndex}`}
                    className="reviews-page__card-slot"
                  >
                    <ReviewTickerCard card={card} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
