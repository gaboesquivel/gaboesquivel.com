import { allBlogs } from "lib/blog";
import { comparePublishedAtDesc } from "lib/blog-order";
import type { BrowseCategory } from "lib/blog-taxonomy";
import { postMatchesBrowseCategory } from "lib/blog-taxonomy";

const postsByDate = [...allBlogs].sort(comparePublishedAtDesc);

export const getFilteredBlogPosts = (category?: string) =>
  category && category !== "all"
    ? postsByDate.filter((post) =>
        postMatchesBrowseCategory({
          categories: post.category,
          slug: category as BrowseCategory,
        })
      )
    : [...postsByDate];
