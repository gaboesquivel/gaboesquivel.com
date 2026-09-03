import { PageSection } from 'components/shared/page-layout'
import { cardLink, twoColGrid } from 'components/shared/spacing'
import { formatDate } from 'lib/utils'
import Link from 'next/link'
import type { ReactNode } from 'react'

export function PostGrid({
  posts,
  title,
  action,
}: {
  posts: { slug: string; title: string; publishedAt: string }[]
  title: string
  action?: ReactNode
}) {
  if (posts.length === 0) return null

  return (
    <PageSection
      title={title}
      action={action}
      className="print:hidden preview-print:hidden"
    >
      <ul className={twoColGrid}>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className={cardLink}>
              <h3 className="mb-1 font-medium">{post.title}</h3>
              {post.publishedAt && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{`${formatDate(post.publishedAt)}`}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </PageSection>
  )
}
