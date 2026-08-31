import { BlogPostsMasonry } from 'components/blog/blog-posts-masonry'
import { TechList } from 'components/tech/tech-list'
import TechStack from 'components/tech/tech-stack'
import { allBlogs } from 'contentlayer/generated'
import {
  filterTechByCategory,
  getTechStackBySlug,
  techStack,
} from 'gaboesquivel'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Balancer from 'react-wrap-balancer'

const categories = [
  'featured',
  'web3',
  'ai',
  'frontend',
  'backend',
  'cloud-devops',
  'all',
]

const categoryNames: Record<string, string> = {
  featured: 'Featured',
  web3: 'Web3',
  ai: 'AI',
  frontend: 'Frontend',
  backend: 'Backend',
  'cloud-devops': 'Cloud and DevOps',
  all: 'All',
}

export default function TechCategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = params.category

  // If it's a known category, show filtered list with blog posts
  if (categories.includes(category)) {
    // Get tech tags for this category
    const categoryTech = filterTechByCategory(techStack, category)
    const categoryTagsSet = new Set(categoryTech.map((t) => String(t.tag)))

    // Filter blog posts by tech tags and sort by most recent first
    const filteredPosts = allBlogs
      .filter((post) =>
        post.tech?.some((techTag) => categoryTagsSet.has(techTag)),
      )
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )

    return (
      <>
        <TechList
          category={category}
          heading={`${categoryNames[category]} technologies`}
        />
        {filteredPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
              <Balancer>Writing about {categoryNames[category]}</Balancer>
            </h2>
            <BlogPostsMasonry posts={filteredPosts} identifier={category} />
          </section>
        )}
      </>
    )
  }

  // Otherwise, treat it as a tag and show individual tech page
  const tech = getTechStackBySlug(category)
  if (!tech) redirect('/tech')
  return <TechStack tech={tech} />
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const category = params.category

  // If it's a known category, return category metadata
  if (categories.includes(category)) {
    const categoryName = categoryNames[category]
    const title =
      category === 'all'
        ? 'Complete Technology Stack | Gabo Esquivel'
        : `${categoryName} Technology Stack | Gabo Esquivel`
    const description = `${categoryName} technologies used across project work, with related evidence and writing.`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
      },
    }
  }

  // Otherwise, return individual tech metadata
  const tech = getTechStackBySlug(category)
  if (!tech)
    return {
      title: 'Not Found | Gabo Esquivel',
    }

  return {
    title: `${tech.name} | Tech Stack | Gabo Esquivel`,
    description: tech.description,
    openGraph: {
      title: `${tech.name} | Tech Stack | Gabo Esquivel`,
      description: tech.description,
      type: 'website',
    },
  }
}
