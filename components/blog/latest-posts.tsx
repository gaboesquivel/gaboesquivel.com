import { WritingPostsSection } from "components/blog/writing-posts-section";
import { allBlogs } from "lib/blog";
import { newestPosts } from "lib/blog-order";
import { postMatchesBrowseCategory, toBrowseSlug } from "lib/blog-taxonomy";
import type { ReactNode } from "react";

import { PostGrid } from "./posts-grid";

export function LatestPosts({
  limit = 8,
  title = "Latest Articles",
  category,
  tech,
  slugs,
  excludeSlug,
  action,
  variant = "cards",
  className,
  arrow = false,
}: {
  limit?: number;
  title?: string;
  category?: string;
  tech?: string;
  slugs?: string[];
  excludeSlug?: string;
  action?: ReactNode;
  variant?: "cards" | "editorial";
  className?: string;
  arrow?: boolean;
}) {
  const latestPosts = getLatestPosts({
    category,
    excludeSlug,
    limit,
    slugs,
    tech,
  });

  if (latestPosts.length === 0) {
    return null;
  }

  if (variant === "editorial") {
    return (
      <WritingPostsSection
        arrow={arrow}
        posts={latestPosts}
        title={title}
        action={action}
        className={className}
      />
    );
  }
  return <PostGrid posts={latestPosts} title={title} action={action} />;
}

function getLatestPosts({
  limit = 8,
  category,
  tech,
  slugs,
  excludeSlug,
}: {
  limit?: number;
  category?: string;
  tech?: string;
  slugs?: string[];
  excludeSlug?: string;
}) {
  let pool = [...allBlogs];
  if (category) {
    const browseSlug = toBrowseSlug(category);
    pool = browseSlug
      ? pool.filter((post) =>
          postMatchesBrowseCategory({
            categories: post.category,
            slug: browseSlug,
          })
        )
      : pool.filter((post) =>
          post.category?.some(
            (item) => item.toLowerCase() === category.toLowerCase()
          )
        );
  }
  if (tech) {
    pool = pool.filter((post) =>
      post.tech?.some((t) => t.toLowerCase() === tech.toLowerCase())
    );
  }
  if (excludeSlug) {
    pool = pool.filter((post) => post.slug !== excludeSlug);
  }

  return newestPosts({ limit, posts: pool, slugs });
}
