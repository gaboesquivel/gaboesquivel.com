import { allBlogs } from 'contentlayer/generated'
import { capitalizeWords } from 'lib/utils'
import type { Metadata } from 'next'
import { BlogPosts } from 'components/blog/blog-posts'

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
  // Get unique categories from all blog posts
  const categories = new Set<string>()
  for (const post of allBlogs) {
    if (post.category) {
      for (const category of post.category) {
        // Convert to lowercase and replace spaces with hyphens for URL
        const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
        categories.add(categorySlug)
      }
    }
  }
  return Array.from(categories).map((category) => ({
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
