import { BlogPosts } from "components/blog/blog-posts";
import { getFilteredBlogPosts } from "lib/blog-filter";
import {
  blogListingHref,
  isBlogPageInRange,
  parseBlogPageParam,
} from "lib/blog-pagination";
import {
  browseCategories,
  categoryDescriptions,
  categoryDisplayNames,
  isBrowseCategory,
} from "lib/blog-taxonomy";
import { pageMetadata } from "lib/page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export default async function BlogCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string | string[] }>;
}) {
  const { category } = await params;
  if (!isBrowseCategory(category)) {
    notFound();
  }

  const resolved = await searchParams;
  const parsedPage = parseBlogPageParam(resolved?.page);
  if (parsedPage === "invalid") {
    notFound();
  }

  const totalItems = getFilteredBlogPosts(category).length;
  if (!isBlogPageInRange({ page: parsedPage, totalItems })) {
    notFound();
  }

  return (
    <BlogPosts
      category={category}
      heading={`${categoryDisplayNames[category]} Articles`}
      intro={categoryDescriptions[category]}
      page={parsedPage}
    />
  );
}

export function generateStaticParams() {
  return browseCategories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string | string[] }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isBrowseCategory(category)) {
    notFound();
  }

  const displayName = categoryDisplayNames[category];

  const base = pageMetadata({
    description: categoryDescriptions[category],
    path: `/blog/category/${category}`,
    title: `${displayName} Articles | Gabo Esquivel`,
  });
  const page = parseBlogPageParam((await searchParams)?.page);
  if (page === "invalid" || page <= 1) {
    return base;
  }
  // Each page lists different posts, so it is its own canonical.
  return {
    ...base,
    alternates: {
      ...base.alternates,
      canonical: blogListingHref({ category, page }),
    },
  };
}
