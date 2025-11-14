import Balancer from 'react-wrap-balancer'
import { allBlogs } from 'contentlayer/generated'
import { BlogPostsMasonry } from 'components/blog/blog-posts-masonry'
import { cn } from 'lib/utils'
import Link from 'next/link'

function getUniqueCategories() {
  const categoryCounts = new Map<string, number>()
  
  // Count posts per category
  for (const post of allBlogs) {
    if (post.category) {
      for (const category of post.category) {
        const count = categoryCounts.get(category) || 0
        categoryCounts.set(category, count + 1)
      }
    }
  }
  
  // Convert to array and sort by count (descending)
  const sortedCategories = Array.from(categoryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category)
  
  // Move "Community" to the end if it exists
  const communityIndex = sortedCategories.indexOf('Community')
  if (communityIndex !== -1) {
    sortedCategories.splice(communityIndex, 1)
    sortedCategories.push('Community')
  }
  
  return sortedCategories
}

function normalizeCategoryForComparison(category: string): string {
  return category.toLowerCase().replace(/[-\s]+/g, ' ')
}

function getFilteredPosts(category?: string) {
  let filtered = [...allBlogs]

  if (category && category !== 'all') {
    const normalizedCategory = normalizeCategoryForComparison(category)
    filtered = filtered.filter((post) => {
      if (!post.category) return false
      return post.category.some((cat) => {
        const normalizedPostCategory = normalizeCategoryForComparison(cat)
        return normalizedPostCategory === normalizedCategory
      })
    })
  }

  return filtered.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1
    }
    return 1
  })
}

export function BlogPosts({
  category,
  heading,
}: {
  category?: string
  heading?: string
}) {
  const categories = getUniqueCategories()
  const filteredPosts = getFilteredPosts(category)
  const currentCategory = category || 'all'

  return (
    <section>
      {heading ? (
        <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
          <Balancer>{heading}</Balancer>
        </h2>
      ) : null}

      <nav className="flex flex-wrap gap-2 md:gap-4 mb-8">
        <Link
          href="/blog"
          className={cn(
            'rounded-md px-2 py-1 bg-neutral-200 dark:bg-neutral-800',
            currentCategory === 'all' ? 'text-accent' : '',
          )}
        >
          all
        </Link>
        {categories.map((cat) => {
          const categorySlug = cat.toLowerCase().replace(/\s+/g, '-')
          return (
            <Link
              key={cat}
              href={`/blog/category/${categorySlug}`}
              className={cn(
                'rounded-md px-2 py-1 bg-neutral-200 dark:bg-neutral-800',
                currentCategory === categorySlug ? 'text-accent' : '',
              )}
            >
              {cat.toLowerCase()}
            </Link>
          )
        })}
      </nav>

      <ul>
        <BlogPostsMasonry posts={filteredPosts} identifier={currentCategory} />
      </ul>
    </section>
  )
}


