import type { Metadata } from 'next'
import { BlogPosts } from 'components/blog/blog-posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
}

export default async function BlogPage() {
  return <BlogPosts category="all" heading="Gabo's Blog" />
}
