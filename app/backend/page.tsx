import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Blockchain data and realtime APIs',
    paragraphs: [
      'I built ChainGraph as a GraphQL subscription toolkit for indexing and streaming EOSIO and Antelope data. At Bitlauncher I built the EOS EVM indexer on viem event subscriptions and a dFuse stream, with Supabase for queries, aggregation, and realtime subscriptions.',
    ],
    projectSlugs: ['chaingraph', 'bitlauncher'],
  },
  {
    heading: 'Exchange and protocol services',
    paragraphs: [
      'Bitcash needed the exchange itself to be the source of truth: matching engine, Hasura GraphQL APIs, WebAuthn signing, and a realtime EOS indexer with worker threads and binary deserialization. Opyn keeps protocol state in a Ponder indexer over PostgreSQL so the trading interface reads it instead of reconstructing it in the client.',
    ],
    projectSlugs: ['bitcashbank', 'opyn'],
  },
  {
    heading: 'Retrieval and application services',
    paragraphs: [
      'For LegalAgent the retrieval layer is an application service rather than a prompt. Document categorization decides what is eligible for retrieval, and system prompts are managed as data in the admin instead of shipped in code.',
    ],
    projectSlugs: ['legal-agent'],
  },
]

export default function BackendExperiencePage() {
  return (
    <CapabilityPage
      title="Backend engineering"
      intro={[
        'The backend job is the source of truth, and who is allowed to move it. Mine have been a GraphQL layer over blockchain events, a matching engine with browser-based signing, and a retrieval system behind a voice assistant.',
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

export const metadata = pageMetadata({
  title: 'Backend Engineering | Gabo Esquivel',
  description:
    'Backend engineering for GraphQL APIs, blockchain indexers, realtime data, exchange infrastructure, and RAG application services.',
})
