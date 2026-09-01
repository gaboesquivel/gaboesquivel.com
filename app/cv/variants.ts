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
    label: 'AI / ML',
    keywords: 'LLMs, AI SDK, RAG, Embeddings, Vector Search, Agent Workflows',
  },
  {
    label: 'Web3',
    keywords: 'Foundry, Hardhat, Viem, Wagmi, Ponder, Ethers',
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
    label: 'Cloud & Infra',
    keywords: 'AWS, GCP, Azure, Docker, Vercel, Pulumi, Terraform, Serverless',
  },
]

const full: CvVariant = {
  professionalTitle: 'Senior Product Engineer',
  summary:
    'I build software products where the interface, the services, and the model or chain underneath have to work as one thing. Recent work is production AI assistants and the product layer around blockchain systems. 15+ years across TypeScript, React, Next.js, and cloud. Fluent in English, Spanish, Portuguese, and Italian.',
  highlights: [
    'Shipped a production AI legal assistant with voice, chat, and retrieval in React Native',
    'Built wallets, token flows, auctions, and trading interfaces across EVM and Antelope',
    'Led engineering for Wink, Costa Rica’s first neobank, from architecture to launch',
  ],
  skills: fullSkills,
  featured: [
    { company: 'LegalAgent' },
    {
      company: 'Bitlauncher',
      achievements: [
        'Built the launchpad on Next.js 14, Supabase, viem, and wagmi.',
        'Built token bridge and auction flows with wallet UX and realtime balance updates.',
        'Integrated AI SDKs and prompting for masterbots.ai.',
      ],
    },
    {
      company: 'Opyn',
      achievements: [
        'Built the Next.js 14 trading interface with React Server Components.',
        'Indexed onchain data with Ponder, PostgreSQL, and Supabase.',
        'Prototyped an LLM assistant for onboarding and support.',
      ],
    },
    {
      company: 'Bitcash',
      achievements: [
        'Built the React, Vite, Node.js, PostgreSQL, Hasura, and Google Cloud stack.',
        'Built the peer-to-peer exchange, realtime chat, and matching engine.',
        'Built WebAuthn key management for in-browser transaction signing without an external wallet.',
      ],
    },
    { company: 'Wink' },
  ],
  also: 'From 2021 to 2023 I built marketplace and virtual-world products: an NFT indexer and marketplace at RareMint (2021–2022), and a WebGL wallet connector for ZTX (2022–2023). Earlier chain work includes EOS Costa Rica (2018–2020), where I led engineering through the EOS mainnet launch and built a private-chain MVP for Grant Thornton Labs; Emanate (2019–2020); and Knowledge (2017–2018), deploying an ERC-20 token and its marketplace. I led frontend for AMC Networks’ interactive streaming service YEAH! (2012–2014) and built card marketing products at American Express (2010–2012).',
  metadata: {
    title: 'Gabo Esquivel - Curriculum Vitae',
    description:
      'Product engineering across production AI assistants and the product layer around blockchain systems.',
    keywords: [
      'software engineer',
      'senior product engineer',
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
        'Product engineering across production AI assistants and the product layer around blockchain systems.',
      type: 'profile',
    },
  },
}

const ai: CvVariant = {
  professionalTitle: 'Senior Full Stack Engineer, AI Products',
  summary:
    'I build production AI products: voice and chat assistants, retrieval, and the admin tools a team needs to run them after launch. 15+ years across TypeScript, React Native, Next.js, and cloud. Fluent in English, Spanish, Portuguese, and Italian.',
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
        'Built specialized assistant interfaces for masterbots.ai.',
        'Built the bitlauncher.ai chatbot with RAG and tool calls for news and video.',
        'Built the launchpad on Next.js 14, Supabase, viem, and wagmi.',
      ],
    },
    {
      company: 'Opyn',
      achievements: [
        'Prototyped an LLM assistant for onboarding and support.',
        'Built the Next.js 14 trading interface with React Server Components.',
        'Indexed onchain data with Ponder, PostgreSQL, and Supabase.',
      ],
    },
    {
      company: 'Bitcash',
      achievements: [
        'Built the React, Vite, Node.js, PostgreSQL, Hasura, and Google Cloud stack.',
        'Built the peer-to-peer exchange, realtime chat, and matching engine.',
        'Built WebAuthn key management for in-browser transaction signing without an external wallet.',
      ],
    },
    { company: 'Wink' },
  ],
  also: 'Between those roles I led engineering at EOS Costa Rica (2018–2020) through the EOS mainnet launch and a private-chain MVP for Grant Thornton Labs, and worked on Emanate’s streaming platform (2019–2020). From 2021 to 2023 I built an NFT indexer and marketplace at RareMint (2021–2022) and a WebGL wallet connector for ZTX (2022–2023). Earlier I led frontend for AMC Networks’ YEAH! (2012–2014) and built card marketing products at American Express (2010–2012).',
  metadata: {
    title: 'Gabo Esquivel - AI Product Engineering CV',
    description:
      'Production AI products: voice and chat assistants, retrieval, and the admin tools to run them after launch.',
    openGraph: {
      title: 'Gabo Esquivel - AI Product Engineering CV',
      description:
        'Voice and chat assistants, retrieval, and the admin tools a team needs after launch.',
      type: 'profile',
    },
  },
}

