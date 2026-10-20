import { allBlogs } from "lib/blog";
import { comparePublishedAtDesc } from "lib/blog-order";
import { browseCategories, categoryMap } from "lib/blog-taxonomy";
import type { BrowseCategory } from "lib/blog-taxonomy";

const normalizeCategoryForComparison = (category: string) =>
  category.toLowerCase().replaceAll(/[-\s]+/g, " ");

const mapCategoryToSlug = (category: string) => {
  if (browseCategories.includes(category as BrowseCategory)) {
    return category;
  }

  const normalized = normalizeCategoryForComparison(category);
  for (const [displayName, slug] of Object.entries(categoryMap)) {
    if (normalizeCategoryForComparison(displayName) === normalized) {
      return slug;
    }
  }

  return category;
};

export const getFilteredBlogPosts = (category?: string) => {
  let filtered = [...allBlogs];

  if (category && category !== "all") {
    const categorySlug = mapCategoryToSlug(category);
    filtered = filtered.filter((post) => {
      if (!post.category) {
        return false;
      }
      return post.category.some((cat) => categoryMap[cat] === categorySlug);
    });
  }

  return filtered.sort(comparePublishedAtDesc);
};
