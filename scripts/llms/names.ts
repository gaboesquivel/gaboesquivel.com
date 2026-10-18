const TAG_DISPLAY_NAMES: Record<string, string> = {
  Ethers: "Ethers.js",
  EthersJS: "Ethers.js",
  Mootools: "MooTools",
  NextJS: "Next.js",
  NodeJS: "Node.js",
  RXJS: "RxJS",
  ReactJS: "React",
  ShadcnUI: "shadcn/ui",
  "TanStack Form": "TanStack Form",
  "TanStack Query": "TanStack Query",
  "TanStack Start": "TanStack Start",
  WebAuthN: "WebAuthn",
  Wordpress: "WordPress",
};

export const displayTagName = (tag: string) => TAG_DISPLAY_NAMES[tag] ?? tag;

export const displayTechList = (tags: string[]) =>
  tags.map(displayTagName).join(", ");
