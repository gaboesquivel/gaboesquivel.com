import { allBlogs } from 'contentlayer/generated'
import { PostGrid } from './posts-grid'

export function LatestPosts({
  limit = 8,
  title = 'Latest Articles',
  category,
  tech,
  slugs,
  excludeSlug,
}: {
  limit?: number
  title?: string
  category?: string
  tech?: string
  slugs?: string[]
  excludeSlug?: string
}) {
  const latestPosts = getLatestPosts({
    limit,
    category,
    tech,
    slugs,
    excludeSlug,
  })

  if (latestPosts.length === 0) return null

  return <PostGrid posts={latestPosts} title={title} />
}

function getLatestPosts({
  limit = 8,
  category,
  tech,
  slugs,
  excludeSlug,
}: {
  limit?: number
  category?: string
  tech?: string
  slugs?: string[]
  excludeSlug?: string
}) {
  const allSorted = [...allBlogs].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  let pool = allSorted
  if (category) pool = pool.filter((post) => post.category?.includes(category))
  if (tech) pool = pool.filter((post) => post.tech?.includes(tech))
  if (excludeSlug) pool = pool.filter((post) => post.slug !== excludeSlug)

  if (slugs) {
    const curated = slugs.flatMap((slug) =>
      pool.filter((post) => post.slug === slug),
    )
    const curatedSlugs = new Set(curated.map((post) => post.slug))
    const backfill = pool.filter((post) => !curatedSlugs.has(post.slug))
    return [...curated, ...backfill].slice(0, limit)
  }

  return pool.slice(0, limit)
}
