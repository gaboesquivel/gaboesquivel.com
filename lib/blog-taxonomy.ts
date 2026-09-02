export const browseCategories = [
  'engineering',
  'ai',
  'ux',
  'web3',
  'defi',
  'community',
] as const

export type BrowseCategory = (typeof browseCategories)[number]

export const categoryMap: Record<string, BrowseCategory> = {
  Engineering: 'engineering',
  'Artificial Intelligence': 'ai',
  AI: 'ai',
  UX: 'ux',
  Web3: 'web3',
  DeFi: 'defi',
  Community: 'community',
}

export const categoryDisplayNames: Record<BrowseCategory, string> = {
  engineering: 'Engineering',
  ai: 'AI',
  ux: 'UX',
  web3: 'Web3',
  defi: 'DeFi',
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
  ai: 'Posts tagged AI: dated notes from implementation work.',
  ux: 'How AI and product interfaces are shifting — from chat to agents, streaming, and higher-agency workflows.',
  web3: 'Posts tagged Web3: dated notes from implementation work.',
  defi: 'Posts on AMMs, liquidity, token standards, risk, and the engineering behind decentralized finance.',
  community:
    'Community building, contracting setup, and the Costa Rica software ecosystem.',
}
