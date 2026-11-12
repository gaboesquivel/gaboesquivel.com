import { allBlogs } from "lib/blog";
import { siteOrigin } from "lib/site-path";

import type { PublicRecord } from "./envelope";

export const profileRecord = ({
  id = "profile",
  title,
  url,
}: {
  id?: string;
  title: string;
  url: string;
}): PublicRecord => ({
  id,
  kind: "profile",
  title,
  url,
});

const published: readonly (typeof allBlogs)[number][] = allBlogs
  .filter((post) => post.publishedAt >= "2020")
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Non-archive posts, newest first. Computed once; callers must not mutate it. */
export const publishedPosts = () => published;

export const postRecord = (post: (typeof allBlogs)[number]): PublicRecord => ({
  excerpt: post.summary ?? "",
  id: `/blog/${post.slug}`,
  kind: "post",
  publishedAt: post.publishedAt,
  slug: post.slug,
  title: post.title,
  url: `${siteOrigin}/blog/${post.slug}`,
});
