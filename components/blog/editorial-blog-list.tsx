import { cardArrow, editorialLink } from "components/shared/spacing";
import type { Blog } from "lib/blog";
import { cn, formatBlogListDate } from "lib/utils";
import Link from "next/link";

export function EditorialBlogList({
  posts,
  className,
  arrow = false,
}: {
  posts: Blog[];
  className?: string;
  arrow?: boolean;
}) {
  return (
    <ul
      className={cn(
        "divide-y divide-hairline border-y border-hairline",
        className
      )}
    >
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className={cn(
              editorialLink,
              "group grid gap-3 py-6 sm:gap-8",
              arrow
                ? "sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-start"
                : "sm:grid-cols-[9rem_1fr]"
            )}
          >
            <time
              dateTime={post.publishedAt}
              className="text-sm text-neutral-400"
            >
              {formatBlogListDate(post.publishedAt)}
            </time>
            <div className={arrow ? "min-w-0" : undefined}>
              {arrow ? (
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <span
                    aria-hidden="true"
                    className={cn(cardArrow, "mt-1 sm:hidden")}
                  >
                    →
                  </span>
                </div>
              ) : (
                <h3 className="text-lg font-semibold">{post.title}</h3>
              )}
              {post.summary ? (
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {post.summary}
                </p>
              ) : null}
            </div>
            {arrow ? (
              <span
                aria-hidden="true"
                className={cn(cardArrow, "mt-1 hidden sm:block")}
              >
                →
              </span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
