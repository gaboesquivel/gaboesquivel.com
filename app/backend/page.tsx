import { CapabilityPage } from "components/work/capability-page";
import { pageMetadata } from "lib/page-metadata";

const sections = [
  {
    heading: "Blockchain data and realtime APIs",
    paragraphs: [
      "ChainGraph started as a side project while I was at Bitcash: a GraphQL subscription toolkit for indexing and streaming EOSIO and Antelope data. Bitlauncher later needed an indexer of its own for EOS EVM, so I built one on viem event subscriptions and a dFuse stream, with Supabase handling queries, aggregation, and realtime subscriptions.",
    ],
    projectSlugs: ["chaingraph", "bitlauncher"],
  },
  {
    heading: "Exchange and protocol services",
    paragraphs: [
      "At Bitcash the matching engine had to be the system of record. The exchange runs on Hasura GraphQL APIs, a realtime EOS indexer with worker threads and binary deserialization, and PostgreSQL behind all of it. At Opyn the question was where protocol state should live. I put it in a Ponder indexer over PostgreSQL, so the trading interface reads indexed state and doesn't rebuild positions from raw RPC reads.",
    ],
    projectSlugs: ["bitcashbank", "opyn"],
  },
  {
    heading: "Retrieval and application services",
    paragraphs: [
      "For LegalAgent I built retrieval as an application service, not as a prompt. Document categorization decides what retrieval can reach, and the system prompts live as data in the admin instead of in code.",
    ],
    projectSlugs: ["legal-agent"],
  },
];

export default function BackendExperiencePage() {
  return (
    <CapabilityPage
      title="Backend engineering"
      intro={[
        "A backend's job is to be the source of truth and to decide who's allowed to change it. Mine have been a GraphQL layer over blockchain events, a matching engine with browser-based signing, and a retrieval system behind a voice assistant.",
      ]}
      sections={sections}
      postSlugs={[
        "2025-05-order-books-and-amms",
        "2025-06-prompt-injection",
        "2025-05-scaling-securing-websockets",
      ]}
      writingTitle="Writing about backend systems"
    />
  );
}

export const metadata = pageMetadata({
  description:
    "Backend engineering for GraphQL APIs, blockchain indexers, realtime data, exchange infrastructure, and RAG application services.",
  path: "/backend",
  title: "Backend Engineering | Gabo Esquivel",
});
