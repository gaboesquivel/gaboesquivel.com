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

export const workTypeCopy: Record<
  WorkType,
  { heading: string; description: string }
> = {
  ai: {
    description:
      "AI projects involving voice assistants, retrieval, specialized interfaces, and research tools.",
    heading: "AI projects",
  },
  all: {
    description:
      "The complete project archive, from early web applications to mobile banking, AI assistants, and blockchain systems.",
    heading: "All projects",
  },
  contract: {
    description:
      "Engineering projects delivered through contract engagements, with application, systems, and technology details.",
    heading: "Contract projects",
  },
  featured: {
    description:
      "Selected products and systems across AI, banking, Web3, and infrastructure.",
    heading: "Software that ships.",
  },
  "full-time": {
    description:
      "Software projects built in full-time roles across financial products, AI applications, and blockchain infrastructure.",
    heading: "Full-time projects",
  },
  lead: {
    description:
      "Projects involving technical leadership, product direction, architecture, and engineering delivery.",
    heading: "Leadership projects",
  },
  oss: {
    description:
      "Open-source tools and contributions spanning blockchain infrastructure and developer-facing applications.",
    heading: "Open-source projects",
  },
  web3: {
    description:
      "Blockchain projects involving wallets, trading interfaces, token systems, and indexed chain data.",
    heading: "Web3 projects",
  },
};

export const isWorkType = (type: string): type is WorkType =>
  workTypeOptions.includes(type as WorkType);

export const workTypeHref = ({ type }: { type: string }) =>
  type === "featured" ? "/work" : `/work/${type}`;
