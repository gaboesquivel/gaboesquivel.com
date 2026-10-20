import { BlogPosts } from "components/blog/blog-posts";
import { getFilteredBlogPosts } from "lib/blog-filter";
import { isBlogPageInRange, parseBlogPageParam } from "lib/blog-pagination";
import { pageMetadata } from "lib/page-metadata";
import { notFound } from "next/navigation";

export const metadata = pageMetadata({
  description:
    "Notes on shipping software — AI, Web3, and engineering. Recent writing on agents, DeFi, architecture, and what held up in production.",
  path: "/blog",
  title: "Writing | Gabo Esquivel",
});

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

  return <BlogPosts category="all" heading="Writing" page={parsedPage} />;
}
