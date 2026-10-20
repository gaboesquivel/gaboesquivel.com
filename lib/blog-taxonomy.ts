export const browseCategories = [
  "product",
  "engineering",
  "ai",
  "ux",
  "web3",
  "defi",
  "community",
] as const;

export type BrowseCategory = (typeof browseCategories)[number];

export const categoryMap: Record<string, BrowseCategory> = {
  AI: "ai",
  "Artificial Intelligence": "ai",
  Community: "community",
  DeFi: "defi",
  Engineering: "engineering",
  Product: "product",
  UX: "ux",
  Web3: "web3",
};

export const categoryDisplayNames: Record<BrowseCategory, string> = {
  ai: "AI",
  community: "Community",
  defi: "DeFi",
  engineering: "Engineering",
  product: "Product",
  ux: "UX",
  web3: "Web3",
};

export const knownCategories = [
  ...Object.keys(categoryMap),
  "Finance",
  "Backend",
  "Frontend",
  "Fullstack",
  "Tech Lead",
  "Startups",
  "Institutions",
  "Stablecoins",
  "Tokenization",
  "Solana",
  "Cosmos",
] as const;

const knownCategorySet = new Set<string>(knownCategories);

const normalizeCategory = (category: string) =>
  category.toLowerCase().replaceAll(/[-\s]+/g, " ");

export const toBrowseSlug = (name: string): BrowseCategory | null => {
  if (browseCategories.includes(name as BrowseCategory)) {
    return name as BrowseCategory;
  }

  const normalized = normalizeCategory(name);
  for (const [displayName, slug] of Object.entries(categoryMap)) {
    if (normalizeCategory(displayName) === normalized) {
      return slug;
    }
  }

  return null;
};

export const isBrowseCategory = (slug: string): slug is BrowseCategory =>
  browseCategories.includes(slug as BrowseCategory);

export const isKnownCategory = (category: string) =>
  knownCategorySet.has(category);

export const isArchivePost = (publishedAt: string) =>
  Number.parseInt(publishedAt.slice(0, 4), 10) < 2020;

export const postMatchesBrowseCategory = ({
  categories,
  slug,
}: {
  categories?: string[];
  slug: BrowseCategory;
}) => categories?.some((category) => categoryMap[category] === slug) ?? false;

export const categoryDescriptions: Record<BrowseCategory, string> = {
  ai: "Writing on AI systems, agents, retrieval, multimodal interfaces, and the engineering work around them.",
  community:
    "Notes on developer communities, open-source collaboration, and working across Costa Rica and international teams.",
  defi: "Engineering notes on liquidity, trading mechanisms, token standards, stablecoins, and DeFi risks.",
  engineering:
    "Writing about software architecture, technical decisions, tooling, reliability, and building products.",
  product:
    "Essays on product engineering, design decisions, iteration, and what teams need to ship useful software.",
  ux: "Notes on interface design, AI interactions, user control, and making complex workflows understandable.",
  web3: "Writing about blockchain engineering, wallets, onchain data, and connected financial systems.",
};
