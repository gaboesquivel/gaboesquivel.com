export type CvExperience = {
  company: string
  title?: string
  location: string
  duration: string
  description: string
  achievements: string[]
  techStack: string[]
  pageBreak?: boolean
}

export const experience: CvExperience[] = [
  {
    company: 'LegalAgent',
    location: 'Remote - Contract',
    duration: '2025',
    description:
      'AI legal platform: assistant with voice and chat for case context, documents, and procedures.',
    achievements: [
      'Delivered multimodal AI assistant (voice and chat) in React Native (Expo).',
      'Implemented RAG architecture for contextual legal support and document summarization.',
      'Built admin dashboard with Microsoft SSO and document management.',
      'Shipped bilingual voice support with realtime transcription and speech synthesis.',
    ],
    techStack: [
      'TypeScript',
      'React Native',
      'Expo',
      'OpenAI',
      'AI SDK',
      'TanStack Query',
      'TanStack Form',
      'TanStack Start',
      'Tailwind',
      'Redis',
      'PostgreSQL',
    ],
  },
  {
    company: 'Bitlauncher',
    title: 'Software Engineer',
    location: 'Remote',
    duration: 'Nov 2023 – Nov 2025',
    description:
      'AI and crypto launchpad: early access to AI startups via token sales and auctions.',
    achievements: [
      'Architected full-stack platform on Next.js 14, Supabase, viem, and wagmi.',
      'Built token bridge flows for USDT, USDC, and BITUSD into protocol tokens.',
      'Integrated Gnosis auction contracts with wallet UX and realtime balance updates.',
      'Developed custom EVM indexer using WebSocket event subscriptions.',
      'Integrated AI SDKs and prompting for masterbots.ai.',
      'Established AI-assisted engineering workflow with Claude, v0.dev, Cursor, and SourceryAI.',
    ],
    techStack: [
      'Viem',
      'Wagmi',
      'Alchemy',
      'Trigger.dev',
      'Supabase',
      'Next.js',
      'ShadcnUI',
      'Solidity',
      'EOS EVM',
      'Node.js',
      'AI SDK',
      'Claude Sonnet',
      'Cursor',
      'SourceryAI',
      'OpenAI',
    ],
  },
  {
    company: 'Opyn',
    location: 'Remote - Contract',
    duration: 'Oct 2024 – Feb 2025',
    description: 'Decentralized perpetual options protocol on Arbitrum.',
    achievements: [
      'Architected Next.js application structure and data-fetching approach.',
      'Built trading interface and custom UI for options trading.',
      'Integrated protocol and Arbitrum testnet with viem and wagmi.',
      'Indexed onchain data with Ponder, PostgreSQL, and Supabase.',
      'Prototyped LLM-based assistant for onboarding and support.',
    ],
    techStack: [
      'TypeScript',
      'NextJS',
      'Foundry',
      'Solidity',
      'Viem',
      'Wagmi',
      'Ponder',
      'PostgreSQL',
      'Supabase',
      'ShadcnUI',
      'Tailwind',
      'TanStack Query',
      'Zod',
      'nuqs',
      'EVM',
      'Ethereum',
    ],
    pageBreak: true,
  },
  {
    company: 'ZTX',
    location: 'Remote',
    duration: 'Aug 2022 – Aug 2023',
    description:
      'Virtual world with cryptocurrency-backed digital asset ownership.',
    achievements: [
      'Implemented WebGL EVM wallet connector with Ethers.js and a custom JavaScript event system.',
      'Configured analytics and reporting with Google Tag Manager.',
      'Owned React architecture on Next.js with Tailwind CSS and Framer Motion.',
    ],
    techStack: [
      'React',
      'Next.js',
      'TailwindCSS',
      'Framer Motion',
      'WebGL',
      'Ethers',
      'Analytics',
    ],
  },
  {
    company: 'RareMint',
    location: 'Remote',
    duration: 'Jul 2021 – Dec 2022',
    description:
      'NFT platform for minting, trading, and collecting digital assets.',
    achievements: [
      'Built NFT indexer using Moralis streams, Node.js, and PostgreSQL.',
      'Improved marketplace responsiveness with Remix, Tailwind CSS, and GraphQL.',
      'Integrated WalletConnect for wallet connections and transactions.',
      'Supported launch of first Pokémon card auctions on Polygon.',
    ],
    techStack: [
      'Moralis',
      'Ethers',
      'Node.js',
      'PostgreSQL',
      'Google Cloud',
      'Remix',
      'TailwindCSS',
      'GraphQL',
      'TypeScript',
      'WalletConnect',
      'Polygon',
    ],
  },
  {
    company: 'Bitcash',
    location: 'Remote - Part-time',
    duration: 'Jan 2020 – Jul 2021',
    description: 'Fiat-to-stablecoin and crypto exchange application.',
    achievements: [
      'Architected full-stack platform: React, Vite, Node.js, PostgreSQL, Hasura GraphQL, Google Cloud.',
      'Built peer-to-peer exchange, realtime chat, and backend matching engine.',
      'Developed realtime EOS indexer: Node.js worker threads, binary deserialization, PostgreSQL on Google Cloud.',
      'Implemented WebAuthn-based key management for in-browser transaction signing without external wallet apps.',
      'Delivered QR-based signature requests for partner applications using Supabase subscriptions and webhooks.',
    ],
    techStack: [
      'React',
      'Vite',
      'Node.js',
      'PostgreSQL',
      'Hasura GraphQL',
      'Google Cloud',
      'EOS',
      'WebAuthn',
      'Supabase',
      'TypeScript',
    ],
    pageBreak: true,
  },
  // {
  //   "company": "Tractor Supply",
  //   "location": "Remote - Contract",
  //   "duration": "Jul 2020 - Dec 2020 · 6 mos",
  //   "description": "Tractor Supply is a leading global supplier of agricultural equipment and supplies.",
  //   "achievements": [
  //     "Evaluated and provided improvement feedback to inhouse team on React Native architecture, such as removing unnecessary abstractions, code duplication and OO patterns in favor of a more functional approach",
  //     "Developed augmented reality feature to allow users to scan and visualize tents and storage units in their field using ViroReact"
  //   ],
  //   "techStack": ["React Native", "ViroReact", "TypeScript"]
  // },
  {
    company: 'Emanate',
    location: 'Remote - Contract',
    duration: 'Dec 2019 – Jul 2020',
    description: 'Social platform for artists.',
    achievements: [
      'Maintained and improved streaming web application.',
      'Built back office for artist token payments.',
      'Integrated EOS blockchain with AWS backend services.',
    ],
    techStack: ['EOS', 'AWS', 'React', 'Styled Components'],
  },
  {
    company: 'EOS Costa Rica',
    location: 'Hybrid',
    duration: 'Mar 2018 – Jan 2020',
    description:
      'Block producer: infrastructure and blockchain development services.',
    achievements: [
      'Participated in EOS mainnet launch and operated EOSIO-based validators.',
      'Configured private EOSIO chain for Grant Thornton Labs; shipped MVP for intercompany transactions and tax workflows using a stablecoin, hashing, and IPFS for immutable records.',
      'Developed EOS Rate frontend with React and Styled Components.',
      'Led recruiting, onboarding, workshops, and community engagement (e.g., TicoBlockchain.cr, CryptoCantina).',
    ],
    techStack: ['EOSIO', 'React', 'Styled Components', 'IPFS'],
  },
  {
    company: 'Knowledge.io',
    location: 'Remote',
    duration: 'Sep 2017 – May 2018',
    description: 'Tokenized knowledge and expertise platform.',
    achievements: [
      'Deployed ERC-20 token for ICO on Ethereum mainnet using Truffle.',
      'Built marketplace and wallet dashboard with React and Web3.js.',
      'Maintained mobile trivia game for token rewards.',
    ],
    techStack: ['Ethereum', 'Truffle', 'React', 'Web3.js'],
    pageBreak: true,
  },
  {
    company: 'Wink',
    location: 'On-site',
    duration: 'Apr 2015 – Mar 2018',
    description:
      'Mobile neobank: digital banking and financial services (holawink.com).',
    achievements: [
      'Led backend architecture, integrations, and security.',
      'Coordinated partner banks and vendors.',
      'Built biometric KYC with React Native native bridge.',
      'Integrated partner bank APIs.',
    ],
    techStack: ['React Native', 'React', 'Node.js', 'AWS'],
  },
  {
    company: 'AMC Networks',
    location: 'Hybrid',
    duration: 'Nov 2012 – Apr 2014',
    description:
      'Interactive streaming movie service YEAH! (SXSW 2013 launch): classic genre films with interactive bonus content.',
    achievements: [
      'Led frontend team with creative and backend partners.',
      'Built interactive video streaming frontend for Facebook application.',
      'Implemented back-office with Brightcove integration.',
      'Shipped interactive trivia, interviews, and quizzes in the video player.',
      'Optimized experiences for curated films with 400+ interactive elements each.',
    ],
    techStack: ['JavaScript', 'Brightcove', 'Facebook API'],
  },
  {
    company: 'American Express',
    location: 'On-site',
    duration: 'Apr 2010 – Nov 2012',
    description: 'Global financial services and card products.',
    achievements: [
      'Contributed to migration from Dojo to jQuery.',
      'Implemented responsive layouts, A/B testing, and analytics.',
      'Developed credit card marketing components: comparison sliders and landing pages.',
    ],
    techStack: [
      'JavaScript',
      'jQuery',
      'A/B testing tools',
      'Analytics platforms',
    ],
    pageBreak: true,
  },
  // {
  //   company: 'InterGraphicDESIGNS',
  //   location: 'On-site',
  //   duration: 'Jul 2008 - Apr 2010 · 1 yr 10 mos',
  //   description:
  //     'InterGraphicDESIGNS is a web design and development company specializing in creating custom WordPress solutions for businesses. They focus on delivering tailored websites and web applications that combine aesthetic appeal with functional efficiency.',
  //   achievements: [
  //     'Crafted custom sites and modules using WordPress, PHP, CSS and JavaScript',
  //     'Developed custom WordPress plugins for custom post types, taxonomies and admin dashboards',
  //     'Integrated third party services like Google Maps with custom pointer and interactive content for our db',
  //     'Built a newsletter for Scotiabank using WordPress',
  //   ],
  //   techStack: ['WordPress', 'PHP', 'CSS', 'JavaScript', 'Google Maps API'],
  // },
]
