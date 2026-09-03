import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Financial interfaces at American Express',
    paragraphs: [
      'American Express already had a frontend and a marketing machine. I shipped credit-card marketing components, comparison sliders, and landing pages while contributing to the Dojo-to-jQuery migration and running A/B tests inside the analytics stack.',
    ],
    projectSlugs: ['american-express'],
  },
  {
    heading: 'Interactive media at AMC Networks',
    paragraphs: [
      'At AMC the YEAH! launch meant shipping against SXSW 2013 with Brightcove, Facebook, and an internal back-office all in scope.',
    ],
    projectSlugs: ['amc-yeah-tv-facebook-app'],
  },
  {
    heading: 'A private chain for Grant Thornton',
    paragraphs: [
      'At EOS Costa Rica I built a private EOSIO chain for Grant Thornton around intercompany transactions and tax workflows, with a stablecoin, hashing, and IPFS records behind a React client.',
    ],
    projectSlugs: ['eos-costa-rica'],
  },
  {
    heading: 'Regulated banking and retail mobile',
    paragraphs: [
      'Wink depended on partner banks: I coordinated their API integrations and vendors alongside the security work a regulated financial product requires. Tractor Supply was an existing React Native retail app: I introduced TypeScript, improved performance, and built a ViroAR feature for product previews without replacing the app around it.',
    ],
    projectSlugs: ['wink', 'tractor-supply'],
  },
]

export default function InstitutionsExperiencePage() {
  return (
    <CapabilityPage
      title="Institutional software engineering"
      intro={[
        'Inside a large organization the constraint is rarely the technology. It is the systems already running, the people who depend on them, and the rules the company answers to.',
        'The work is adding a real capability without disturbing what the organization already relies on.',
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
