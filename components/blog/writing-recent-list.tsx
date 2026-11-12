import { WritingPostsSection } from "components/blog/writing-posts-section";
import type { BlogCard } from "lib/blog-cards";
import type { ReactNode } from "react";

export function WritingRecentList({
  posts,
  className,
  title = "Recent writing",
  action,
}: {
  posts: BlogCard[];
  className?: string;
  title?: string;
  action?: ReactNode;
}) {
  return (
    <WritingPostsSection
      posts={posts}
      title={title}
      action={action}
      className={className}
    />
  );
}
