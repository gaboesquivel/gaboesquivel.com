export const featuredProjectSlugs = [
  "legal-agent",
  "wink",
  "ztx",
  "bitlauncher",
  "opyn",
  "eos-costa-rica",
] as const;

export const workTypeOptions = [
  "featured",
  "full-time",
  "contract",
  "web3",
  "ai",
  "lead",
  "oss",
  "all",
] as const;

export type WorkType = (typeof workTypeOptions)[number];

export interface WorkTypeEditorialCopy {
  heading: string;
  description: string;
  heroTitle: string;
  desktopLines: readonly [string, string];
  mobileLines: readonly [string, string];
  trailLabel: string;
}

export const workTypeCopy: Record<WorkType, WorkTypeEditorialCopy> = {
  ai: {
    description:
      "AI projects involving voice assistants, retrieval, specialized interfaces, and research tools.",
    desktopLines: [
      "Practical AI systems built around voice,",
      "retrieval, and agentic experiences.",
    ],
    heading: "AI projects",
    heroTitle: "Applied AI.",
    mobileLines: ["Voice, retrieval, and", "agentic AI systems."],
    trailLabel: "ai",
  },
  all: {
    description:
      "The complete project archive, from early web applications to mobile banking, AI assistants, and blockchain systems.",
    desktopLines: [
      "A complete record of software delivered",
      "across products, platforms, and teams.",
    ],
    heading: "All projects",
    heroTitle: "Complete archive.",
    mobileLines: ["Every shipped project,", "from web to agentic AI."],
    trailLabel: "all",
  },
  contract: {
    description:
      "Engineering projects delivered through contract engagements, with application, systems, and technology details.",
    desktopLines: [
      "Independent engineering work for products,",
      "platforms, and production teams.",
    ],
    heading: "Contract projects",
    heroTitle: "Independent work.",
    mobileLines: ["Independent engineering", "for products and platforms."],
    trailLabel: "contract",
  },
  featured: {
    description:
      "Selected products and systems across AI, banking, Web3, and infrastructure.",
    desktopLines: [
      "Selected products and systems across AI,",
      "banking, Web3, and infrastructure.",
    ],
    heading: "Software that ships.",
    heroTitle: "Software that ships.",
    mobileLines: ["Products across AI, banking,", "Web3, and infrastructure."],
    trailLabel: "selected projects",
  },
  "full-time": {
    description:
      "Software projects built in full-time roles across financial products, AI applications, and blockchain infrastructure.",
    desktopLines: [
      "Product engineering across banking, AI,",
      "and production infrastructure.",
    ],
    heading: "Full-time projects",
    heroTitle: "Built in-house.",
    mobileLines: ["Products across banking,", "AI, and infrastructure."],
    trailLabel: "full-time",
  },
  lead: {
    description:
      "Projects involving technical leadership, product direction, architecture, and engineering delivery.",
    desktopLines: [
      "Technical direction from architecture",
      "through implementation and delivery.",
    ],
    heading: "Leadership projects",
    heroTitle: "Technical leadership.",
    mobileLines: ["Engineering leadership", "from design to delivery."],
    trailLabel: "lead",
  },
  oss: {
    description:
      "Open-source tools and contributions spanning blockchain infrastructure and developer-facing applications.",
    desktopLines: [
      "Open-source tools and contributions",
      "for developers and decentralized systems.",
    ],
    heading: "Open-source projects",
    heroTitle: "Open-source work.",
    mobileLines: ["Open-source tools", "for builders and developers."],
    trailLabel: "oss",
  },
  web3: {
    description:
      "Blockchain projects involving wallets, trading interfaces, token systems, and indexed chain data.",
    desktopLines: [
      "Wallets, trading applications, and",
      "blockchain infrastructure in production.",
    ],
    heading: "Web3 projects",
    heroTitle: "Onchain systems.",
    mobileLines: ["Wallets, trading apps,", "and onchain systems."],
    trailLabel: "web3",
  },
};

export const isWorkType = (type: string): type is WorkType =>
  workTypeOptions.includes(type as WorkType);

export const workTypeHref = ({ type }: { type: string }) =>
  type === "featured" ? "/work" : `/work/${type}`;

const normalizePathname = (pathname: string) => {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

export const workTypeFromPathname = (pathname: string): WorkType | null => {
  const path = normalizePathname(pathname);
  if (path === "/work") return "featured";
  const match = /^\/work\/([^/]+)$/.exec(path);
  if (!match) return null;
  const segment = match[1];
  return isWorkType(segment) ? segment : null;
};
