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
        I build wallets, trading interfaces, token flows, indexers, and the
        services that sit between a chain and a screen.
      </Prose>
      <Prose>
        Building Wink, Costa Rica's first neobank, led me into crypto in 2017 at
        the height of the ICO boom, and Knowledge ICO became my first Web3
        project.
      </Prose>
      <Prose>
        I&apos;ve since worked on Ethereum and EVM networks, EOSIO and Antelope,
        Polygon, Arbitrum, and Flow. On every one of them the contract was the
        small part. The bigger work was indexed data, transaction state,
        signing, and an interface that shows people what they&apos;re about to
        commit to.
      </Prose>

      <PageImage
        alt="Blockchain engineering workshop in Costa Rica"
        src={web3Img}
        priority
      />

      <PageSection title="Tokens, protocol state, and infrastructure">
        <Prose>
          At Knowledge I built the ERC-20 token contracts, the serverless AWS
          services around them, and a React and Web3.js marketplace with a
          wallet dashboard. At EOS Costa Rica the work moved from a token to the
          network itself: I helped launch the EOS mainnet and operated
          validators, then built Grant Thornton&apos;s private EOSIO chain for
          intercompany transactions and tax workflows.
        </Prose>

        <ProjectEvidence slugs={['knowledge-io', 'eos-costa-rica']} />
      </PageSection>

      <PageSection title="Indexing, subscriptions, and browser signing">
        <Prose>
          Bitcash was a peer-to-peer exchange with one hard constraint: trades
          had to settle in the browser without an external wallet. I built
          WebAuthn key management and QR signature requests to make that work,
          and bitlauncher.ai and other partner apps later used those requests to
          authenticate and sign through the Bitcash session. While I was there I
          also started ChainGraph as a side project, an open-source GraphQL path
          over EOSIO and Antelope data with realtime subscriptions.
        </Prose>

        <ProjectEvidence slugs={['bitcashbank', 'chaingraph']} />
      </PageSection>

      <PageSection title="Wallets, marketplaces, auctions, and trading">
        <Prose>
          For RareMint&apos;s Polygon collectible auctions I integrated
          WalletConnect, so bidding stayed inside the marketplace instead of
          sending people off to a separate wallet flow.
        </Prose>
        <Prose>
          ZTX had the same constraint inside a virtual world: signing and NFT
          trading had to happen without leaving it. I built a WebGL EVM wallet
          connector on MetaMask, Ethers.js, and a custom JavaScript event system
          to make that possible.
        </Prose>
        <Prose>
          At Bitlauncher I deployed Gnosis auction contracts to EOS EVM, and the
          wallet interface showed EVM balances through wagmi subscriptions next
          to EOS balances polled over RPC. At Opyn, which was shipping a
          perpetuals protocol on Arbitrum, I integrated the protocol and its
          Arbitrum testnet into the trading interface with viem and wagmi.
        </Prose>

        <ProjectEvidence slugs={['raremint', 'ztx', 'bitlauncher', 'opyn']} />
      </PageSection>

      <LatestPosts title="Writing about Web3 systems" category="Web3" />

      <PageSection title="Work together">
        <Prose>
          The roles and dates behind this work are on the{' '}
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
