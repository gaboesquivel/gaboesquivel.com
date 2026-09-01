import type { Metadata } from 'next'
import { type CvExperience, experience } from './experience'

type CvVariant = {
  professionalTitle: string
  summary: string
  highlights: string[]
  skills: { label: string; keywords: string }[]
  featured?: {
    company: string
    description?: string
    achievements?: string[]
  }[]
  also?: string
  metadata: Metadata
}

const fullSkills = [
  {
    label: 'Languages',
    keywords: 'TypeScript, JavaScript, Python, Solidity, SQL',
  },
  {
    label: 'Frontend',
    keywords:
      'React, Next.js, Tailwind, Shadcn UI, React Native, Expo, Tanstack',
  },
  {
    label: 'Backend',
    keywords: 'Node.js, PostgreSQL, Supabase, Prisma, Drizzle, GraphQL',
  },
  {
    label: 'Web3',
    keywords: 'Foundry, Hardhat, Viem, Wagmi, Ponder, Ethers',
  },
  {
    label: 'AI / ML',
    keywords: 'LLMs, AI SDK, RAG, Embeddings, Vector Search, Agent Workflows',
  },
  {
    label: 'Cloud & Infra',
    keywords: 'AWS, GCP, Azure, Docker, Vercel, Pulumi, Terraform, Serverless',
  },
]

const full: CvVariant = {
  professionalTitle: 'Senior Full Stack Engineer',
  summary:
    'I design and ship end-to-end software across full-stack applications, AI, APIs, and onchain integrations. With 15+ years of experience, I help teams turn ideas into market-ready products for web, mobile, and cloud, working closely with engineering, product, and user experience teams. Fluent in English, Spanish, Portuguese, and Italian.',
  highlights: [
    '12+ years building 0→1 products for startups and growth-stage teams',
    'Led engineering for Wink, Costa Rica’s first neobank, from architecture to launch',
    'Delivered full-stack systems in fintech, AI, Web3, marketplaces, and consumer products',
    'Deep crypto experience with smart contracts, tokenized systems, and infrastructure',
  ],
  skills: fullSkills,
  metadata: {
    title: 'Gabo Esquivel - Curriculum Vitae',
    description:
      'Senior Full Stack Engineer (Web3 + AI) with 15+ years in TypeScript, React, Next.js, Node.js, PostgreSQL, EVM, viem, wagmi, LLMs, and RAG.',
    keywords: [
      'software engineer',
      'senior full stack engineer',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Supabase',
      'web3',
      'EVM',
      'viem',
      'wagmi',
      'LLM',
      'RAG',
      'AI SDK',
      'fintech',
      'blockchain',
    ],
    openGraph: {
      title: 'Gabo Esquivel - Curriculum Vitae',
      description:
        'Senior Full Stack Engineer (Web3 + AI) with 15+ years in Web3, AI, and fintech.',
      type: 'profile',
    },
  },
}

