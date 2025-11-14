import Link from 'next/link'
import { formatDate } from 'lib/utils'
import type { Blog } from 'contentlayer/generated'

/**
 * BlogPostCard component displays a blog post in a tile format
 * matching the PostGrid component style, linking to the blog post detail page
 */
export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block w-full h-full rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800 flex flex-col"
    >
      <h3 className="mb-1 font-medium">{post.title}</h3>
      {post.publishedAt && (
        <p className="text-neutral-600 text-sm dark:text-neutral-400 mb-2">
          {formatDate(post.publishedAt)}
        </p>
      )}
      {post.summary && (
        <p className="prose prose-neutral dark:prose-invert text-sm line-clamp-2 flex-grow">
          {post.summary}
        </p>
      )}
    </Link>
  )
}

/**
 * Props for the BlogPostCard component
 * @property {Blog} post - The blog post data to display
 */
interface BlogPostCardProps {
  post: Blog
}

