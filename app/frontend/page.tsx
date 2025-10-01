import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function FrontendExperiencePage() {
  const type = 'frontend'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Sr. Frontend Engineer
        </span>
        <span className="print:hidden">Frontend Development Experience</span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        With over 15 years of frontend experience, I've crafted engaging
        interfaces across diverse platforms and industries. My journey spans
        from early-career work with jQuery to modern React applications, always
        focusing on building intuitive, performant interfaces that deliver
        exceptional user experiences.
      </p>

      <h2 className="text-xl font-bold mb-4">Foundation Years (2008-2012)</h2>
      <p className="prose prose-neutral dark:prose-invert">
        I began my frontend career at InterGraphicDESIGNS in 2008, building
        custom WordPress solutions with JavaScript and PHP. This early work
        taught me fundamental web development principles and responsive design
        techniques that would become increasingly important throughout my
        career.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        In 2010, I joined American Express as a UI Engineer, where I helped
        modernize their credit card systems by transitioning from Dojo to jQuery
        while implementing responsive layouts with A/B testing methodologies.
        Working at this scale gave me valuable experience building interfaces
        that could support millions of users while maintaining performance and
        accessibility standards.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Interactive Web Experiences (2012-2014)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2012-2014, I led several projects that pushed the boundaries of
        interactive web experiences. For{' '}
        <Link href="/project/elder-scrolls-online" className="prose-link">
          Elder Scrolls Online
        </Link>
        , I developed community features and interactive elements that enhanced
        user engagement for the popular gaming platform.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        At{' '}
        <Link href="/project/amc-yeah-tv-facebook-app" className="prose-link">
          AMC Networks
        </Link>
        , I created an interactive video streaming frontend with Facebook
        integration, enabling social viewing experiences. For{' '}
        <Link href="/project/bureau-of-trade-beta" className="prose-link">
          Bureau of Trade
        </Link>
        , I built an e-commerce platform that integrated with eBay's API,
        delivering a curated shopping experience with advanced filtering and
        discovery features.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        I also developed{' '}
        <Link href="/project/tikr" className="prose-link">
          Tikr
        </Link>
        , an innovative online store featuring dynamic, real-time price
        fluctuations that responded to market conditions. These diverse projects
        refined my skills in crafting engaging, high-performance user
        experiences and working with real-time data.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        React & Component Architecture (2015-2019)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My work with modern JavaScript frameworks began in 2015 during the{' '}
        <Link href="/project/wink" className="prose-link">
          Wink
        </Link>{' '}
        project, where I adopted React and Next.js early in their development.
        This marked my transition to component-driven architecture and more
        sophisticated state management patterns. During these formative years
        (2015-2019), I built a strong foundation in React's ecosystem, working
        with Redux for state management, implementing design systems, and
        optimizing build processes.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        My experience with Next.js spans its entire evolution—from the early
        server-rendered applications to the latest server components
        architecture. I've implemented performance optimization techniques like
        code splitting, lazy loading, and image optimization across dozens of
        projects, consistently delivering fast, responsive user experiences.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Modern Frontend Tooling (2020-Present)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Since 2020, I've embraced contemporary UI frameworks and tools that
        enhance both developer and user experiences. I've integrated Tailwind
        CSS and ShadcnUI into my workflow while leveraging Next.js's latest
        features to create lightning-fast applications with excellent SEO
        performance and accessibility.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        My current toolkit includes TanStack Query for data fetching, Zod for
        validation, and TypeScript for type safety—creating robust, maintainable
        frontends that deliver exceptional user experiences. This modern
        approach has been applied across multiple projects, ensuring consistent
        quality and performance while accelerating development cycles through
        standardized patterns and practices.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Web3 & Blockchain UIs (2017-2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My journey into Web3 frontend development began in 2017 at{' '}
        <Link href="/project/knowledge-io" className="prose-link">
          Knowledge.io
        </Link>
        , where I created interfaces for a gamified Q&A platform with token
        rewards. A highlight was developing a knowledge graph visualization
        system that represented user expertise and connections in an interactive
        format.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        From 2018-2020, I worked on several EOS blockchain projects, including{' '}
        <Link href="/project/eos-rate" className="prose-link">
          EOS Rate
        </Link>
        , where I built a community-driven Block Producer rating tool with an
        interactive radial graph interface that visualized complex voting data.
        At{' '}
        <Link href="/project/bitcashbank" className="prose-link">
          BitcashBank
        </Link>{' '}
        (2020), I developed modern interfaces for a crypto banking platform,
        focusing on usability while supporting stablecoin integration and
        WebAuthN-based wallet functionality.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Advanced DeFi Interfaces (2021-2023)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Building on my earlier Web3 experience, I created more sophisticated
        interfaces from 2021-2023. At{' '}
        <Link href="/project/raremint" className="prose-link">
          RareMint
        </Link>{' '}
        (2021), I optimized an NFT marketplace for digitized sports
        collectibles, improving the discovery and transaction flows for
        collectible assets on Polygon.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        At{' '}
        <Link href="/project/ztx" className="prose-link">
          ZTX
        </Link>{' '}
        (2022), I created a gaming-centric NFT platform with seamless wallet
        connectivity and intuitive asset discovery features. For{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>{' '}
        (2022-2023), I developed a sophisticated token auction interface
        featuring real-time updates and bidding mechanics.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        My most complex Web3 frontend work was at{' '}
        <Link href="/project/opyn" className="prose-link">
          Opyn
        </Link>{' '}
        (2023), where I built a sophisticated options trading interface with
        complex data visualization for financial derivatives. These projects
        leveraged my Next.js expertise, with most built on version 13 or 14 with
        app router architecture, demonstrating my ability to create advanced
        interfaces for complex financial applications.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        AI-Powered Interfaces (2022-2023)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        In 2022, I began exploring AI-powered interfaces with{' '}
        <Link href="/project/wizard-world" className="prose-link">
          Wizard World
        </Link>
        , a progressive web app connecting to OpenAI's image generation models
        with NFT minting capabilities on Flow blockchain. This project required
        creating intuitive interfaces for AI prompt engineering and blockchain
        transactions, bridging two complex technologies in a user-friendly way.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Conversational UIs (2023-2025)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From 2023-2025, I focused on creating sophisticated conversational
        interfaces. For{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots.ai
        </Link>{' '}
        (2023-2024), I developed interfaces for domain-specific chatbots
        optimized for complex tasks, implementing streaming responses and
        intuitive conversational UIs that made AI interactions feel natural and
        responsive.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        At{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>{' '}
        (2023-2024), I integrated an AI assistant with RAG capabilities using
        the experimental RSC AI SDK, creating interfaces for document retrieval
        and conversational exploration of investment data. My most recent work
        at{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>{' '}
        (2024-2025) focused on building an admin dashboard for managing AI
        prompts and document collections, with features for fine-tuning
        conversational models and monitoring performance. These projects
        showcase my ability to design intuitive interfaces for AI applications
        that balance technological sophistication with outstanding user
        experience.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Frontend Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

      <LatestPosts category="Frontend" title="Latest Frontend Articles" />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Frontend Development Experience - Gabo Esquivel',
  description:
    'Frontend Engineer with 15+ years of experience specializing in React, Next.js, TypeScript, and UI/UX optimization',
  keywords: [
    'frontend engineer',
    'react developer',
    'next.js',
    'typescript',
    'UI/UX',
    'responsive design',
    'web performance',
    'tanstack',
    'tailwind',
    'component architecture',
    'state management',
    'shadcn/ui',
  ],
  openGraph: {
    title: 'Frontend Development Experience - Gabo Esquivel',
    description:
      'Frontend Engineer with 15+ years of experience specializing in React, Next.js, TypeScript, and UI/UX optimization',
    type: 'profile',
  },
}
