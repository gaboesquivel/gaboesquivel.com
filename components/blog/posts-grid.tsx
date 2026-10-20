import {
  blogCardClassName,
  blogCardDateClassName,
  blogCardSummaryClassName,
  blogCardTitleClassName,
} from "components/blog/blog-post-card";
import { PageSection } from "components/shared/page-layout";
import { SiteCardLink } from "components/shared/site-card-link";
import { twoColGrid } from "components/shared/spacing";
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
              cardClassName={blogCardClassName}
              href={`/blog/${post.slug}`}
            >
              <h3 className={blogCardTitleClassName}>{post.title}</h3>
              {post.summary ? (
                <span className={blogCardSummaryClassName}>{post.summary}</span>
              ) : null}
              {post.publishedAt ? (
                <time
                  className={blogCardDateClassName}
                  dateTime={post.publishedAt}
                >
                  {formatDate(post.publishedAt)}
                </time>
              ) : null}
            </SiteCardLink>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
