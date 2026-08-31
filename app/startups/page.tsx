import { CapabilityPage } from 'components/work/capability-page'
import type { Metadata } from 'next'

const sections = [
  {
    heading: 'Building a neobank from its first version',
    paragraphs: [
      'At Wink, launch scope included the things that are easy to defer: partner-bank integration, biometric authentication, and a team that did not exist yet. A neobank has no useful version without them.',
    ],
    projectSlugs: ['wink'],
  },
  {
    heading: 'A launchpad across contracts, data, and AI',
    paragraphs: [
      'At Bitlauncher I connected Gnosis auction contracts, a custom EOS EVM indexer, cross-chain wallet and bridge flows, and AI features on one Next.js and Supabase stack.',
    ],
    projectSlugs: ['bitlauncher'],
  },
  {
    heading: 'New product surfaces for digital assets',
    paragraphs: [
      'At ZTX I set up the early Next.js, Tailwind, and Framer Motion architecture for the virtual world, plus the analytics the team needed to see how it was used. At RareMint I indexed NFT data with Moralis streams and wired WalletConnect into the Polygon marketplace for collectible auctions.',
    ],
    projectSlugs: ['ztx', 'raremint'],
  },
  {
    heading: 'Specialized AI assistants',
    paragraphs: [
      'For Masterbots I set up the Next.js architecture, built the specialized assistant interfaces, and trained the team on the AI SDK workflow they would maintain.',
    ],
    projectSlugs: ['masterbots'],
  },
]

export default function StartupsExperiencePage() {
  return (
    <CapabilityPage
      title="Startup product engineering"
      intro={[
        'Early-stage work is mostly deciding what not to build yet. I help founding teams get from an idea to a system that ships, without an architecture that assumes a scale nobody has reached.',
        'That has meant a neobank, a token launchpad, a virtual world, a collectibles marketplace, and a platform for specialized AI assistants.',
      ]}
      sections={sections}
      postSlugs={[
        '2025-03-the-product-engineer',
        '2014-01-developing-software-in-costa-rica',
        '2025-11-1099-contracting',
      ]}
      writingTitle="Writing about product engineering"
    />
  )
}

export const metadata: Metadata = {
  title: 'Startup Product Engineering | Gabo Esquivel',
  description:
    'Startup product engineering across neobank applications, Web3 launchpads, digital-asset marketplaces, virtual worlds, and AI platforms.',
  openGraph: {
    title: 'Startup Product Engineering | Gabo Esquivel',
    description:
      'Early-stage product architecture and delivery across fintech, Web3, and AI.',
    type: 'website',
  },
}
