import { cardArrow, editorialLink } from "components/shared/spacing";
import type { BlogCard } from "lib/blog-cards";
import { cn, formatBlogListDate } from "lib/utils";
import Link from "next/link";

/** The one Writing index: muted date, linked title, arrow, hairline dividers. Summaries live on the post. */
export function EditorialBlogList({
  posts,
  className,
}: {
  posts: BlogCard[];
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
              "group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 py-5 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:gap-x-8"
            )}
          >
            <time
              dateTime={post.publishedAt}
              className="col-span-2 text-xs text-neutral-400 sm:col-span-1 sm:text-sm"
            >
              {formatBlogListDate(post.publishedAt)}
            </time>
            <h3 className="min-w-0 text-lg font-normal sm:text-xl">
              {post.title}
            </h3>
            <span aria-hidden="true" className={cardArrow}>
              ↗
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
