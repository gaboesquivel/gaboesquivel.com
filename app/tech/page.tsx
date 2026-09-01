import {
  blockGrid,
  PageSection,
  PageTitle,
  Prose,
  sectionSpacing,
} from 'components/shared/page-layout'
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
      <PageTitle>Technology stack</PageTitle>
      <Prose>
        Technologies I have used across shipped products, client work,
        open-source systems, and prototypes, grouped by area and linked to
        project evidence.
      </Prose>

      <PageSection title="Browse by area">
        <div className={blockGrid}>
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
      </PageSection>

      <TechList
        heading="Featured technologies"
        showNavigation={false}
        className={sectionSpacing}
      />
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
