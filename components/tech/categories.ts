export const techCategoryIds = [
  "featured",
  "web3",
  "ai",
  "frontend",
  "backend",
  "cloud-devops",
  "all",
] as const;

export type TechCategoryId = (typeof techCategoryIds)[number];

export const techCategoryLabels: Record<TechCategoryId, string> = {
  ai: "AI",
  all: "All",
  backend: "Backend",
  "cloud-devops": "Cloud & DevOps",
  featured: "Featured",
  frontend: "Frontend",
  web3: "Web3",
};

export const techCategoryHref = (id: TechCategoryId) =>
  id === "featured" ? "/tech" : `/tech/${id}`;

export const techCapabilityHref: Partial<Record<TechCategoryId, string>> = {
  ai: "/ai",
  backend: "/backend",
  frontend: "/frontend",
  web3: "/web3",
};

export const techBrowseCategories = [
  {
    description: "Protocols, contracts, wallets, and indexing",
    href: "/tech/web3",
    id: "web3" as const,
    name: "Web3",
  },
  {
    description: "Models, retrieval, voice, and agent tooling",
    href: "/tech/ai",
    id: "ai" as const,
    name: "AI",
  },
  {
    description: "Interfaces, application state, and design systems",
    href: "/tech/frontend",
    id: "frontend" as const,
    name: "Frontend",
  },
  {
    description: "APIs, databases, queues, and realtime data",
    href: "/tech/backend",
    id: "backend" as const,
    name: "Backend",
  },
  {
    description: "Cloud platforms, containers, and infrastructure",
    href: "/tech/cloud-devops",
    id: "cloud-devops" as const,
    name: "Cloud & DevOps",
  },
  {
    description: "Complete project technology index",
    href: "/tech/all",
    id: "all" as const,
    name: "All technologies",
  },
];

export const isTechCategoryId = (value: string): value is TechCategoryId =>
  (techCategoryIds as readonly string[]).includes(value);

export const techCategoryFrame = ({
  category,
}: {
  category: TechCategoryId;
}) => {
  const capabilityHref = techCapabilityHref[category];
  if (!capabilityHref) {
    return null;
  }

  const frames: Partial<Record<TechCategoryId, string>> = {
    ai: "Models, retrieval, voice, and agent tooling from production work—grouped here with project evidence.",
    backend:
      "APIs, data stores, queues, and realtime plumbing from shipped systems—grouped here with project evidence.",
    frontend:
      "Interfaces, state, and design systems from shipped products—grouped here and tied to project evidence.",
    web3: "Protocols, wallets, contracts, and indexing from shipped systems—grouped here with project evidence.",
  };

  const line = frames[category];
  if (!line) {
    return null;
  }

  return { capabilityHref, line };
};
