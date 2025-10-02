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
        Early Financial Systems Experience
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
        My First Steps into Web3
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
        Building Infrastructure and Community
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2018 to 2020, my Web3 journey deepened through my work at{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        . What attracted me to the EOS ecosystem wasn't just its technical
        advantages, but the opportunity to help shape a nascent blockchain from
        its earliest days. I'll never forget participating in the global EOS
        mainnet launch—coordinating with teams across time zones as we
        collectively brought a new blockchain to life felt like witnessing
        digital history in the making. The collaborative nature of launching and
        maintaining blockchain infrastructure showed me how these technologies
        could bring together global communities around shared goals.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        During this period, I led the development of a private blockchain for
        Grant Thornton Labs, which became a profound learning experience about
        enterprise needs in the blockchain space. Working directly with
        accountants and auditors, I saw how features we often took for granted
        in public blockchains—like immutable records and transparent
        transactions—could transform traditional business processes. Building a
        USD-pegged stablecoin for streamlining intercompany transactions gave me
        insights into how traditional finance and blockchain technology could
        complement each other in real business applications.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Beyond building infrastructure, I found deep satisfaction in growing the
        Web3 community in Latin America. I created{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOS Rate
        </Link>
        , a Block Producer rating tool that helped users visualize complex
        governance metrics through an interactive radial graph. Seeing it
        adopted throughout the ecosystem was rewarding, but what truly energized
        me was leading workshops where I could watch newcomers experience their
        first blockchain interactions. These community moments reinforced my
        belief that education and accessibility were just as important as the
        technology itself.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Solving Data Challenges in Blockchain
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2020, I embarked on a deeply personal project to address a
        frustration I had experienced repeatedly—the difficulty of accessing and
        working with on-chain data in real-time. Drawing on my{' '}
        <Link href="/backend" className="prose-link">
          backend engineering expertise
        </Link>
        , I developed{' '}
        <Link href="/project/chaingraph" className="prose-link">
          ChainGraph
        </Link>
        , a specialized toolkit that made blockchain data more accessible
        through GraphQL. This project emerged from my own struggles with
        existing tools—I wanted to create something I would have loved to use in
        my previous projects. The moment when I first queried complex blockchain
        data with a simple GraphQL request and watched real-time updates stream
        into a test application felt like breaking through a barrier. Beyond the
        technical achievements, this project reinforced my belief that reducing
        friction for developers is essential for broader blockchain adoption.
        Creating tools that make complex technology more accessible continues to
        be a driving motivation in my work.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Building Financial Inclusion Through DeFi
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From late 2020 to 2021, I worked on{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          BitcashBank
        </Link>
        , a project that connected deeply with my background in both traditional
        finance and blockchain. Growing up in Costa Rica, I had seen firsthand
        how limited banking access could constrain economic opportunities. What
        excited me about BitcashBank was its mission to make financial services
        accessible to people typically excluded from traditional systems. I
        focused on creating interfaces that felt familiar to banking users while
        leveraging blockchain's unique advantages. One of my proudest
        achievements was implementing a WebAuthN-based wallet system that
        eliminated seed phrases—watching non-technical users securely access
        blockchain services without complicated key management validated our
        approach to accessibility. The P2P exchange systems and
        overcollateralized stablecoins we built demonstrated how blockchain
        could create financial products that didn't simply mimic traditional
        banking but offered entirely new possibilities for inclusion and
        transparency.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Bridging Physical and Digital Collectibles
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As NFTs emerged into mainstream awareness in 2021, I found myself drawn
        to their potential to transform how we think about ownership and
        authenticity. At{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>{' '}
        (2021), I worked on a concept that particularly fascinated me—bridging
        physical collectibles with digital ownership. As someone who collected
        basketball cards as a child, I immediately understood the value
        proposition of authenticated digital twins for physical items. The
        technical challenge of connecting physical items to blockchain records
        required creative solutions for authentication and verification flows.
        Working directly with sports collectors and watching their excitement
        when they understood how blockchain could enhance rather than replace
        their traditional collecting practices was especially rewarding.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        My work at{' '}
        <Link href="/project/ztx" className="prose-link">
          ZTX
        </Link>{' '}
        (2022) pushed me to explore new dimensions of digital ownership through
        gaming and virtual environments. Building wallet connectivity for WebGL
        experiences presented unique UX challenges—how could we make blockchain
        interactions feel seamless within immersive environments? I remember the
        satisfaction of testing an interface where users could naturally
        interact with their on-chain assets without breaking their gaming
        experience. These projects expanded my view of what blockchain could
        enable beyond financial applications, reinforcing my belief that digital
        ownership would become as intuitive and important as physical ownership
        in the coming years.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        BitLauncher Token Auctions
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

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Opyn DeFi Options Protocol
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2023, I collaborated with the{' '}
        <Link href="/project/opyn" className="prose-link">
          Opyn
        </Link>{' '}
        team on their options trading platform, helping set up their testnet
        private beta frontend. I integrated their protocol into early-stage
        interfaces and configured testing environments while contributing to
        frontend components and UI/UX prototypes for trading interfaces, vault
        positions, margin mechanics, and option flows. I also explored{' '}
        <Link href="/ai" className="prose-link">
          AI assistant integration
        </Link>{' '}
        to improve user onboarding. This work deepened my understanding of
        on-chain financial primitives, particularly around composability,
        capital efficiency, and risk management.
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
