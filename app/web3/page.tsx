import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import {
  PageImage,
  PageSection,
  PageTitle,
  Prose,
} from 'components/shared/page-layout'
import { ProjectEvidence } from 'components/work/project-evidence'
import { pageMetadata } from 'lib/page-metadata'
import Link from 'next/link'
import web3Img from 'public/images/work/ticoblockchain.jpg'

export default function Web3ExperiencePage() {
  return (
    <section>
      <PageTitle>Web3 product engineering</PageTitle>
      <Prose>
        I build the product layer around blockchain systems: wallets, trading
        interfaces, token flows, indexers, and the services that sit between a
        chain and the person using it.
      </Prose>
      <Prose>
        That has meant Ethereum and EVM networks, EOSIO and Antelope, Polygon,
        Arbitrum, and Flow. The contract is the smallest part of it. Indexed
        data, transaction state, signing, and interfaces that show people what
        they are about to commit to are the rest.
      </Prose>
      <Prose>
        I arrived here through financial systems rather than through crypto.
        Card products at American Express and a mobile bank at Wink set the
        constraints I still work against: identity, security, partner
        integrations, and money movement a person can follow.
      </Prose>

      <PageImage
        alt="Blockchain engineering workshop in Costa Rica"
        src={web3Img}
        priority
      />

      <PageSection title="Tokens, protocol state, and infrastructure">
        <Prose>
          At Knowledge I led the ERC-20 token architecture and the AWS services
          around the 2018 mainnet ICO, and built a React and Web3.js marketplace
          with a wallet dashboard. At EOS Costa Rica I helped launch the EOS
          mainnet, operated validators, and led the architecture of Grant
          Thornton&apos;s private EOSIO chain: a stablecoin, hashing, and IPFS,
          with a React client on Azure and Terraform.
        </Prose>

        <ProjectEvidence slugs={['knowledge-io', 'eos-costa-rica']} />
      </PageSection>

      <PageSection title="Indexing, subscriptions, and browser signing">
        <Prose>
          Bitcash is a peer-to-peer exchange: I built the matching engine,
          Hasura GraphQL APIs, WebAuthn browser signing, QR signature requests,
          and a realtime EOS indexer with worker threads and binary
          deserialization. ChainGraph started during that work as an open-source
          GraphQL subscription toolkit for EOSIO and Antelope data.
        </Prose>

        <ProjectEvidence slugs={['bitcashbank', 'chaingraph']} />
      </PageSection>

      <PageSection title="Wallets, marketplaces, auctions, and trading">
        <Prose>
          RareMint needed indexed NFT events and a wallet path into Polygon
          collectible auctions: I built a Moralis-streams indexer and integrated
          WalletConnect. At ZTX I built a WebGL EVM wallet connector with
          Ethers.js so wallet state lived inside the virtual-world UI, on an
          early Next.js, Tailwind, and Framer Motion architecture.
        </Prose>
        <Prose>
          Bitlauncher combined Gnosis batch auctions, a USDT, USDC, and BITUSD
          bridge, viem and wagmi wallet flows, an EOS EVM indexer on viem event
          subscriptions, and a dFuse stream for EOS. Opyn is a Next.js React
          Server Components trading interface over Ponder, PostgreSQL, and
          Supabase on Arbitrum.
        </Prose>

        <ProjectEvidence slugs={['raremint', 'ztx', 'bitlauncher', 'opyn']} />
      </PageSection>

      <LatestPosts title="Writing about Web3 systems" category="Web3" />

      <PageSection title="Build a Web3 product">
        <Prose>
          The employment record behind this work is the{' '}
          <Link href="/cv?focus=web3" className="prose-link">
            Web3 CV
          </Link>
          .
        </Prose>
        <LetsConnect />
      </PageSection>
    </section>
  )
}

export const metadata = pageMetadata({
  title: 'Web3 Product Engineering | Gabo Esquivel',
  description:
    'Web3 product engineering across wallets, trading interfaces, token flows, blockchain indexers, auctions, and DeFi systems.',
})
