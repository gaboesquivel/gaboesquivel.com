import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import { ProjectEvidence } from 'components/work/project-evidence'
import type { Metadata } from 'next'
import Image from 'next/image'
import web3Img from 'public/images/work/ticoblockchain.jpg'

export default function Web3ExperiencePage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold tracking-tighter">
        Web3 product engineering
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        I build the product layer around blockchain systems: wallets, trading
        interfaces, token flows, indexers, subscriptions, and the application
        infrastructure that makes protocol state usable.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        The work spans Ethereum and EVM networks, EOSIO and Antelope, Polygon,
        Arbitrum, and Flow. The chain is only one boundary. A complete product
        also needs reliable data, transaction state, authentication, risk-aware
        interfaces, and operations that a team can maintain.
      </p>

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Financial systems as product context
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My work on card products and mobile banking established the constraints
        that still matter in Web3: identity, security, integrations, transaction
        state, and interfaces people can understand.
      </p>

      <div className="my-8">
        <div className="relative h-[420px]">
          <Image
            alt="Blockchain engineering workshop in Costa Rica"
            src={web3Img}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <ProjectEvidence slugs={['american-express', 'wink']} />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Tokens, protocol state, and infrastructure
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Token and protocol state becomes a product when signing, contract
        behavior, application data, and interface feedback agree. The evidence
        spans ERC-20 product flows, EOSIO mainnet and private infrastructure,
        and an onchain community-rating tool.
      </p>

      <ProjectEvidence slugs={['knowledge-io', 'eos-costa-rica', 'eos-rate']} />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Indexing, subscriptions, and browser signing
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Nodes are not application APIs. I build indexers, GraphQL layers,
        subscriptions, and signing flows that turn chain events into explicit
        data and transaction boundaries for products.
      </p>

      <ProjectEvidence slugs={['bitcashbank', 'chaingraph']} />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Wallets, marketplaces, auctions, and trading
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Market products combine wallet connections, asset state, indexed events,
        transaction feedback, and interfaces shaped by the underlying protocol.
        I have applied that model to collectibles, virtual worlds, batch
        auctions, token bridges, and perpetual options.
      </p>

      <ProjectEvidence slugs={['raremint', 'ztx', 'bitlauncher', 'opyn']} />

      <p className="prose prose-neutral dark:prose-invert">
        I work from protocol behavior outward. Contracts, indexers, wallets, and
        interfaces are connected parts of one product, with state and actions
        clear enough to operate and use.
      </p>

      <LatestPosts
        title="Writing about Web3 systems"
        slugs={[
          '2024-07-viem-wagmi-ethers',
          '2024-10-modern-nextjs-web3-architecture',
          '2025-09-web3-composability',
        ]}
      />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Build a Web3 product
      </h2>
      <LetsConnect />
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
