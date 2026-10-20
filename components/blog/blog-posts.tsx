import { BlogPagination } from "components/blog/blog-pagination";
import { BlogPostsMasonry } from "components/blog/blog-posts-masonry";
import { FilterNav, IndexHeading, Prose } from "components/shared/page-layout";
import { getFilteredBlogPosts } from "lib/blog-filter";
import { paginateBlogPosts } from "lib/blog-pagination";
import {
  browseCategories,
  categoryDisplayNames,
  categoryMap,
} from "lib/blog-taxonomy";
import type { BrowseCategory } from "lib/blog-taxonomy";

const getUniqueCategories = () => {
  const categoryCounts = new Map<BrowseCategory, number>();

  for (const post of getFilteredBlogPosts()) {
    if (!post.category) {
      continue;
    }
    for (const category of post.category) {
      const mappedCategory = categoryMap[category];
      if (!mappedCategory) {
        continue;
      }
      categoryCounts.set(
        mappedCategory,
        (categoryCounts.get(mappedCategory) ?? 0) + 1
      );
    }
  }

  return browseCategories.filter((slug) => categoryCounts.has(slug));
};

export function BlogPosts({
  category,
  heading,
  intro,
  page = 1,
}: {
  category?: string;
  heading?: string;
  intro?: string;
  page?: number;
}) {
  const categories = getUniqueCategories();
  const filteredPosts = getFilteredBlogPosts(category);
  const currentCategory = category ?? "all";
  const paginatedPosts = paginateBlogPosts(filteredPosts, page);

  return (
    <section>
      {heading ? <IndexHeading>{heading}</IndexHeading> : null}

      {intro ? <Prose className="mt-0 mb-6">{intro}</Prose> : null}

      <FilterNav
        label="Writing categories"
        current={currentCategory}
        items={[
          { href: "/blog", id: "all", label: "all" },
          ...categories.map((cat) => ({
            href: `/blog/category/${cat}`,
            id: cat,
            label: categoryDisplayNames[cat].toLowerCase(),
          })),
        ]}
      />

      <BlogPostsMasonry posts={paginatedPosts} identifier={currentCategory} />
      <BlogPagination
        category={currentCategory}
        page={page}
        totalItems={filteredPosts.length}
      />
    </section>
  );
}
