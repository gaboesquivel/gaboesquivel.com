import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import startupImg from 'public/images/work/bitlauncher.png'
import { ContactInfo } from '../../components/shared/contact-info'

export default function StartupsExperiencePage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Startup Engineering
        </span>
        <span className="print:hidden">Startup Engineering Experience</span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert print:block hidden">
        With over 15 years in full-stack software engineering, I specialize in
        guiding startups from inception to market, building scalable technical
        foundations with a focus on user experience and business value.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        I excel at taking startups from 0 to 1, transforming early concepts into
        market-ready products with technical foundations designed for scale. My
        approach combines lean startup methodologies with continuous delivery,
        focusing on rapid validation and iteration. I've helped launch multiple
        successful Web3 and AI startups, with hands-on experience across the
        entire development lifecycle.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[400px]">
          <Image
            alt="BitLauncher - AI and Crypto Launchpad"
            src={startupImg}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Startup Philosophy & Approach</h2>
      <p className="prose prose-neutral dark:prose-invert">
        My approach to startup development is rooted in speed and quality - fast
        iteration coupled with scalable architecture decisions. I prioritize
        getting to market quickly with an MVP that delights users, then
        iteratively enhancing features based on actual usage and feedback. I
        emphasize{' '}
        <Link href="/blog/2015-07-continuous-delivery" className="prose-link">
          continuous delivery
        </Link>{' '}
        to reduce deployment risk and test market assumptions early.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        I believe in starting with a lean core and expanding strategically,
        avoiding feature bloat and focusing on what truly brings value. This
        approach ensures startups maximize runway while delivering features that
        actually matter to users.
      </p>

      <h2 className="text-xl font-bold mb-4">
        BitLauncher: AI and Crypto Launchpad (2022-2025)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As Tech Lead at{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>
        , I architected a full-stack solution for this AI and crypto launchpad
        platform. I built a custom token bridge for USDT/USDC swapping,
        implemented Gnosis auction contracts on EOS EVM, and developed a
        sophisticated transaction indexing system with real-time subscriptions.
        I created a unified wallet interface displaying balances across chains,
        and built a custom EVM indexer using Node.js and Viem.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        A critical contribution was establishing an AI-driven development
        workflow using Claude Sonnet, v0.dev, Cursor IDE, and SourceryAI, which
        significantly improved team velocity. I trained and mentored a team of 5
        developers, building capacity while maintaining product momentum.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Masterbots.ai: Specialized AI Platform (2023-2024)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots.ai
        </Link>
        , I architected and developed a platform for domain-specific AI chatbots
        that perform advanced tasks beyond basic information retrieval. I
        integrated AI SDK for internationalization automation, developed
        specialized AI agents, and set up a scalable Next.js architecture with
        vector search capabilities. The platform features specialized
        conversational tools designed for complex tasks, demonstrating the
        practical application of AI in solving specific domain problems.
      </p>

      <h2 className="text-xl font-bold mb-4">
        RareMint: NFT Collectibles Platform (2021-2022)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As Technical Lead at{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>
        , I optimized their NFT marketplace for digitized sports collectibles. I
        built a specialized EVM NFT data indexer using Moralis streams, Node.js,
        and PostgreSQL, significantly improving data retrieval performance. I
        refactored the marketplace using RemixRun SSR for better performance and
        responsiveness, and integrated Wallet Connect for secure transactions.
        The platform partners with professional sports organizations to digitize
        authenticated collectibles as NFTs on Polygon, offering fractional
        ownership of high-value items.
      </p>

      <h2 className="text-xl font-bold mb-4">
        ZTX: Web3 Metaverse Platform (2021-2022)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/ztx" className="prose-link">
          ZTX
        </Link>
        , a Web3 metaverse platform backed by Jump Crypto and ZEPETO, I served
        as a software consultant during their critical early phase. I
        established the initial React architecture using Next.js, TailwindCSS,
        and Framer Motion, created the foundation for their immersive
        experience, and developed a custom WebGL EVM wallet connector using
        Ethers.js to enable NFT trading functionality. I also implemented
        advanced analytics using Google Tag Manager to provide essential user
        insights during the startup's growth phase.
      </p>

      <h2 className="text-xl font-bold mb-4">
        BitCash: Crypto Banking Platform (2020-2021)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          BitCash
        </Link>
        , I led the technical development of a crypto banking platform serving
        over 50,000 users across Latin America. I designed the infrastructure,
        recruited technical talent, and trained developers to build a solid
        foundation. I architected and implemented a full-stack platform using
        React, Vite, Node.js, PostgreSQL, Hasura GraphQL, and Google Cloud. I
        built a backend matching engine and created a real-time EOS indexer with
        Node.js worker threads. A significant innovation was implementing
        WebAuthn-based key management for direct in-browser transaction signing,
        eliminating the need for external wallet apps.
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
        to launch. I developed the first version of their mobile banking app and
        backend services within AWS. I was responsible for technology selection,
        project planning, recruiting and training developers, and coordinating
        API integration with partner banks. I implemented biometric
        authentication for enhanced security while maintaining a streamlined
        user experience, creating a secure, user-friendly banking platform that
        bypassed traditional branch visits.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Startup Projects"
          projects={projects.filter(
            (project) =>
              project.type.includes('featured') &&
              (project.type.includes('full-time') ||
                project.type.includes('contract')),
          )}
        />

        <LatestPosts category="Startup" title="Latest Startup Articles" />
      </div>
      <ContactInfo />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Startup Engineering Experience - Gabo Esquivel',
  description:
    'Full-stack engineer specializing in taking startups from 0 to 1, with extensive experience in Web3, AI, and fintech ventures.',
  keywords: [
    'startup engineering',
    'startup 0 to 1',
    'product development',
    'technical co-founder',
    'MVP development',
    'startup architecture',
    'lean startup',
    'continuous delivery',
    'web3 startup',
    'AI startup',
    'fintech startup',
  ],
  openGraph: {
    title: 'Startup Engineering Experience - Gabo Esquivel',
    description:
      'Full-stack engineer specializing in taking startups from 0 to 1, with extensive experience in Web3, AI, and fintech ventures.',
    type: 'profile',
  },
}
