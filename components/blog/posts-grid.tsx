import { formatDate, formatDateDifference } from 'lib/utils'
import Link from 'next/link'

export function PostGrid({
  posts,
  title,
}: {
  posts: { slug: string; title: string; publishedAt: string }[]
  title: string
}) {
  if (posts.length === 0) return null

  // const difference = formatDateDifference(posts[0].publishedAt)

  return (
    <div className="mt-16">
      <h2 className="mb-4 font-bold text-xl">{title}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
          >
            <h3 className="mb-1 font-medium">{post.title}</h3>
            {post.publishedAt && (
              <p className="text-neutral-600 text-sm dark:text-neutral-400">{`${formatDate(post.publishedAt)}`}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
