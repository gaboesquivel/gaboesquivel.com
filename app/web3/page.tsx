import { LatestPosts } from "components/blog/latest-posts";
import { LetsConnect } from "components/shared/lets-connect";
import {
  PageImage,
  PageSection,
  PageTitle,
  Prose,
  sectionAction,
} from "components/shared/page-layout";
import { ProjectEvidence } from "components/work/project-evidence";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";
import ztxImg from "public/images/work/ztx.png";

export default function Web3ExperiencePage() {
  return (
    <section>
      <PageTitle>Web3 product engineering</PageTitle>
      <Prose>
        I build the product layer around blockchain systems: wallets, signing,
        exchanges, trading interfaces, auctions, and the data that keeps them in
        sync.
      </Prose>
      <Prose>
        My focus is the point where complex protocols become usable products.
        People need to understand what they own, what will happen when they
        sign, and what state a transaction is in—not how many networks or
        services sit behind the screen.
      </Prose>
      <Prose>
        I came to this work through financial products, including Wink, Costa
        Rica&apos;s first neobank. That experience still shapes how I approach
        identity, security, and moving money.
      </Prose>

      <PageSection
        title="ZTX: a wallet inside a virtual world"
        action={
          <Link href="/project/ztx" className={sectionAction}>
            View ZTX
          </Link>
        }
      >
        <Prose>
          ZTX was a Web3 virtual world where a wallet needed to work inside a
          WebGL session. I built an EVM connector using MetaMask, Ethers.js, and
          a custom JavaScript event system, so people could sign transactions
          and trade NFTs without leaving the experience.
        </Prose>

        <PageImage
          alt="ZTX virtual world experience"
          src={ztxImg}
          objectClassName="object-contain"
        />
      </PageSection>

      <PageSection title="Trading and financial products">
        <Prose>
          At Bitcash, I worked on a peer-to-peer exchange where people could
          trade and sign transactions directly in the browser. I built WebAuthn
          key management and QR signature requests so signing did not require a
          separate wallet.
        </Prose>
        <Prose>
          At Bitlauncher, I built the product around token auctions, wallet
          balances, and transactions across EOS EVM and EOS. I deployed Gnosis
          auction contracts, integrated wallet interactions with viem and wagmi,
          and indexed transaction activity for the interface.
        </Prose>
        <Prose>
          At Opyn, I worked on the trading interface for a perpetuals protocol
          on Arbitrum, integrating protocol interactions with viem and wagmi and
          connecting the interface to indexed onchain data.
        </Prose>
        <Prose>
          For RareMint, I integrated WalletConnect into a Polygon collectibles
          marketplace so users could participate in auctions without leaving the
          marketplace.
        </Prose>

        <ProjectEvidence
          slugs={["bitcashbank", "bitlauncher", "opyn", "raremint"]}
        />
      </PageSection>

      <PageSection title="Protocols and infrastructure">
        <Prose>
          My earlier Web3 work began closer to the infrastructure. At{" "}
          <Link href="/project/knowledge-io" className="prose-link">
            Knowledge
          </Link>
          , I built ERC-20 token contracts, serverless AWS services, and a React
          and Web3.js marketplace with a wallet dashboard.
        </Prose>
        <Prose>
          At EOS Costa Rica, I helped launch the EOS mainnet and operate
          validators, then built a private EOSIO chain for Grant Thornton&apos;s
          intercompany transactions and tax workflows. I also started{" "}
          <Link href="/project/chaingraph" className="prose-link">
            ChainGraph
          </Link>
          , an open-source GraphQL toolkit for querying and streaming EOSIO and
          Antelope blockchain data.
        </Prose>

        <ProjectEvidence slugs={["eos-costa-rica", "chaingraph"]} />
      </PageSection>

      <LatestPosts
        title="Writing about Web3 systems"
        category="Web3"
        limit={4}
      />

      <PageSection title="Work together">
        <Prose>
          The roles and dates behind this work are in my{" "}
          <Link href="/cv?focus=web3" className="prose-link">
            Web3 CV
          </Link>
          .
        </Prose>
        <LetsConnect />
      </PageSection>
    </section>
  );
}

export const metadata = pageMetadata({
  description:
    "Gabo Esquivel builds Web3 products across wallets, blockchain signing, token auctions, indexing, and trading, including work on ZTX and Bitlauncher.",
  images: [
    {
      url: "/images/work/ztx.png",
      alt: "ZTX virtual world experience",
    },
  ],
  path: "/web3",
  title: "Web3 Product Engineering | Gabo Esquivel",
});
