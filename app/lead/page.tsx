import { CapabilityPage } from 'components/work/capability-page'
import type { Metadata } from 'next'

const sections = [
  {
    heading: 'Team formation around a banking product',
    paragraphs: [
      'As Lead Engineer at Wink I chose the AWS and React Native stack, planned the project, and recruited the team that shipped it. The architecture decision and the hiring decision were the same decision.',
    ],
    projectSlugs: ['wink'],
  },
  {
    heading: 'Public infrastructure and enterprise delivery',
    paragraphs: [
      'At EOS Costa Rica I operated validators after the mainnet launch, led Grant Thornton delivery, and ran the recruiting, onboarding, and workshops that spread infrastructure and client work across a team.',
    ],
    projectSlugs: ['eos-costa-rica'],
  },
  {
    heading: 'Architecture and engineering workflow',
    paragraphs: [
      'At Bitlauncher I introduced an AI-assisted engineering workflow with Claude, v0.dev, Cursor, and SourceryAI, and owned the architecture it produced.',
    ],
    projectSlugs: ['bitlauncher'],
  },
  {
    heading: 'Frontend and exchange ownership',
    paragraphs: [
      'At AMC I led the frontend team alongside creative and backend partners. At Bitcash I led the exchange as one engagement covering interface, services, and blockchain data rather than a single layer.',
    ],
    projectSlugs: ['amc-yeah-tv-facebook-app', 'bitcashbank'],
  },
  {
    heading: 'Technical communities',
    paragraphs: [
      "I founded Costa Rica JS and co-founded AsoBlockchain, running meetups, NodeSchool, TicoBlockchain, and CriptoCantina to move technical knowledge through the region's ecosystem rather than keep it inside one company.",
    ],
    projectSlugs: ['costa-rica-js', 'asoblockchain'],
  },
]

export default function TechLeadExperiencePage() {
  return (
    <CapabilityPage
      title="Technical leadership"
      intro={[
        'I lead while building. The titles have been Lead UI Engineer and Lead Engineer, but the job has been consistent: own the technical direction and stay close enough to the code to be accountable for it.',
        'That has run from a banking product and the team assembled to ship it, through validator operations and enterprise delivery, to an exchange, an AI-assisted engineering workflow, and two technical communities.',
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
