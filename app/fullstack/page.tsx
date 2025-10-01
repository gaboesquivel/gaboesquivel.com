import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function FullstackExperiencePage() {
  const type = 'fullstack'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Sr. Fullstack Engineer
        </span>
        <span className="print:hidden">Fullstack Development Experience</span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        With over 15 years of experience, I've specialized in fullstack
        development—mastering the art of building complete, production-ready
        applications from concept to deployment. My expertise spans the entire
        development lifecycle, integrating frontend and backend technologies to
        create cohesive, scalable, and user-centered products.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Early Fullstack Foundations (2010-2014)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My journey as a fullstack developer began with integrating frontend and backend 
        technologies to create complete, production-ready applications. In 2012, I worked 
        on ARINC Microfids, a flight information display system that required integrating 
        a Ruby on Rails backend with an AngularJS frontend—an early example of combining 
        powerful server technology with dynamic client interfaces.
      </p>
      
      <p className="prose prose-neutral dark:prose-invert mt-4">
        During this period, I developed foundational skills across the entire development 
        stack: database design, API architecture, authentication systems, and responsive 
        user interfaces. These early projects taught me the importance of considering the 
        entire system when making architectural decisions, rather than optimizing individual 
        components in isolation.
      </p>
      
      <h2 className="text-xl font-bold mb-4 mt-6">
        Financial Technology Systems (2015-2016)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At <Link href="/project/wink" className="prose-link">Wink</Link> (2015-2016), 
        Costa Rica's first mobile neobank, I led the development of their banking platform, 
        overseeing both the frontend user experience and backend services that integrated 
        with partner banks. This project represented a significant advancement in my fullstack 
        capabilities, requiring secure data handling, real-time transaction processing, and 
        intuitive mobile interfaces.
      </p>
      
      <p className="prose prose-neutral dark:prose-invert mt-4">
        The Wink project established my approach of building cohesive, end-to-end solutions 
        where user experience and system architecture are developed in concert to create 
        seamless, reliable applications. This experience proved invaluable for my later work 
        in both traditional and blockchain-based financial applications.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Modern JavaScript & Node.js (2017-2018)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2017, I embraced modern JavaScript frameworks and Node.js for fullstack 
        development. At <Link href="/project/knowledge-io" className="prose-link">Knowledge.io</Link>, 
        I built a comprehensive platform integrating React frontends with Node.js 
        microservices, creating a gamified Q&A platform with token rewards and expertise 
        visualization. This project marked my shift toward JavaScript-based fullstack 
        development, leveraging the growing ecosystem of tools and libraries in the Node.js 
        community.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Blockchain Infrastructure (2018-2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2018 to 2020 at <Link href="/project/eos-costa-rica" className="prose-link">EOS Costa Rica</Link>, 
        I combined frontend and backend skills to build complete blockchain solutions. I 
        developed <Link href="/project/eos-rate" className="prose-link">EOS Rate</Link> (2018-2019), 
        a community-driven tool for rating EOS Block Producers with a radial graph interface 
        that visualized voting data, backed by secure blockchain data services.
      </p>
      
      <p className="prose prose-neutral dark:prose-invert mt-4">
        During this period, I also designed and deployed blockchain infrastructure using 
        Azure, Terraform, and custom deployment scripts, ensuring high availability and 
        security for enterprise applications. This work strengthened my DevOps skills and 
        my ability to create robust, scalable infrastructure for complex applications.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Database & API Architecture (2019-2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My experience with database technologies expanded significantly during 2019-2020. 
        For <Link href="/project/chaingraph" className="prose-link">ChainGraph</Link> (2020), 
        I built a real-time GraphQL toolkit for blockchain applications, featuring data 
        subscriptions and efficient query handling for multiple blockchains, all powered 
        by PostgreSQL. This project showcased my ability to design sophisticated data models 
        and APIs that could handle complex, real-time queries with high performance.
      </p>
      
      <p className="prose prose-neutral dark:prose-invert mt-4">
        At <Link href="/project/bitcashbank" className="prose-link">BitcashBank</Link> (2020), 
        I led infrastructure design and developed a banking interface that allowed users to buy, 
        trade, deposit, and earn on cryptocurrencies, with a focus on exchanging funds for local 
        currency stablecoins. This project integrated frontend interfaces with backend services 
        for transaction processing and wallet management.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        TypeScript & Type Safety (2019-2022)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        TypeScript became central to my development approach starting in 2019, enabling me to 
        create more maintainable, error-resistant systems across the stack. At <Link href="/project/raremint" className="prose-link">RareMint</Link> (2021) 
        and <Link href="/project/ztx" className="prose-link">ZTX</Link> (2022), I established 
        TypeScript practices that improved code quality and team productivity while creating 
        NFT platforms that required robust type safety for blockchain interactions.
      </p>
      
      <p className="prose prose-neutral dark:prose-invert mt-4">
        I leverage type-safe libraries like Zod for validation, TanStack Query for data fetching, 
        and properly typed API interfaces to ensure consistent data flow between frontend and 
        backend. At <Link href="/project/opyn" className="prose-link">Opyn</Link> (2023), I 
        implemented comprehensive type-safe data validation and state management throughout 
        their trading platform, demonstrating how strong typing can enhance reliability in 
        financial applications.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Next.js Fullstack Applications (2021-2023)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2021 to 2023, I focused on building fullstack applications with Next.js, leveraging 
        its powerful server capabilities alongside client-side features. For <Link href="/project/bitlauncher" className="prose-link">BitLauncher</Link> (2022-2023), 
        I architected a comprehensive solution using Next.js 14, Viem/Wagmi, Alchemy, Trigger.dev, 
        and Supabase to create a scalable platform for token auctions.
      </p>
      
      <p className="prose prose-neutral dark:prose-invert mt-4">
        This project featured a custom token bridge, integration with Gnosis auction contracts, 
        and a transaction data indexing system with Supabase for analytics. The work demonstrated 
        my ability to architect complete solutions using modern JavaScript frameworks while 
        integrating with blockchain technologies.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        AI-Powered Applications (2023-2025)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Since 2023, I've developed comprehensive AI-powered applications from the ground up.
        For <Link href="/project/masterbots" className="prose-link">Masterbots.ai</Link> (2023-2024), 
        I helped create a platform that delivers domain-specific chatbots optimized for complex tasks. 
        My role involved designing the architecture, integrating Next.js with the AI SDK, and 
        implementing Supabase with pgvector for efficient vector storage and retrieval.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        Most recently, at <Link href="/project/legal-agent" className="prose-link">LegalAgent</Link> (2024-2025), 
        I built a multimodal AI assistant with both voice and chat interfaces for a React Native app. 
        This complex system implemented retrieval-augmented generation (RAG) architecture for 
        contextual legal support and document summarization, alongside an admin dashboard with 
        Microsoft SSO and document management features. The project represents the culmination 
        of my fullstack experience, combining sophisticated frontend interfaces with advanced 
        backend AI capabilities in a cohesive, production-ready application.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Fullstack Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

      <LatestPosts category="Development" title="Latest Development Articles" />
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