const ai: CvVariant = {
  professionalTitle: 'Senior Full Stack Engineer, AI Products',
  summary:
    'I build production AI products: multimodal assistants, retrieval systems, and the tooling teams need to run them after launch. With 15+ years of experience across full-stack applications, APIs, and cloud systems, I ship end-to-end for web and mobile, working closely with engineering, product, and user experience teams. Fluent in English, Spanish, Portuguese, and Italian.',
  highlights: [
    'Shipped a production AI legal assistant with voice, chat, and retrieval in React Native',
    '12+ years building 0→1 products for startups and growth-stage teams',
    'Led engineering for Wink, Costa Rica’s first neobank, from architecture to launch',
  ],
  skills: [
    {
      label: 'Languages',
      keywords: 'TypeScript, JavaScript, Python, SQL',
    },
    {
      label: 'AI / ML',
      keywords:
        'LLMs, OpenAI, AI SDK, RAG, Embeddings, Vector Search, Agent Workflows, Realtime Voice',
    },
    {
      label: 'Frontend',
      keywords:
        'React, Next.js, React Native, Expo, Tailwind, Shadcn UI, Tanstack',
    },
    {
      label: 'Backend',
      keywords: 'Node.js, PostgreSQL, Supabase, Redis, GraphQL',
    },
    {
      label: 'Cloud & Infra',
      keywords: 'AWS, GCP, Vercel, Docker, Serverless',
    },
  ],
  featured: [
    { company: 'LegalAgent' },
    {
      company: 'Bitlauncher',
      description:
        'AI and crypto launchpad, with domain-specific assistants at masterbots.ai.',
      achievements: [
        'Built specialized assistant interfaces for masterbots.ai and integrated AI SDK tooling.',
        'Developed the bitlauncher.ai chatbot with RAG and tool calls for news and video content.',
        'Architected full-stack platform on Next.js 14, Supabase, viem, and wagmi.',
      ],
    },
    {
      company: 'Opyn',
      achievements: [
        'Prototyped LLM-based assistant for onboarding and support.',
        'Architected the Next.js application and built the options trading interface.',
      ],
    },
    {
      company: 'Bitcash',
      achievements: [
        'Architected full-stack platform: React, Vite, Node.js, PostgreSQL, Hasura GraphQL, Google Cloud.',
        'Built peer-to-peer exchange with realtime chat, a backend matching engine, and a realtime EOS indexer.',
      ],
    },
    {
      company: 'Wink',
      achievements: [
        'Led backend architecture, integrations, and security.',
        'Built biometric KYC with React Native native bridge and integrated partner bank APIs.',
      ],
    },
  ],
  also: 'Between those roles I led engineering at EOS Costa Rica (2018–2020), taking part in the EOS mainnet launch and building a private-chain MVP for Grant Thornton Labs, and worked on Emanate’s streaming platform (2019–2020). From 2021 to 2023 I built marketplace and virtual-world products: an NFT indexer and marketplace at RareMint (2021–2022), and a WebGL wallet connector for ZTX (2022–2023). Earlier I led frontend for AMC Networks’ interactive streaming service YEAH! (2012–2014) and built card marketing products at American Express (2010–2012).',
  metadata: {
    title: 'Gabo Esquivel - AI Product Engineering CV',
    description:
      'Senior Full Stack Engineer building production AI products: multimodal voice and chat assistants, RAG, agent workflows, and the tooling behind them.',
    openGraph: {
      title: 'Gabo Esquivel - AI Product Engineering CV',
      description:
        'Production AI product engineering: multimodal assistants, retrieval, and operational tooling.',
      type: 'profile',
    },
  },
}

