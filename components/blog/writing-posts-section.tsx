import { EditorialBlogList } from "components/blog/editorial-blog-list";
import { PageSection } from "components/shared/page-layout";
import { interiorSectionGap } from "components/shared/spacing";
import type { Blog } from "lib/blog";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

/** Shared “Writing” / “Related writing” block used on home, work, articles, and related rails. */
export function WritingPostsSection({
  posts,
  title,
  action,
  className,
}: {
  posts: Blog[];
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <PageSection
      title={title}
      action={action}
      className={cn(interiorSectionGap, className)}
    >
      <EditorialBlogList posts={posts} />
    </PageSection>
  );
}
