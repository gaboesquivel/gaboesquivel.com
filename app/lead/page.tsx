import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Forming a team around a product that did not exist yet',
    paragraphs: [
      "As Lead Engineer at Wink I chose the AWS and React Native stack, planned the work, and recruited the team that shipped Costa Rica's first neobank. The product and the team had to be built together.",
    ],
    projectSlugs: ['wink'],
  },
  {
    heading: 'Owning product and technical direction while staying in the code',
    paragraphs: [
      'At Bitlauncher I owned product and technical direction and coordinated delivery across a small engineering team, remaining responsible for the architecture and the work shipped through it.',
    ],
    projectSlugs: ['bitlauncher'],
  },
  {
    heading: 'Holding architecture across client, services, and chain data',
    paragraphs: [
      'At AMC I owned the frontend architecture between the creative and backend teams. At Bitcash I led the exchange across interface, services, and chain data so matching, signing, and indexed state stayed one system.',
    ],
    projectSlugs: ['amc-yeah-tv-facebook-app', 'bitcashbank'],
  },
  {
    heading: 'Delivery inside an existing institution',
    paragraphs: [
      "At EOS Costa Rica I operated validators after the mainnet launch, built Grant Thornton's private EOSIO chain, and formed a team around the development-services division that had to deliver under institutional constraints.",
    ],
    projectSlugs: ['eos-costa-rica'],
  },
  {
    heading: 'Technical communities',
    paragraphs: [
      "I founded Costa Rica JS and co-founded AsoBlockchain to move technical knowledge through the region's ecosystem rather than keep it inside one company.",
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
    'Technical leadership across team formation, product direction, system architecture, and institutional delivery.',
})
