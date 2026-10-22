import type { Blog } from "lib/blog";

import { WritingFeaturedPost } from "./writing-featured-post";
import { WritingRecentList } from "./writing-recent-list";

export function WritingIndex({
  posts,
  showFeatured,
}: {
  posts: Blog[];
  showFeatured: boolean;
}) {
  if (!showFeatured || posts.length === 0) {
    return <WritingRecentList posts={posts} title="Writing" />;
  }

  const [featured, ...rest] = posts;

  return (
    <>
      <WritingFeaturedPost post={featured} />
      <WritingRecentList posts={rest} />
    </>
  );
}
