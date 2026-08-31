import { CapabilityPage } from 'components/work/capability-page'
import type { Metadata } from 'next'

const sections = [
  {
    heading: 'Financial interfaces at American Express',
    paragraphs: [
      'At American Express I shipped credit-card marketing components, comparison sliders, and landing pages while contributing to the Dojo-to-jQuery migration and running A/B tests inside the analytics stack.',
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
      'For Grant Thornton I designed a private EOSIO chain around intercompany transactions and tax workflows, with a stablecoin, hashing, IPFS records, and a React client on Azure and Terraform.',
    ],
    projectSlugs: ['eos-costa-rica'],
  },
  {
    heading: 'Regulated banking and retail mobile',
    paragraphs: [
      'At Wink the product depended on partner banks, so I coordinated their API integrations and vendors alongside the security work a regulated financial product requires. On Tractor Supply I worked inside an existing React Native retail app, improving performance and code quality and introducing TypeScript.',
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
        'I have shipped under those conditions at American Express, AMC Networks, Grant Thornton, Wink, and Tractor Supply: adding a real capability without disturbing what the organization already relies on.',
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

export const metadata: Metadata = {
  title: 'Institutional Software Engineering | Gabo Esquivel',
  description:
    'Institutional software engineering for financial services, media, professional services, and retail organizations.',
  openGraph: {
    title: 'Institutional Software Engineering | Gabo Esquivel',
    description:
      'UI at scale, regulated banking, enterprise blockchain, and mobile systems inside established organizations.',
    type: 'website',
  },
}
