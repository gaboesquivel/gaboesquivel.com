import { allBlogs } from 'contentlayer/generated'
import { capitalizeWords } from 'lib/utils'
import type { Metadata } from 'next'
import { BlogPosts } from 'components/blog/blog-posts'

// Map from blog post category names to allowed category slugs
const CATEGORY_MAP: Record<string, string> = {
  'Engineering': 'engineering',
  'Web3': 'web3',
  'DeFi': 'defi',
  'Artificial Intelligence': 'ai',
  'AI': 'ai',
  'UX': 'ux',
  'Finance': 'finance',
  'Community': 'community',
}

// Allowed categories for blog page display
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
  params: { category: string }
}) {
  const category = params.category
  const displayCategory = capitalizeWords(category)
  return (
    <BlogPosts
      category={category}
      heading={`Gabo's Blog: ${displayCategory}`}
    />
  )
}

export async function generateStaticParams() {
  // Only generate static params for allowed categories
  return ALLOWED_CATEGORIES.map((category) => ({
    category,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  if (!params.category) {
    return {
      title: 'Blog',
      description:
        'Read my thoughts on software development, design, and more.',
    }
  }
  const displayCategory = capitalizeWords(params.category)
  return {
    title: `${displayCategory} Blog Posts - Gabo Esquivel`,
    description: `Read my articles and thoughts about ${displayCategory}.`,
  }
}
