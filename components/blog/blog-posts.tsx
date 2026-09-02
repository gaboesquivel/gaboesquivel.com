import { BlogPostsMasonry } from 'components/blog/blog-posts-masonry'
import { FilterNav, IndexHeading } from 'components/shared/page-layout'
import { allBlogs } from 'lib/blog'
import {
  type BrowseCategory,
  browseCategories,
  categoryDisplayNames,
  categoryMap,
} from 'lib/blog-taxonomy'

const getUniqueCategories = () => {
  const categoryCounts = new Map<BrowseCategory, number>()

  for (const post of allBlogs) {
    if (!post.category) continue
    for (const category of post.category) {
      const mappedCategory = categoryMap[category]
      if (!mappedCategory) continue
      categoryCounts.set(
        mappedCategory,
        (categoryCounts.get(mappedCategory) ?? 0) + 1,
      )
    }
  }

  return browseCategories.filter((slug) => categoryCounts.has(slug))
}

const normalizeCategoryForComparison = (category: string) =>
  category.toLowerCase().replace(/[-\s]+/g, ' ')

const mapCategoryToSlug = (category: string) => {
  if (browseCategories.includes(category as BrowseCategory)) return category

  const normalized = normalizeCategoryForComparison(category)
  for (const [displayName, slug] of Object.entries(categoryMap)) {
    if (normalizeCategoryForComparison(displayName) === normalized) return slug
  }

  return category
}

const getFilteredPosts = (category?: string) => {
  let filtered = [...allBlogs]

  if (category && category !== 'all') {
    const categorySlug = mapCategoryToSlug(category)
    filtered = filtered.filter((post) => {
      if (!post.category) return false
      return post.category.some((cat) => categoryMap[cat] === categorySlug)
    })
  }

  return filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function BlogPosts({
  category,
  heading,
}: {
  category?: string
  heading?: string
}) {
  const categories = getUniqueCategories()
  const filteredPosts = getFilteredPosts(category)
  const currentCategory = category ?? 'all'

  return (
    <section>
      {heading ? <IndexHeading>{heading}</IndexHeading> : null}

      <FilterNav
        label="Writing categories"
        current={currentCategory}
        items={[
          { id: 'all', href: '/blog', label: 'all' },
          ...categories.map((cat) => ({
            id: cat,
            href: `/blog/category/${cat}`,
            label: categoryDisplayNames[cat].toLowerCase(),
          })),
        ]}
      />

      <BlogPostsMasonry posts={filteredPosts} identifier={currentCategory} />
    </section>
  )
}
