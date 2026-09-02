import { BlogPosts } from 'components/blog/blog-posts'
import {
  browseCategories,
  categoryDescriptions,
  categoryDisplayNames,
  isBrowseCategory,
} from 'lib/blog-taxonomy'
import { pageMetadata } from 'lib/page-metadata'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  if (!isBrowseCategory(category)) notFound()

  return (
    <BlogPosts
      category={category}
      heading={`Writing: ${categoryDisplayNames[category]}`}
    />
  )
}

export function generateStaticParams() {
  return browseCategories.map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  if (!isBrowseCategory(category)) notFound()

  const displayName = categoryDisplayNames[category]

  return pageMetadata({
    title: `Writing: ${displayName} | Gabo Esquivel`,
    description: categoryDescriptions[category],
  })
}
