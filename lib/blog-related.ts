import type { Blog } from 'lib/blog'
import { toBrowseSlug } from 'lib/blog-taxonomy'

export const getRelatedPosts = ({
  post,
  allPosts,
  limit = 6,
}: {
  post: Blog
  allPosts: Blog[]
  limit?: number
}) => {
  const postBrowseSlugs = new Set(
    post.category?.flatMap((category) => {
      const slug = toBrowseSlug(category)
      return slug ? [slug] : []
    }) ?? [],
  )
  const postTech = new Set(post.tech ?? [])

  return allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedBrowse =
        candidate.category?.some((category) => {
          const slug = toBrowseSlug(category)
          return slug ? postBrowseSlugs.has(slug) : false
        }) ?? false
      const sharedTech =
        candidate.tech?.some((tech) => postTech.has(tech)) ?? false
      const score = (sharedBrowse ? 2 : 0) + (sharedTech ? 1 : 0)
      return { candidate, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return (
        new Date(b.candidate.publishedAt).getTime() -
        new Date(a.candidate.publishedAt).getTime()
      )
    })
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}
