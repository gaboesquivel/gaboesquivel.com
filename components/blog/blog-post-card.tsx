import { SiteCardLink } from "components/shared/site-card-link";
import type { Blog } from "lib/blog";
import { formatDate } from "lib/utils";

export function BlogPostCard({ post }: { post: Blog }) {
  return (
    <SiteCardLink
      cardClassName="flex h-full w-full flex-col"
      href={`/blog/${post.slug}`}
    >
      <h3 className="font-medium">{post.title}</h3>
      {post.summary ? (
        <p className="line-clamp-none text-sm md:line-clamp-3">
          {post.summary}
        </p>
      ) : null}
      {post.publishedAt ? (
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
      ) : null}
    </SiteCardLink>
  );
}
