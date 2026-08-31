import { CapabilityPage } from 'components/work/capability-page'
import type { Metadata } from 'next'

const sections = [
  {
    heading: 'AI products across mobile, web, and data',
    paragraphs: [
      'For LegalAgent I built the Expo voice and chat assistant, RAG for case and document context, and a TanStack Start admin with Microsoft SSO, document management, and prompt controls. The mobile product and the tools to run it ship as one system.',
    ],
    projectSlugs: ['legal-agent'],
  },
  {
    heading: 'Protocols, indexers, and trading interfaces',
    paragraphs: [
      'At Bitlauncher I indexed EOS EVM events and wired Gnosis auction bidding, token bridges, and wallet balances through Supabase and wagmi. At Opyn I built the Next.js trading interface on Ponder-indexed Arbitrum data so balances, bids, and positions come from the same event model.',
    ],
    projectSlugs: ['bitlauncher', 'opyn'],
  },
  {
    heading: 'Regulated products and exchange infrastructure',
    paragraphs: [
      "At Wink I led the AWS backend, partner-bank APIs, and biometric KYC behind Costa Rica's first neobank mobile app. At Bitcash I architected the exchange UI, matching engine, WebAuthn signing, and a realtime EOS indexer so trading, chat, and signing share one service model.",
    ],
    projectSlugs: ['wink', 'bitcashbank'],
  },
]

export default function FullstackExperiencePage() {
  return (
    <CapabilityPage
      title="Full-stack product engineering"
      intro={[
        'I ship complete products across interface, application, data, infrastructure, and integration boundaries. I use TypeScript, React, React Native, Next.js, Node.js, PostgreSQL, and cloud services when they fit the system rather than treating the stack as the product.',
        'The strongest full-stack work is visible in the connections: a mobile assistant and its administration tools, a trading interface and its indexer, or a banking application and the services behind it.',
      ]}
      sections={sections}
      postSlugs={[
        '2024-07-viem-wagmi-ethers',
        '2024-10-modern-nextjs-web3-architecture',
        '2026-02-engineering-ai-era',
      ]}
      writingTitle="Writing about product systems"
    />
  )
}

export const metadata: Metadata = {
  title: 'Full-Stack Product Engineering | Gabo Esquivel',
  description:
    'End-to-end product engineering across AI assistants, token launchpads, trading interfaces, neobank infrastructure, and exchange systems.',
  openGraph: {
    title: 'Full-Stack Product Engineering | Gabo Esquivel',
    description:
      'End-to-end product engineering across interfaces, application services, data, infrastructure, and integrations.',
    type: 'website',
  },
}
