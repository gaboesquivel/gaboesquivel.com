import { categoryMap } from "lib/blog-taxonomy";
import type { BrowseCategory } from "lib/blog-taxonomy";

export const primaryBrowseCategory = ({
  categories,
}: {
  categories?: string[];
}): BrowseCategory | null => {
  if (!categories?.length) {
    return null;
  }

  const slugs = new Set<BrowseCategory>();
  for (const category of categories) {
    const slug = categoryMap[category];
    if (slug) {
      slugs.add(slug);
    }
  }

  if (slugs.size !== 1) {
    return null;
  }

  return slugs.values().next().value ?? null;
};
