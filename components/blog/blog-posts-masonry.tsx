'use client'
import { BlogPostCard } from 'components/blog/blog-post-card'
import { CardGrid } from 'components/shared/card-grid'
import type { Blog } from 'lib/blog'

export function BlogPostsMasonry({
  posts,
  identifier = 'posts',
}: {
  posts: Blog[]
  identifier?: string
}) {
  return (
    <CardGrid
      items={posts}
      identifier={identifier}
      getKey={(post) => post.slug}
      renderItem={(post) => <BlogPostCard post={post} />}
    />
  )
}
