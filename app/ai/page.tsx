import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import aiImg from 'public/images/ai/ai.webp'
import { ContactInfo } from '../../components/shared/contact-info'

export default function AIExperiencePage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        <span className="hidden print:inline text-black">Gabo Esquivel -</span>{' '}
        AI Engineer
      </h1>

      <p className="prose prose-neutral dark:prose-invert print:block hidden">
        With over 15 years in full-stack software engineering, I help
        organizations turn initial ideas into market-ready software products,
        ensuring concepts reach their full potential. I work as a product
        engineer, bridging technical execution with user experience and business
        strategy.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        My journey with artificial intelligence began as a natural extension of
        my work in{' '}
        <Link href="/web3" className="prose-link">
          Web3
        </Link>{' '}
        and{' '}
        <Link href="/fullstack" className="prose-link">
          fullstack development
        </Link>
        . As I explored these fields, I found myself drawn to the human side of
        technology—how we could create more intuitive ways for people to
        interact with complex systems. What captivated me wasn't just AI's
        technical capabilities, but its potential to transform interfaces into
        conversations, making technology more accessible and natural. This
        exploration became a personal passion, guiding my work toward building
        tools that amplify human capabilities rather than simply automating
        tasks.
      </p>

      {/* <div className="gap-4 my-8 columns-1">
          <div className="relative mb-4 h-60">
            <Image
              alt="Artificial Intelligence"
              src={aiPic}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="object-cover rounded-lg"
            />
          </div>
        </div> */}

      {/* <h2 className="text-xl font-bold mb-4">Starting With OpenAI (2022)</h2>
        <p className="mb-4">
          My journey into the world of AI began in 2022 when I started
          experimenting with OpenAI's APIs. The potential of AI to revolutionize
          user experiences captivated me, and I quickly realized that AI was not
          just a trend but a transformative force that would redefine how we
          interact with technology. This realization ignited my passion for
          exploring AI-driven user experiences, where voice, text, and embedded
          capabilities lead the way.
        </p> */}
      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        AI Engineering Experience
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My hands-on AI journey began in 2022 when I started exploring OpenAI's
        APIs during a period of intense personal curiosity. I still remember the
        moment I first connected language models to a simple application and
        watched it understand context and generate relevant responses—it felt
        like glimpsing the future of software. Those early experiments weren't
        just technical explorations; they reshaped how I thought about building
        products. Interfaces no longer needed to be static collections of
        buttons and forms—they could become dynamic conversations that adapted
        to users' needs and contexts.
      </p>

      <div className="gap-4 my-8 columns-1 print:hidden">
        <div className="relative mb-4 h-[500px]">
          <Image
            alt="AI Development"
            src={aiImg}
            fill
            sizes="(max-width: 768px) 500px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Wizard World: NFT Generation
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My first significant AI project came during the Flow Hackathon in late
        2022, where I helped create{' '}
        <Link href="/project/wizard-world" className="prose-link">
          Wizard World
        </Link>
        —a platform connecting OpenAI's DALL-E image generation capabilities
        with{' '}
        <Link href="/web3" className="prose-link">
          blockchain
        </Link>{' '}
        technology. The system used{' '}
        <Link href="/tech/nextjs" className="prose-link">
          Next.js
        </Link>{' '}
        for the frontend and integrated with{' '}
        <Link href="/tech/flow" className="prose-link">
          Flow
        </Link>{' '}
        blockchain through{' '}
        <Link href="/tech/niftory" className="prose-link">
          Niftory
        </Link>
        's NFT infrastructure.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        This project was particularly meaningful as it combined two areas I was
        passionate about. What moved me most was witnessing people who had never
        considered themselves creative suddenly express artistic vision through
        simple language prompts, then preserve their creations as NFTs. One
        user, a retired teacher, told me they'd never created digital art before
        but had generated over a dozen pieces they were proudly sharing with
        family. Seeing her face light up when describing her creations
        reinforced my belief that technology should expand human creative
        potential rather than replace it.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Masterbots: Specialized AI Bots
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        By mid-2023, I was deeply immersed in AI development, working on{' '}
        <Link href="/project/masterbots" className="prose-link">
          Masterbots.ai
        </Link>
        —a platform I helped architect for creating domain-specific assistants.
        This project moved beyond generic AI interactions to specialized
        capabilities for specific knowledge domains. I implemented a system
        using{' '}
        <Link href="/tech/pgvector" className="prose-link">
          pgvector
        </Link>{' '}
        in{' '}
        <Link href="/tech/supabase" className="prose-link">
          Supabase
        </Link>{' '}
        for efficient semantic search and{' '}
        <Link href="/tech/ai-sdk" className="prose-link">
          Vercel AI SDK
        </Link>
        for streaming responses with optimized prompt patterns. What truly
        excited me was seeing how these assistants could make specialized
        knowledge more accessible to everyone. I remember implementing a feature
        that allowed an assistant to explain complex medical terminology in
        plain language, and watching a user's face light up when they finally
        understood a condition they'd been researching. These moments reinforced
        my belief that AI should democratize knowledge rather than gatekeep it.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        Bitlauncher: AI Crypto Launchpad
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Later in 2023, I had the opportunity to bring AI capabilities to{' '}
        <Link href="/project/bitlauncher" className="prose-link">
          BitLauncher
        </Link>
        , merging my passions for{' '}
        <Link href="/web3" className="prose-link">
          Web3
        </Link>{' '}
        and financial accessibility. Growing up in Costa Rica, I witnessed how
        financial complexity often created barriers to participation for many.
        This shaped my approach to the project—I wasn't just building a
        technical solution, but addressing a deeply personal challenge of
        democratizing investment knowledge. I developed a conversational
        assistant using retrieval-augmented generation (RAG) with{' '}
        <Link href="/tech/ai-sdk" className="prose-link">
          AI SDK
        </Link>
        ,{' '}
        <Link href="/tech/openai" className="prose-link">
          OpenAI
        </Link>
        , and a{' '}
        <Link href="/tech/postgresql" className="prose-link">
          PostgreSQL
        </Link>{' '}
        vector store that transformed how people researched investment
        opportunities. The system included tool integration for accessing
        real-time news and technical data about projects. During testing, I met
        a woman from my hometown who had been intimidated by crypto jargon for
        years. After a brief conversation with our assistant, she confidently
        explained auction mechanisms to another participant. That moment of
        transformation—from confusion to understanding—perfectly captured why I
        build technology: to remove unnecessary barriers to knowledge and
        opportunity.
      </p>

      <h2 className="mt-8 mb-4 text-xl font-semibold tracking-tight">
        LegalAgent: AI for Legal Operations
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My most recent and perhaps most impactful AI work has been with{' '}
        <Link href="/project/legal-agent" className="prose-link">
          LegalAgent
        </Link>{' '}
        in 2024, where I helped develop their{' '}
        <Link href="/mobile" className="prose-link">
          React Native
        </Link>{' '}
        app for legal professionals. This project represented a significant
        personal milestone as it combined both voice and text interfaces in a
        high-stakes professional context. I implemented a multimodal AI
        assistant using{' '}
        <Link href="/tech/openai" className="prose-link">
          OpenAI
        </Link>
        's Realtime API for voice and Vercel{' '}
        <Link href="/tech/ai-sdk" className="prose-link">
          AI SDK
        </Link>{' '}
        for chat, creating a system that provides contextual legal support
        through{' '}
        <Link href="/tech/redis" className="prose-link">
          Redis
        </Link>
        -backed RAG architecture. The frontend leveraged{' '}
        <Link href="/tech/tanstack" className="prose-link">
          TanStack
        </Link>{' '}
        and{' '}
        <Link href="/tech/tailwind" className="prose-link">
          Tailwind
        </Link>
        for a responsive mobile experience. Having grown up watching my father
        practice law and struggle with the overwhelming volume of case
        documents, I felt a personal connection to this challenge. Building a
        system that lawyers could trust with sensitive information required not
        just technical solutions but deep empathy for their workflow and
        concerns.
      </p>

      <p className="prose prose-neutral dark:prose-invert mt-4">
        What makes this project especially meaningful to me is the impact I've
        seen firsthand. A lawyer who had spent three hours the previous week
        searching for a specific precedent in a case file found it in seconds
        using the voice assistant. Another mentioned that they could finally
        review case notes while commuting, something previously impossible with
        traditional interfaces. These stories reinforce my belief that AI should
        amplify human expertise rather than attempt to replace it—augmenting
        capabilities while respecting professional judgment and the
        irreplaceable human elements of complex work.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Projects"
          projects={projects.filter((project) => project.type.includes('ai'))}
        />

        <LatestPosts
          category="Artificial Intelligence"
          title="Latest Artificial Intelligence Articles"
        />
      </div>
      <ContactInfo />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Artificial Intelligence Experience - Gabo Esquivel',
  description:
    'AI Engineer with 15+ years in full-stack development, specializing in AI-driven user experiences.',
  keywords: [
    'AI engineer',
    'LLM integration',
    'retrieval-augmented generation',
    'AI-driven UX',
    'conversational interfaces',
    'vector search',
    'OpenAI',
    'AI assistants',
    'natural language processing',
    'knowledge base systems',
    'AI SDK',
    'prompt engineering',
  ],
  openGraph: {
    title: 'Artificial Intelligence Experience - Gabo Esquivel',
    description:
      'AI Engineer with 15+ years in full-stack development, specializing in AI-driven user experiences.',
    type: 'profile',
  },
}
