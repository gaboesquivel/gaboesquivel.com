import { allBlogs } from "lib/blog";
import { comparePublishedAtDesc } from "lib/blog-order";
import type { BrowseCategory } from "lib/blog-taxonomy";
import { postMatchesBrowseCategory } from "lib/blog-taxonomy";

export const getFilteredBlogPosts = (category?: string) => {
  let filtered = [...allBlogs];

  if (category && category !== "all") {
    filtered = filtered.filter((post) =>
      postMatchesBrowseCategory({
        categories: post.category,
        slug: category as BrowseCategory,
      })
    );
  }

  return filtered.sort(comparePublishedAtDesc);
};
