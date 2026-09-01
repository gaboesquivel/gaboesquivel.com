import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import {
  PageImage,
  PageSection,
  PageTitle,
  Prose,
} from 'components/shared/page-layout'
import { ProjectEvidence } from 'components/work/project-evidence'
import type { Metadata } from 'next'
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
          Token and protocol state becomes a product when signing, contract
          behavior, application data, and interface feedback agree. That work
          covers ERC-20 product flows and both EOSIO mainnet and private-chain
          infrastructure.
        </Prose>

        <ProjectEvidence slugs={['knowledge-io', 'eos-costa-rica']} />
      </PageSection>

      <PageSection title="Indexing, subscriptions, and browser signing">
        <Prose>
          Nodes are not application APIs. I build indexers, GraphQL layers,
          subscriptions, and signing flows that turn chain events into explicit
          data and transaction boundaries for products.
        </Prose>

        <ProjectEvidence slugs={['bitcashbank', 'chaingraph']} />
      </PageSection>

      <PageSection title="Wallets, marketplaces, auctions, and trading">
        <Prose>
          Market products combine wallet connections, asset state, indexed
          events, transaction feedback, and interfaces shaped by the underlying
          protocol. I have applied that model to collectibles, virtual worlds,
          batch auctions, token bridges, and perpetual options.
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

export const metadata: Metadata = {
  title: 'Web3 Product Engineering | Gabo Esquivel',
  description:
    'Web3 product engineering across wallets, trading interfaces, token flows, blockchain indexers, auctions, and DeFi systems.',
  openGraph: {
    title: 'Web3 Product Engineering | Gabo Esquivel',
    description:
      'Wallets, trading interfaces, token flows, blockchain indexers, auctions, and DeFi systems across EVM and Antelope networks.',
    type: 'website',
  },
}
