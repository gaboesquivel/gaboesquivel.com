import { LatestPosts } from "components/blog/latest-posts";
import { InteriorPageShell } from "components/interior/interior-page-shell";
import { PageIntro } from "components/interior/page-intro";
import { ProjectTextRow } from "components/interior/project-text-row";
import {
  ctaLink,
  editorialLink,
  editorialMeasure,
  narrativeCopy,
  narrativeIntroGap,
  narrativeSectionGap,
  sectionHeadingSpacing,
  sectionTitle,
} from "components/shared/spacing";
import { EditorialWorkCard } from "components/work/editorial-work-card";
import { cvPath } from "lib/cv-paths";
import { pageMetadata } from "lib/page-metadata";
import { cn } from "lib/utils";
import Link from "next/link";

const actionLink = cn(ctaLink, editorialLink, "text-sm");

export default function Web3ExperiencePage() {
  return (
    <InteriorPageShell>
      <PageIntro
        narrative
        description="I build the product layer around blockchain systems: wallets, signing, exchanges, trading interfaces, auctions, and the data that keeps them in sync."
        title="Web3 Engineering"
      >
        <p>
          My focus is where complex protocols become usable products. People
          need to understand what they own, what happens when they sign, and the
          state of a transaction—not the complexity of the infrastructure behind
          it. My earlier work in financial products, including Wink, still
          shapes how I approach identity, security, and moving money.
        </p>
      </PageIntro>

      <section className={narrativeIntroGap}>
        <EditorialWorkCard
          priority
          action="View ZTX"
          description="At ZTX, I built wallet connectivity inside a WebGL virtual world. Using MetaMask, Ethers.js, and a custom JavaScript event system, I connected the experience to EVM transactions so users could sign and trade NFTs without leaving the world."
          layout="feature"
          slug="ztx"
          title="ZTX"
        />
      </section>

      <section className={narrativeSectionGap}>
        <h2 className={cn(sectionTitle, sectionHeadingSpacing, "text-balance")}>
          Trading and financial products
        </h2>
        <p className={cn(editorialMeasure, narrativeCopy)}>
          From browser-based signing to onchain trading, these products required
          complex transactions to feel clear, responsive, and trustworthy.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <li className="h-full min-w-0">
            <EditorialWorkCard
              action="View Bitcash"
              description="I worked on peer-to-peer exchange flows, WebAuthn key management, and QR-based transaction signing directly in the browser."
              layout="landscape"
              objectClassName="object-top"
              slug="bitcashbank"
              title="Bitcash"
            />
          </li>
          <li className="h-full min-w-0">
            <EditorialWorkCard
              action="View Bitlauncher"
              description="I built token auction interfaces, wallet interactions, and transaction data integration across EOS EVM and EOS, including Gnosis auction contracts."
              layout="landscape"
              slug="bitlauncher"
              title="Bitlauncher"
            />
          </li>
          <li className="h-full min-w-0">
            <EditorialWorkCard
              action="View Opyn"
              description="I built the trading interface for a perpetuals protocol on Arbitrum, integrating wallet actions and indexed onchain market data."
              layout="landscape"
              objectClassName="object-top"
              slug="opyn"
              title="Opyn"
            />
          </li>
          <li className="h-full min-w-0">
            <EditorialWorkCard
              action="View RareMint"
              description="I integrated WalletConnect into a Polygon collectibles marketplace, enabling participation in auctions and NFT transactions."
              layout="landscape"
              objectClassName="object-top"
              slug="raremint"
              title="RareMint"
            />
          </li>
        </ul>
      </section>

      <section className={narrativeSectionGap}>
        <h2 className={cn(sectionTitle, sectionHeadingSpacing, "text-balance")}>
          Protocols and infrastructure
        </h2>
        <p className={cn(editorialMeasure, narrativeCopy)}>
          My earlier blockchain work was closer to the underlying networks and
          applications. It gave me a deeper understanding of the systems that
          later informed my work on wallets, markets, and onchain interfaces.
        </p>
        <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
          <ProjectTextRow href="/project/knowledge-io" title="Knowledge">
            ERC-20 contracts, serverless AWS services, and a React/Web3.js
            marketplace with a wallet dashboard.
          </ProjectTextRow>
          <ProjectTextRow href="/project/eos-costa-rica" title="EOS Costa Rica">
            EOS mainnet infrastructure, validators, and a private EOSIO network
            for enterprise transaction workflows.
          </ProjectTextRow>
          <ProjectTextRow href="/project/chaingraph" title="ChainGraph">
            An open-source GraphQL toolkit for querying and streaming EOSIO and
            Antelope blockchain data.
          </ProjectTextRow>
        </ul>
      </section>

      <LatestPosts
        arrow
        category="Web3"
        className={narrativeSectionGap}
        limit={4}
        title="Writing about Web3 systems"
      />

      <section className={narrativeSectionGap}>
        <h2 className={cn(sectionTitle, sectionHeadingSpacing)}>
          Explore more
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="m-0">
            <Link className={actionLink} href={cvPath({ key: "web3" })}>
              Web3 résumé / CV →
            </Link>
          </p>
          <p className="m-0">
            <Link className={actionLink} href="/contact">
              Start a conversation →
            </Link>
          </p>
        </div>
      </section>
    </InteriorPageShell>
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
  title: "Web3 Engineering | Gabo Esquivel",
});
