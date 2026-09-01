import { allBlogs } from 'lib/blog'
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
  if (category)
    pool = pool.filter((post) =>
      post.category?.some((c) => c.toLowerCase() === category.toLowerCase()),
    )
  if (tech)
    pool = pool.filter((post) =>
      post.tech?.some((t) => t.toLowerCase() === tech.toLowerCase()),
    )
  if (excludeSlug) pool = pool.filter((post) => post.slug !== excludeSlug)

  if (slugs)
    return slugs
      .flatMap((slug) => pool.filter((post) => post.slug === slug))
      .slice(0, limit)

  return pool.slice(0, limit)
}
