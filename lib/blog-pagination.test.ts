import { describe, expect, test } from "bun:test";

import { getFilteredBlogPosts } from "./blog-filter";
import {
  BLOG_POSTS_PER_PAGE,
  blogListingHref,
  getBlogPageCount,
  isBlogPageInRange,
  paginateBlogPosts,
  parseBlogPageParam,
} from "./blog-pagination";

describe("blog pagination", () => {
  test("parseBlogPageParam defaults to page 1", () => {
    expect(parseBlogPageParam()).toBe(1);
    expect(parseBlogPageParam("")).toBe(1);
  });

  test("parseBlogPageParam rejects invalid values", () => {
    expect(parseBlogPageParam("0")).toBe("invalid");
    expect(parseBlogPageParam("-1")).toBe("invalid");
    expect(parseBlogPageParam("2.5")).toBe("invalid");
    expect(parseBlogPageParam("abc")).toBe("invalid");
    expect(parseBlogPageParam(["2", "3"])).toBe(2);
  });

  test("first page returns the newest posts", () => {
    const posts = getFilteredBlogPosts("all");
    const page = paginateBlogPosts(posts, 1);
    expect(page).toHaveLength(BLOG_POSTS_PER_PAGE);
    expect(page[0]?.slug).toBe(posts[0]?.slug);
  });

  test("middle page slices correctly", () => {
    const posts = getFilteredBlogPosts("all");
    const totalPages = getBlogPageCount(posts.length);
    expect(totalPages).toBeGreaterThan(2);

    const middlePage = 2;
    const page = paginateBlogPosts(posts, middlePage);
    expect(page).toHaveLength(BLOG_POSTS_PER_PAGE);
    expect(page[0]?.slug).toBe(posts[BLOG_POSTS_PER_PAGE]?.slug);
  });

  test("last page returns remaining posts", () => {
    const posts = getFilteredBlogPosts("all");
    const totalPages = getBlogPageCount(posts.length);
    const lastPage = paginateBlogPosts(posts, totalPages);
    const expectedCount = posts.length - BLOG_POSTS_PER_PAGE * (totalPages - 1);

    expect(lastPage).toHaveLength(expectedCount);
    expect(lastPage.at(-1)?.slug).toBe(posts.at(-1)?.slug);
  });

  test("out-of-range pages are invalid", () => {
    const posts = getFilteredBlogPosts("all");
    const totalPages = getBlogPageCount(posts.length);

    expect(isBlogPageInRange({ page: 1, totalItems: posts.length })).toBe(true);
    expect(
      isBlogPageInRange({ page: totalPages, totalItems: posts.length })
    ).toBe(true);
    expect(
      isBlogPageInRange({ page: totalPages + 1, totalItems: posts.length })
    ).toBe(false);
  });

  test("category-filtered listing paginates within the category", () => {
    const posts = getFilteredBlogPosts("ai");
    expect(posts.length).toBeGreaterThan(BLOG_POSTS_PER_PAGE);

    const pageTwo = paginateBlogPosts(posts, 2);
    expect(pageTwo).toHaveLength(posts.length - BLOG_POSTS_PER_PAGE);
    expect(blogListingHref({ category: "ai", page: 2 })).toBe(
      "/blog/category/ai?page=2"
    );
    expect(blogListingHref({ category: "ai", page: 1 })).toBe(
      "/blog/category/ai"
    );
    expect(isBlogPageInRange({ page: 2, totalItems: posts.length })).toBe(true);
    expect(isBlogPageInRange({ page: 3, totalItems: posts.length })).toBe(
      false
    );
  });

  test("blog index page 1 omits the query parameter", () => {
    expect(blogListingHref({ category: "all", page: 1 })).toBe("/blog");
    expect(blogListingHref({ category: "all", page: 3 })).toBe("/blog?page=3");
  });
});