const web3: CvVariant = {
  professionalTitle: 'Senior Full Stack Engineer, Web3',
  summary:
    'I build the product layer around blockchain systems: wallets, trading interfaces, token flows, indexers, and the services that sit between a chain and the person using it. With 15+ years of experience across full-stack applications, APIs, and cloud systems, I work across EVM networks and Antelope. Fluent in English, Spanish, Portuguese, and Italian.',
  highlights: [
    'Built wallets, bridges, auctions, and trading interfaces across EVM, Arbitrum, Polygon, and Antelope',
    'Developed onchain indexers with Ponder, Moralis streams, and custom WebSocket subscriptions',
    'Led engineering for Wink, Costa Rica’s first neobank, from architecture to launch',
  ],
  skills: [
    {
      label: 'Web3',
      keywords:
        'EVM, Ethereum, Arbitrum, Polygon, Solidity, Foundry, Hardhat, Viem, Wagmi, Ethers, Ponder, WalletConnect, EOSIO, IPFS',
    },
    {
      label: 'Languages',
      keywords: 'TypeScript, JavaScript, Solidity, SQL',
    },
    {
      label: 'Frontend',
      keywords: 'React, Next.js, Remix, React Native, Tailwind, Shadcn UI',
    },
    {
      label: 'Backend',
      keywords: 'Node.js, PostgreSQL, Supabase, Hasura GraphQL, Redis',
    },
    {
      label: 'Cloud & Infra',
      keywords: 'AWS, GCP, Vercel, Docker, Alchemy, Trigger.dev',
    },
  ],
  featured: [
    { company: 'Bitlauncher' },
    {
      company: 'Opyn',
      achievements: [
        'Architected the Next.js application and built the options trading interface.',
        'Integrated protocol and Arbitrum testnet with viem and wagmi.',
        'Indexed onchain data with Ponder, PostgreSQL, and Supabase.',
      ],
    },
    {
      company: 'ZTX',
      achievements: [
        'Implemented WebGL EVM wallet connector with Ethers.js and a custom JavaScript event system.',
        'Owned React architecture on Next.js with Tailwind CSS and Framer Motion.',
      ],
    },
    {
      company: 'RareMint',
      achievements: [
        'Built NFT indexer using Moralis streams, Node.js, and PostgreSQL.',
        'Improved marketplace responsiveness with Remix, Tailwind CSS, and GraphQL.',
        'Integrated WalletConnect and supported launch of first Pokémon card auctions on Polygon.',
      ],
    },
    {
      company: 'Bitcash',
      achievements: [
        'Architected full-stack platform: React, Vite, Node.js, PostgreSQL, Hasura GraphQL, Google Cloud.',
        'Built peer-to-peer exchange, realtime chat, and backend matching engine.',
        'Developed a realtime EOS indexer and WebAuthn key management for in-browser signing.',
      ],
    },
  ],
  also: 'In 2025 I built an AI legal assistant at LegalAgent with voice, chat, and retrieval. Earlier chain work includes EOS Costa Rica (2018–2020), where I led engineering through the EOS mainnet launch and built a private-chain MVP for Grant Thornton Labs; Emanate (2019–2020), integrating EOS with AWS services; and Knowledge (2017–2018), deploying an ERC-20 token for an ICO and building its marketplace and wallet dashboard. Alongside Bitcash I created ChainGraph, an open-source GraphQL toolkit for indexing Antelope chains. I came to this through financial systems at Wink (2015–2018) and American Express (2010–2012), with frontend leadership at AMC Networks (2012–2014) between them.',
  metadata: {
    title: 'Gabo Esquivel - Web3 Engineering CV',
    description:
      'Senior Full Stack Engineer building Web3 products: wallets, token bridges, auctions, trading interfaces, and onchain indexers across EVM and Antelope.',
    openGraph: {
      title: 'Gabo Esquivel - Web3 Engineering CV',
      description:
        'Wallets, token flows, auctions, trading interfaces, and onchain indexers across EVM and Antelope.',
      type: 'profile',
    },
  },
}

