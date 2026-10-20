import { SiteCardLink } from "components/shared/site-card-link";
import type { Blog } from "lib/blog";
import { formatDate } from "lib/utils";

export function BlogPostCard({ post }: { post: Blog }) {
  return (
    <SiteCardLink cardClassName="h-full w-full" href={`/blog/${post.slug}`}>
      <h3 className="text-base leading-snug font-medium text-white">
        {post.title}
      </h3>
      {post.summary ? (
        <span className="block text-sm leading-relaxed text-neutral-300">
          {post.summary}
        </span>
      ) : null}
      {post.publishedAt ? (
        <time
          className="mt-1 block text-xs leading-normal text-neutral-400"
          dateTime={post.publishedAt}
        >
          {formatDate(post.publishedAt)}
        </time>
      ) : null}
    </SiteCardLink>
  );
}
