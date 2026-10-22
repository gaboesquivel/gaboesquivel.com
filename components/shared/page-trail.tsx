import { cn } from "lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

export interface PageTrailSegment {
  label: ReactNode;
  href?: string;
}

export function PageTrail({
  segments,
  className,
}: {
  segments: PageTrailSegment[];
  className?: string;
}) {
  if (segments.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-sm text-neutral-400", className)}
    >
      <ol className="flex flex-wrap items-center gap-x-1.5">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <li
              key={`${index}-${typeof segment.label === "string" ? segment.label : "node"}`}
              className="inline-flex min-w-0 items-center gap-x-1.5"
            >
              {index > 0 ? (
                <span aria-hidden className="text-neutral-500">
                  /
                </span>
              ) : null}
              {segment.href && !isLast ? (
                <Link
                  href={segment.href}
                  className="rounded-sm transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {segment.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(isLast && "text-neutral-300")}
                >
                  {segment.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
