import { editorialLink } from "components/shared/spacing";
import type { Blog } from "lib/blog";
import { cn, formatBlogListDate } from "lib/utils";
import Link from "next/link";

export function WritingRecentList({
  posts,
  className,
  title = "Recent writing",
}: {
  posts: Blog[];
  className?: string;
  title?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <section className={cn("mt-16 lg:mt-20", className)}>
      <h2 className="mb-6 text-sm tracking-wide text-neutral-500 uppercase">
        {title}
      </h2>
      <ul className="divide-y divide-hairline border-y border-hairline">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className={cn(
                editorialLink,
                "flex items-baseline justify-between gap-6 py-4"
              )}
            >
              <span className="min-w-0 leading-snug font-semibold">
                {post.title}
              </span>
              <time
                dateTime={post.publishedAt}
                className="shrink-0 text-sm text-neutral-400"
              >
                {formatBlogListDate(post.publishedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
