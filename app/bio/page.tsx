import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import gabocoding from 'public/images/bio/gabo-coding.jpg'
import nodeschool from 'public/images/bio/nodeschool-costa-rica.jpg'
import { LatestPosts } from '../../components/blog/latest-posts'
import { ContactInfo } from '../../components/shared/contact-info'
import { LetsConnect } from '../../components/shared/lets-connect'

export default function BioPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        Professional Journey
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        I began my tech career at CenfoTec University in San José in 2006, where
        I discovered a passion for software product development. By 2008, I was
        building custom WordPress solutions for businesses at
        InterGraphicDESIGNS. In 2009, I joined{' '}
        <Link href="/project/american-express" className="prose-link">
          American Express
        </Link>{' '}
        as a UI Engineer, helping modernize their web platform and implement
        responsive layouts.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        In 2010, I founded{' '}
        <Link href="/project/costa-rica-js" className="prose-link">
          Costa Rica JS
        </Link>
        , which grew into Central America's largest JavaScript community with
        over 2,000 developers. This community became a driving force in the
        region's tech ecosystem as Node.js and modern single pageframeworks
        gained prominence.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="Nodeschool Costa Rica"
            src={nodeschool}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg "
          />
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Freelance Work
      </h2>

      <p className="prose prose-neutral dark:prose-invert">
        My community work opened doors to freelancing across industries. <br />
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        Projects included:
      </p>
      <ul className="list-disc pl-4 mb-4 space-y-1">
        <li className="prose prose-neutral dark:prose-invert">
          A tennis tournament management system for{' '}
          <Link href="/project/fantasy-tennis" className="prose-link">
            Fantasy Tennis
          </Link>
        </li>
        <li className="prose prose-neutral dark:prose-invert">
          A flight display system for{' '}
          <Link href="/project/arinc-microfids" className="prose-link">
            ARINC Microfids
          </Link>
        </li>
        <li className="prose prose-neutral dark:prose-invert">
          A fitness tracking app that connected with Fitbit for{' '}
          <Link
            href="/project/4tius-fitness-data-tracker"
            className="prose-link"
          >
            4Tius
          </Link>
        </li>
        <li className="prose prose-neutral dark:prose-invert">
          An energy usage monitoring tool for{' '}
          <Link href="/project/gridium" className="prose-link">
            Gridium
          </Link>
        </li>
        <li className="prose prose-neutral dark:prose-invert">
          A movie streaming app for{' '}
          <Link href="/project/amc-yeah-tv-facebook-app" className="prose-link">
            AMC Networks
          </Link>
        </li>
        <li className="prose prose-neutral dark:prose-invert">
          An online marketplace for{' '}
          <Link href="/project/bureau-of-trade-beta" className="prose-link">
            Bureau of Trade
          </Link>{' '}
          integrated with eBay
        </li>
        <li className="prose prose-neutral dark:prose-invert">
          The community website for{' '}
          <Link href="/project/elder-scrolls-online" className="prose-link">
            Elder Scrolls Online
          </Link>
        </li>
        <li className="prose prose-neutral dark:prose-invert">
          A restaurant recommendation service for{' '}
          <Link href="/project/eat-arcade" className="prose-link">
            Eat Arcade
          </Link>{' '}
          in NYC
        </li>
      </ul>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Digital Banking
      </h2>

      <p className="prose prose-neutral dark:prose-invert">
        In 2015, I became Software Architect at{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first digital bank. I led development of their mobile
        banking platform, including biometric verification and core banking
        integrations. I was responsible for technology selection, project
        planning, recruiting and training developers, and API integration with
        partner bank and vendors.
      </p>
      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Entering Web3
      </h2>

      <p className="prose prose-neutral dark:prose-invert">
        I started Web3 in 2017 at{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>
        , where I developed an ERC20 token, supported their ICO, and built a
        Web3 marketplace. That same year, I co-founded{' '}
        <Link href="/project/asoblockchain" className="prose-link">
          AsoBlockchain, Costa Rica's Blockchain Association
        </Link>
        , and organized{' '}
        <Link href="/project/cryptocantinacr" className="prose-link">
          CryptoCantinaCR
        </Link>{' '}
        meetups.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , I contributed to the EOS Mainnet launch, managed EOSIO validators, and
        architected a private blockchain for Grant Thornton Labs to streamline
        intercompany transactions and tax management using stablecoins and IPFS.
        I also developed{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOS Rate
        </Link>
        , a widely used community rating tool for Block Producers, while leading
        workshops and meetups.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="Gabo Esquivel coding"
            src={gabocoding}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover object-top rounded-lg print:hidden"
          />
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Consumer Web3 & DeFi
      </h2>

      <p className="prose prose-neutral dark:prose-invert">
        Between 2019–2021, I worked on:
      </p>

      <ul className="list-disc pl-4 mb-4 space-y-1">
        <li className="prose prose-neutral dark:prose-invert">
          <Link href="/project/emanate" className="prose-link">
            Emanate
          </Link>
          : a music streaming platform with onchain artist revenue distribution
        </li>
        <li className="prose prose-neutral dark:prose-invert">
          <Link href="/project/make-sense-labs" className="prose-link">
            Sense Chat
          </Link>
          : a secure messaging app with wallet and token incentives
        </li>
        <li className="prose prose-neutral dark:prose-invert">
          <Link href="/project/bitcashbank" className="prose-link">
            Bitcash
          </Link>
          : a P2P exchange with crypto-collateralized stablecoins, browser-based
          signing, QR authentication, real-time chat, and blockchain indexing
        </li>
      </ul>

      <p className="prose prose-neutral dark:prose-invert">
        In 2021, at{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>
        , I optimized their NFT marketplace for digitized sports collectibles by
        building a specialized EVM NFT indexer and implementing SSR.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        In 2022, at{' '}
        <Link href="/project/ztx" className="prose-link">
          ZTX
        </Link>
        , I delivered the foundational React architecture and wallet
        connectivity for its blockchain-enabled virtual world.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        AI & Web3 Convergence
      </h2>

      <p className="prose prose-neutral dark:prose-invert">
        Since late 2022, I've been leading development at{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          Bitlauncher.ai
        </Link>
        , an AI and crypto launchpad. My work spans cross-chain token bridges,
        real-time bidding systems, AI chatbots with RAG, and AI-assisted
        development workflows.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        In 2023, I worked with{' '}
        <Link href="/project/opyn" className="prose-link">
          Opyn
        </Link>
        , a decentralized options protocol on Arbitrum, developing their initial
        trading interface and data indexing system. This sharpened my expertise
        in financial primitives like composability, capital efficiency, and risk
        management.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots.ai
        </Link>
        , in 2024, I architected the Next.js application and developed a
        platform with specialized chatbots and AI-driven workflows.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>{' '}
        in 2025, I integrated an AI assistant into their app, combining voice
        and chat interfaces to enhance productivity and case file access.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        My Approach
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        With 15+ years of experience, I work as a{' '}
        <Link href="/blog/2025-03-the-product-engineer" className="prose-link">
          product engineer
        </Link>{' '}
        who bridges technical execution with user experience. My focus remains
        on emerging technologies like{' '}
        <Link href="/web3" className="prose-link">
          Web3
        </Link>{' '}
        and{' '}
        <Link href="/ai" className="prose-link">
          AI
        </Link>
        , focusing on solving real human problems and delivering tangible value.
        I combine technical expertise with product thinking to create solutions
        that are innovative, practical, and user-centric, ensuring technology
        enhances human capabilities and improves everyday life.
      </p>

      <ContactInfo />

      {/* <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight hidden print:block">
        Tech Stack
      </h2>

      <div className="prose prose-neutral dark:prose-invert hidden print:block">
        <ul className="list-none space-y-2 leading-relaxed">
          <li>
            <strong>Languages & Core:</strong> TypeScript, JavaScript, Solidity,
            C++, Ruby on Rails, SQL / PostgreSQL, GraphQL, CSS
          </li>
          <li>
            <strong>Frontend & UI:</strong> ReactJS, React Native, Next.js,
            Remix, Expo, AngularJS, WebGL, Tailwind CSS, ShadcnUI, Framer
            Motion, Stitches, Zustand, Zod, TanStack Query/Form/Start, nuqs,
            Bootstrap, LESS, SASS, Mootools, jQuery
          </li>
          <li>
            <strong>Backend & Infra:</strong> Node.js, Supabase, MongoDB, Redis,
            Express, Hasura, Serverless, Trigger.dev
          </li>
          <li>
            <strong>Cloud & DevOps:</strong> AWS, GCP, Azure, Heroku, Netlify,
            Vercel, Docker, Terraform, CI/CD (GitHub Actions, GitLab CI)
          </li>
          <li>
            <strong>Web3 & Blockchain:</strong> Ethereum / EVM, EOS / Antelope,
            Polygon, Arbitrum, Optimism, Base, zkEVMs, Flow Blockchain, Niftory,
            Polkadot / Substrate, NFTs, Viem, Wagmi, EthersJS, Ponder, Foundry,
            Hardhat, ThirdWeb, OpenZeppelin, Chainlink, The Graph, Moralis,
            WalletConnect, WebAuthn, Gnosis Auctions, IPFS, ChainGraph
          </li>
          <li>
            <strong>AI & Data:</strong> OpenAI, AI SDKs, LLMs, RAG
            architectures, Realtime API, Anthropic Claude, Cursor, v0.dev,
            SourceryAI, pgvector for vector search
          </li>
          <li>
            <strong>Other Tools & Platforms:</strong> Stripe, Twilio,
            Brightcove, Omniture, Adobe mBox, Google Analytics, Tag Manager,
            ViroAR, WordPress, DatoCMS, Content Management Systems, Biometrics,
            Faye, Data Charts
          </li>
        </ul>
      </div> */}

      <LetsConnect />
      <LatestPosts />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Professional Journey | Gabo Esquivel',
  description: 'Product Engineer specializing in Web3 and AI technologies.',
  openGraph: {
    title: 'Professional Journey | Gabo Esquivel',
    description: 'Product engineer specializing in Web3 and AI technologies.',
    images: [
      {
        url: '/images/bio/gabo-coding.jpg',
        width: 1200,
        height: 630,
        alt: 'Gabo Esquivel coding',
      },
    ],
  },
}
