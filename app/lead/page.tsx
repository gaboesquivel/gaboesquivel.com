import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Forming a team around a product that did not exist yet',
    paragraphs: [
      "Launching Wink, Costa Rica's first neobank, meant forming a development team that didn't exist yet. As Lead Engineer I put that team together while I built the React Native app and AWS backend it would work on.",
    ],
    projectSlugs: ['wink'],
  },
  {
    heading: 'Owning product and technical direction while staying in the code',
    paragraphs: [
      'At Bitlauncher I owned product and technical direction for a team of two full-time developers and up to five part-time contributors working on specific tickets. I coordinated delivery and stayed hands-on across the stack, responsible for both the architecture and the work shipped through it.',
    ],
    projectSlugs: ['bitlauncher'],
  },
  {
    heading: 'Holding architecture across client, services, and chain data',
    paragraphs: [
      'At AMC I owned the frontend architecture between the creative and backend teams. At Bitcash I led the exchange across interface, services, and chain data, so matching, signing, and indexed state stayed one system.',
    ],
    projectSlugs: ['amc-yeah-tv-facebook-app', 'bitcashbank'],
  },
  {
    heading: 'Validators, a private chain, and onboarding engineers',
    paragraphs: [
      "At EOS Costa Rica I helped launch the EOS mainnet and operated validators, built Grant Thornton's private EOSIO chain, and onboarded engineers through workshops around TicoBlockchain.cr and CryptoCantinaCR.",
    ],
    projectSlugs: ['eos-costa-rica'],
  },
  {
    heading: 'Technical communities',
    paragraphs: [
      "Outside the companies I worked for, I founded Costa Rica JS and co-founded AsoBlockchain so technical knowledge could move through the region's ecosystem instead of staying inside one employer.",
    ],
    projectSlugs: ['costa-rica-js', 'asoblockchain'],
  },
]

export default function TechLeadExperiencePage() {
  return (
    <CapabilityPage
      title="Technical leadership"
      intro={[
        'I lead from inside the code. That means setting direction, making the architecture decisions a team has to live with, and staying close enough to the implementation to answer for what ships.',
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
