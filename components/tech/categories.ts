export const techCategoryIds = [
  'featured',
  'web3',
  'ai',
  'frontend',
  'backend',
  'cloud-devops',
  'all',
] as const

export type TechCategoryId = (typeof techCategoryIds)[number]

export const techCategoryLabels: Record<TechCategoryId, string> = {
  featured: 'Featured',
  web3: 'Web3',
  ai: 'AI',
  frontend: 'Frontend',
  backend: 'Backend',
  'cloud-devops': 'Cloud & DevOps',
  all: 'All',
}

export const techCategoryHref = (id: TechCategoryId) =>
  id === 'featured' ? '/tech' : `/tech/${id}`

export const techCapabilityHref: Partial<Record<TechCategoryId, string>> = {
  frontend: '/frontend',
  ai: '/ai',
  web3: '/web3',
  backend: '/backend',
}

export const techBrowseCategories = [
  {
    id: 'web3' as const,
    href: '/tech/web3',
    name: 'Web3',
    description: 'Protocols, contracts, wallets, and indexing',
  },
  {
    id: 'ai' as const,
    href: '/tech/ai',
    name: 'AI',
    description: 'Models, retrieval, voice, and agent tooling',
  },
  {
    id: 'frontend' as const,
    href: '/tech/frontend',
    name: 'Frontend',
    description: 'Interfaces, application state, and design systems',
  },
  {
    id: 'backend' as const,
    href: '/tech/backend',
    name: 'Backend',
    description: 'APIs, databases, queues, and realtime data',
  },
  {
    id: 'cloud-devops' as const,
    href: '/tech/cloud-devops',
    name: 'Cloud & DevOps',
    description: 'Cloud platforms, containers, and infrastructure',
  },
  {
    id: 'all' as const,
    href: '/tech/all',
    name: 'All technologies',
    description: 'Complete project technology index',
  },
]

export const isTechCategoryId = (value: string): value is TechCategoryId =>
  (techCategoryIds as readonly string[]).includes(value)

export const techCategoryFrame = ({
  category,
}: {
  category: TechCategoryId
}) => {
  const capabilityHref = techCapabilityHref[category]
  if (!capabilityHref) return null

  const frames: Partial<Record<TechCategoryId, string>> = {
    frontend:
      'Interfaces, state, and design systems from shipped products—grouped here and tied to project evidence.',
    ai: 'Models, retrieval, voice, and agent tooling from production work—grouped here with project evidence.',
    web3: 'Protocols, wallets, contracts, and indexing from shipped systems—grouped here with project evidence.',
    backend:
      'APIs, data stores, queues, and realtime plumbing from shipped systems—grouped here with project evidence.',
  }

  const line = frames[category]
  if (!line) return null

  return { line, capabilityHref }
}
