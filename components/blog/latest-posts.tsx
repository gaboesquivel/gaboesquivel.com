import { allBlogs } from 'lib/blog'
import { newestPosts } from 'lib/blog-order'
import { postMatchesBrowseCategory, toBrowseSlug } from 'lib/blog-taxonomy'
import type { ReactNode } from 'react'
import { PostGrid } from './posts-grid'

export function LatestPosts({
  limit = 8,
  title = 'Latest Articles',
  category,
  tech,
  slugs,
  excludeSlug,
  action,
}: {
  limit?: number
  title?: string
  category?: string
  tech?: string
  slugs?: string[]
  excludeSlug?: string
  action?: ReactNode
}) {
  const latestPosts = getLatestPosts({
    limit,
    category,
    tech,
    slugs,
    excludeSlug,
  })

  if (latestPosts.length === 0) return null

  return <PostGrid posts={latestPosts} title={title} action={action} />
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
  let pool = [...allBlogs]
  if (category) {
    const browseSlug = toBrowseSlug(category)
    pool = browseSlug
      ? pool.filter((post) =>
          postMatchesBrowseCategory({
            categories: post.category,
            slug: browseSlug,
          }),
        )
      : pool.filter((post) =>
          post.category?.some(
            (item) => item.toLowerCase() === category.toLowerCase(),
          ),
        )
  }
  if (tech)
    pool = pool.filter((post) =>
      post.tech?.some((t) => t.toLowerCase() === tech.toLowerCase()),
    )
  if (excludeSlug) pool = pool.filter((post) => post.slug !== excludeSlug)

  return newestPosts({ posts: pool, slugs, limit })
}
