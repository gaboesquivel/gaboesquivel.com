import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import blockchainCRImg from 'public/images/2018/06/blockchain-costa-rica.jpg'
import { ContactInfo } from '../../components/shared/contact-info'

export default function TechLeadExperiencePage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Tech Lead & Startup 0 to 1
        </span>
        <span className="print:hidden">
          Tech Lead & Startup 0 to 1 Experience
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
        I specialize in taking startups from 0 to 1, building technical
        foundations that scale. My approach is rooted in lean agile
        methodologies and continuous delivery, guided by my{' '}
        <Link
          href="/blog/2025-02-engineering-principles"
          className="prose-link"
        >
          engineering principles
        </Link>
        , focusing on user experience first, keeping systems simple, and
        shipping fast to learn faster.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[400px]">
          <Image
            alt="Blockchain Costa Rica"
            src={blockchainCRImg}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg "
          />
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">
        Leadership Philosophy & Project Management Approach
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        I'm a big proponent of pair programming, war rooms, and automation to
        accelerate development and maintain code quality. My project management
        approach combines lean agile methodologies with continuous delivery,
        ensuring rapid iteration while maintaining high standards. I believe in
        the power of{' '}
        <Link href="/blog/2015-07-continuous-delivery" className="prose-link">
          continuous delivery
        </Link>{' '}
        to reduce risk and increase deployment confidence.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        As a self-confessed workaholic who has learned from burnout, I emphasize
        sustainable development practices and team well-being. I advocate for{' '}
        <Link href="/blog/2024-09-touch-grass" className="prose-link">
          "touching grass"
        </Link>{' '}
        and maintaining work-life balance to ensure long-term productivity and
        team health. Quality over quantity, with regular breaks and outdoor time
        to maintain mental clarity and prevent burnout.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Costa Rica JS: Community Leadership (2010-2015)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My leadership journey began in 2010 when I founded{' '}
        <Link href="/project/costa-rica-js" className="prose-link">
          Costa Rica JS
        </Link>
        , which grew into Central America's largest JavaScript community with
        over 2,000 developers. As the community organizer and leader, I was
        responsible for organizing workshops, meetups, and conferences that
        fostered a collaborative environment for developers. I also organized{' '}
        <Link
          href="/blog/2016-06-nodeschool-international-day"
          className="prose-link"
        >
          NodeSchool Costa Rica
        </Link>
        , which became a driving force in the region's tech ecosystem as Node.js
        and modern single-page frameworks gained prominence, establishing my
        foundation in community building and developer leadership.
      </p>

      <h2 className="text-xl font-bold mb-4">
        AMC Networks: YEAH! TV Streaming Platform (2012-2014)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At AMC Networks, I led the frontend team for{' '}
        <Link href="/project/amc-yeah-tv-facebook-app" className="prose-link">
          YEAH! TV
        </Link>
        , a streaming movie service launched at SXSW 2013. As team lead, I
        coordinated between creative and backend teams while building an
        interactive video streaming frontend for Facebook app. I implemented
        back-office with Brightcove integration and added interactive trivia,
        interviews, and quizzes to the video player. The platform was optimized
        for curated films with 400+ interactive elements each, creating a unique
        viewing experience that enhanced classic genre films with interactive
        bonus content.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Wink: Costa Rica's First Digital Bank (2015-2018)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As Software Architect at{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>
        , I led the development of Costa Rica's first digital bank from concept
        to launch. I was responsible for technology selection, project planning,
        recruiting and training developers, and coordinating with partner banks
        and vendors. Built biometric KYC with React Native bridge and integrated
        partner bank APIs, creating a secure, user-friendly banking experience
        that bypassed traditional branch visits. Successfully built and led a
        development team from the ground up.
      </p>
      {/* 
      <h2 className="text-xl font-bold mb-4">
        Photo and Go: Contract Leadership (2016-2017)
      </h2>

      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/photo-and-go" className="prose-link">
          Photo and Go
        </Link>
        , I had my first real leadership experience leading the refactoring and
        upgrade of MyPhoto.com's photo editor and backend systems. This was a
        pivotal moment in my career where I transitioned from individual
        contributor to technical leader. I was responsible for the complete
        overhaul of the existing platform, implementing modern ReactJS and
        Node.js architecture while maintaining seamless e-commerce integration.
        I led the technical direction and execution, focusing on creating a
        smooth and intuitive user experience while implementing AWS
        infrastructure for scalable cloud storage and processing. This project
        marked my first experience managing technical execution and established
        the foundation for my future leadership roles in building innovative
        digital experiences.
      </p> */}

      <h2 className="text-xl font-bold mb-4">
        EOS Costa Rica: Blockchain Infrastructure (2018-2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/eos-costa-rica" className="prose-link">
          EOS Costa Rica
        </Link>
        , I contributed to the EOS Mainnet launch and managed validator nodes
        across multiple EOSIO-based networks. As the main architect and tech
        lead, I recruited and built the entire development team from scratch,
        then architected Grant Thornton's custom private blockchain using Azure,
        Terraform, EOSIO, and a React client. This project streamlined
        intercompany transactions and tax management using stablecoins with
        immutable records via hashing and IPFS. I also led{' '}
        <Link
          href="/blog/2018-06-blockchain-technology-in-costa-rica"
          className="prose-link"
        >
          Web3 meetups
        </Link>{' '}
        that grew to 300+ members and paved the way for the creation of the{' '}
        <Link href="/project/asoblockchain" className="prose-link">
          Costa Rica Blockchain Association
        </Link>
        , along with workshops, meetups, and community engagement initiatives
        including{' '}
        <Link
          href="/blog/2019-01-international-crypto-conference-in-costa-rica"
          className="prose-link"
        >
          TicoBlockchain.cr
        </Link>{' '}
        and{' '}
        <Link
          href="/blog/2018-07-costa-rica-crypto-cantina"
          className="prose-link"
        >
          CryptoCantina
        </Link>{' '}
        meetups. that grew to 300+ members and paved the way for the creation of
        the{' '}
        <Link href={'/project/asoblockchain'} className="prose-link">
          Costa Rica Blockchain Association
        </Link>
        , along with workshops, meetups, and CryptoCantina meetups. Rica
        Blockchain Association, along with workshops, meetups, and community
        engagement initiatives including{' '}
        <Link
          href="/blog/2019-01-international-crypto-conference-in-costa-rica"
          className="prose-link"
        >
          TicoBlockchain.cr
        </Link>{' '}
        and{' '}
        <Link
          href="/blog/2018-07-costa-rica-crypto-cantina"
          className="prose-link"
        >
          CryptoCantina
        </Link>{' '}
        meetups.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Bitcash: P2P Exchange Platform (2020-2021)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          Bitcash
        </Link>
        , I architected and implemented a full-stack platform using React, Vite,
        Node.js, PostgreSQL, Hasura GraphQL, and Google Cloud. Led the technical
        team in developing a peer-to-peer exchange with real-time chat and built
        a backend matching engine. Created a real-time EOS indexer that
        deserializes EOS binary data with Node.js worker threads and implemented
        WebAuthn-based key management for direct in-browser transaction signing,
        eliminating the need for external wallet apps. During this time, I also
        developed{' '}
        <Link href="/project/chaingraph" className="prose-link">
          ChainGraph
        </Link>
        , a real-time GraphQL toolkit for EOSIO/Antelope blockchain
        applications, and participated in{' '}
        <Link
          href="/blog/2020-01-typescript-code-generation-from-graphql"
          className="prose-link"
        >
          GraphQL Texas
        </Link>
        . Focused on infrastructure design, tech recruitment, and developer
        training throughout the project lifecycle.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Bitlauncher: AI Crypto Launchpad & Masterbots (2023-2025)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As Tech Lead at{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          Bitlauncher
        </Link>
        , I designed the full-stack architecture with Viem, Wagmi, Supabase, and
        Next.js 14. Built a token bridge for swapping USDT, USDC, and BITUSD to
        USDCred tokens, integrated Gnosis auction contracts with real-time
        wallet balances, and developed a custom EVM indexer via WebSocket event
        subscriptions. Trained a team of 5 developers in the tech stack and
        established AI-driven development workflows using Claude, v0.dev,
        Cursor, and SourceryAI, significantly enhancing developer productivity.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        As part of the Bitlauncher initiative, I also architected and developed{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots.ai
        </Link>
        , a platform with specialized chatbots and AI-driven workflows.
        Integrated AI SDK for internationalization automation and established an
        AI-driven development workflow using v0.dev, Anthropic Claude Sonnet,
        Cursor IDE, and SourceryAI. The platform delivers domain-specific AI
        chatbots optimized for complex tasks and long-context interactions.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Projects"
          projects={projects.filter((project) => project.type.includes('lead'))}
        />

        <LatestPosts category="Tech Lead" title="Latest Tech Lead Articles" />
      </div>
      <ContactInfo />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Tech Lead & Startup 0 to 1 Experience - Gabo Esquivel',
  description:
    'Tech Lead with 15+ years in full-stack development, specializing in taking startups from 0 to 1.',
  keywords: [
    'tech lead',
    'startup 0 to 1',
    'software architecture',
    'product engineering',
    'full-stack development',
    'team leadership',
    'startup development',
    'technical strategy',
    'product development',
    'engineering principles',
    'scalable systems',
    'startup founder',
  ],
  openGraph: {
    title: 'Tech Lead & Startup 0 to 1 Experience - Gabo Esquivel',
    description:
      'Tech Lead with 15+ years in full-stack development, specializing in taking startups from 0 to 1.',
    type: 'profile',
  },
}
