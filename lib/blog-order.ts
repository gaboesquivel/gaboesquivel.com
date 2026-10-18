export const comparePublishedAtDesc = (
  a: { publishedAt: string },
  b: { publishedAt: string },
) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()

export const newestPosts = <T extends { publishedAt: string; slug: string }>({
  posts,
  slugs,
  limit,
}: {
  posts: T[]
  slugs?: string[]
  limit?: number
}) => {
  const sorted = [...posts].sort(comparePublishedAtDesc)
  const selected = slugs
    ? sorted.filter((post) => slugs.includes(post.slug))
    : sorted
  return limit === undefined ? selected : selected.slice(0, limit)
}
