import { LatestPosts } from "components/blog/latest-posts";
import { EditorialSection } from "components/interior/editorial-section";
import { InteriorPageShell } from "components/interior/interior-page-shell";
import { PageIntro } from "components/interior/page-intro";
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionMedia,
} from "components/interior/split-section";
import { LetsConnect } from "components/shared/lets-connect";
import { PageSection, proseLink, Prose } from "components/shared/page-layout";
import { sectionTitle } from "components/shared/spacing";
import { ProjectFigure } from "components/work/project-figure";
import { cvPath } from "lib/cv-paths";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

export default function Web3ExperiencePage() {
  return (
    <InteriorPageShell>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        <PageIntro
          description="I build the product layer around blockchain systems: wallets, signing, exchanges, trading interfaces, auctions, and the data that keeps them in sync."
          titleClassName="mb-0 lg:mb-0"
          title="Web3 Engineering"
        />
        <div className="lg:pt-20">
          <Prose className="mt-6 first:mt-0">
            My focus is the point where complex protocols become usable
            products. People need to understand what they own, what will happen
            when they sign, and what state a transaction is in—not how many
            networks or services sit behind the screen.
          </Prose>
          <Prose className="mt-6 first:mt-0">
            I came to this work through financial products, including Wink,
            Costa Rica&apos;s first neobank. That experience still shapes how I
            approach identity, security, and moving money.
          </Prose>
        </div>
      </div>

      <EditorialSection>
        <SplitSection sectionSpacing={false}>
          <SplitSectionContent mediaPosition="right" span={6}>
            <h2 className={sectionTitle}>
              ZTX: a wallet inside a virtual world
            </h2>
            <Prose className="mt-6">
              ZTX was a Web3 virtual world where a wallet needed to work inside
              a WebGL session. I built an EVM connector using MetaMask,
              Ethers.js, and a custom JavaScript event system, so people could
              sign transactions and trade NFTs without leaving the experience.
            </Prose>
          </SplitSectionContent>
          <SplitSectionMedia mediaPosition="right" span={5}>
            <ProjectFigure
              slug="ztx"
              priority
              objectClassName="object-cover object-center"
            />
          </SplitSectionMedia>
        </SplitSection>
      </EditorialSection>

      <EditorialSection title="Trading and financial products">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-2">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">
              Bitcash: signing in the browser
            </h3>
            <Prose className="mt-6">
              At Bitcash, I worked on a peer-to-peer exchange where people could
              trade and sign transactions directly in the browser. I built
              WebAuthn key management and QR signature requests so signing did
              not require a separate wallet.
            </Prose>
            <div className="mt-auto pt-8">
              <ProjectFigure slug="bitcashbank" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">
              Bitlauncher: token auctions
            </h3>
            <Prose className="mt-6">
              At Bitlauncher, I built the product around token auctions, wallet
              balances, and transactions across EOS EVM and EOS. I deployed
              Gnosis auction contracts, integrated wallet interactions with viem
              and wagmi, and indexed transaction activity for the interface.
            </Prose>
            <div className="mt-auto pt-8">
              <ProjectFigure slug="bitlauncher" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Opyn: onchain trading</h3>
            <Prose className="mt-6">
              At Opyn, I worked on the trading interface for a perpetuals
              protocol on Arbitrum, integrating protocol interactions with viem
              and wagmi and connecting the interface to indexed onchain data.
            </Prose>
            <div className="mt-auto pt-8">
              <ProjectFigure slug="opyn" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">
              RareMint: collectibles and auctions
            </h3>
            <Prose className="mt-6">
              For RareMint, I integrated WalletConnect into a Polygon
              collectibles marketplace so users could participate in auctions
              without leaving the marketplace.
            </Prose>
            <div className="mt-auto pt-8">
              <ProjectFigure slug="raremint" />
            </div>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection title="Protocols and infrastructure">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Prose className="mt-0">
            My earlier Web3 work began closer to the infrastructure. At{" "}
            <Link href="/project/knowledge-io" className={proseLink}>
              Knowledge
            </Link>
            , I built ERC-20 token contracts, serverless AWS services, and a
            React and Web3.js marketplace with a wallet dashboard.
          </Prose>
          <div>
            <Prose className="mt-0">
              At{" "}
              <Link href="/project/eos-costa-rica" className={proseLink}>
                EOS Costa Rica
              </Link>
              , I helped launch the EOS mainnet and operate validators, then
              built a private EOSIO chain for Grant Thornton&apos;s intercompany
              transactions and tax workflows. I also started{" "}
              <Link href="/project/chaingraph" className={proseLink}>
                ChainGraph
              </Link>
              , an open-source GraphQL toolkit for querying and streaming EOSIO
              and Antelope blockchain data.
            </Prose>
          </div>
        </div>
      </EditorialSection>

      <LatestPosts
        category="Web3"
        limit={4}
        title="Writing about Web3 systems"
        variant="editorial"
      />

      <PageSection title="Work together">
        <Prose>
          The roles and dates behind this work are in my{" "}
          <Link href={cvPath({ key: "web3" })} className={proseLink}>
            Web3 CV
          </Link>
          .
        </Prose>
        <LetsConnect />
      </PageSection>
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
