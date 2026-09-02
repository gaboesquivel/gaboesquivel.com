import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

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
      'At EOS Costa Rica I operated validators after the mainnet launch, led Grant Thornton architecture, built a team around the development-services division, and ran workshops around TicoBlockchain and CryptoCantinaCR.',
    ],
    projectSlugs: ['eos-costa-rica'],
  },
  {
    heading: 'Architecture and a team that already shipped together',
    paragraphs: [
      'At Bitlauncher I owned the architecture: the Next.js and Supabase launchpad, token bridge and auction flows, and the EVM indexer. I built it with the bitcash.org team I have worked with since 2020.',
    ],
    projectSlugs: ['bitlauncher'],
  },
  {
    heading: 'Frontend and exchange ownership',
    paragraphs: [
      'At AMC I owned the frontend architecture between the creative and backend teams. At Bitcash I led the exchange across interface, services, and chain data rather than a single layer.',
    ],
    projectSlugs: ['amc-yeah-tv-facebook-app', 'bitcashbank'],
  },
  {
    heading: 'Technical communities',
    paragraphs: [
      "I founded Costa Rica JS and co-founded AsoBlockchain, running meetups, NodeSchool, TicoBlockchain, and CryptoCantinaCR to move technical knowledge through the region's ecosystem rather than keep it inside one company.",
    ],
    projectSlugs: ['costa-rica-js', 'asoblockchain'],
  },
]

export default function TechLeadExperiencePage() {
  return (
    <CapabilityPage
      title="Technical leadership"
      intro={[
        'I lead while building. The job is to set direction, make the decisions a team or system has to live with, and stay close enough to the code to be accountable for the result.',
      ]}
      sections={sections}
      postSlugs={[
        '2024-07-adrs-in-software-teams',
        '2025-02-engineering-principles',
        '2026-02-engineering-ai-era',
      ]}
      writingTitle="Writing about technical leadership"
    />
  )
}

export const metadata = pageMetadata({
  title: 'Technical Leadership | Gabo Esquivel',
  description:
    'Technical leadership across team formation, regulated fintech, enterprise blockchain, exchange infrastructure, and engineering workflows.',
})
