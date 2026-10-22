import { BlogPostCard } from "components/blog/blog-post-card";
import { EditorialBlogList } from "components/blog/editorial-blog-list";
import { CardGrid } from "components/shared/card-grid";
import { blockSpacing } from "components/shared/spacing";
import type { Blog } from "lib/blog";

export function BlogPostsMasonry({
  posts,
  identifier = "posts",
  variant = "card",
}: {
  posts: Blog[];
  identifier?: string;
  variant?: "card" | "editorial";
}) {
  if (variant === "editorial") {
    return (
      <EditorialBlogList posts={posts} showArrow className={blockSpacing} />
    );
  }

  return (
    <CardGrid
      items={posts}
      identifier={identifier}
      getKey={(post) => post.slug}
      renderItem={(post) => <BlogPostCard post={post} />}
    />
  );
}
