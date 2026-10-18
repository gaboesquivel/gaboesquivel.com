import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Financial interfaces at American Express',
    paragraphs: [
      'American Express already had a frontend and a marketing machine, so I worked inside them. I shipped credit-card marketing components, comparison sliders, and landing pages, helped with the Dojo-to-jQuery migration, and ran A/B tests inside the analytics stack.',
    ],
    projectSlugs: ['american-express'],
  },
  {
    heading: 'Interactive media at AMC Networks',
    paragraphs: [
      "AMC's YEAH! launched at SXSW in 2013 with Facebook login required. The frontend I owned had to work with Facebook for identity and sharing, and with Brightcove for streaming, chapter playback, and back-office editing.",
    ],
    projectSlugs: ['amc-yeah-tv-facebook-app'],
  },
  {
    heading: 'A private chain for Grant Thornton',
    paragraphs: [
      'At EOS Costa Rica I built a private EOSIO chain for Grant Thornton: an MVP for intercompany transactions and tax workflows, with a stablecoin, hashing, and IPFS records behind a React client.',
    ],
    projectSlugs: ['eos-costa-rica'],
  },
  {
    heading: 'Regulated banking and retail mobile',
    paragraphs: [
      'Wink depended on partner banks, so I coordinated with their teams and vendors on the API integrations that moved deposits, transfers, and account data through the app.',
      'At Tractor Supply I came in as a consultant on an existing React Native app. I introduced TypeScript, improved performance, and built a ViroAR feature for product previews without replacing anything around it.',
    ],
    projectSlugs: ['wink', 'tractor-supply'],
  },
]

export default function InstitutionsExperiencePage() {
  return (
    <CapabilityPage
      title="Institutional software engineering"
      intro={[
        'Inside a large organization, the constraints come from the systems already running, the people who depend on them, and the rules the company answers to. The work is adding a capability without disturbing what the organization already relies on.',
      ]}
      sections={sections}
      postSlugs={[
        '2026-01-tokenization',
        '2026-01-agentic-commerce',
        '2026-02-engineering-ai-era',
      ]}
      writingTitle="Writing about institutional systems"
    />
  )
}

export const metadata = pageMetadata({
  title: 'Institutional Software Engineering | Gabo Esquivel',
  description:
    'Institutional software engineering for financial services, media, professional services, and retail organizations.',
})
