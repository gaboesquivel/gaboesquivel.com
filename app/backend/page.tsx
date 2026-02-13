import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { VideoEmbed } from 'components/video-embed'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import backendImg from 'public/images/2016/06/nodeschool.jpg'

export default function BackendExperiencePage() {
  const type = 'backend'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        Backend Development Experience
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        My journey into backend development began with a fascination for how
        systems communicate behind the scenes. While many developers were
        focused on creating visually appealing interfaces, I found myself drawn
        to the architecture that powers these experiences. I still remember the
        first time I built a real-time data pipeline that seamlessly connected
        disparate systems—watching data flow through the infrastructure I'd
        created felt like solving an intricate puzzle. Throughout my career,
        I've approached backend engineering with a focus on building reliable
        foundations that enable innovation at the application layer, believing
        that thoughtful system design creates both technical stability and
        business agility.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Early Node.js & Community Building
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        I adopted Node.js in Latin America around 2010-2011, when server-side
        JavaScript was just emerging as a viable backend technology. What
        excited me about Node wasn't just the technical aspects, but its
        potential to unify frontend and backend development under a single
        language. To build a regional community around this technology, I
        founded{' '}
        <Link href="/project/costa-rica-js" className="prose-link">
          Costa Rica JS
        </Link>{' '}
        to promote server-side JavaScript throughout Central America. Through{' '}
        <Link
          href="/blog/2016-06-nodeschool-international-day"
          className="prose-link"
        >
          NodeSchool workshops
        </Link>{' '}
        and regular meetups, I helped local developers bridge the gap between
        client and server development, creating a thriving ecosystem that
        continues today.
      </p>

      <VideoEmbed
        videoId="167755778"
        platform="vimeo"
        title="NodeSchool Costa Rica 2016"
      />

      <p className="prose prose-neutral dark:prose-invert mt-4">
        In 2014, I applied this expertise to build{' '}
        <Link href="/project/4tius-fitness-data-tracker" className="prose-link">
          4Tius Fitness Data Tracker
        </Link>
        , implementing a fitness analytics platform with AWS, MongoDB, and
        Node.js. This project presented unique challenges in data
        synchronization and real-time processing—I remember the satisfaction of
        seeing activity data stream from wearable devices into our system and
        transform into actionable insights almost instantly. The system
        processed wearable device data and served analytics via RESTful APIs,
        leveraging Node's event-driven architecture for real-time data handling
        in ways that would have been much more complex with traditional backend
        technologies.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Financial Systems & Digital Banking
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2015, I joined{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first neo-bank, where I faced the significant challenge
        of developing backend services that had to integrate with traditional
        banking systems while delivering a modern digital experience. The
        technical complexity was matched only by the regulatory requirements—I
        recall spending weeks ensuring our transaction processing met both
        security standards and compliance rules while still providing a seamless
        user experience. I implemented secure biometric authentication and
        transaction processing systems, laying the foundation for my later work
        in financial applications. This experience taught me the importance of
        building resilient systems that could handle sensitive financial data
        with both security and performance in mind—a balance that would become
        increasingly important in my later work with blockchain technologies.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Entering Blockchain Infrastructure
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Building on my experience with traditional financial systems, I ventured
        into blockchain development in 2017 at{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>
        , where I built backend services for their token rewards dashboard,
        implementing systems to manage expertise metrics and decentralized
        identity. What fascinated me most during this period was the paradigm
        shift from centralized to distributed systems—rethinking authentication,
        data persistence, and transaction processing in entirely new ways.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        From 2018 to 2020 at{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , I worked extensively with blockchain infrastructure, playing a key
        role in the EOS mainnet launch and managing validators for multiple
        networks. I still remember the precise moment when blocks began
        producing on the mainnet—after months of preparation and testing, seeing
        the network come alive was exhilarating. A highlight of this period was
        building a custom private blockchain for Grant Thornton to handle
        intercompany transactions and tax management using stablecoins, with
        immutable audit trails. This enterprise implementation
        demonstrated how blockchain technology could solve real business
        problems with enhanced transparency and efficiency—bridging the gap
        between emerging tech and traditional{' '}
        <Link href="/institutions" className="prose-link">
          institutional needs
        </Link>
        .
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Data Infrastructure & GraphQL
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        For{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOS Rate
        </Link>
        , I developed backend services to support the community-driven Block
        Producer rating tool, implementing data aggregation and secure voting
        mechanisms that became widely adopted in the EOS ecosystem. The
        challenge of creating a system that was both transparent enough for
        community trust and secure enough to prevent manipulation taught me
        valuable lessons about designing public-facing systems.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        In 2020, I created{' '}
        <Link href="/project/chaingraph" className="prose-link">
          ChainGraph
        </Link>
        , a specialized real-time GraphQL toolkit for blockchain applications.
        This project emerged from my frustration with existing tools for
        blockchain data access—I wanted to create something that made complex
        on-chain data accessible through modern API patterns. The moment when I
        first queried complex blockchain data with a simple GraphQL request and
        watched real-time updates stream into a test application felt like
        breaking through a barrier that had been limiting developer
        productivity. ChainGraph featured sophisticated blockchain data indexing
        and event streaming capabilities, showcasing how proper data modeling
        could transform complex blockchain interactions into developer-friendly
        experiences. Beyond the technical achievements, this project reinforced
        my belief that reducing friction for developers is essential for broader
        blockchain adoption.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Specialized Data Indexing
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Building on my blockchain data experience, I developed specialized data
        indexing solutions for various projects. At{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>{' '}
        (2021), I built an EVM NFT data indexer using Moralis streams to
        support their NFT marketplace for digitized sports collectibles. The
        technical challenge of efficiently indexing NFT metadata and transaction
        history while maintaining real-time updates pushed me to develop new
        approaches to blockchain data processing.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        At{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>{' '}
        (2022-2023), I built a custom indexer for EOS EVM using Node.js with
        Viem EVM event subscriptions, enabling real-time transaction monitoring
        and analytics. The complexity of processing cross-chain transactions
        required creative solutions for data consistency and synchronization
        between different blockchain networks. For{' '}
        <Link href="/project/opyn" className="prose-link">
          Opyn
        </Link>{' '}
        (2023), I set up a Ponder indexing service with PostgreSQL for chain
        data, creating efficient data structures for options protocol
        information. This work with financial derivatives data required
        particularly careful attention to data accuracy and performance, as
        options pricing and positions needed to update in near real-time for
        traders.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Cloud Architecture & DevOps
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Throughout my career, I've implemented modern cloud architecture
        principles across my backend systems. At{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>{' '}
        (2017), I built scalable serverless infrastructure using AWS to
        support their ICO platform. I remember the challenge of designing
        systems that could handle unpredictable traffic spikes during token
        sales—creating architectures that would automatically scale without
        manual intervention. For BitcashBank (2020-2021), I designed cloud
        infrastructure focused on handling financial transactions with high
        availability and security requirements, implementing redundancy patterns
        that ensured system reliability even during partial outages.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        My experience spans AWS, GCP, and various serverless technologies,
        allowing me to build scalable, cost-efficient solutions tailored to
        specific project needs. As a{' '}
        <Link href="/fullstack" className="prose-link">
          fullstack developer
        </Link>
        , I connect these backend systems with{' '}
        <Link href="/frontend" className="prose-link">
          modern interfaces
        </Link>
        , implementing CI/CD pipelines, container orchestration, and
        infrastructure as code practices to ensure reliable deployments and
        operations. This integrated approach has been particularly valuable when
        building systems that need to evolve rapidly while maintaining
        stability—creating a foundation that supports innovation without
        sacrificing reliability.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        AI & Vector Search Systems
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Since 2023, I've focused increasingly on integrating AI capabilities
        into backend systems. At{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots
        </Link>{' '}
        (2023-2024), I developed specialized AI agents and chatbot
        interfaces, implementing backends that efficiently process complex user
        queries while managing large knowledge bases. The challenge of creating
        systems that could understand natural language while delivering precise
        information pushed me to explore advanced retrieval techniques and
        context management approaches.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        For BitLauncher (2022-2024), I implemented a chatbot assistant for
        document retrieval using the Vercel AI SDK, enhancing user
        interaction and information access. Most recently, for{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>
        's AI assistant (2024-2025), I built a RAG architecture that
        handles sensitive legal documents while maintaining strict privacy
        requirements. This project was particularly meaningful as it required
        balancing powerful AI capabilities with stringent privacy
        controls—ensuring that sensitive legal information remained protected
        while still being accessible through natural language queries. These
        projects showcase my ability to build retrieval-augmented generation
        systems using vector databases like Supabase with pgvector, enabling
        sophisticated, context-aware{' '}
        <Link href="/ai" className="prose-link">
          AI interactions
        </Link>{' '}
        that augment human capabilities rather than simply automating tasks.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Backend Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

      <LatestPosts category="Backend" title="Latest Backend Articles" />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Backend Development Experience - Gabo Esquivel',
  description:
    'Backend Engineer with 15+ years experience building scalable systems with Node.js, PostgreSQL, GraphQL, and cloud technologies',
  keywords: [
    'backend engineer',
    'node.js developer',
    'API design',
    'database architecture',
    'GraphQL',
    'PostgreSQL',
    'cloud infrastructure',
    'serverless',
    'data indexing',
    'system architecture',
    'vector databases',
    'real-time data',
  ],
  openGraph: {
    title: 'Backend Development Experience - Gabo Esquivel',
    description:
      'Backend Engineer with 15+ years experience building scalable systems with Node.js, PostgreSQL, GraphQL, and cloud technologies',
    type: 'profile',
  },
}
