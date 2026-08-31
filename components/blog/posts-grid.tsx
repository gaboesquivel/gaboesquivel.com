import { WritingSection } from 'components/shared/page-layout'
import { cardLink, twoColGrid } from 'components/shared/spacing'
import { formatDate } from 'lib/utils'
import Link from 'next/link'

export function PostGrid({
  posts,
  title,
}: {
  posts: { slug: string; title: string; publishedAt: string }[]
  title: string
}) {
  if (posts.length === 0) return null

  return (
    <WritingSection title={title}>
      <div className={twoColGrid}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={cardLink}
          >
            <h3 className="mb-1 font-medium">{post.title}</h3>
            {post.publishedAt && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{`${formatDate(post.publishedAt)}`}</p>
            )}
          </Link>
        ))}
      </div>
    </WritingSection>
  )
}
