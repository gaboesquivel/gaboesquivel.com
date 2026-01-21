import { TechList } from 'components/tech/tech-list'
import TechStack from 'components/tech/tech-stack'
import { getTechStackBySlug, filterTechByCategory, techStack } from 'gaboesquivel'
import { allBlogs } from 'contentlayer/generated'
import { BlogPostsMasonry } from 'components/blog/blog-posts-masonry'
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
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime(),
      )

    return (
      <>
        <TechList category={category} heading="Gabo's Tech Stack" />
        {filteredPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="font-bold text-2xl tracking-tighter max-w-[650px] mb-6">
              <Balancer>
                Blog Posts: {category.charAt(0).toUpperCase() + category.slice(1)}
              </Balancer>
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
    return {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Tech Stack | Gabo Esquivel`,
      openGraph: {
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Tech Stack | Gabo Esquivel`,
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
