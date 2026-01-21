import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import fullstackCoding from 'public/images/work/nodeschool.jpg'
import blockchainImg from 'public/images/work/ticoblockchain.jpg'

export default function FullstackExperiencePage() {
  const type = 'fullstack'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        Fullstack Development Experience
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        My journey as a fullstack engineer began with a realization that
        powerful software experiences require seamless integration across every
        layer. While many developers specialized in either{' '}
        <Link href="/frontend" className="prose-link">
          frontend
        </Link>{' '}
        or{' '}
        <Link href="/backend" className="prose-link">
          backend
        </Link>{' '}
        technologies, I found myself drawn to the connections between them—the
        architecture that makes complete products possible. I still remember the
        first time I built an application end-to-end, watching data flow from
        database to interface without friction—it felt like completing a complex
        puzzle where every piece had to fit perfectly. Throughout my career,
        I've approached fullstack development as an integrated discipline where
        architecture decisions flow from user needs, rather than treating UI and
        infrastructure as separate concerns. This holistic perspective reflects
        my belief that technology should deliver cohesive solutions to real
        human problems, not just isolated technical achievements.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Early Career & Community Building
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        I began my tech journey at CenfoTec University in 2006, discovering a
        passion for software development. By 2008, I was building custom
        WordPress solutions at InterGraphicDESIGNS, gaining foundational
        experience. At American Express (2009-2012), I worked with PHP and Java
        to modernize credit card interfaces while learning how large-scale
        financial systems operate. When Node.js emerged, it transformed my
        approach to development—finally enabling true end-to-end JavaScript and
        sparking my vision of unified development.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        This passion led me to found{' '}
        <Link href="/project/costa-rica-js" className="prose-link">
          Costa Rica JS
        </Link>{' '}
        in 2010, which grew to over 2,000 members and became Central America's
        largest JavaScript community. Through this platform, I promoted Node.js
        as a unifying technology that could bridge traditionally separate
        frontend and backend roles, laying the groundwork for my fullstack
        approach.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        At{' '}
        <Link href="/project/amc-networks" className="prose-link">
          AMC Networks
        </Link>{' '}
        (2012-2014), I built an interactive streaming service that combined
        real-time features with media content delivery. This experience taught
        me how to handle complex user interactions and real-time data updates.
        Through{' '}
        <Link
          href="/blog/2016-06-nodeschool-international-day"
          className="prose-link"
        >
          NodeSchool workshops
        </Link>{' '}
        during this period, I trained developers while building valuable
        industry connections that would later open doors to exciting
        opportunities.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="Fullstack Development Setup"
            src={fullstackCoding}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Diverse Project Experience
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My community leadership opened doors to diverse projects that expanded
        my technical repertoire. I created{' '}
        <Link href="/project/arinc-microfids" className="prose-link">
          ARINC Microfids
        </Link>{' '}
        (2012), a mission-critical flight information display system that taught
        me about building systems requiring 24/7 reliability. For{' '}
        <Link href="/project/fantasy-tennis" className="prose-link">
          Fantasy Tennis
        </Link>{' '}
        (2013), I developed tournament management features with real-time
        scoring, which helped me understand how to present complex data in
        user-friendly formats.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        My journey continued with{' '}
        <Link href="/project/elder-scrolls-online" className="prose-link">
          Elder Scrolls Online
        </Link>{' '}
        (2014-2015), where I developed community features that connected gamers
        worldwide. At{' '}
        <Link href="/project/bureau-of-trade-beta" className="prose-link">
          Bureau of Trade
        </Link>{' '}
        (2015), I built an e-commerce marketplace that integrated with eBay.
        These varied experiences were transformative, teaching me to approach
        software architecture holistically rather than optimizing isolated
        components—a philosophy that would become central to my development
        approach.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Digital Banking & Financial Platforms
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        After my American Express experience, I took on a new challenge at{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>{' '}
        (2015-2016), Costa Rica's first mobile neobank. As Lead Software
        Architect, I designed and implemented the entire platform from scratch.
        This was a pivotal moment in my career—I wasn't just building features,
        but creating an entire financial ecosystem that would serve thousands of
        users in my home country.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Working within a regulated environment required me to master secure data
        handling, real-time transaction processing, and biometric authentication
        while maintaining compliance with banking regulations. This experience
        transformed my understanding of software development—I learned to build
        entire financial infrastructures rather than isolated applications. The
        philosophy of creating cohesive, end-to-end solutions where user
        experience and system architecture develop in harmony became fundamental
        to my approach, serving me well in both traditional and decentralized
        finance.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Creating Consumer Experiences
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Seeking to diversify my experience, I turned to the restaurant sector
        with{' '}
        <Link href="/project/eat-arcade" className="prose-link">
          Eat Arcade
        </Link>{' '}
        (2016-2017), creating a recommendation service for New York restaurants.
        This project allowed me to experiment with integrating various services
        into a cohesive whole—connecting Twilio for SMS, Stripe for payments,
        and Google Maps for location. The matching algorithm I developed to pair
        diners with restaurants based on preferences was particularly rewarding,
        reinforcing my belief in technology's ability to enhance everyday
        experiences through thoughtful integration.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Exploring Web3 Possibilities
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2017, I ventured into Web3 development at{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>
        . This represented a significant turning point in my career as I
        explored how blockchain could transform knowledge systems. I built an
        entire ecosystem that included smart contracts for ERC20 tokens and a
        knowledge graph visualization system. Looking back, this was more than
        just technical implementation—it was my first deep exploration of token
        economics and how decentralized systems could create novel incentive
        models for knowledge sharing and validation.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Implementing Enterprise Solutions
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2018 to 2020, I expanded my blockchain journey at{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , where I had the opportunity to work on both public and enterprise
        blockchain solutions. One of my most fulfilling community contributions
        was developing{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOS Rate
        </Link>{' '}
        (2018-2019), a governance tool with a unique radial graph interface that
        visualized multidimensional voting data. Creating this tool gave me
        firsthand experience with blockchain governance and the challenges of
        balancing transparency with performance in decentralized systems.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        A career highlight during this period was designing a private blockchain
        solution for Grant Thornton, one of the Big Four accounting firms. This
        enterprise-grade system used EOSIO technology with immutable audit
        trails and represented a significant professional achievement—applying
        blockchain to solve real business challenges in tax management and
        intercompany transactions. The experience of building this system and
        deploying it with Azure and Terraform expanded my infrastructure
        expertise beyond traditional databases to include cloud-native
        architectures, preparing me for future work with AWS serverless and
        Google Cloud for AI applications.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Advancing Data Infrastructure
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        By 2019-2020, I had recognized data infrastructure as a critical
        bottleneck in blockchain adoption and decided to focus on this
        challenge. This led me to create{' '}
        <Link href="/project/chaingraph" className="prose-link">
          ChainGraph
        </Link>{' '}
        (2020), a specialized data toolkit that became a personal passion
        project. Building this real-time GraphQL system for blockchain data
        marked an important technical transition in my career—moving from
        MongoDB to PostgreSQL for data-intensive applications, a foundation that
        would later prove valuable when working with vector extensions for AI.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        During the same period, at{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          BitcashBank
        </Link>{' '}
        (2020), I worked on bridging traditional finance with cryptocurrency—a
        challenge that allowed me to apply both my banking experience from Wink
        and my blockchain knowledge. Creating a platform that made
        cryptocurrency accessible to regular users through local currency
        stablecoins was especially satisfying. This project taught me how
        financial inclusion could be advanced through thoughtful design that
        combined secure transaction processing with intuitive interfaces for
        cryptocurrency newcomers.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Innovating in Digital Assets
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        The 2020-2022 period saw me exploring the then-emerging world of digital
        collectibles. At{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>{' '}
        (2021), I helped build an NFT marketplace that bridged physical sports
        memorabilia with digital ownership. This project was particularly
        interesting as it required creating interfaces that worked for both
        crypto-savvy users and traditional collectors who were new to digital
        assets. The challenge of making complex blockchain technology accessible
        and implementing authentication flows that connected physical items to
        digital tokens expanded my understanding of how blockchain could
        transform established industries.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        My journey continued with{' '}
        <Link href="/project/ztx" className="prose-link">
          ZTX
        </Link>{' '}
        (2022), where I helped create the foundation for a gaming metaverse
        platform. This project allowed me to combine my technical skills with my
        interest in virtual worlds, implementing wallet connectivity and NFT
        minting workflows that enabled players and creators to interact with
        digital assets of real economic value. Designing these systems
        reinforced my belief in the importance of rigorous TypeScript practices
        and type safety when building platforms where code directly impacts
        users' digital property.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        DeFi & Options Trading
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        After my work with collectibles, I turned my attention to decentralized
        finance. At{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>{' '}
        (2022-2023), I developed a platform that united two of my passions:
        blockchain and AI. Creating a specialized system for token auctions that
        helped AI startups raise capital was particularly meaningful, allowing
        me to contribute to the growth of innovative projects. The technical
        challenges of building cross-chain bridges and implementing batch
        auction contracts with real-time analytics pushed my skills to new
        levels, requiring deep knowledge of both blockchain protocols and data
        visualization techniques.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Working with{' '}
        <Link href="/project/opyn" className="prose-link">
          Opyn
        </Link>{' '}
        (2023) represented my deepest dive into decentralized finance.
        Developing their options trading platform on Arbitrum challenged me to
        apply my fullstack skills to sophisticated financial instruments.
        Creating interfaces that served both professional traders and casual
        DeFi users required balancing technical complexity with accessibility—a
        challenge that pushed me to grow as both a developer and a designer.
        This experience deepened my understanding of financial primitives and
        on-chain protocols, knowledge that continues to influence how I approach
        complex systems.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Embracing AI Technologies
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        By 2023-2024, I had become fascinated with AI's potential to transform
        software experiences. At{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots.ai
        </Link>{' '}
        (2023), I created a platform for specialized AI assistants that drew on
        my accumulated experience with databases and cloud systems. This project
        represented an exciting evolution in my career as I combined my
        technical knowledge with emerging AI capabilities. Working with vector
        databases and large language models opened new creative possibilities,
        allowing me to build systems that could understand and respond to human
        language in increasingly sophisticated ways.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Most recently, my journey led me to{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>{' '}
        (2024), where I built an AI assistant that combines voice and chat
        interfaces to help lawyers navigate complex case information. This
        project has been particularly meaningful as it applies technology to
        improve professional workflows in the legal field. Creating a system
        that could securely handle sensitive documents while providing natural
        language understanding required bringing together everything I've
        learned about mobile development, cloud systems, and AI. Seeing how this
        assistant helps lawyers access information more efficiently has
        reinforced my belief in technology's power to enhance human capabilities
        rather than replace them.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="Blockchain Technology"
            src={blockchainImg}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="print:hidden">
        <Projects
          heading="Fullstack Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

      <LatestPosts category="Fullstack" title="Latest Fullstack Articles" />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Fullstack Development Experience - Gabo Esquivel',
  description:
    'Fullstack Engineer with 15+ years building end-to-end applications with TypeScript, React, Node.js, and modern cloud infrastructure',
  keywords: [
    'fullstack engineer',
    'end-to-end development',
    'javascript',
    'typescript',
    'react',
    'node.js',
    'next.js',
    'database design',
    'API architecture',
    'cloud infrastructure',
    'system design',
    'full application lifecycle',
  ],
  openGraph: {
    title: 'Fullstack Development Experience - Gabo Esquivel',
    description:
      'Fullstack Engineer with 15+ years building end-to-end applications with TypeScript, React, Node.js, and modern cloud infrastructure',
    type: 'profile',
  },
}
