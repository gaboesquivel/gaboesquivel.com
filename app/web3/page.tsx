import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import web3Img from 'public/images/work/ticoblockchain.jpg'

export default function Web3ExperiencePage() {
  const type = 'web3'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        Web3 Experience
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        My journey into Web3 began after years of working in traditional
        financial systems, where I witnessed firsthand the inefficiencies of how
        money moves between institutions. What drew me to blockchain wasn't just
        the technology itself, but its potential to transform how we create and
        exchange value. I remember the moment in 2017 when I first deployed a
        smart contract—watching code autonomously execute financial logic
        without intermediaries felt revolutionary. Since then, I've combined my{' '}
        <Link href="/fullstack" className="prose-link">
          fullstack expertise
        </Link>{' '}
        with blockchain knowledge to build systems that emphasize transparency,
        user ownership, and permissionless innovation—values that align deeply
        with my belief that technology should expand access rather than restrict
        it.
      </p>
      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        AMEX & Mobile Neobank
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My understanding of financial systems began taking shape at American
        Express (2009-2012), where I worked as a UI Engineer on their credit
        card platforms. Beyond just building interfaces, I had the opportunity
        to collaborate directly with payment processing teams, giving me a rare
        glimpse into how money actually flows through traditional systems. I was
        surprised by the layers of intermediaries and manual processes hidden
        behind what users experienced as simple transactions. These observations
        planted the seeds for what would later become a fascination with more
        efficient financial models.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        In 2015, I took on the role of Lead Architect for{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first digital bank. Building a fully-regulated neobank
        from scratch was eye-opening—I saw firsthand how challenging it was to
        innovate within established regulatory frameworks. While we succeeded in
        creating a more user-friendly banking experience, I found myself
        increasingly wondering if financial services could be reimagined more
        fundamentally. The limitations we encountered with traditional banking
        partners made me receptive to the decentralized finance concepts I would
        later explore.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="Web3 Development"
            src={web3Img}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Entering Web3: Knowledge ICO
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My formal entry into Web3 came in 2017 through{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>
        —one of the earliest platforms attempting to tokenize human expertise.
        What excited me about this project was its potential to create more
        direct relationships between knowledge sharing and reward systems. I
        still remember the moment I deployed my first ERC20 token to
        Ethereum—watching the transaction confirm and seeing the token appear in
        a test wallet was thrilling. As lead full-stack developer, I built both
        the token system and a knowledge graph visualization that made expertise
        networks visible to users. The technical challenges of wallet
        integration and token distribution taught me fundamental Web3 concepts,
        but more importantly, this project showed me how blockchain could create
        entirely new models for valuing human contributions.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        EOS Era: Fast Confrimations & WebAuthnN
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2018 to 2020, I focused on the EOS ecosystem, drawn by its
        performance and developer ergonomics. At{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , I helped launch the EOS Mainnet, managed infrastructure for
        EOSIO-based validators using{' '}
        <Link href="/tech/terraform" className="prose-link">
          Terraform
        </Link>{' '}
        and{' '}
        <Link href="/tech/docker" className="prose-link">
          Docker
        </Link>
        , and delivered custom blockchain solutions. The opportunity to help
        shape a nascent blockchain from its earliest days was a formative
        experience in my{' '}
        <Link href="/lead" className="prose-link">
          tech leadership
        </Link>{' '}
        career.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        One key project was a private blockchain for Grant Thornton Labs,
        designed to streamline intercompany transactions and automate tax logic
        using a USD-pegged stablecoin. The implementation used Azure cloud
        infrastructure with{' '}
        <Link href="/tech/reactjs" className="prose-link">
          React
        </Link>{' '}
        clients and{' '}
        <Link href="/tech/nodejs" className="prose-link">
          Node.js
        </Link>{' '}
        services.         The system featured immutable audit trails and public proof publication—an early example of{' '}
        <Link href="/institutions" className="prose-link">
          enterprise-grade
        </Link>{' '}
        transparency on-chain. This implementation demonstrated how traditional
        finance and blockchain technology could complement each other in real
        business applications.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        I also helped develop{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOS Rate
        </Link>
        , a community-driven Block Producer rating tool that became widely
        adopted in the EOS ecosystem. Alongside product work, I led local
        outreach efforts through workshops, meetups, and advocacy. Between 2019
        and 2020, I also worked on two Web3 consumer apps: at Emanate, I
        maintained the streaming platform and managed artist revenue
        distribution; at Sense Chat, I helped build a secure messaging app with
        integrated wallet and token incentives for community engagement.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        DeFi: Bitcash Bank & ChainGraph
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In late 2020, I joined Bitcash Bank, a crypto-native banking experiment
        aimed at expanding financial access. I worked across the stack—building
        token dashboards, backend services, and a UI for managing balances and
        transactions. The product centered around a consumer-grade wallet with
        WebAuthN-based key management and smooth onboarding, designed for
        mainstream usability. I contributed to the development of a P2P system
        and overcollateralized crypto stablecoins for each country.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        During this time, I also built ChainGraph, a high-performance blockchain
        indexer for EOS. It enabled fast, reliable transaction data queries, and
        strengthened my expertise in blockchain data structures, indexing, and
        real-time data pipelines. This project addressed a common frustration I
        had experienced repeatedly—the difficulty of accessing and working with
        on-chain data in real-time.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        The moment when I first queried complex blockchain data with a simple
        GraphQL request and watched real-time updates stream into a test
        application felt like breaking through a barrier. Beyond the technical
        achievements, this project reinforced my belief that reducing friction
        for developers is essential for broader blockchain adoption. Creating
        tools that make complex technology more accessible continues to be a
        driving motivation in my work.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Back to EVM: NFT Marketplaces
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2021, as NFTs reached global mainstream and trading volumes exploded,
        I contributed to two marketplaces exploring the tokenization of
        real-world and gaming assets. At{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>
        , I helped build a platform for minting NFTs backed by physical
        collectibles.         I led smart contract integration using{' '}
        <Link href="/tech/ethersjs" className="prose-link">
          Ethers.js
        </Link>
        , metadata pipelines, and Next.js SSR for the marketplace UI, supporting
        the initial auctions on Polygon.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        At{' '}
        <Link href="/project/ztx" className="prose-link">
          ZTX
        </Link>
        , I delivered the Web3 interface for a gaming-centric NFT
        platform—focusing on{' '}
        <Link href="/tech/webgl" className="prose-link">
          WebGL
        </Link>{' '}
        wallet connectivity, minting workflows, and searchable asset discovery
        using{' '}
        <Link href="/tech/nextjs" className="prose-link">
          Next.js
        </Link>{' '}
        and{' '}
        <Link href="/tech/tailwind" className="prose-link">
          Tailwind
        </Link>
        . The{' '}
        <Link href="/frontend" className="prose-link">
          frontend
        </Link>{' '}
        architecture emphasized speed, modular design, and creator-first
        economics.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Bitlauncher: Onchain AI Capital
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In late 2022, I joined Bitlauncher, a decentralized launch platform for
        AI startups raising capital through batch token auctions. The protocol
        is a fork of the widely-used Gnosis Auction contracts, adapted for fair
        price discovery through sealed-bid batch auctions.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        I led development of the frontend and wallet flows, integrating bidding
        mechanisms, auction status tracking, and real-time updates into a
        seamless user experience. My work ensured that participants could
        interact with the platform securely and transparently.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Derivatives: Opyn Options
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        I worked closely with the Opyn team to help set up their testnet private
        beta frontend, integrating the protocol into early-stage interfaces and
        configuring the environment for internal user testing. Beyond
        integration, I contributed to custom frontend components and UI/UX
        prototypes for trading interfaces, vault positions, margin mechanics,
        and option flows, and also experimented with an{' '}
        <Link href="/ai" className="prose-link">
          AI assistant
        </Link>{' '}
        to support user onboarding.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        This period deepened my understanding of financial primitives onchain—
        especially around composability, capital efficiency, and risk-managed
        exposure. Working with derivatives expanded my perspective on how
        blockchain can create sophisticated financial instruments while
        maintaining transparency and accessibility—principles that continue to
        guide my approach to Web3 development.
      </p>

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
