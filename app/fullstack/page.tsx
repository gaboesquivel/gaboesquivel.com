import { Prose } from 'components/shared/page-layout'
import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'
import Link from 'next/link'

const sections = [
  {
    heading: 'AI products across mobile, web, and data',
    paragraphs: [
      'LegalAgent is two clients against one system: an Expo assistant for lawyers and a TanStack Start admin for the team maintaining its sources. I built both, which is why its retrieval categories and prompts are editable rather than hardcoded.',
    ],
    projectSlugs: ['legal-agent'],
  },
  {
    heading: 'Token flows across contracts, data, and interface',
    paragraphs: [
      'At Bitlauncher the token bridge was the full-stack problem: swapping USDT, USDC, and BITUSD into the token used for bidding touches contracts, indexed events, wallet balances, and the bidding interface at once.',
    ],
    projectSlugs: ['bitlauncher'],
  },
  {
    heading: 'Regulated products and exchange infrastructure',
    paragraphs: [
      'The pairing is the same in both cases: a visible client, and the system that makes it real. At Wink the React Native app sat on a serverless AWS backend I also owned, where account behavior, security, and partner-bank APIs actually lived. At Bitcash the exchange UI sat on a React, Node.js, PostgreSQL, Hasura, and Google Cloud stack I architected, including the matching engine and realtime chat.',
    ],
    projectSlugs: ['wink', 'bitcashbank'],
  },
]

export default function FullstackExperiencePage() {
  return (
    <CapabilityPage
      title="Full-stack product engineering"
      intro={[
        'A mobile assistant and the admin tools behind it. A trading interface and its indexer. A banking app and the partner integrations it depends on. My full-stack work tends to be the pairing rather than one layer of it.',
        'The interesting decisions are about boundaries: what becomes a service, what stays in the client, and what nobody downstream should have to think about twice.',
      ]}
      sections={sections}
      postSlugs={[
        '2024-07-viem-wagmi-ethers',
        '2024-10-modern-nextjs-web3-architecture',
        '2026-02-engineering-ai-era',
      ]}
      writingTitle="Writing about product systems"
    >
      <Prose>
        The employment record behind this work is the{' '}
        <Link href="/cv?focus=fullstack" className="prose-link">
          full-stack CV
        </Link>
        .
      </Prose>
    </CapabilityPage>
  )
}

export const metadata = pageMetadata({
  title: 'Full-Stack Product Engineering | Gabo Esquivel',
  description:
    'End-to-end product engineering across AI assistants, token launchpads, trading interfaces, neobank infrastructure, and exchange systems.',
})
