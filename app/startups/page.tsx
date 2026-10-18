import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Building a neobank from its first version',
    paragraphs: [
      "Wink's first version needed a mobile app, a backend, and partner-bank integrations before there was a stack to build them on. I chose React Native and AWS, planned the work, and built the first version of the app and the backend behind it.",
    ],
    projectSlugs: ['wink'],
  },
  {
    heading: 'A launchpad that had to connect before it could expand',
    paragraphs: [
      "Bitlauncher's first version had to connect auctions, wallets, and indexed data before the launchpad could grow. The early scope decision was which boundaries to wire first, so bids, balances, and settlement moved together.",
    ],
    projectSlugs: ['bitlauncher'],
  },
  {
    heading: 'New product surfaces for digital assets',
    paragraphs: [
      'ZTX needed an architecture before the virtual world had a product around it, so I set up the early Next.js, Tailwind, and Framer Motion stack, plus the analytics the team needed to see how people used it.',
      "For RareMint's July 2022 Pokémon mystery-pack drop on Polygon, I built a Moralis-streams indexer on Node.js and PostgreSQL for the NFT data, then moved the marketplace to Next.js SSR for the listing and drop flows.",
    ],
    projectSlugs: ['ztx', 'raremint'],
  },
  {
    heading: 'Specialized AI assistants',
    paragraphs: [
      'At Masterbots I set up the Next.js application structure and trained the team on it, then built the specialized assistant interfaces on top.',
    ],
    projectSlugs: ['masterbots'],
  },
]

export default function StartupsExperiencePage() {
  return (
    <CapabilityPage
      title="Startup product engineering"
      intro={[
        "Early-stage work is mostly deciding what not to build yet. The first version still has to hold, with enough product to learn from and without pretending the full system already exists. I've worked under that constraint on a neobank, a token launchpad, a virtual world, a collectibles marketplace, and specialized AI assistants.",
      ]}
      sections={sections}
      postSlugs={[
        '2026-09-product-engineering',
        '2026-02-engineering-ai-era',
        '2024-10-modern-nextjs-web3-architecture',
        '2026-04-forward-deployed-engineer',
      ]}
      writingTitle="Writing about product engineering"
    />
  )
}

export const metadata = pageMetadata({
  title: 'Startup Product Engineering | Gabo Esquivel',
  description:
    'Startup product engineering across neobank applications, Web3 launchpads, digital-asset marketplaces, virtual worlds, and AI platforms.',
})
