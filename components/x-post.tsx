import Image from "next/image";
import type { ReactNode } from "react";

interface XPostProps {
  url: string;
  author: string;
  handle: string;
  /** Local avatar under /public, so the post renders without X's API or script. */
  avatar: string;
  /** ISO date of the post, e.g. 2026-10-28. */
  date: string;
  children: ReactNode;
}

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

/** Static card for an X post: text, author, and date captured at writing time. */
export function XPost({ url, author, handle, avatar, date, children }: XPostProps) {
  return (
    <figure className="not-prose my-8">
      <a
        className="mx-auto block max-w-xl rounded-xl border border-border bg-card p-5 text-card-foreground no-underline transition-colors hover:bg-muted/40"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="flex items-center gap-3">
          <Image
            alt=""
            className="shrink-0 rounded-full"
            height={40}
            src={avatar}
            // Inline size: the unlayered .blog-content img rule outranks utilities.
            style={{ width: 40, height: 40 }}
            width={40}
          />
          <div className="min-w-0 leading-tight">
            <div className="font-semibold">{author}</div>
            <div className="text-muted-foreground text-sm">@{handle}</div>
          </div>
          <svg
            aria-hidden="true"
            className="ml-auto size-4 fill-current text-muted-foreground"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        <blockquote className="mt-4 space-y-3 text-base leading-relaxed">
          {children}
        </blockquote>
        <figcaption className="mt-4 text-muted-foreground text-sm">
          <time dateTime={date}>{formatDate(date)}</time>
          <span aria-hidden="true"> · </span>
          View on X
        </figcaption>
      </a>
    </figure>
  );
}
