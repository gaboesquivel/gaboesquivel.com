"use client";

import { EditorialBlogList } from "components/blog/editorial-blog-list";
import { WritingFeaturedPost } from "components/blog/writing-featured-post";
import { WritingRecentList } from "components/blog/writing-recent-list";
import { allBlogs } from "lib/blog";
import type { CompositeName } from "lib/genui/composites";
import type { PublicRecord } from "lib/genui/envelope";

export const WritingCompositeView = ({
  composite,
  postIds,
  records,
}: {
  composite: CompositeName;
  postIds: string[];
  records: PublicRecord[];
}) => {
  const posts = postIds.flatMap((id) => {
    const slug = id.replace("/blog/", "");
    const blog = allBlogs.find((post) => post.slug === slug);
    return blog ? [blog] : [];
  });

  if (composite === "featured-writing" && posts[0]) {
    const [featured, ...rest] = posts;
    return (
      <div className="space-y-12">
        <WritingFeaturedPost post={featured} />
        {rest.length > 0 && <WritingRecentList posts={rest} />}
      </div>
    );
  }

  return <EditorialBlogList posts={posts} />;
};
