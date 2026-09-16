import { blockSpacing } from 'components/shared/page-layout'
import { categoryDisplayNames, toBrowseSlug } from 'lib/blog-taxonomy'
import { cn } from 'lib/utils'
import Link from 'next/link'
import { Fragment } from 'react'

export function BlogPostChips({ categories }: { categories?: string[] }) {
  const browseSlugs = [
    ...new Set(
      categories?.flatMap((category) => {
        const slug = toBrowseSlug(category)
        return slug ? [slug] : []
      }) ?? [],
    ),
  ]

  if (browseSlugs.length === 0) return null

  return (
    <nav
      aria-label="Writing categories"
      className={cn(
        blockSpacing,
        'max-w-[650px] text-sm text-neutral-600 print:hidden preview-print:hidden dark:text-neutral-400',
      )}
    >
      {browseSlugs.map((slug, index) => (
        <Fragment key={slug}>
          {index > 0 ? (
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
          ) : null}
          <Link
            href={`/blog/category/${slug}`}
            className="transition-colors hover:text-accent"
          >
            {categoryDisplayNames[slug]}
          </Link>
        </Fragment>
      ))}
    </nav>
  )
}
