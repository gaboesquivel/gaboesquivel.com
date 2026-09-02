import { techStack } from 'gaboesquivel'
import { categoryDisplayNames, toBrowseSlug } from 'lib/blog-taxonomy'
import Link from 'next/link'

export function BlogPostChips({
  categories,
  tech,
}: {
  categories?: string[]
  tech?: string[]
}) {
  const browseSlugs = [
    ...new Set(
      categories?.flatMap((category) => {
        const slug = toBrowseSlug(category)
        return slug ? [slug] : []
      }) ?? [],
    ),
  ]

  const techItems =
    tech?.flatMap((tag) => {
      const item = techStack.find((entry) => entry.tag === tag)
      return item ? [{ tag, slug: item.slug, name: item.name }] : []
    }) ?? []

  if (browseSlugs.length === 0 && techItems.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-6 max-w-[650px]">
      {browseSlugs.map((slug) => (
        <Link
          key={slug}
          href={`/blog/category/${slug}`}
          className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-600 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-400"
        >
          {categoryDisplayNames[slug]}
        </Link>
      ))}
      {techItems.map((item) => (
        <Link
          key={item.tag}
          href={`/tech/${item.slug}`}
          className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-600 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-400"
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
