import { TechList } from 'components/tech/tech-list'
import type { Metadata } from 'next'
import Link from 'next/link'

const categoryGroups = [
  {
    href: '/tech/web3',
    name: 'Web3',
    description: 'Protocols, contracts, wallets, and indexing',
  },
  {
    href: '/tech/ai',
    name: 'AI',
    description: 'Models, retrieval, voice, and agent tooling',
  },
  {
    href: '/tech/frontend',
    name: 'Frontend',
    description: 'Interfaces, application state, and design systems',
  },
  {
    href: '/tech/backend',
    name: 'Backend',
    description: 'APIs, databases, queues, and realtime data',
  },
  {
    href: '/tech/cloud-devops',
    name: 'Cloud & DevOps',
    description: 'Cloud platforms, containers, and infrastructure',
  },
  {
    href: '/tech/all',
    name: 'All technologies',
    description: 'Complete project technology index',
  },
]

export default function TechStackPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold tracking-tighter">
        Technology stack
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        Technologies I have used across shipped products, client work,
        open-source systems, and prototypes, grouped by area and linked to
        project evidence.
      </p>

      <h2 className="mb-6 mt-12 text-2xl font-semibold tracking-tight">
        Browse by area
      </h2>
      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {categoryGroups.map(({ href, name, description }) => (
          <Link
            key={href}
            href={href}
            className="rounded-lg border border-zinc-700/50 p-4"
          >
            <h3 className="font-semibold">{name}</h3>
            <p className="mt-2 text-sm text-neutral-400">{description}</p>
          </Link>
        ))}
      </div>

      <TechList heading="Featured technologies" showNavigation={false} />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Technology Stack | Gabo Esquivel',
  description:
    'Technologies used across AI, Web3, frontend, backend, and cloud project work, grouped by area and linked to evidence.',
  openGraph: {
    title: 'Technology Stack | Gabo Esquivel',
    description:
      'Technologies used across AI, Web3, frontend, backend, and cloud project work.',
    type: 'website',
  },
}
