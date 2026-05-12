import Image from "next/image";
import { notFound } from "next/navigation";
import { AboutScrollReveal } from "@/components/AboutScrollReveal";
import { BlogCard } from "@/components/BlogCard";
import { BlogPostContent } from "@/components/BlogPostContent";
import {
  StrokeButton,
  StrokeSplitIconInner,
  StrokeSplitLabel,
} from "@/components/StrokeButton";
import { Icon } from "@/components/phosphor_1";
import {
  formatBlogCardDateLabel,
  getBlogBySlug,
  getRelatedBlogsForSlug,
} from "@/data/blogs";
import "../blog-post.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const categoryName = post.tags[0] ?? "";
  const relatedPosts = await getRelatedBlogsForSlug(slug, 3);

  return (
    <>
      <div className="blog-post__post">
        <div className="blog-post__stack1">
          <div className="blog-post__stack1-inner">
            <h1 className="heading-1b blog-post__title">{post.title}</h1>
            <div className="blog-post__title-row">
              <div className="blog-post__category-stack">
                <span className="body-1 blog-post__category-label">
                  Category:
                </span>
                <span className="body-1 blog-post__category-name">
                  {categoryName || "—"}
                </span>
              </div>
              <time
                className="body-1 blog-post__title-date"
                dateTime={post.publishedAt}
              >
                {formatBlogCardDateLabel(post.publishedAt)}
              </time>
            </div>
          </div>
          <div className="blog-post__banner">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 809px) 100vw, (max-width: 1199px) 100vw, 800px"
              className="blog-post__banner-img"
              quality={90}
            />
          </div>
        </div>
        <div className="blog-post__stack2">
          <BlogPostContent
            html={post.content}
            className="blog-post__stack2-content"
          />
        </div>
      </div>
      <AboutScrollReveal className="blog-post__other-posts">
        <div className="blog-post__other-posts-stack">
          <h2 className="heading-2-s blog-post__other-posts-heading">
            Read other Blogs
          </h2>
          <div className="blog-post__other-posts-cards">
            {relatedPosts.length > 0 ? (
              <div className="blog-post__other-posts-cards-grid">
                {relatedPosts.map((related, i) => (
                  <div
                    key={related.id}
                    className="blog-post__other-posts-card-cell"
                  >
                    <BlogCard
                      post={related}
                      variant="vertical"
                      showFeaturedBadge={false}
                      imagePriority={i === 0}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
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
      </AboutScrollReveal>
    </>
  );
}
