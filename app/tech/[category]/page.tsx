import { TechList } from 'components/tech/tech-list'
import TechStack from 'components/tech/tech-stack'
import { getTechStackBySlug } from 'gaboesquivel'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

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

  // If it's a known category, show filtered list
  if (categories.includes(category)) {
    return <TechList category={category} heading="Gabo's Tech Stack" />
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
