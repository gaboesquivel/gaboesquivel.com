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
      'At AMC I led the YEAH! Facebook frontend across Brightcove streaming, Facebook integration, and a back-office, shipping in-player trivia, interviews, and quizzes.',
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
      'At Wink I integrated partner-bank APIs and biometric KYC inside a regulated neobank mobile app. On Tractor Supply I added ViroAR product previews and React Native performance work inside an existing retail application.',
    ],
    projectSlugs: ['wink', 'tractor-supply'],
  },
]

export default function InstitutionsExperiencePage() {
  return (
    <CapabilityPage
      title="Institutional software engineering"
      intro={[
        'I deliver software inside financial services, media, professional services, and retail organizations where scale, regulation, existing systems, and multiple stakeholders shape the architecture.',
        'The engineering goal is controlled change: introduce a useful capability while preserving the security, reliability, data, and operational boundaries the organization depends on.',
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
