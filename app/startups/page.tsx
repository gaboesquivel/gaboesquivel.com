import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Building a neobank from its first version',
    paragraphs: [
      "I built Wink's first React Native app and AWS backend, integrated the partner-bank APIs, and implemented biometric authentication. Launch also meant choosing the stack and recruiting the team that would operate it.",
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
      'ZTX needed an architecture before the virtual world had a product around it. I set up the early Next.js, Tailwind, and Framer Motion stack, plus the analytics the team needed to see how it was used.',
      'RareMint needed indexed NFT data and a wallet path into auctions. I built a Moralis-streams indexer and wired WalletConnect into the Polygon marketplace.',
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
        'Early-stage work is mostly deciding what not to build yet. At Wink the first version still had to include partner-bank APIs, biometric authentication, and a team that did not exist yet.',
        'The same constraint showed up in a token launchpad, a virtual world, a collectibles marketplace, and specialized AI assistants.',
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

export const metadata = pageMetadata({
  title: 'Startup Product Engineering | Gabo Esquivel',
  description:
    'Startup product engineering across neobank applications, Web3 launchpads, digital-asset marketplaces, virtual worlds, and AI platforms.',
})
