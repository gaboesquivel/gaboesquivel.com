import type { BlogTocItem } from "lib/blog-headings";
import { cn } from "lib/utils";
import Link from "next/link";

export function ArticleTocInline({
  items,
  className,
}: {
  items: readonly BlogTocItem[];
  className?: string;
}) {
  return (
    <details
      className={cn(
        "mb-8 rounded-lg border border-hairline px-4 py-3 xl:hidden",
        className
      )}
      open
    >
      <summary className="cursor-pointer text-sm font-medium text-neutral-300">
        On this page
      </summary>
      <nav aria-label="Table of contents" className="mt-3">
        <ol className="space-y-2 text-sm text-neutral-400">
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(
                item.level === 3 && "border-l border-hairline pl-3"
              )}
            >
              <Link
                href={`#${item.id}`}
                className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
