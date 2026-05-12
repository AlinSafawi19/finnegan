import {
  StrokeButton,
  StrokeSplitIconInner,
  StrokeSplitLabel,
} from "@/components/StrokeButton";
import { Icon } from "@/components/phosphor_1";
import { BlogsHeroGrid } from "@/components/BlogsHeroGrid";

export async function Blogs() {
  return (
    <section
      id="blogs"
      className="blogs"
      aria-labelledby="blogs-heading"
    >
      <div className="blogs__container">
        <div className="blogs__heading-spacer" aria-hidden />
        <div
          className="blogs__heading-wrap"
          role="group"
          aria-label="Blog articles heading"
        >
          <h2 id="blogs-heading" className="blogs__headline">
            <span className="heading-2-s blogs__title-s">
              Stay inspired with my
            </span>
            <span className="heading-2-l blogs__title-l">
              {" Insightful Articles"}
            </span>
          </h2>
        </div>
        <div className="blogs__wrap">
          <div className="blogs__blog">
            <BlogsHeroGrid showFeaturedBadge={false} />
          </div>
        </div>
        <div className="blogs__cta">
          <StrokeButton href="/blog" variant="split" tone="outline">
            <StrokeSplitLabel>All Blogs</StrokeSplitLabel>
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
    </section>
  );
}
