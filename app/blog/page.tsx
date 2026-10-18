import { BlogPosts } from "components/blog/blog-posts";
import { pageMetadata } from "lib/page-metadata";

export const metadata = pageMetadata({
  description:
    "Notes on shipping software — AI, Web3, and engineering. Recent writing on agents, DeFi, architecture, and what held up in production.",
  path: "/blog",
  title: "Writing | Gabo Esquivel",
});

export default async function BlogPage() {
  return <BlogPosts category="all" heading="Writing" />;
}
