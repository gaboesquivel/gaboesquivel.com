export const BLOG_POSTS_PER_PAGE = 12;

export const parseBlogPageParam = (
  raw: string | string[] | undefined
): number | "invalid" => {
  if (raw === undefined) {
    return 1;
  }

  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) {
    return 1;
  }

  const page = Number(value);
  if (!Number.isFinite(page) || !Number.isInteger(page) || page < 1) {
    return "invalid";
  }

  return page;
};

export const getBlogPageCount = (totalItems: number) =>
  Math.max(1, Math.ceil(totalItems / BLOG_POSTS_PER_PAGE));

export const isBlogPageInRange = ({
  page,
  totalItems,
}: {
  page: number;
  totalItems: number;
}) => page <= getBlogPageCount(totalItems);

export const paginateBlogPosts = <T>(items: T[], page: number) => {
  const start = (page - 1) * BLOG_POSTS_PER_PAGE;
  return items.slice(start, start + BLOG_POSTS_PER_PAGE);
};

export const blogListingHref = ({
  category,
  page,
}: {
  category?: string;
  page: number;
}) => {
  const base =
    category && category !== "all" ? `/blog/category/${category}` : "/blog";
  if (page <= 1) {
    return base;
  }
  return `${base}?page=${page}`;
};
