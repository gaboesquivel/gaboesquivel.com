import { CapabilityPage } from 'components/work/capability-page'
import type { Metadata } from 'next'

const sections = [
  {
    heading: 'Team formation around a banking product',
    paragraphs: [
      "As Lead Engineer at Wink I chose the AWS and React Native architecture, coordinated partner banks, and formed the team that shipped Costa Rica's first neobank.",
    ],
    projectSlugs: ['wink'],
  },
  {
    heading: 'Public infrastructure and enterprise delivery',
    paragraphs: [
      'At EOS Costa Rica I operated validators after the mainnet launch, led Grant Thornton delivery, and ran recruiting, onboarding, and workshops so infrastructure and client work did not sit on one person.',
    ],
    projectSlugs: ['eos-costa-rica'],
  },
  {
    heading: 'Architecture and engineering workflow',
    paragraphs: [
      'At Bitlauncher I introduced an AI-assisted workflow with Claude, v0, Cursor, and SourceryAI, while owning the Next.js, Supabase, and viem architecture, auction contracts, and indexer.',
    ],
    projectSlugs: ['bitlauncher'],
  },
  {
    heading: 'Frontend and exchange ownership',
    paragraphs: [
      'At AMC I led frontend delivery across Brightcove, Facebook, and back-office partners. At Bitcash I owned the exchange UI, matching engine, EOS indexer, and WebAuthn signing as one product.',
    ],
    projectSlugs: ['amc-yeah-tv-facebook-app', 'bitcashbank'],
  },
  {
    heading: 'Technical communities',
    paragraphs: [
      'I founded Costa Rica JS and co-founded AsoBlockchain, running meetups, NodeSchool, TicoBlockchain, and CriptoCantina so technical knowledge could move beyond one person.',
    ],
    projectSlugs: ['costa-rica-js', 'asoblockchain'],
  },
]

export default function TechLeadExperiencePage() {
  return (
    <CapabilityPage
      title="Technical leadership"
      intro={[
        'I lead through product-facing engineering ownership: architecture, team formation, delivery, and the decisions that connect implementation to the product and organization around it.',
        'The evidence spans regulated fintech, interactive media, blockchain infrastructure, exchange systems, AI-assisted engineering workflows, and technical communities.',
      ]}
      sections={sections}
      postSlugs={[
        '2025-03-the-product-engineer',
        '2024-07-adrs-in-software-teams',
        '2025-02-engineering-principles',
      ]}
      writingTitle="Writing about technical leadership"
    />
  )
}

export const metadata: Metadata = {
  title: 'Technical Leadership | Gabo Esquivel',
  description:
    'Technical leadership across team formation, regulated fintech, enterprise blockchain, exchange infrastructure, and engineering workflows.',
  openGraph: {
    title: 'Technical Leadership | Gabo Esquivel',
    description:
      'Architecture, team formation, delivery, and product-facing engineering ownership.',
    type: 'website',
  },
}
