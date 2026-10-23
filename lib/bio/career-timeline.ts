/** Chapter summaries of app/bio/page.tsx. Project facts and media remain package-owned. */
export const careerChapters = [
  {
    id: "foundations",
    year: "2010",
    period: "2010 — 2014",
    label: "Interfaces",
    title: "Interfaces and a JavaScript community",
    summary:
      "I started building web interfaces in 2010. At American Express, I worked on credit-card comparison tools, responsive landing pages, analytics, and A/B testing.",
    detail:
      "From 2012, I helped organize Costa Rica JS through meetups, NodeSchool, and Front End Day. At AMC Networks, I later led frontend engineering for YEAH!, an interactive streaming movie service launched at SXSW in 2013.",
    projectSlugs: ["costa-rica-js", "american-express"],
  },
  {
    id: "product",
    year: "2015",
    period: "2015 — 2016",
    label: "Product",
    title: "From interfaces to a banking product",
    summary:
      "I joined Wink as Lead Engineer in 2015. Bringing Costa Rica’s first neobank to launch meant building a mobile banking experience and the systems behind it.",
    detail:
      "I built the first React Native application and AWS backend, integrated partner-bank APIs, and implemented biometric authentication through a native bridge. I also helped choose the technology, coordinate partners and vendors, plan delivery, and build the engineering team.",
    projectSlugs: ["wink"],
  },
  {
    id: "systems",
    year: "2017",
    period: "2017 — 2023",
    label: "Systems",
    title: "Financial products and blockchain systems",
    summary:
      "Building financial products led me toward blockchain infrastructure and the interfaces around it. From 2017 onward, I worked on tokens, marketplaces, and networks.",
    detail:
      "At EOS Costa Rica, I helped launch the EOS mainnet and worked on a private chain for the innovation labs of a global accounting and consulting firm. The work later included Bitcash’s exchange, ChainGraph’s data tools, RareMint’s marketplace, and ZTX’s in-world wallet.",
    projectSlugs: ["ztx", "eos-costa-rica", "raremint", "bitcashbank"],
  },
  {
    id: "intelligent-interfaces",
    year: "2024",
    period: "2024 — Present",
    label: "AI & agents",
    title: "Intelligent interfaces",
    summary:
      "By 2024, I was building specialized AI assistants at Masterbots and Bitlauncher. In 2025, I worked on LegalAgent, combining bilingual voice and chat, retrieval, and operational controls.",
    detail:
      "Today, I work at the intersection of agentic AI, product engineering, and onchain finance. My interest remains the point where complex technology becomes useful to people.",
    projectSlugs: ["legal-agent", "masterbots", "bitlauncher"],
  },
] as const;

export type CareerChapter = (typeof careerChapters)[number];
export const careerProjectSlugs = [
  ...new Set(careerChapters.flatMap((chapter) => [...chapter.projectSlugs])),
];
