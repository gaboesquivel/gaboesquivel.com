export interface BioLink {
  href: string;
  label: string;
}

export type BioTextSegment =
  | string
  | { type: "link"; href: string; label: string };

export type BioParagraph = readonly BioTextSegment[];

export type BioChapterMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      kind: "project";
      slug: string;
      href?: string;
    };

export interface BioChapter {
  id: string;
  startYear: string;
  period: string;
  category: string;
  /** Short label for GenUI chapter navigation (sentence case). */
  navLabel: string;
  title: string;
  summaryParagraphs: readonly BioParagraph[];
  expandedParagraphs: readonly BioParagraph[];
  links: readonly BioLink[];
  primaryMedia: BioChapterMedia;
  projectSlugs: readonly string[];
}

export const bioChapters: readonly BioChapter[] = [
  {
    id: "foundations",
    startYear: "2010",
    period: "2010 — 2014",
    category: "FOUNDATIONS",
    navLabel: "Foundations",
    title: "Interfaces and a JavaScript community",
    summaryParagraphs: [
      [
        "At American Express, I worked on credit-card interfaces from 2010 to 2012, building interactive comparison tools and responsive landing pages, working with analytics and A/B testing, and helping move an older frontend toward modern JavaScript.",
      ],
      [
        "From 2012, I also helped organize ",
        {
          type: "link",
          href: "/project/costa-rica-js",
          label: "Costa Rica JS",
        },
        ". Through meetups, NodeSchool, and Front End Day, it grew into a community of more than 2,000 developers.",
      ],
    ],
    expandedParagraphs: [
      [
        "Building that community mattered as much as the software. We were learning together, sharing what we knew, and helping modern web development take root in Costa Rica.",
      ],
      [
        "Later, at AMC Networks, I led frontend engineering for YEAH!, an interactive streaming movie service launched at SXSW in 2013. Around that period, I also worked on a fantasy-tennis strategy game and a realtime flight-information display for ARINC.",
      ],
    ],
    links: [{ href: "/project/costa-rica-js", label: "Costa Rica JS →" }],
    primaryMedia: {
      kind: "image",
      src: "/images/bio/nodeschool-costa-rica.jpg",
      alt: "Developers at a NodeSchool Costa Rica workshop",
      caption: "Learning together at NodeSchool Costa Rica.",
    },
    projectSlugs: ["costa-rica-js", "american-express"],
  },
  {
    id: "product",
    startYear: "2015",
    period: "2015 — 2016",
    category: "PRODUCT",
    navLabel: "Product",
    title: "From interfaces to a banking product",
    summaryParagraphs: [
      [
        "Wink changed the scale of my work. Costa Rica's first neobank was designed to make banking accessible from a phone, without visiting a branch. I joined as Lead Engineer in 2015 and built the first React Native application and AWS backend, integrated partner-bank APIs, and implemented biometric authentication through a native bridge.",
      ],
      [
        "Bringing Wink to launch meant more than writing code. I helped choose the technology, coordinate partners and vendors, plan delivery, and build the engineering team.",
      ],
    ],
    expandedParagraphs: [
      [
        "The experience reinforced a principle I still believe in: technology should expand access rather than create new gatekeepers.",
      ],
    ],
    links: [{ href: "/project/wink", label: "View Wink →" }],
    primaryMedia: { kind: "project", slug: "wink", href: "/project/wink" },
    projectSlugs: ["wink"],
  },
  {
    id: "systems",
    startYear: "2017",
    period: "2017 — 2023",
    category: "SYSTEMS",
    navLabel: "Systems",
    title: "Financial products and blockchain systems",
    summaryParagraphs: [
      [
        "Building financial products led me toward blockchain infrastructure and the interfaces around it. From 2017 onward, I worked on tokens, marketplaces, and networks, including Knowledge's ERC-20 token, AsoBlockchain, which I co-founded, and EOS Costa Rica, where I helped launch the EOS mainnet and worked on a private chain for the innovation labs of a global accounting and consulting firm.",
      ],
      [
        "The work later moved closer to everyday product experiences: Bitcash's exchange and browser signing, ChainGraph's blockchain data tools, RareMint's marketplace, ZTX's in-world wallet, Bitlauncher's auctions, and Opyn's trading interface.",
      ],
    ],
    expandedParagraphs: [
      [
        "These projects worked at different layers of the stack, but they shared one challenge: making complex, often unfamiliar systems understandable to the people using them.",
      ],
    ],
    links: [
      { href: "/project/opyn", label: "Opyn →" },
      { href: "/project/eos-costa-rica", label: "EOS Costa Rica →" },
      { href: "/web3", label: "Explore Web3 work →" },
    ],
    primaryMedia: { kind: "project", slug: "opyn", href: "/project/opyn" },
    projectSlugs: [
      "ztx",
      "eos-costa-rica",
      "raremint",
      "bitcashbank",
      "opyn",
      "bitlauncher",
    ],
  },
  {
    id: "intelligent-interfaces",
    startYear: "2024",
    period: "2024 — Present",
    category: "AI & AGENTS",
    navLabel: "AI & agents",
    title: "Intelligent interfaces and agentic products",
    summaryParagraphs: [
      [
        "By 2024, I was building specialized AI assistants at Masterbots and Bitlauncher. In 2025, I worked on LegalAgent, combining bilingual voice and chat, retrieval, and the operational controls needed to manage an AI product.",
      ],
      [
        "Today I work at the intersection of agentic AI, product engineering, and generative interfaces — still focused on the point where complex technology becomes useful to people.",
      ],
    ],
    expandedParagraphs: [
      [
        "The tools have changed considerably since I started building web interfaces, but my interest remains the same: making intelligent systems understandable, controllable, and grounded in real product workflows.",
      ],
    ],
    links: [
      { href: "/project/legal-agent", label: "View LegalAgent →" },
      { href: "/ai", label: "Explore AI work →" },
    ],
    primaryMedia: {
      kind: "project",
      slug: "legal-agent",
      href: "/project/legal-agent",
    },
    projectSlugs: ["legal-agent", "masterbots", "bitlauncher"],
  },
];

export const bioProjectSlugs = [
  ...new Set(bioChapters.flatMap((chapter) => [...chapter.projectSlugs])),
];
