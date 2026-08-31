import { cardLink, proseClass } from 'components/shared/spacing'
import type { Blog } from 'contentlayer/generated'
import { cn, formatDate } from 'lib/utils'
import Link from 'next/link'

export function BlogPostCard({ post }: { post: Blog }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cardLink}>
      <h3 className="mb-1 font-medium">{post.title}</h3>
      {post.publishedAt && (
        <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
      )}
      {post.summary && (
        <p className={cn(proseClass, 'line-clamp-2 flex-grow text-sm')}>
          {post.summary}
        </p>
      )}
    </Link>
  )
}
