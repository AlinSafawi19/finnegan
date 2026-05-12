import { getHeroBlogs } from "@/data/blogs";
import { BlogCard } from "@/components/BlogCard";

type BlogsHeroGridProps = {
  showFeaturedBadge?: boolean;
};

export async function BlogsHeroGrid({
  showFeaturedBadge = false,
}: BlogsHeroGridProps) {
  const heroPosts = await getHeroBlogs();

  return (
    <>
      {heroPosts.map((post, i) => (
        <BlogCard
          key={post.id}
          post={post}
          imagePriority={i === 0}
          showFeaturedBadge={showFeaturedBadge}
        />
      ))}
    </>
  );
}
