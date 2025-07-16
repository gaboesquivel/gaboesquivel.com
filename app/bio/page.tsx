import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import gabocoding from 'public/images/bio/gabo-coding.jpg'
import nodeschool from 'public/images/bio/nodeschool-costa-rica.jpg'
import { LatestPosts } from '../../components/blog/latest-posts'

export default function BioPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        Professional Journey
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        I began my tech journey at CenfoTec University in San José in 2006,
        where I discovered a passion for software product development. By 2008,
        I was crafting custom WordPress solutions for businesses at
        InterGraphicDESIGNS. In 2009, I stepped into a UI Engineer role at{' '}
        <Link href="/project/american-express" className="prose-link">
          American Express
        </Link>
        , where I helped modernize their web platform and implement responsive
        layouts.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        In 2010, I founded{' '}
        <Link href="/project/costa-rica-js" className="prose-link">
          Costa Rica JS
        </Link>
        , which grew to become Central America's largest JavaScript community,
        with over 2,000 developers. It was incredible to see how this community
        helped foster the region's tech ecosystem as Node.js and modern web
        frameworks gained prominence.
      </p>

      <div className="gap-4 my-8 columns-1">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="Nodeschool Costa Rica"
            src={nodeschool}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <p className="prose prose-neutral dark:prose-invert">
        My involvement in the local tech community helped to kickstart my career
        as a freelance developer. I worked on diverse projects across multiple
        industries:
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

      <p className="prose prose-neutral dark:prose-invert">
        In 2015, I joined{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first digital bank, as a software architect. I led the
        development of their mobile banking platform, implementing everything
        from biometric verification systems to core banking integrations.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        My journey into Web3 began in 2017 at{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>
        , where I gained hands-on experience with Ethereum, developing the ERC20
        token, supporting their ICO, and building their Web3 marketplace. That
        same year, I co-founded{' '}
        <Link href="/project/asoblockchain" className="prose-link">
          AsoBlockchain, Costa Rica's Blockchain Association
        </Link>
        , which focuses on educational initiatives and lobbying efforts with
        regulators and banks and{' '}
        <Link href="/project/cryptocantinacr" className="prose-link">
          CryptoCantinaCR
        </Link>{' '}
        crypto-focused meetups.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , I participated in the EOS Mainnet launch and managed other EOSIO-based
        blockchain validators. I architected a custom private blockchain for
        Grant Thornton Labs that enabled efficient intercompany transactions and
        tax management using a stablecoin system, with immutable record trails
        via IPFS. I also developed{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOS Rate
        </Link>
        , a community-driven tool for rating Block Producers, and contributed to
        the local blockchain ecosystem through workshops and meetups.
      </p>

      <div className="gap-4 my-8 columns-1">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="Gabo Esquivel coding"
            src={gabocoding}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover object-top rounded-lg"
          />
        </div>
      </div>

      <p className="prose prose-neutral dark:prose-invert">
        Between 2019 and 2021, I worked on several exciting projects:{' '}
        <Link href="/project/emanate" className="prose-link">
          Emanate
        </Link>
        , a Web3-powered music platform where I maintained the streaming service
        and back office for artist revenue distribution;{' '}
        <Link href="/project/make-sense-labs" className="prose-link">
          Sense Chat
        </Link>
        , a secure messaging app with a built-in wallet and token incentives for
        communities; and{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          Bitcash
        </Link>
        , a P2P exchange system with crypto-collateralized stablecoins.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          Bitcash
        </Link>
        , we developed an innovative peer-to-peer exchange system featuring
        browser-based transaction signing and a clever QR code system for secure
        cross-app authentication. We also implemented real-time chat for direct
        trading and built a blockchain indexer to ensure smooth operations.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        In 2021, at{' '}
        <Link href="/project/raremint" className="prose-link">
          Raremint
        </Link>
        , I enhanced their NFT marketplace for digitized sports collectibles. I
        developed a specialized EVM NFT data indexer that significantly improved
        marketplace performance and implemented SSR to optimize the user
        experience.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        In 2022, at{' '}
        <Link href="/project/ztx" className="prose-link">
          ZTX
        </Link>
        , I established the foundational React architecture and implemented
        wallet connectivity patterns, enabling seamless integration between the
        game engine and blockchain interactions.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        Since late 2022 at{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          bitlauncher.ai
        </Link>
        , I've been exploring the intersection of AI and Web3, adopting a
        product engineering approach that balances technical execution with user
        experience. My work involves implementing cross-chain token bridges,
        building real-time bidding systems, developing AI chatbots with data
        retrieval, and creating AI-assisted development workflows.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        In 2023, parallel to bitlauncher, I worked with{' '}
        <Link href="/project/opyn" className="prose-link">
          Opyn
        </Link>
        , a decentralized options protocol on Arbitrum. I implemented their
        initial trading interface and data indexing setup for Arbitrum Testnet.
        This experience deepened my understanding of financial primitives
        onchain, especially around composability, capital efficiency, and
        risk-managed exposure.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>{' '}
        in 2024, I integrated an AI assistant into their mobile app, enhancing
        legal productivity through voice and chat interfaces.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        Throughout my 15+ year journey, I've evolved into a{' '}
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
        , but always through the lens of solving real human problems and
        delivering tangible value. Whether it's architecting decentralized
        systems or implementing AI solutions, I approach each challenge by
        combining technical expertise with product thinking to create solutions
      </p>

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
