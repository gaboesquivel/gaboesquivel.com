import { BlogPosts } from "components/blog/blog-posts";
import { getFilteredBlogPosts } from "lib/blog-filter";
import { blogIndexDescription } from "lib/blog-index";
import { isBlogPageInRange, parseBlogPageParam } from "lib/blog-pagination";
import { pageMetadata } from "lib/page-metadata";
import { notFound } from "next/navigation";

export const metadata = pageMetadata({
  description: blogIndexDescription,
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

  return (
    <BlogPosts
      category="all"
      heading="Writing"
      intro={blogIndexDescription}
      page={parsedPage}
    />
  );
}
