import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactInfo } from '../../components/shared/contact-info'

export default function AIExperiencePage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - AI Engineer
        </span>
        <span className="print:hidden">Artificial Intelligence Experience</span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert print:block hidden">
        With over 15 years in full-stack software engineering, I help
        organizations turn initial ideas into market-ready software products,
        ensuring concepts reach their full potential. I work as a product
        engineer, bridging technical execution with user experience and business
        strategy.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        The past few years, I've focused on building AI applications that
        prioritize user experience—moving beyond static interfaces toward
        systems where voice, chat, search, and action converge into more
        natural, dynamic interactions.
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
      <h2 className="text-xl font-bold mb-4">
        Wizard World: NFT Generation (2023)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Built during the Flow Hackathon, Wizard World connected OpenAI's LLMs
        with the Flow blockchain. The app enabled users to generate AI images
        and mint them as NFTs—bridging creative expression with on-chain
        ownership.
      </p>
      <h2 className="text-xl font-bold mb-4">
        Masterbots: Specialized AI Bots (2023)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Masterbots.ai delivers domain-specific chatbots optimized for complex
        tasks and long-context interactions. By using advanced prompt
        engineering techniques, we improve response quality and create more
        capable, user-friendly assistants. I contributed by designing the
        platform's architecture, integrating Next.js, the AI SDK, and Supabase
        with pgvector to support scalable, context-aware interactions.
      </p>
      <h2 className="text-xl font-bold mb-4">
        Bitlauncher: AI Crypto Launchpad (2023)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Bitlauncher is an AI crypto launchpad giving users early access to
        promising AI startups via token sales and batch auctions. We implemented
        a fair price discovery mechanism and recently added a chatbot powered by
        RAG and the experimental RSC AI SDK, enabling fast, conversational
        access to investment docs and platform data. I led the development and
        designed the full architecture, using Next.js, the AI SDK, and Supabase
        with pgvector to build a robust, scalable platform.
      </p>
      <h2 className="text-xl font-bold mb-4">
        LegalAgent: AI for Legal Operations (2024)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At LegalAgent, I helped with the development of a mobile app featuring
        voice and text interfaces that transformed how their legal team accessed
        and understood internal documentation. By implementing a secure,
        retrieval-augmented generation (RAG) system we enabled lawyers to query
        contracts, memos, and regulatory docs in natural language. This project
        also involved developing a backend system to manage the system's
        prompts, allowing admins to adjust the assistant's behavior.
        Additionally, we integrated third-party systems like billing and case
        tracking APIs using advanced tools, resulting in a more responsive legal
        operation that accelerated knowledge access and reduced research
        friction.
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
