"use client";

import { WritingFeaturedPost } from "components/blog/writing-featured-post";
import { WritingRecentList } from "components/blog/writing-recent-list";
import { editorialLink } from "components/shared/spacing";
import { allBlogs } from "lib/blog";
import type { CompositeName } from "lib/genui/composites";
import type { PublicRecord } from "lib/genui/envelope";
import { cn, formatBlogListDate } from "lib/utils";
import Link from "next/link";

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

  return (
    <ul className="space-y-0">
      {posts.map((post) => (
        <li
          key={post.slug}
          className={cn(
            editorialLink,
            "grid gap-4 border-t border-hairline py-6 sm:grid-cols-[9rem_1fr]"
          )}
        >
          <time
            className="text-sm text-neutral-500 tabular-nums"
            dateTime={post.publishedAt}
          >
            {formatBlogListDate(post.publishedAt)}
          </time>
          <div>
            <Link
              className="text-lg font-semibold text-white hover:text-accent"
              href={`/blog/${post.slug}`}
            >
              {post.title}
            </Link>
            {post.summary ? (
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {post.summary}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};
