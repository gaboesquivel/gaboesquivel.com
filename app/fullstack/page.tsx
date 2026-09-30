import { Prose } from 'components/shared/page-layout'
import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'
import Link from 'next/link'

const sections = [
  {
    heading: 'AI products across mobile, web, and data',
    paragraphs: [
      'LegalAgent runs two clients against one system: an Expo assistant for attorneys and a TanStack Start admin where the team manages Microsoft SSO access, system prompts, and the document categories retrieval draws from. I built both sides of that boundary.',
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
      'At Wink the React Native app sat on a serverless AWS backend I also built, where partner-bank APIs moved deposits, transfers, and account data. At Bitcash the exchange UI sat on a React, Node.js, PostgreSQL, Hasura, and Google Cloud stack I architected, including the matching engine and realtime chat.',
    ],
    projectSlugs: ['wink', 'bitcashbank'],
  },
]

export default function FullstackExperiencePage() {
  return (
    <CapabilityPage
      title="Full-stack product engineering"
      intro={[
        'My full-stack work tends to pair a visible client with the system that makes it real: a mobile assistant and the admin behind it, an exchange and its matching engine, a banking app and the partner integrations it depends on.',
        'The decisions that matter sit on the boundaries between them, where I choose what becomes a service, what stays in the client, and what nobody downstream should have to think about twice.',
      ]}
      sections={sections}
      postSlugs={[
        '2026-09-product-engineering',
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
    'Full-stack product engineering that pairs clients with the systems behind them: an AI assistant and its admin, a token bridge, a neobank backend, and an exchange.',
})
