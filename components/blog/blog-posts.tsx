import Balancer from 'react-wrap-balancer'
import { allBlogs } from 'contentlayer/generated'
import { BlogPostsMasonry } from 'components/blog/blog-posts-masonry'
import { cn } from 'lib/utils'
import Link from 'next/link'

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

// Map from category slug to display name
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  'engineering': 'Engineering',
  'web3': 'Web3',
  'defi': 'DeFi',
  'ai': 'AI',
  'ux': 'UX',
  'finance': 'Finance',
  'community': 'Community',
}

function getUniqueCategories() {
  const categoryCounts = new Map<string, number>()
  
  // Count posts per allowed category
  for (const post of allBlogs) {
    if (post.category) {
      for (const category of post.category) {
        const mappedCategory = CATEGORY_MAP[category]
        if (mappedCategory && ALLOWED_CATEGORIES.includes(mappedCategory as typeof ALLOWED_CATEGORIES[number])) {
          const count = categoryCounts.get(mappedCategory) || 0
          categoryCounts.set(mappedCategory, count + 1)
        }
      }
    }
  }
  
  // Return only allowed categories that have posts, in the specified order
  const result: string[] = []
  for (const allowedCat of ALLOWED_CATEGORIES) {
    if (categoryCounts.has(allowedCat)) {
      result.push(allowedCat)
    }
  }
  
  return result
}

function normalizeCategoryForComparison(category: string): string {
  return category.toLowerCase().replace(/[-\s]+/g, ' ')
}

function mapCategoryToSlug(category: string): string {
  // Check if it's already a slug
  if (ALLOWED_CATEGORIES.includes(category as typeof ALLOWED_CATEGORIES[number])) {
    return category
  }
  
  // Try to map from display name
  const normalized = normalizeCategoryForComparison(category)
  for (const [displayName, slug] of Object.entries(CATEGORY_MAP)) {
    if (normalizeCategoryForComparison(displayName) === normalized) {
      return slug
    }
  }
  
  return category
}

function getFilteredPosts(category?: string) {
  let filtered = [...allBlogs]

  if (category && category !== 'all') {
    const categorySlug = mapCategoryToSlug(category)
    filtered = filtered.filter((post) => {
      if (!post.category) return false
      return post.category.some((cat) => {
        const mappedCategory = CATEGORY_MAP[cat]
        return mappedCategory === categorySlug
      })
    })
  }

  return filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
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
          const displayName = CATEGORY_DISPLAY_NAMES[cat] || cat
          return (
            <Link
              key={cat}
              href={`/blog/category/${cat}`}
              className={cn(
                'rounded-md px-2 py-1 bg-neutral-200 dark:bg-neutral-800',
                currentCategory === cat ? 'text-accent' : '',
              )}
            >
              {displayName.toLowerCase()}
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


