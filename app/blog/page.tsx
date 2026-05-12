import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { Heading1 } from "@/components/Heading1";
import { getBlogListingFeaturedAndRest } from "@/data/blogs";
import "./blogs-page.css";

export const metadata: Metadata = {
  title: "Blogs",
};

export default async function BlogsPage() {
  const { featured, rest } = await getBlogListingFeaturedAndRest();

  return (
    <div className="blog-page">
      <main className="blog-page__main">
        <header className="blog-page__heading">
          <Heading1 className="blog-page__heading-title" size="large">
            Blogs
          </Heading1>
        </header>

        <section className="blog-page__blogs" aria-label="Blog articles">
          <div className="blog-page__container">
            {featured ? (
              <div className="blog-page__top-featured">
                <div className="blog-page__blog blog-page__blog--featured">
                  <BlogCard
                    post={featured}
                    variant="horizontal"
                    imagePriority
                    showFeaturedBadge
                  />
                </div>
              </div>
            ) : null}

            {rest.length > 0 ? (
              <div className="blog-page__other">
                <div className="blog-page__blog blog-page__blog--other">
                  {rest.map((post, i) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      imagePriority={i === 0}
                      showFeaturedBadge
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
