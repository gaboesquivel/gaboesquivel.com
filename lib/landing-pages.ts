export const featuredLandingPages = [
  {
    description:
      "Shipped projects across AI, Web3, fintech, and full-stack product work.",
    href: "/work",
    title: "Work & Projects",
  },
  {
    description:
      "Voice, chat, retrieval, and the controls teams need to run AI products after launch.",
    href: "/ai",
    title: "AI Product Engineering",
  },
  {
    description:
      "Wallets, indexers, token flows, and trading interfaces built around protocol state.",
    href: "/web3",
    title: "Web3 Product Engineering",
  },
] as const;

export const landingPageGroups = [
  {
    pages: [
      {
        href: "/fullstack",
        title: "Full-Stack Product Engineering",
        description:
          "Interfaces and the services, data, and infrastructure behind them, owned as one system.",
      },
      {
        href: "/frontend",
        title: "Frontend Engineering",
        description:
          "Complex interfaces for trading, wallets, interactive media, and virtual worlds.",
      },
      {
        href: "/backend",
        title: "Backend Engineering",
        description:
          "APIs, indexers, realtime data, and application services where mistakes are costly.",
      },
      {
        href: "/mobile",
        title: "Mobile Engineering",
        description:
          "React Native apps for neobanks, blockchain messaging, retail AR, and AI assistants.",
      },
    ],
    title: "Capabilities",
  },
  {
    pages: [
      {
        href: "/startups",
        title: "Startup Product Engineering",
        description:
          "0→1 product work for neobanks, launchpads, virtual worlds, and AI platforms.",
      },
      {
        href: "/institutions",
        title: "Institutional Software Engineering",
        description:
          "Regulated finance, media, professional services, and retail, built inside systems already running.",
      },
      {
        href: "/lead",
        title: "Technical Leadership",
        description:
          "Team formation, architecture decisions, and moving technical knowledge through an organization.",
      },
    ],
    title: "Context",
  },
  {
    pages: [
      {
        href: "/",
        title: "Home",
        description:
          "Overview of product engineering across regulated finance, Web3, and AI.",
      },
      {
        href: "/bio",
        title: "Career Story",
        description:
          "Career narrative from Wink through Web3 and production AI.",
      },
      {
        href: "/blog",
        title: "Writing",
        description: "Essays on engineering, AI, Web3, and building software.",
      },
      {
        href: "/tech",
        title: "Technology Stack",
        description:
          "Technologies grouped by area, each linked to project evidence.",
      },
      {
        href: "/cv",
        title: "Curriculum Vitae",
        description:
          "Printable employment record with titles, dates, and skills.",
      },
      {
        href: "/ask",
        title: "Ask",
        description:
          "Direct hire, international hire, or contracting through Blockmatic Labs LLC.",
      },
      {
        href: "/docs",
        title: "Gabo Esquivel MCP — developer documentation",
        description:
          "Protocol at /docs (also /developers); Streamable HTTP server at /mcp with agent_start and agent_get.",
      },
    ],
    title: "About",
  },
] as const;
