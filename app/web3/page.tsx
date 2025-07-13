import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import aiPic from 'public/images/ai/ai.webp'

export default function CVPage() {
  const type = 'web3'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Sr. Web3 Engineer
        </span>
        <span className="print:hidden">Web3 Experience</span>
      </h1>

      <div className="mb-8 print:block print:text-gray-700">
        <p className="mb-4">
          Before I found my way into Web3, I spent years building inside the
          walls of traditional finance. It gave me a front-row seat to how money
          moves—and how much potential was being left on the table. As I worked
          to modernize financial services, I realized the real opportunity
          wasn’t just better apps or smoother UX; it was rethinking the entire
          architecture of value itself. That insight led me to blockchain, open
          protocols, and eventually a new chapter in my career—one driven by
          decentralization, transparency, and permissionless innovation.
        </p>
        {/* <div className="gap-4 my-8 columns-1">
          <div className="relative mb-4 h-60">
            <Image
              alt="Artificial Intelligence"
              src={aiPic}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="object-cover rounded-lg"
            />
          </div>
        </div> */}
        <h2 className="text-xl font-bold mb-4">
          AMEX & Mobile Neobank (Pre-2017)
        </h2>
        <p className="mb-4">
          My fintech journey started in 2010 at American Express, where I joined
          as a UI Engineer to help transition their credit card systems from
          DoJo to jQuery. In 2015, I became Lead Architect for Costa Rica’s
          first mobile neobank—a fully compliant platform designed to bring
          modern banking to mobile. These roles gave me a deep understanding of
          financial infrastructure, regulatory systems, and the constraints of
          innovating within traditional institutions.
        </p>
        <h2 className="text-xl font-bold mb-4 mt-6">
          Entering Web3: Knowledge ICO (2017)
        </h2>
        <p className="mb-4">
          In 2017, I took the leap into Web3 through the Knowledge.io ICO—one of
          the earliest attempts to tokenize human knowledge. I led full-stack
          development for a gamified Q&A platform, a token rewards dashboard,
          and a knowledge graph to surface expertise. It was my entry point into
          wallet-based authentication, token systems, and decentralized
          identity.
        </p>
        <h2 className="text-xl font-bold mb-4 mt-6">EOS Era (2018–2020)</h2>
        <p className="mb-4">
          From 2018 to 2020, I focused on the EOS ecosystem, drawn by its
          performance and developer ergonomics. At EOS Costa Rica, I helped
          launch the EOS Mainnet, managed infrastructure for EOSIO-based
          validators, and delivered custom blockchain solutions.
        </p>{' '}
        <p className="mb-4">
          One key project was a private blockchain for Grant Thornton Labs,
          designed to streamline intercompany transactions and automate tax
          logic using a USD-pegged stablecoin. The system featured immutable
          audit trails via IPFS and public proof publication—an early example of
          enterprise-grade transparency on-chain.
        </p>{' '}
        <p className="mb-4">
          I also created EOS Rate, a community-driven Block Producer rating tool
          that became widely adopted in the EOS ecosystem. Alongside product
          work, I led local outreach efforts through workshops, meetups, and
          advocacy.
        </p>
        <p className="mb-4">
          Between 2019 and 2021, I contributed to two Web3 consumer apps. At
          Emanate, where I maintained the streaming service and artist revenue
          distribution. At Sense Chat, I helped build a secure messaging app
          with an integrated wallet and token incentives for community
          engagement.
        </p>
        {/* <p className="mb-4">
          These projects deepened my understanding of decentralized identity,
          Web3-native UX, and protocol-level data architecture.
        </p> */}
        <h2 className="text-xl font-bold mb-4 mt-6">
          DeFi: Bitcash Bank (2020)
        </h2>
        <p className="mb-4">
          In late 2020, I joined Bitcash Bank, a crypto-native banking
          experiment aimed at expanding financial access. I worked across the
          stack—building token dashboards, backend services, and a UI for
          managing balances and transactions. The product centered around a
          consumer-grade wallet with WebAuthN-based key management and smooth
          onboarding, designed for mainstream usability. I contributed to the
          development of a P2P system and overcollateralized crypto stablecoins
          for each country.
        </p>
        <p className="mb-4">
          During this time, I also built ChainGraph, a high-performance
          blockchain indexer for EOS. It enabled fast, reliable transaction data
          queries, and strengthened my expertise in blockchain data structures,
          indexing, and real-time data pipelines.
        </p>
        <h2 className="text-xl font-bold mb-4 mt-6">
          Back to EVM: NFT Marketplaces (2021)
        </h2>
        <p className="mb-4">
          In 2021, as NFTs reached global mainstream—and trading volumes
          exploded—it marked the next critical phase of my EVM journey. I
          contributed to two marketplaces exploring the tokenization of
          real-world and gaming assets.
        </p>
        <p className="mb-4">
          At RareMint, I helped build a platform for minting NFTs backed by
          physical collectibles. I led smart contract integration, metadata
          pipelines, and the marketplace UI, supporting the initial auctions on
          Polygon.
        </p>
        <p className="mb-4">
          At ZTX, I delivered the Web3 interface for a gaming-centric NFT
          platform—focusing on wallet connectivity, minting workflows, and
          searchable asset discovery. The product emphasized speed, modular
          design, and creator-first economics.
        </p>
        <h2 className="text-xl font-bold mb-4 mt-6">
          Bitlauncher: Onchain AI Capital (2022)
        </h2>
        <p className="mb-4">
          In late 2022, I joined Bitlauncher, a decentralized launch platform
          for AI startups raising capital through batch token auctions. The
          protocol is a fork of the widely-used Gnosis Auction contracts,
          adapted for fair price discovery through sealed-bid batch auctions.
        </p>
        <p className="mb-4">
          I led development of the frontend and wallet flows, integrating
          bidding mechanisms, auction status tracking, and real-time updates
          into a seamless user experience. My work ensured that participants
          could interact with the platform securely and transparently.
        </p>
        {/* <p className="mb-4">
          In addition, I built an AI-powered assistant for the platform,
          enabling users to query project data, understand auction mechanics,
          and explore investment opportunities using natural language. This tool
          leveraged vector search and OpenAI APIs to deliver intelligent
          responses sourced from an indexed knowledge base.
        </p> */}
        <h2 className="text-xl font-bold mb-4 mt-6">
          Derivatives: Opyn Options (2023)
        </h2>
        <p className="mb-4">
          I worked closely with the Opyn team to help set up their testnet
          private beta frontend, integrating the protocol into early-stage
          interfaces and configuring the environment for internal user testing.
          Beyond integration, I contributed to custom frontend components and
          UI/UX prototypes for trading interfaces, vault positions, margin
          mechanics, and option flows, and also experimented with AI assistant
          to support user onboarding.
        </p>
        <p className="mb-4">
          This period deepened my understanding of financial primitives
          onchain—especially around composability, capital efficiency, and
          risk-managed exposure.
        </p>
        {/* <h2 className="text-xl font-bold mb-4 mt-6">
          Today: Building BasilicEVM
        </h2>
        <p className="mb-4">
          Today, I lead development at BasilicEVM—a modular, EVM-based project
          and SDK template purpose-built for DeFi protocols, wallets, and dApps.
          Basilic streamlines smart contract integration, frontend scaffolding,
          wallet UX, gasless transactions, and blockchain indexing using a
          modern TypeScript and viem/wagmi-based stack.
        </p>
        <p className="mb-4">
          I created Basilic to enable fast iteration, enforce architectural best
          practices, and support AI-assisted developer workflows. It's the most
          advanced toolchain I've used to date, and a synthesis of everything
          I've learned: performance, clarity, composability, and
          developer-focused experience.
        </p> */}
      </div>

      <Projects
        heading="Projects"
        projects={projects.filter((project) => project.type.includes(type))}
      />

      <LatestPosts category="Web3" title="Latest Web3 Articles" />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Web3 Experience - Gabo Esquivel',
  description:
    'Web3 Engineer with 15+ years in full-stack development, specializing in Ethereum dApp development',
  keywords: [
    'web3 engineer',
    'blockchain developer',
    'ethereum',
    'smart contracts',
    'DeFi',
    'EVM',
    'dApp development',
    'crypto',
    'tokenization',
    'web3 architecture',
    'decentralized applications',
    'full-stack blockchain',
  ],
  openGraph: {
    title: 'Web3 Experience - Gabo Esquivel',
    description:
      'Web3 Engineer with 15+ years in full-stack development, specializing in Ethereum dApp development',
    type: 'profile',
  },
}
