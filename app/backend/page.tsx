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
          Gabo Esquivel - Backend & Infrastructure Engineer
        </span>
        <span className="print:hidden">
          Backend & Infrastructure Engineering Experience
        </span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert print:block hidden">
        With over 15 years in full-stack software engineering, I help
        organizations turn initial ideas into market-ready software products,
        ensuring concepts reach their full potential. I work as a product
        engineer, bridging technical execution with user experience and business
        strategy.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        My backend engineering journey has focused on building resilient,
        scalable systems that power user-facing applications. I specialize in
        designing APIs, data pipelines, and cloud infrastructure that provide
        rock-solid foundations for modern applications. I'm passionate about
        creating systems that combine performance, reliability, and developer
        experience.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Early APIs & Backend Systems (2010-2015)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My backend journey began with RESTful API design for web applications.
        At American Express, I worked on backend systems that connected frontend
        interfaces with legacy banking infrastructure. During this period, I
        gained experience in building secure, compliant systems for financial
        applications and learned the importance of robust error handling and
        transaction management.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Node.js & Modern Backend (2015-2018)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As Node.js matured, I embraced its event-driven architecture for
        building scalable backend services. At Wink, I developed banking
        integrations and biometric KYC services on AWS infrastructure. This work
        involved designing secure API gateways, implementing JWT authentication
        flows, and creating reliable database access patterns. During this time,
        I also contributed to open-source Node.js projects through the Costa
        Rica JS community.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Blockchain Indexing & Infrastructure (2018-2021)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At EOS Costa Rica, I managed validator nodes across multiple blockchain
        networks and architected a custom private blockchain for Grant Thornton
        using Azure and Terraform. This project involved deploying a complete
        infrastructure stack with private blockchain nodes, API services, and
        monitoring systems—all defined as code through Terraform and automated
        deployment pipelines.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        During this time, I also built ChainGraph, a high-performance blockchain
        indexer for EOS. The system provided fast, reliable transaction data
        queries and became a critical component for several dApps. This
        experience deepened my expertise in blockchain data structures, indexing
        strategies, and real-time data pipelines.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        BitCash: Matching Engine & EOS Indexer (2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At BitCash Bank, I built a backend matching engine for P2P transactions
        and developed a real-time EOS indexer that deserializes binary
        blockchain data using Node.js worker threads. This system processed high
        volumes of transaction data with low latency, enabling real-time updates
        for users. The architecture utilized PostgreSQL, Hasura GraphQL, and
        Google Cloud Platform for a scalable, maintainable backend.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Modern Cloud-Native Systems (2021-Present)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At BitLauncher, I designed and implemented a custom EVM indexer with
        Supabase subscriptions on Google Cloud infrastructure. This system
        processes blockchain events in real-time, providing instant updates to
        connected clients through WebSocket subscriptions. The architecture
        leverages containerization with Docker and managed cloud services for
        high availability and operational efficiency.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        Most recently, at Sfera Legal, I built a Retrieval-Augmented Generation
        (RAG) backend and deployed it to the cloud. This system indexes legal
        documents and provides AI-powered search and analysis capabilities. The
        implementation used vector databases for semantic search and integrated
        with modern LLMs for contextual understanding of legal documents.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

      <LatestPosts category="Backend" title="Latest Backend Articles" />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Backend & Infrastructure Engineering Experience - Gabo Esquivel',
  description:
    'Backend Engineer with 15+ years in system development, specializing in Node.js, PostgreSQL, GraphQL, and cloud infrastructure',
  keywords: [
    'backend engineer',
    'infrastructure engineer',
    'Node.js',
    'PostgreSQL',
    'GraphQL',
    'Supabase',
    'API development',
    'cloud architecture',
    'AWS',
    'Google Cloud Platform',
    'Terraform',
    'blockchain indexer',
    'Docker',
  ],
  openGraph: {
    title: 'Backend & Infrastructure Engineering Experience - Gabo Esquivel',
    description:
      'Backend Engineer with 15+ years in system development, specializing in Node.js, PostgreSQL, GraphQL, and cloud infrastructure',
    type: 'profile',
  },
}