const fullstack: CvVariant = {
  professionalTitle: 'Senior Full Stack Engineer',
  summary:
    'I design and ship end-to-end software across full-stack applications, mobile apps, APIs, and cloud systems. With 15+ years of experience, I help teams turn ideas into market-ready products for web, mobile, and cloud, working closely with engineering, product, and user experience teams. Fluent in English, Spanish, Portuguese, and Italian.',
  highlights: [
    '12+ years building 0→1 products for startups and growth-stage teams',
    'Led engineering for Wink, Costa Rica’s first neobank, from architecture to launch',
    'Shipped mobile, web, and admin systems together with the services and data behind them',
  ],
  skills: [
    {
      label: 'Languages',
      keywords: 'TypeScript, JavaScript, Python, SQL',
    },
    {
      label: 'Frontend',
      keywords:
        'React, Next.js, Remix, React Native, Expo, Tailwind, Shadcn UI, Tanstack',
    },
    {
      label: 'Backend',
      keywords:
        'Node.js, PostgreSQL, Supabase, Prisma, Drizzle, GraphQL, Redis',
    },
    {
      label: 'Cloud & Infra',
      keywords:
        'AWS, GCP, Azure, Docker, Vercel, Pulumi, Terraform, Serverless',
    },
    {
      label: 'AI & Web3',
      keywords: 'LLMs, AI SDK, RAG, EVM, Viem, Wagmi, Solidity',
    },
  ],
  featured: [
    {
      company: 'LegalAgent',
      achievements: [
        'Delivered multimodal AI assistant (voice and chat) in React Native (Expo).',
        'Built admin dashboard with Microsoft SSO and document management.',
        'Implemented RAG architecture for contextual legal support and document summarization.',
      ],
    },
    {
      company: 'Bitlauncher',
      achievements: [
        'Architected full-stack platform on Next.js 14, Supabase, viem, and wagmi.',
        'Built token bridge and auction flows with wallet UX and realtime balance updates.',
        'Implemented transaction data indexing with Supabase for querying, subscriptions, and analytics.',
      ],
    },
    {
      company: 'Bitcash',
      achievements: [
        'Architected full-stack platform: React, Vite, Node.js, PostgreSQL, Hasura GraphQL, Google Cloud.',
        'Built peer-to-peer exchange, realtime chat, and backend matching engine.',
        'Implemented WebAuthn-based key management for in-browser transaction signing without external wallet apps.',
      ],
    },
    {
      company: 'Wink',
      achievements: [
        'Led backend architecture, integrations, and security.',
        'Built biometric KYC with React Native native bridge.',
        'Integrated partner bank APIs and coordinated partner banks and vendors.',
      ],
    },
    {
      company: 'AMC Networks',
      achievements: [
        'Led frontend team with creative and backend partners.',
        'Built interactive video streaming frontend for Facebook application.',
        'Implemented back-office with Brightcove integration.',
      ],
    },
  ],
  also: 'Between 2017 and 2023 I worked mostly on blockchain products: Knowledge (2017–2018), EOS Costa Rica (2018–2020) as lead engineer, Emanate (2019–2020), an NFT marketplace and indexer at RareMint (2021–2022), and the ZTX virtual world (2022–2023). More recently I built the trading interface and onchain data layer for Opyn (2024–2025). I started out at American Express (2010–2012), working on card marketing products and the migration from Dojo to jQuery.',
  metadata: {
    title: 'Gabo Esquivel - Full-Stack Engineering CV',
    description:
      'Senior Full Stack Engineer with 15+ years shipping web and mobile products end to end: TypeScript, React, React Native, Next.js, Node.js, PostgreSQL, and cloud.',
    openGraph: {
      title: 'Gabo Esquivel - Full-Stack Engineering CV',
      description:
        'End-to-end product engineering across interfaces, application services, data, and infrastructure.',
      type: 'profile',
    },
  },
}

const cvVariants = { full, ai, web3, fullstack }

const focusKeys = ['ai', 'web3', 'fullstack'] as const

export const cvFocusItems = [
  { id: 'ai', href: '/cv?focus=ai', label: 'AI' },
  { id: 'web3', href: '/cv?focus=web3', label: 'Web3' },
  { id: 'fullstack', href: '/cv?focus=fullstack', label: 'Full-stack' },
  { id: 'full', href: '/cv', label: 'Full' },
]

// Featured roles declare companies only. Render order comes from the
// experience array so a variant can never reorder the employment record.
const selectEntries = ({ variant }: { variant: CvVariant }): CvExperience[] => {
  const { featured } = variant
  if (!featured) return experience

  return experience.flatMap((entry) => {
    const override = featured.find((role) => role.company === entry.company)
    return override ? [{ ...entry, ...override, pageBreak: false }] : []
  })
}

export const resolveCv = ({ focus }: { focus?: string | string[] }) => {
  const value = Array.isArray(focus) ? focus[0] : focus
  const key = focusKeys.find((focusKey) => focusKey === value) ?? 'full'
  const variant = cvVariants[key]

  return { key, variant, entries: selectEntries({ variant }) }
}
