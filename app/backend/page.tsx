import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function BackendExperiencePage() {
  const type = 'backend'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Sr. Backend Engineer
        </span>
        <span className="print:hidden">Backend Development Experience</span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        Throughout my career, I've architected and implemented robust backend
        systems that power modern applications across various domains. My
        backend expertise spans multiple programming languages, database
        technologies, and cloud platforms, with a focus on building scalable,
        maintainable services that support business objectives.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Early Backend Development (2013-2016)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        I adopted Node.js in Latin America around 2010-2011, when server-side
        JavaScript was emerging. To build a regional community around this
        technology, I founded{' '}
        <Link href="/project/costa-rica-js" className="prose-link">
          Costa Rica JS
        </Link>{' '}
        to promote server-side JavaScript technologies throughout the region.
        Through{' '}
        <Link
          href="/blog/2016-06-nodeschool-international-day"
          className="prose-link"
        >
          NodeSchool workshops
        </Link>{' '}
        and regular meetups, I helped local developers adopt JavaScript for both
        client and server development. In 2014, I applied this expertise to
        build{' '}
        <Link href="/project/4tius-fitness-data-tracker" className="prose-link">
          4Tius Fitness Data Tracker
        </Link>
        , implementing a fitness analytics platform with AWS, MongoDB, and
        Node.js. The system processed wearable device data and served analytics
        via RESTful APIs, leveraging Node.js for real-time data handling.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        In 2015, I joined{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , Costa Rica's first neo-bank, where I developed backend services that
        integrated with partner banks' systems. I implemented secure biometric
        authentication and transaction processing systems, laying the foundation
        for my later work in financial applications. This experience taught me
        the importance of security, reliability, and compliance in backend
        systems handling sensitive financial data.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Financial Systems (2015-2021)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Building on my experience at Wink, I continued developing backend
        systems for financial applications. At{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>{' '}
        (2017), I built backend services for their token rewards dashboard,
        implementing systems to manage expertise metrics and decentralized
        identity.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Later, at{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          BitcashBank
        </Link>{' '}
        (2020-2021), I developed sophisticated backend infrastructure for
        cryptocurrency exchange. This included implementing a P2P trading system
        and creating overcollateralized crypto stablecoins with high
        availability and security requirements. These projects demonstrated my
        ability to build complex financial systems that handle transactions
        securely and efficiently.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Blockchain Infrastructure (2018-2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2018 to 2020 at{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , I worked extensively with blockchain infrastructure. I played a key
        role in the EOS mainnet launch and managed validators for multiple
        networks. A highlight of this period was building a custom private
        blockchain for{' '}
        <Link href="/project/grant-thornton" className="prose-link">
          Grant Thornton
        </Link>{' '}
        to handle intercompany transactions and tax management using
        stablecoins, featuring immutable audit trails via IPFS and public proof
        publication.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        For{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOS Rate
        </Link>
        , I developed backend services to support the community-driven Block
        Producer rating tool, implementing data aggregation and secure voting
        mechanisms that became widely adopted in the EOS ecosystem.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Data Management & GraphQL (2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2020, I created{' '}
        <Link href="/project/chaingraph" className="prose-link">
          ChainGraph
        </Link>
        , a specialized real-time GraphQL toolkit for blockchain applications.
        This project represented a significant advancement in how developers
        could interact with blockchain data, enabling efficient data
        subscriptions and querying across multiple blockchains. ChainGraph
        featured sophisticated blockchain data indexing and event streaming
        capabilities, showcasing my expertise in designing efficient data models
        and APIs for complex applications.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Blockchain Data Indexing (2021-2023)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Building on my blockchain experience, I developed specialized data
        indexing solutions for various projects. At{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>{' '}
        (2021), I built an EVM NFT data indexer using Moralis streams to support
        their NFT marketplace for digitized sports collectibles.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        For{' '}
        <Link href="/project/dboard" className="prose-link">
          dBoard
        </Link>{' '}
        (2021-2022), I oversaw the technical architecture and smart contract
        development for DAO governance, enhancing community voting mechanisms
        with secure and transparent processes.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        At{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>{' '}
        (2022-2023), I built a custom indexer for EOS EVM using Node.js with
        Viem EVM event subscriptions, enabling real-time transaction monitoring
        and analytics. For{' '}
        <Link href="/project/opyn" className="prose-link">
          Opyn
        </Link>{' '}
        (2023), I set up a Ponder indexing service with PostgreSQL for chain
        data, creating efficient data structures for options protocol
        information.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Cloud Architecture & DevOps (2017-Present)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Throughout my career, I've implemented modern cloud architecture
        principles in my backend systems. At{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>{' '}
        (2017), I built scalable serverless infrastructure using AWS to support
        their ICO platform. For BitcashBank (2020-2021), I designed cloud
        infrastructure focused on handling financial transactions with high
        availability and security requirements.
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
        operations.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        AI & Vector Search Systems (2023-Present)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Since 2023, I've focused increasingly on integrating AI capabilities
        into backend systems. At{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots
        </Link>{' '}
        (2023-2024), I developed specialized AI agents and chatbot interfaces,
        implementing backends that efficiently process complex user queries
        while managing large knowledge bases.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        For BitLauncher (2024), I implemented a chatbot assistant for document
        retrieval using the experimental RSC AI SDK, enhancing user interaction
        and information access. Most recently, for{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>
        's AI assistant (2024-2025), I built a secure RAG architecture on GCP
        that handles sensitive legal documents while maintaining strict privacy
        requirements. These projects showcase my ability to build
        retrieval-augmented generation systems using vector databases like
        Supabase with pgvector, enabling sophisticated, context-aware AI
        interactions.
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
