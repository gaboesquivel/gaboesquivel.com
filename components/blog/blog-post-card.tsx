import { SiteCardLink } from "components/shared/site-card-link";
import { proseClass } from "components/shared/spacing";
import type { Blog } from "lib/blog";
import { cn, formatDate } from "lib/utils";

export function BlogPostCard({ post }: { post: Blog }) {
  return (
    <SiteCardLink href={`/blog/${post.slug}`}>
      <h3 className="mb-1 font-medium">{post.title}</h3>
      {post.publishedAt && (
        <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
      )}
      {post.summary && (
        <p className={cn(proseClass, "line-clamp-2 flex-grow text-sm")}>
          {post.summary}
        </p>
      )}
    </SiteCardLink>
  );
}
