import { allBlogs } from 'contentlayer/generated'
import { PostGrid } from './posts-grid'

export function LatestPosts({
  limit = 4,
  title = 'Latest Articles',
}: { limit?: number; title?: string }) {
  const latestPosts = getLatestPosts({ limit })

  if (latestPosts.length === 0) return null

  return <PostGrid posts={latestPosts} title={title} />
}

function getLatestPosts({ limit = 4 }: { limit?: number }) {
  // Sort by date descending to get the most recent posts
  const sortedPosts = [...allBlogs].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  // Take only the specified number of posts
  return sortedPosts.slice(0, limit)
}
