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
    description: "Projects tagged AI in the work library.",
    heading: "AI projects",
  },
  all: {
    description: "The full project library.",
    heading: "All projects",
  },
  contract: {
    description: "Contract projects from the work library.",
    heading: "Contract projects",
  },
  featured: {
    description:
      "Selected software projects across AI, Web3, fintech, and full-stack work.",
    heading: "Selected software projects",
  },
  "full-time": {
    description: "Full-time projects from the work library.",
    heading: "Full-time projects",
  },
  lead: {
    description: "Projects tagged lead in the work library.",
    heading: "Leadership projects",
  },
  oss: {
    description: "Open-source projects from the work library.",
    heading: "Open-source projects",
  },
  web3: {
    description: "Projects tagged Web3 in the work library.",
    heading: "Web3 projects",
  },
};

export const isWorkType = (type: string): type is WorkType =>
  workTypeOptions.includes(type as WorkType);

export const workTypeHref = ({ type }: { type: string }) =>
  type === "featured" ? "/work" : `/work/${type}`;
