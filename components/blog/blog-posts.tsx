import { BlogPagination } from "components/blog/blog-pagination";
import { BlogPostsMasonry } from "components/blog/blog-posts-masonry";
import { WritingIndex } from "components/blog/writing-index";
import { InteriorPageShell } from "components/interior/interior-page-shell";
import { PageIntro } from "components/interior/page-intro";
import { FilterNav } from "components/shared/page-layout";
import { blockSpacing } from "components/shared/spacing";
import { getFilteredBlogPosts } from "lib/blog-filter";
import { blogListingHref, paginateBlogPosts } from "lib/blog-pagination";
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
  const trail =
    currentCategory === "all"
      ? undefined
      : [
          { label: "writing", href: "/blog" },
          {
            label:
              categoryDisplayNames[
                currentCategory as BrowseCategory
              ].toLowerCase(),
          },
        ];
  const showPublicationIndex =
    currentCategory === "all" && page === 1 && paginatedPosts.length > 0;

  const pageTitle =
    heading ??
    (trail
      ? categoryDisplayNames[currentCategory as BrowseCategory]
      : "Writing");

  return (
    <InteriorPageShell>
      {heading || trail ? (
        <PageIntro
          compact={Boolean(trail?.length)}
          description={intro}
          title={pageTitle}
          trail={trail}
        />
      ) : null}

      <FilterNav
        className={heading || trail ? "mt-0" : undefined}
        label="Writing categories"
        current={currentCategory}
        items={[
          {
            href: blogListingHref({ category: "all", page: 1 }),
            id: "all",
            label: "all",
          },
          ...categories.map((cat) => ({
            href: blogListingHref({ category: cat, page: 1 }),
            id: cat,
            label: categoryDisplayNames[cat].toLowerCase(),
          })),
        ]}
      />

      {showPublicationIndex ? (
        <WritingIndex posts={paginatedPosts} showFeatured />
      ) : (
        <BlogPostsMasonry
          className={blockSpacing}
          posts={paginatedPosts}
          identifier={currentCategory}
          variant="editorial"
        />
      )}
      <BlogPagination
        category={currentCategory}
        page={page}
        totalItems={filteredPosts.length}
      />
    </InteriorPageShell>
  );
}
