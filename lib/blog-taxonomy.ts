export const browseCategories = [
  'engineering',
  'web3',
  'defi',
  'ai',
  'ux',
  'community',
] as const

export type BrowseCategory = (typeof browseCategories)[number]

export const categoryMap: Record<string, BrowseCategory> = {
  Engineering: 'engineering',
  Web3: 'web3',
  DeFi: 'defi',
  'Artificial Intelligence': 'ai',
  AI: 'ai',
  UX: 'ux',
  Community: 'community',
}

export const categoryDisplayNames: Record<BrowseCategory, string> = {
  engineering: 'Engineering',
  web3: 'Web3',
  defi: 'DeFi',
  ai: 'AI',
  ux: 'UX',
  community: 'Community',
}

export const knownCategories = [
  ...Object.keys(categoryMap),
  'Finance',
  'Backend',
  'Frontend',
  'Fullstack',
  'Tech Lead',
  'Startups',
  'Institutions',
  'Stablecoins',
  'Tokenization',
  'Solana',
  'Cosmos',
] as const

const knownCategorySet = new Set<string>(knownCategories)

const normalizeCategory = (category: string) =>
  category.toLowerCase().replace(/[-\s]+/g, ' ')

export const toBrowseSlug = (name: string): BrowseCategory | null => {
  if (browseCategories.includes(name as BrowseCategory))
    return name as BrowseCategory

  const normalized = normalizeCategory(name)
  for (const [displayName, slug] of Object.entries(categoryMap)) {
    if (normalizeCategory(displayName) === normalized) return slug
  }

  return null
}

export const isBrowseCategory = (slug: string): slug is BrowseCategory =>
  browseCategories.includes(slug as BrowseCategory)

export const isKnownCategory = (category: string) =>
  knownCategorySet.has(category)

export const isArchivePost = (publishedAt: string) =>
  Number.parseInt(publishedAt.slice(0, 4), 10) < 2020

export const postMatchesBrowseCategory = ({
  categories,
  slug,
}: {
  categories?: string[]
  slug: BrowseCategory
}) => categories?.some((category) => categoryMap[category] === slug) ?? false

export const categoryDescriptions: Record<BrowseCategory, string> = {
  engineering:
    'Notes on architecture, tooling, and shipping software — patterns, tradeoffs, and what held up in production.',
  web3: 'Writing on wallets, onchain systems, DeFi mechanics, and making blockchain infrastructure useful in products.',
  defi: 'Posts on AMMs, liquidity, token standards, risk, and the engineering behind decentralized finance.',
  ai: 'Notes on RAG, agents, MCP, prompt security, and AI UX from building production assistants and tools.',
  ux: 'How AI and product interfaces are shifting — from chat to agents, streaming, and higher-agency workflows.',
  community:
    'Community building, contracting setup, and the Costa Rica software ecosystem.',
}
