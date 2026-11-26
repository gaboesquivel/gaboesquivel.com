import { BlogPosts } from "components/blog/blog-posts";
import { getFilteredBlogPosts } from "lib/blog-filter";
import { blogIndexDescription } from "lib/blog-index";
import {
  blogListingHref,
  isBlogPageInRange,
  parseBlogPageParam,
} from "lib/blog-pagination";
import { pageMetadata } from "lib/page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string | string[] }>;
}): Promise<Metadata> {
  const base = pageMetadata({
    description: blogIndexDescription,
    path: "/blog",
    title: "Writing | Gabo Esquivel",
  });
  const page = parseBlogPageParam((await searchParams)?.page);
  if (page === "invalid" || page <= 1) {
    return base;
  }
  // Each page lists different posts, so it is its own canonical, not /blog.
  return {
    ...base,
    alternates: { ...base.alternates, canonical: blogListingHref({ page }) },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string | string[] }>;
}) {
  const resolved = await searchParams;
  const parsedPage = parseBlogPageParam(resolved?.page);
  if (parsedPage === "invalid") {
    notFound();
  }

  const totalItems = getFilteredBlogPosts("all").length;
  if (!isBlogPageInRange({ page: parsedPage, totalItems })) {
    notFound();
  }

  return (
    <BlogPosts
      category="all"
      heading="Writing"
      intro={blogIndexDescription}
      page={parsedPage}
    />
  );
}
