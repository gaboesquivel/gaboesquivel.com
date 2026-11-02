import { EditorialBlogList } from "components/blog/editorial-blog-list";
import { blockSpacing } from "components/shared/spacing";
import type { Blog } from "lib/blog";

export function BlogPostsMasonry({
  posts,
  className,
}: {
  posts: Blog[];
  className?: string;
}) {
  return (
    <EditorialBlogList posts={posts} className={className ?? blockSpacing} />
  );
}
