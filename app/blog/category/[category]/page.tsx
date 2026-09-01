import { BlogPosts } from 'components/blog/blog-posts'
import { capitalizeWords } from 'lib/utils'
import type { Metadata } from 'next'

const ALLOWED_CATEGORIES = [
  'engineering',
  'web3',
  'defi',
  'ai',
  'ux',
  'finance',
  'community',
] as const

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const displayCategory = capitalizeWords(category)
  return (
    <BlogPosts
      category={category}
      heading={`Gabo's Blog: ${displayCategory}`}
    />
  )
}

export async function generateStaticParams() {
  return ALLOWED_CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  if (!category)
    return {
      title: 'Blog',
      description:
        'Read my thoughts on software development, design, and more.',
    }
  const displayCategory = capitalizeWords(category)
  return {
    title: `${displayCategory} Blog Posts - Gabo Esquivel`,
    description: `Read my articles and thoughts about ${displayCategory}.`,
  }
}
