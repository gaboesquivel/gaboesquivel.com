import { SiteCardLink } from "components/shared/site-card-link";
import { proseClass } from "components/shared/spacing";
import type { Blog } from "lib/blog";
import { cn, formatDate } from "lib/utils";

export function BlogPostCard({ post }: { post: Blog }) {
  return (
    <SiteCardLink
      cardClassName="flex h-full w-full flex-col"
      href={`/blog/${post.slug}`}
    >
      <h3 className="mb-1 font-medium">{post.title}</h3>
      {post.summary ? (
        <p
          className={cn(
            proseClass,
            "line-clamp-none flex-grow text-sm md:line-clamp-3"
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
  );
}
