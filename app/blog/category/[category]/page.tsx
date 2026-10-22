import { BlogPosts } from "components/blog/blog-posts";
import { getFilteredBlogPosts } from "lib/blog-filter";
import { isBlogPageInRange, parseBlogPageParam } from "lib/blog-pagination";
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
      heading={`Writing: ${categoryDisplayNames[category]}`}
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
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isBrowseCategory(category)) {
    notFound();
  }

  const displayName = categoryDisplayNames[category];

  return pageMetadata({
    description: categoryDescriptions[category],
    path: `/blog/category/${category}`,
    title: `Writing: ${displayName} | Gabo Esquivel`,
  });
}