const web3: CvVariant = {
  professionalTitle: 'Senior Full Stack Engineer, Web3',
  summary:
    'I build the product layer around blockchain systems: wallets, trading interfaces, token flows, indexers, and the services that sit between a chain and the person using it. 15+ years across EVM networks and Antelope. Fluent in English, Spanish, Portuguese, and Italian.',
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
    {
      company: 'Bitlauncher',
      achievements: [
        'Built the launchpad on Next.js 14, Supabase, viem, and wagmi.',
        'Built token bridge flows for USDT, USDC, and BITUSD into protocol tokens.',
        'Integrated Gnosis auction contracts with wallet UX and realtime balance updates.',
        'Built a custom EVM indexer using WebSocket event subscriptions.',
      ],
    },
    {
      company: 'Opyn',
      achievements: [
        'Built the Next.js 14 trading interface with React Server Components.',
        'Integrated the protocol and Arbitrum testnet with viem and wagmi.',
        'Indexed onchain data with Ponder, PostgreSQL, and Supabase.',
      ],
    },
    {
      company: 'ZTX',
      achievements: [
        'Built a WebGL EVM wallet connector with Ethers.js and a custom JavaScript event system.',
        'Set up the Next.js app that hosted the virtual world, with Tailwind and Framer Motion.',
        'Wired signing and NFT trading so the wallet session lived inside WebGL.',
      ],
    },
    {
      company: 'RareMint',
      achievements: [
        'Built an NFT indexer with Moralis streams, Node.js, and PostgreSQL.',
        'Improved marketplace responsiveness with Remix, Tailwind CSS, and GraphQL.',
        'Integrated WalletConnect and supported the first Pokémon card auctions on Polygon.',
      ],
    },
    {
      company: 'Bitcash',
      achievements: [
        'Built the React, Vite, Node.js, PostgreSQL, Hasura, and Google Cloud stack.',
        'Built the peer-to-peer exchange, realtime chat, and matching engine.',
        'Built a realtime EOS indexer with Node.js worker threads, binary deserialization, and PostgreSQL.',
        'Built WebAuthn key management for in-browser transaction signing without an external wallet.',
      ],
    },
  ],
  also: 'In 2025 I built an AI legal assistant at LegalAgent with voice, chat, and retrieval. Earlier chain work includes EOS Costa Rica (2018–2020), through the EOS mainnet launch and a private-chain MVP for Grant Thornton Labs; Emanate (2019–2020), integrating EOS with AWS; and Knowledge (2017–2018), an ERC-20 token, marketplace, and wallet dashboard. Alongside Bitcash I created ChainGraph, an open-source GraphQL toolkit for indexing Antelope chains. I led engineering at Wink (2015–2018), led frontend for AMC Networks (2012–2014), and built card marketing products at American Express (2010–2012).',
  metadata: {
    title: 'Gabo Esquivel - Web3 Engineering CV',
    description:
      'Wallets, token bridges, auctions, trading interfaces, and onchain indexers across EVM and Antelope.',
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
    'I build the interface and the services behind it, on web and mobile. 15+ years across TypeScript, React, React Native, Next.js, Node.js, PostgreSQL, and cloud. Fluent in English, Spanish, Portuguese, and Italian.',
  highlights: [
    '12+ years building 0→1 products for startups and growth-stage teams',
    'Led engineering for Wink, Costa Rica’s first neobank, from architecture to launch',
    'Shipped LegalAgent as an Expo assistant and a TanStack Start admin on one retrieval system',
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
        'Shipped a voice and chat assistant in React Native (Expo).',
        'Built RAG for case context and document summaries.',
        'Built the TanStack Start admin with Microsoft SSO, document management, and retrieval categories.',
      ],
    },
    {
      company: 'Bitlauncher',
      achievements: [
        'Built the launchpad on Next.js 14, Supabase, viem, and wagmi.',
        'Built token bridge and auction flows with wallet UX and realtime balance updates.',
        'Built transaction indexing with Supabase for queries, subscriptions, and analytics.',
      ],
    },
    {
      company: 'Bitcash',
      achievements: [
        'Built the React, Vite, Node.js, PostgreSQL, Hasura, and Google Cloud stack.',
        'Built the peer-to-peer exchange, realtime chat, and matching engine.',
        'Built WebAuthn key management for in-browser transaction signing without an external wallet.',
      ],
    },
    { company: 'Wink' },
    {
      company: 'AMC Networks',
      achievements: [
        'Built the interactive movie-player frontend.',
        'Wired Brightcove for streaming, chapter playback, and back-office editing.',
        'Built Facebook identity, sharing, and in-player extras.',
      ],
    },
  ],
  also: 'Between 2017 and 2023 I worked on blockchain products: Knowledge (2017–2018), EOS Costa Rica (2018–2020) as lead engineer, Emanate (2019–2020), an NFT marketplace and indexer at RareMint (2021–2022), and the ZTX virtual world (2022–2023). More recently I built the trading interface and onchain data layer for Opyn (2024–2025). At American Express (2010–2012) I built card marketing products and moved a frontend from Dojo to jQuery.',
  metadata: {
    title: 'Gabo Esquivel - Full-Stack Engineering CV',
    description:
      'The interface and the services behind it, on web and mobile: TypeScript, React, React Native, Next.js, Node.js, PostgreSQL, and cloud.',
    openGraph: {
      title: 'Gabo Esquivel - Full-Stack Engineering CV',
      description:
        'The interface and the services behind it, on web and mobile.',
      type: 'profile',
    },
  },
}

const cvVariants = { full, ai, web3, fullstack }

export const cvKeys = ['full', 'ai', 'web3', 'fullstack'] as const
export type CvKey = (typeof cvKeys)[number]

export const cvPath = ({ key }: { key: CvKey }) =>
  key === 'full' ? '/cv' : `/cv?focus=${key}`

export const cvPdfFile = ({ key }: { key: CvKey }) =>
  key === 'full' ? 'gaboesquivel-cv.pdf' : `gaboesquivel-cv-${key}.pdf`

const focusKeys = cvKeys.filter(
  (key): key is Exclude<CvKey, 'full'> => key !== 'full',
)

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
