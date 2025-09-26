import { allBlogs } from 'contentlayer/generated'
import { capitalizeWords } from 'lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'

export default async function BlogCategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = params.category
  const displayCategory = capitalizeWords(category)
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        Gabo's Blog: {displayCategory}
      </h1>
      {allBlogs
        .filter((post) => post.category?.includes(displayCategory))
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col mb-4 space-y-1"
            href={`/blog/${post.slug}`}
          >
            <ul className="flex flex-col w-full">
              <li className="tracking-tight text-neutral-900 dark:text-neutral-100 hover:text-accent">
                {post.title}{' '}
                <span className="text-xs text-neutral-400">
                  |{' '}
                  {new Date(post.publishedAt).toLocaleString('en-US', {
                    year: 'numeric',
                  })}
                </span>
              </li>
            </ul>
          </Link>
        ))}
    </section>
  )
}

export async function generateStaticParams() {
  // Get unique categories from all blog posts
  const categories = new Set<string>()
  for (const post of allBlogs) {
    if (post.category) {
      for (const category of post.category) {
        categories.add(category)
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
