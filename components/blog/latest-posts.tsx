import { allBlogs } from 'contentlayer/generated'
import { PostGrid } from './posts-grid'

export function LatestPosts({
  limit = 6,
  title = 'Latest Articles',
  category,
}: { limit?: number; title?: string; category?: string }) {
  const latestPosts = getLatestPosts({ limit, category })

  if (latestPosts.length === 0) return null

  return <PostGrid posts={latestPosts} title={title} />
}

function getLatestPosts({
  limit = 6,
  category,
}: { limit?: number; category?: string }) {
  // Sort by date descending to get the most recent posts
  let sortedPosts = [...allBlogs].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  if (category) {
    sortedPosts = sortedPosts.filter((post) =>
      post.category?.includes(category),
    )
  }

  // Take only the specified number of posts
  return sortedPosts.slice(0, limit)
}
