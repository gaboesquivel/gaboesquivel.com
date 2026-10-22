import { SiteCardLink } from "components/shared/site-card-link";
import { cardArrow } from "components/shared/spacing";
import { formatDate } from "lib/utils";

export interface BlogCardPost {
  slug: string;
  title: string;
  summary?: string;
  publishedAt: string;
}

const blogCardClassName = "flex h-full min-h-48 w-full flex-col gap-2";

const blogCardTitleClassName =
  "line-clamp-2 min-h-11 text-base leading-snug font-medium text-white";

const blogCardSummaryClassName =
  "line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-neutral-300";

const blogCardDateClassName =
  "mt-auto block pt-2 text-xs leading-normal text-neutral-400 tabular-nums";

export function BlogPostCard({ post }: { post: BlogCardPost }) {
  return (
    <SiteCardLink
      cardClassName={blogCardClassName}
      className="group"
      href={`/blog/${post.slug}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className={blogCardTitleClassName}>{post.title}</h3>
        <span aria-hidden className={cardArrow}>
          →
        </span>
      </div>
      {post.summary ? (
        <span className={blogCardSummaryClassName}>{post.summary}</span>
      ) : null}
      {post.publishedAt ? (
        <time className={blogCardDateClassName} dateTime={post.publishedAt}>
          {formatDate(post.publishedAt)}
        </time>
      ) : null}
    </SiteCardLink>
  );
}

export {
  blogCardClassName,
  blogCardDateClassName,
  blogCardSummaryClassName,
  blogCardTitleClassName,
};
