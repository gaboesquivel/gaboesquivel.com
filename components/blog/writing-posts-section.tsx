import { EditorialBlogList } from "components/blog/editorial-blog-list";
import { PageSection } from "components/shared/page-layout";
import { sectionGap } from "components/shared/spacing";
import type { BlogCard } from "lib/blog-cards";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

/** Shared “Writing” / “Related writing” block used on home, work, articles, and related rails. */
export function WritingPostsSection({
  posts,
  title,
  action,
  className,
}: {
  posts: BlogCard[];
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <PageSection
      title={title}
      action={action}
      className={cn(sectionGap, className)}
    >
      <EditorialBlogList posts={posts} />
    </PageSection>
  );
}
