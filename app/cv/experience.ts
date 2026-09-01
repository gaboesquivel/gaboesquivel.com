export type CvExperience = {
  company: string
  title: string
  location: 'Remote' | 'Hybrid' | 'On-site'
  type: 'Full-time' | 'Part-time' | 'Contract'
  duration: string
  description: string
  achievements: string[]
  techStack: string[]
  pageBreak?: boolean
}

export const experience: CvExperience[] = [
  {
    company: 'LegalAgent',
    title: 'Software Engineer',
    type: 'Contract',
    location: 'Remote',
    duration: '2025',
    description:
      'AI legal platform with voice, chat, and retrieval for case context, documents, and procedures.',
    achievements: [
      'Shipped a voice and chat assistant in React Native (Expo).',
      'Built RAG for case context and document summaries.',
      'Built the TanStack Start admin with Microsoft SSO, document management, and retrieval categories.',
      'Shipped bilingual voice with realtime transcription and speech synthesis.',
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
    type: 'Full-time',
    location: 'Remote',
    duration: 'Nov 2023 – Nov 2025',
    description:
      'AI and crypto launchpad for token sales, auctions, wallets, and indexed market data.',
    achievements: [
      'Built the launchpad on Next.js 14, Supabase, viem, and wagmi.',
      'Built token bridge flows for USDT, USDC, and BITUSD into protocol tokens.',
      'Integrated Gnosis auction contracts with wallet UX and realtime balance updates.',
      'Built a custom EVM indexer using WebSocket event subscriptions.',
      'Integrated AI SDKs and prompting for masterbots.ai.',
      'Set up an AI-assisted engineering workflow with Claude, v0.dev, Cursor, and SourceryAI.',
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
    pageBreak: true,
  },
  {
    company: 'Opyn',
    title: 'Software Engineer',
    location: 'Remote',
    type: 'Contract',
    duration: 'Oct 2024 – Feb 2025',
    description:
      'Options protocol on Arbitrum with a trading interface and indexed onchain data.',
    achievements: [
      'Built the Next.js 14 trading interface with React Server Components.',
      'Integrated the protocol and Arbitrum testnet with viem and wagmi.',
      'Indexed onchain data with Ponder, PostgreSQL, and Supabase.',
      'Prototyped an LLM assistant for onboarding and support.',
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
  },
  {
    company: 'ZTX',
    title: 'Software Engineer',
    type: 'Full-time',
    location: 'Remote',
    duration: 'Aug 2022 – Aug 2023',
    description:
      'Virtual world with a WebGL wallet connection and a Next.js experience.',
    achievements: [
      'Built a WebGL EVM wallet connector with Ethers.js and a custom JavaScript event system.',
      'Set up the Next.js app that hosted the virtual world, with Tailwind and Framer Motion.',
      'Wired analytics through Google Tag Manager.',
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
    title: 'Software Engineer',
    type: 'Full-time',
    location: 'Remote',
    duration: 'Jul 2021 – Dec 2022',
    description:
      'Polygon marketplace for tokenized sports collectibles with indexed NFT data, auctions, and WalletConnect.',
    achievements: [
      'Built an NFT indexer with Moralis streams, Node.js, and PostgreSQL.',
      'Improved marketplace responsiveness with Remix, Tailwind CSS, and GraphQL.',
      'Integrated WalletConnect for connections and transactions.',
      'Supported the first Pokémon card auctions on Polygon.',
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
    title: 'Lead Engineer',
    type: 'Part-time',
    location: 'Remote',
    duration: 'Jan 2020 – Jul 2021',
    description:
      'Fiat-to-stablecoin and crypto exchange with peer-to-peer trading, chat, and browser signing.',
    achievements: [
      'Built the React, Vite, Node.js, PostgreSQL, Hasura, and Google Cloud stack.',
      'Built the peer-to-peer exchange, realtime chat, and matching engine.',
      'Built a realtime EOS indexer: Node.js worker threads, binary deserialization, PostgreSQL on Google Cloud.',
      'Built WebAuthn key management for in-browser transaction signing without an external wallet.',
      'Built QR signature requests for partner apps with Supabase subscriptions and webhooks.',
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
    title: 'Software Engineer',
    location: 'Remote',
    type: 'Contract',
    duration: 'Dec 2019 – Jul 2020',
    description:
      'Music-streaming platform with token payments and back-office revenue tools.',
    achievements: [
      'Maintained the React streaming web app.',
      'Built the back office for artist token payments.',
      'Integrated EOS with AWS services for streaming and back-office workloads.',
    ],
    techStack: ['EOS', 'AWS', 'React', 'Styled Components'],
  },
  {
    company: 'EOS Costa Rica',
    type: 'Full-time',
    title: 'Lead Engineer',
    location: 'Hybrid',
    duration: 'Mar 2018 – Jan 2020',
    description:
      'Block producer: EOSIO infrastructure and public and private-chain systems.',
    achievements: [
      'Helped launch EOS mainnet and operated EOSIO validators.',
      'Built a private EOSIO chain for Grant Thornton Labs on Azure, Terraform, EOSIO, and React; shipped an MVP for intercompany transactions and tax workflows using a stablecoin, hashing, and IPFS.',
      'Built the EOS Rate frontend with React and Styled Components.',
      'Ran workshops and community work around TicoBlockchain.cr and CryptoCantina.',
    ],
    techStack: ['EOSIO', 'React', 'Styled Components', 'IPFS'],
  },
  {
    company: 'Knowledge',
    title: 'Software Engineer',
    type: 'Contract',
    location: 'Remote',
    duration: 'Sep 2017 – May 2018',
    description:
      'Tokenized knowledge platform with an ERC-20 token, marketplace, and wallet.',
    achievements: [
      'Deployed an ERC-20 token for an ICO on Ethereum mainnet using Truffle.',
      'Built the marketplace and wallet dashboard with React and Web3.js.',
      'Maintained the mobile trivia game for token rewards.',
    ],
    techStack: ['Ethereum', 'Truffle', 'React', 'Web3.js'],
  },
  {
    company: 'Wink',
    title: 'Lead Engineer',
    type: 'Full-time',
    location: 'On-site',
    duration: 'Apr 2015 – Mar 2018',
    description:
      "Costa Rica's first neobank: React Native app, AWS backend, partner-bank APIs, and biometrics (holawink.com).",
    achievements: [
      'Built the React Native app and AWS backend.',
      'Integrated partner-bank APIs so deposits, transfers, and account data moved through the app.',
      'Built biometric KYC with a React Native native bridge.',
    ],
    techStack: ['React Native', 'React', 'Node.js', 'AWS'],
    pageBreak: true,
  },
  {
    company: 'AMC Networks',
    title: 'Lead UI Engineer',
    type: 'Full-time',
    location: 'Hybrid',
    duration: 'Nov 2012 – Apr 2014',
    description:
      'Interactive streaming movie service YEAH! (SXSW 2013 launch): classic genre films with chapter navigation, in-player extras, and Brightcove.',
    achievements: [
      'Built the interactive movie-player frontend.',
      'Wired Brightcove for streaming, chapter playback, and back-office editing.',
      'Built Facebook identity, sharing, and in-player extras.',
      'Shipped trivia, interviews, and quizzes in the video player.',
      'Shipped curated films with 400+ interactive elements each.',
    ],
    techStack: ['JavaScript', 'Brightcove', 'Facebook API'],
  },
  {
    company: 'American Express',
    title: 'UI Engineer',
    type: 'Full-time',
    location: 'On-site',
    duration: 'Apr 2010 – Nov 2012',
    description:
      'Cardmember and marketing web experiences: responsive UI, experimentation, and analytics.',
    achievements: [
      'Moved the frontend from Dojo to jQuery.',
      'Built credit-card marketing screens: comparison sliders and landing pages.',
      'Wired responsive layouts, A/B testing, and analytics.',
    ],
    techStack: [
      'JavaScript',
      'jQuery',
      'A/B testing tools',
      'Analytics platforms',
    ],
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
