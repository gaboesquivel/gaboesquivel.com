import { cardArrow, editorialLink } from "components/shared/spacing";
import type { Blog } from "lib/blog";
import { cn, formatBlogListDate } from "lib/utils";
import Link from "next/link";

export function EditorialBlogList({
  posts,
  showArrow = false,
  className,
}: {
  posts: Blog[];
  showArrow?: boolean;
  className?: string;
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
              "group grid gap-3 py-6 sm:grid-cols-[9rem_1fr] sm:gap-8"
            )}
          >
            <time
              dateTime={post.publishedAt}
              className="text-sm text-neutral-400"
            >
              {formatBlogListDate(post.publishedAt)}
            </time>
            <div
              className={cn(
                showArrow && "flex items-start justify-between gap-4"
              )}
            >
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                {showArrow ? (
                  post.summary ? (
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                      {post.summary}
                    </p>
                  ) : null
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {post.summary}
                  </p>
                )}
              </div>
              {showArrow ? (
                <span aria-hidden className={cn(cardArrow, "mt-1")}>
                  →
                </span>
              ) : null}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
