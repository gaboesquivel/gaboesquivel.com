import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Building a neobank from its first version',
    paragraphs: [
      'At Wink the first version still had to ship, but the stack and the team did not exist yet. I chose React Native and AWS, planned the work, and recruited the people who would operate it.',
    ],
    projectSlugs: ['wink'],
  },
  {
    heading: 'A launchpad that had to connect before it could expand',
    paragraphs: [
      "Bitlauncher's first version had to connect auctions, wallets, and indexed data without boiling the ocean. The constraint was which boundaries to wire first so bids, balances, and settlement could move together.",
    ],
    projectSlugs: ['bitlauncher'],
  },
  {
    heading: 'New product surfaces for digital assets',
    paragraphs: [
      'ZTX needed an architecture before the virtual world had a product around it. I set up the early Next.js, Tailwind, and Framer Motion stack, plus the analytics the team needed to see how it was used.',
      "RareMint's auctions could not run on raw chain reads. The indexer had to exist first so the marketplace had NFT events to act on.",
    ],
    projectSlugs: ['ztx', 'raremint'],
  },
  {
    heading: 'Specialized AI assistants',
    paragraphs: [
      'For Masterbots the 0→1 problem was leaving a team that could maintain the assistants. I trained them on the AI SDK workflow they would keep running after the interfaces shipped.',
    ],
    projectSlugs: ['masterbots'],
  },
]

export default function StartupsExperiencePage() {
  return (
    <CapabilityPage
      title="Startup product engineering"
      intro={[
        'Early-stage work is mostly deciding what not to build yet. The first version still has to hold: enough product to learn from, without pretending the full system already exists.',
        'That constraint showed up in a neobank, a token launchpad, a virtual world, a collectibles marketplace, and specialized AI assistants.',
      ]}
      sections={sections}
      postSlugs={[
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
