import Image from 'next/image'
import nodeschool from 'public/images/bio/nodeschool-costa-rica.jpg'
import gabocoding from 'public/images/bio/gabo-coding.jpg'
import { allBlogs } from 'contentlayer/generated'
import { PostCard } from '../../components/blog/post-card'

function getLatestPosts(limit = 4) {
  // Sort by date descending to get the most recent posts
  const sortedPosts = [...allBlogs].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Take only the specified number of posts
  return sortedPosts.slice(0, limit);
}

export default function BioPage() {
  const latestPosts = getLatestPosts();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        Professional Journey
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        I began my tech journey at{' '}
        <a
          href="https://www.cenfotec.ac.cr/"
          target="_blank"
          rel="noreferrer"
          className="prose-link"
        >
          CenfoTec University
        </a>{' '}
        in San José in 2006, where I discovered my passion for software product
        development. By 2008, I was crafting custom WordPress
        solutions for businesses at InterGraphicDESIGNS. In 2009, I stepped into a UI Engineer role at{' '}
        <a href="/project/american-express" className="prose-link">
          American Express
        </a>
        , where I helped modernize their web platform and implement responsive layouts.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        In 2010, I founded{' '}
        <a href="/project/costa-rica-js" className="prose-link">
          Costa Rica JS
        </a>
        , which became Central America's largest JavaScript community with over 2000 
        developers. It was incredible to see how this community helped foster the 
        region's tech ecosystem as Node.js and modern web frameworks gained prominence.
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
        My involvement in the local tech community helped kickstart my career as a freelance developer. I worked on diverse projects across multiple industries:
      </p>
      <ul className="list-disc pl-4 mb-4 space-y-1">
        <li className="prose prose-neutral dark:prose-invert">A tennis tournament management system for <a href="/project/fantasy-tennis" className="prose-link">Fantasy Tennis</a></li>
        <li className="prose prose-neutral dark:prose-invert">A flight display system for <a href="/project/arinc-microfids" className="prose-link">ARINC Microfids</a></li>
        <li className="prose prose-neutral dark:prose-invert">A fitness tracking app that connected with Fitbit for <a href="/project/4tius-fitness-data-tracker" className="prose-link">4Tius</a></li>
        <li className="prose prose-neutral dark:prose-invert">An energy usage monitoring tool for <a href="/project/gridium" className="prose-link">Gridium</a></li>
        <li className="prose prose-neutral dark:prose-invert">A movie streaming app for <a href="/project/amc-yeah-tv-facebook-app" className="prose-link">AMC Networks</a></li>
        <li className="prose prose-neutral dark:prose-invert">An online marketplace for <a href="/project/bureau-of-trade-beta" className="prose-link">Bureau of Trade</a> integrated with eBay</li>
        <li className="prose prose-neutral dark:prose-invert">The community website for <a href="/project/elder-scrolls-online" className="prose-link">Elder Scrolls Online</a></li>
        <li className="prose prose-neutral dark:prose-invert">A restaurant recommendation service for <a href="/project/eat-arcade" className="prose-link">Eat Arcade</a> in NYC</li>
      </ul>

      <p className="prose prose-neutral dark:prose-invert">
        In 2015, I joined{' '}
        <a href="/project/wink" className="prose-link">
          Wink
        </a>
        , Costa Rica's first digital bank, as their software architect. I led the 
        development of their mobile banking platform, implementing everything from 
        biometric verification systems to core banking integrations.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        My journey into Web3 began in 2017 at{' '}
        <a href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </a>
        , where I got hands-on experience with Ethereum, developing the ERC20 token, supporting their ICO and 
        building their Web3 marketplace. That same year, I co-founded{' '}
        <a href="/project/asoblockchain" className="prose-link">
          AsoBlockchain, Costa Rica's Blockchain Association
        </a>
        , which focuses on educational initiatives and lobbying efforts with regulators and banks
        and{' '}
        <a
          href="/project/cryptocantinacr"
          className="prose-link"
        >
          CryptoCantinaCR
        </a>{' '}
        crypto-focused meetups.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <a href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </a>
        , I participated in the EOS Mainnet launch and managed other EOSIO-based
        blockchain validators. I architected a custom private
        blockchain for Grant Thornton Labs that enabled efficient intercompany
        transactions and tax management using a stablecoin system, with
        immutable record trails via IPFS. I also developed{' '}
        <a href="/project/eos-rate" className="prose-link">
          EOS Rate
        </a>, a
        community-driven tool for rating Block Producers, and contributed to the
        local blockchain ecosystem through workshops and meetups.
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
        <a href="/project/emanate" className="prose-link">
          Emanate
        </a>
        , a Web3-powered music platform where I maintained the streaming service and back office for artist revenue distribution; {' '}
        <a href="/project/make-sense-labs" className="prose-link">
          Sense Chat
        </a>
        , a secure messaging app with built-in wallet and token incentives for communities; and {' '}
        <a href="/project/bitcashbank" className="prose-link">
          Bitcash
        </a>
        , a p2p exchange system with crypto-collateralized stablecoins.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <a href="/project/bitcashbank" className="prose-link">
          Bitcash
        </a>
        , we developed an innovative peer-to-peer exchange system featuring
        browser-based transaction signing and a clever QR code system for secure 
        cross-app authentication. We also implemented real-time chat for direct trading 
        and built a blockchain indexer to ensure smooth operations.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        In 2021, at{' '}
        <a href="/project/raremint" className="prose-link">
          Raremint
        </a>
        , I enhanced their NFT marketplace for
        digitized sports collectibles. I developed a specialized EVM NFT data
        indexer that significantly improved marketplace performance and
        implemented SSR to optimize the user experience.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        In 2022, at{' '}
        <a href="/project/ztx" className="prose-link">
          ZTX
        </a>
        , I established the
        foundational React architecture and implemented wallet
        connectivity patterns that enabled seamless integration between the game
        engine and blockchain interactions.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        Since late 2023 at{' '}
        <a href="/project/bitlauncher" className="prose-link">
          bitlauncher.ai
        </a>
        , I've been exploring the intersection of AI and Web3, taking a product
        engineering approach that balances technical execution with user
        experience. My work involves implementing cross-chain token bridges,
        building real-time bidding systems, developing AI chatbots with data retrieval, and creating AI-assisted
        development workflows.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        Throughout my 15+ year journey, I've evolved into a{' '}
        <a href="/blog/2025-03-the-product-engineer" className="prose-link">
          product engineer
        </a>{' '}
        who bridges technical execution with user experience. My focus remains on
        emerging technologies like Web3 and AI, but always through the lens of
        solving real human problems and delivering tangible value. Whether it's
        architecting decentralized systems or implementing AI solutions, I
        approach each challenge by combining technical expertise with product
        thinking to create solutions that truly resonate with users.
      </p>

      {latestPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-bold text-xl mb-4">Lastest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
