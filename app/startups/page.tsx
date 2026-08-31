import { CapabilityPage } from 'components/work/capability-page'
import type { Metadata } from 'next'

const sections = [
  {
    heading: 'Building a neobank from its first version',
    paragraphs: [
      "At Wink I shipped Costa Rica's first neobank while integrating partner-bank APIs, building biometric KYC in React Native, and forming the team. Bank integration and security were launch work.",
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
      'At ZTX I built a WebGL wallet connector so EVM state lives inside the virtual-world UI. At RareMint I indexed NFT data with Moralis streams and wired WalletConnect into the Polygon marketplace for collectible auctions.',
    ],
    projectSlugs: ['ztx', 'raremint'],
  },
  {
    heading: 'AI products with operational boundaries',
    paragraphs: [
      'For LegalAgent I shipped voice and chat with RAG plus an admin layer for SSO, documents, and prompt controls. For Masterbots I set up the Next.js architecture, built specialized assistant interfaces, and trained the team on the AI SDK workflow.',
    ],
    projectSlugs: ['masterbots', 'legal-agent'],
  },
]

export default function StartupsExperiencePage() {
  return (
    <CapabilityPage
      title="Startup product engineering"
      intro={[
        'I help early-stage teams turn a product idea into a working system across architecture, interface, data, infrastructure, and delivery.',
        'The goal is a foundation that supports the next decision without overbuilding for an imagined future. The evidence spans regulated fintech, Web3 marketplaces and launchpads, virtual worlds, and production AI.',
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
