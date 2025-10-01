import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function Web3ExperiencePage() {
  const type = 'web3'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Sr. Web3 Engineer
        </span>
        <span className="print:hidden">Web3 Experience</span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        Before Web3, I worked on products in traditional finance, where I saw
        firsthand how money moves—and how inefficient the system really is. The
        biggest opportunity wasn't just improving interfaces; it was rethinking
        the entire foundation of value. That realization led me to blockchain,
        open protocols, and a new chapter focused on decentralization,
        transparency, and permissionless innovation.
      </p>
      <h2 className="text-xl font-bold mb-4">
        Financial Foundations (2010-2015)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My journey toward Web3 began in traditional finance. In 2010, I joined
        American Express as a UI Engineer, helping transition their credit card
        systems from Dojo to jQuery while working directly with payment
        processing interfaces. This early exposure to financial systems revealed
        the inefficiencies in traditional banking infrastructure.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        In 2015, I became Lead Architect for{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first mobile neobank—a fully compliant platform designed
        to modernize banking through digital interfaces. While working on Wink,
        I gained valuable insights into the regulatory challenges and user
        experience concerns in financial applications, setting the stage for my
        later work in decentralized finance.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Entering Web3: Knowledge.io (2017)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2017, I made my formal entry into Web3 through{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>
        —one of the earliest attempts to tokenize human expertise. As lead
        full-stack developer, I created a gamified Q&A platform with token
        rewards and implemented a knowledge graph visualization system to
        surface expertise. This project served as my introduction to
        wallet-based authentication, token economics, and decentralized
        identity—fundamentals that would shape my future Web3 work.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        EOS Blockchain Ecosystem (2018-2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2018 to 2020, I focused on the EOS ecosystem at{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , drawn by its performance and developer-friendly approach. During this
        period, I helped launch the EOS Mainnet, managed validator
        infrastructure, and delivered custom blockchain solutions for
        enterprises.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        A significant project during this time was developing a private
        blockchain for Grant Thornton Labs that streamlined intercompany
        transactions using a USD-pegged stablecoin. The system featured
        immutable audit trails via IPFS with public proof publication—an early
        implementation of enterprise-grade transparency on-chain.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        I also created{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOS Rate
        </Link>
        , a community-driven Block Producer rating tool with an interactive
        radial graph interface that became widely adopted throughout the EOS
        ecosystem. Beyond technical work, I led local blockchain education
        through workshops and meetups, helping expand the Web3 community in
        Latin America.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Web3 Infrastructure: ChainGraph (2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2020, I developed{' '}
        <Link href="/project/chaingraph" className="prose-link">
          ChainGraph
        </Link>
        , a high-performance blockchain indexer and real-time GraphQL toolkit
        specifically for EOSIO-based applications. This project enabled
        efficient data subscriptions and querying across multiple blockchains,
        significantly improving the developer experience for building on EOSIO.
        This work strengthened my expertise in blockchain data structures,
        indexing, and real-time data pipelines.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        DeFi Banking: BitcashBank (2020-2021)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From late 2020 to 2021, I worked on{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          BitcashBank
        </Link>
        , a crypto-native banking platform aimed at expanding financial access
        through blockchain. I built token dashboards, backend services for
        cryptocurrency exchange, and interfaces for managing balances and
        transactions. The platform featured a consumer-grade wallet with
        WebAuthN-based key management, P2P systems, and overcollateralized
        crypto stablecoins designed for mainstream usability.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        NFT Marketplaces (2021-2022)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As NFTs gained mainstream attention in 2021, I contributed to two
        innovative marketplaces. At{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>{' '}
        (2021), I helped build a platform for minting NFTs backed by physical
        sports collectibles, leading smart contract integration and marketplace
        UI development for auctions on Polygon.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        At{' '}
        <Link href="/project/ztx" className="prose-link">
          ZTX
        </Link>{' '}
        (2022), I delivered the Web3 interface for a gaming-centric NFT
        platform, focusing on wallet connectivity, minting workflows, and asset
        discovery. Both projects expanded my experience with EVM-based
        development and token standards while addressing the unique challenges
        of digital asset ownership and trading.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Token Auctions: BitLauncher (2022-2023)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From late 2022 through 2023, I worked on{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>
        , a decentralized platform for AI startups raising capital through batch
        token auctions. Based on modified Gnosis Auction contracts, the protocol
        enabled fair price discovery through sealed-bid auctions. I led frontend
        development, implementing wallet integration, bidding mechanisms,
        auction status tracking, and real-time updates while ensuring security
        and transparency for participants.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">DeFi Options: Opyn (2023)</h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2023, I collaborated with the{' '}
        <Link href="/project/opyn" className="prose-link">
          Opyn
        </Link>{' '}
        team on their options trading platform, helping set up their testnet
        private beta frontend. I integrated their protocol into early-stage
        interfaces and configured testing environments while contributing to
        frontend components and UI/UX prototypes for trading interfaces, vault
        positions, margin mechanics, and option flows. I also explored AI
        assistant integration to improve user onboarding. This work deepened my
        understanding of on-chain financial primitives, particularly around
        composability, capital efficiency, and risk management.
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

      <div className="print:hidden">
        <Projects
          heading="Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

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
