import TechStack from 'components/tech/tech-stack'
import { getTechStackBySlug } from 'gaboesquivel'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export default function TechPage({ params }: { params: { tag: string } }) {
  const tech = getTechStackBySlug(params.tag)
  if (!tech) redirect('/')
  return <TechStack tech={tech} />
}

export async function generateMetadata({
  params,
}: { params: { tag: string } }): Promise<Metadata> {
  const tech = getTechStackBySlug(params.tag)
  if (!tech) return { title: 'Not Found | Gabo Esquivel' }

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
