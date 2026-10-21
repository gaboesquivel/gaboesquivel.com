import { BlogPostCard } from "components/blog/blog-post-card";
import { PageSection } from "components/shared/page-layout";
import { twoColGrid } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function PostGrid({
  posts,
  title,
  action,
}: {
  posts: {
    slug: string;
    title: string;
    publishedAt: string;
    summary?: string;
  }[];
  title: string;
  action?: ReactNode;
}) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <PageSection
      title={title}
      action={action}
      className="print:hidden preview-print:hidden"
    >
      <ul className={cn(twoColGrid, "[&_a]:h-full!")}>
        {posts.map((post) => (
          <li key={post.slug} className="h-full">
            <BlogPostCard post={post} />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
