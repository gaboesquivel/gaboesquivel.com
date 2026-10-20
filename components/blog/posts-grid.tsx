import { PageSection } from "components/shared/page-layout";
import { SiteCardLink } from "components/shared/site-card-link";
import { proseClass, twoColGrid } from "components/shared/spacing";
import { cn, formatDate } from "lib/utils";
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
            <SiteCardLink
              cardClassName="flex h-full flex-col"
              href={`/blog/${post.slug}`}
            >
              <h3 className="mb-1 font-medium">{post.title}</h3>
              {post.summary ? (
                <p
                  className={cn(
                    proseClass,
                    "flex-grow text-sm md:line-clamp-3"
                  )}
                >
                  {post.summary}
                </p>
              ) : null}
              {post.publishedAt ? (
                <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                  {formatDate(post.publishedAt)}
                </p>
              ) : null}
            </SiteCardLink>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
