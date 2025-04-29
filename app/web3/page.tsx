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
          My journey in fintech began in 2010 when I joined American Express
          (AMEX) as a UI Engineer, helping migrate their credit card systems
          from DoJo to jQuery. In 2015, I was hired as Lead Architect to build
          Costa Rica’s first mobile neobank—a fully compliant platform created
          to modernize banking through mobile-first experiences. These years
          deepened my understanding of financial infrastructure, regulatory
          frameworks, and the challenges of innovation inside traditional
          systems. The limits I encountered there pushed me to explore new
          models beyond conventional finance, setting the stage for my
          transition into blockchain technology.
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
          From 2018 to 2020, I immersed myself in the EOS ecosystem, drawn by
          its performance and developer experience. At EOS Costa Rica, I
          participated in the EOS Mainnet launch, managed infrastructure for
          EOSIO-based validators, and delivered custom blockchain development
          services.
        </p>
        <p className="mb-4">
          I architected a custom private blockchain for Grant Thornton Labs,
          enabling efficient intercompany transactions and automated tax logic
          using a USD-pegged stablecoin. The solution included immutable audit
          trails via IPFS and public proof publication. It was an early attempt
          at bridging enterprise processes with blockchain transparency.
        </p>
        <p className="mb-4">
          During this time, I also developed EOS Rate, a community-driven rating
          tool for EOS Block Producers that became widely used in the ecosystem.
          I actively contributed to local blockchain adoption through workshops,
          meetups, and ecosystem evangelism.
        </p>
        <p className="mb-4">
          Between 2019 and 2021, I worked on Emanate: A Web3-powered music
          platform, where I maintained the streaming service and artist revenue
          distribution backend, and Sense Chat: A secure messaging app with
          integrated wallet and token incentive mechanics for community
          engagement.
        </p>
        {/* <p className="mb-4">
          These projects deepened my understanding of decentralized identity,
          Web3-native UX, and protocol-level data architecture.
        </p> */}

        <h2 className="text-xl font-bold mb-4 mt-6">
          DEFI: Bitcash Bank (2020)
        </h2>
        <p className="mb-4">
          Later in 2020, I joined Bitcash Bank, a crypto-native banking
          experiment focused on expanding financial access. I worked across the
          stack—developing token dashboards, backend services, and a UI for
          managing balances and transactions. It was a real-world exploration of
          decentralized finance, grounded in practical product development. I
          helped build a consumer-grade EOS wallet with WebAuthN key management
          and smooth onboarding, aiming to make it usable for all users.
          Additionally, I contributed to the development of a P2P system and
          overcollateralized crypto stablecoins for each country using a simple
          single AMM, enhancing the platform's financial offerings.
        </p>
        <p className="mb-4">
          I also built ChainGraph, a high-performance blockchain data indexer
          that enabled fast and reliable querying of EOS transaction data. This
          work deepened my understanding of blockchain data structures, indexing
          strategies, and real-time data streaming.
        </p>

        <h2 className="text-xl font-bold mb-4 mt-6">
          Back to EVM: NFT Marketplaces (2021)
        </h2>
        <p className="mb-4">
          In 2021, I returned to the EVM ecosystem, just before NFTs went
          mainstream. I worked on two marketplaces experimenting with tokenized
          assets.
        </p>
        <p className="mb-4">
          At RareMint, I helped build a platform for minting NFTs backed by
          real-world collectibles. I led contract integration, metadata
          workflows, and the marketplace UI. Supported the initial auctions on
          Polygon.
        </p>
        <p className="mb-4">
          At ZTX, I delivered the Web3 interface for a gaming-backed NFT
          platform—focusing on wallet connection, minting flows, and marketplace
          search. Speed, modularity, and creator-centric economics were key
          design principles.
        </p>

        <h2 className="text-xl font-bold mb-4 mt-6">
          Bitlauncher: Onchain AI Capital (2022)
        </h2>
        <p className="mb-4">
          In late 2022, I joined BitLauncher, a decentralized launch platform
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
          In parallel to BitLauncher, I worked closely with the Opyn team to
          help set up their testnet private beta frontend, integrating the
          protocol into early-stage interfaces and configuring the environment
          for internal user testing.
        </p>
        <p className="mb-4">
          Beyond integration, I contributed to custom frontend components and
          UI/UX prototypes for trading interfaces, vault positions, margin
          mechanics, and option flows. I also experimented with AI assistant to
          support user onboarding.
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
