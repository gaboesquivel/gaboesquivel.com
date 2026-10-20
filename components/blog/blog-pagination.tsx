import { blogListingHref, getBlogPageCount } from "lib/blog-pagination";
import Link from "next/link";

export function BlogPagination({
  category,
  page,
  totalItems,
}: {
  category?: string;
  page: number;
  totalItems: number;
}) {
  const totalPages = getBlogPageCount(totalItems);
  if (totalPages <= 1) {
    return null;
  }

  const previousHref = blogListingHref({ category, page: page - 1 });
  const nextHref = blogListingHref({ category, page: page + 1 });
  const onFirstPage = page <= 1;
  const onLastPage = page >= totalPages;

  return (
    <nav
      aria-label="Writing pagination"
      className="mt-8 flex items-center justify-between gap-4 text-sm"
    >
      <div className="min-w-0 shrink-0">
        {onFirstPage ? (
          <span aria-disabled="true" className="text-neutral-400">
            Previous
          </span>
        ) : (
          <Link className="text-accent" href={previousHref}>
            Previous
          </Link>
        )}
      </div>
      <span className="text-center text-neutral-400">
        Page {page} of {totalPages}
      </span>
      <div className="min-w-0 shrink-0 text-right">
        {onLastPage ? (
          <span aria-disabled="true" className="text-neutral-400">
            Next
          </span>
        ) : (
          <Link className="text-accent" href={nextHref}>
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}
