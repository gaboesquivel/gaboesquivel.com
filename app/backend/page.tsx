import { CapabilityPage } from 'components/work/capability-page'
import type { Metadata } from 'next'

const sections = [
  {
    heading: 'Blockchain data and realtime APIs',
    paragraphs: [
      'I built ChainGraph as a GraphQL subscription toolkit for indexing and streaming EOSIO and Antelope data. At Bitlauncher I built a custom EOS EVM indexer with WebSocket event subscriptions and Supabase for queries, aggregation, and realtime feeds.',
    ],
    projectSlugs: ['chaingraph', 'bitlauncher'],
  },
  {
    heading: 'Exchange and protocol services',
    paragraphs: [
      'At Bitcash I built the matching engine, Hasura GraphQL APIs, WebAuthn signing path, and a realtime EOS indexer with worker threads and binary deserialization. At Opyn I ran Ponder over PostgreSQL so the trading interface reads indexed protocol state instead of reconstructing it in the client.',
    ],
    projectSlugs: ['bitcashbank', 'opyn'],
  },
  {
    heading: 'Retrieval and application services',
    paragraphs: [
      'For LegalAgent I implemented RAG as an application service with Microsoft SSO, document operations, prompt controls, and retrieval categories behind the Expo assistant.',
    ],
    projectSlugs: ['legal-agent'],
  },
]

export default function BackendExperiencePage() {
  return (
    <CapabilityPage
      title="Backend engineering"
      intro={[
        'I build APIs, indexers, realtime data systems, and application services where correctness, security, and operability affect the product directly.',
        'The backend can be a GraphQL layer over blockchain events, exchange infrastructure with browser signing, or a retrieval system behind a voice assistant. I choose boundaries around the data and product behavior the system has to support.',
      ]}
      sections={sections}
      postSlugs={[
        '2025-05-order-books-and-amms',
        '2025-06-prompt-injection',
        '2015-10-best-practices-for-designing-web-apis',
      ]}
      writingTitle="Writing about backend systems"
    />
  )
}

export const metadata: Metadata = {
  title: 'Backend Engineering | Gabo Esquivel',
  description:
    'Backend engineering for GraphQL APIs, blockchain indexers, realtime data, exchange infrastructure, and RAG application services.',
  openGraph: {
    title: 'Backend Engineering | Gabo Esquivel',
    description:
      'GraphQL APIs, blockchain indexers, realtime data, exchange infrastructure, and retrieval services.',
    type: 'website',
  },
}
