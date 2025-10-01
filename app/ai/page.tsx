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
      <h2 className="text-xl font-bold mb-4">Early AI Exploration (2022)</h2>
      <p className="prose prose-neutral dark:prose-invert">
        My journey into AI development began in 2022 when I started
        experimenting with OpenAI's APIs. I quickly recognized AI's potential to
        transform user experiences, moving beyond traditional interfaces toward
        more natural, dynamic interactions where voice, text, and embedded
        intelligence could work together seamlessly.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Wizard World: AI-Generated NFTs (2022)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Built during the Flow Hackathon in late 2022, Wizard World connected
        OpenAI's image generation capabilities with the Flow blockchain. The
        progressive web app enabled users to generate AI images through natural
        language prompts and mint them as NFTs—bridging creative expression with
        on-chain ownership. This project marked my first production
        implementation of AI technologies in a user-facing application.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Masterbots: Specialized AI Assistants (2023-2024)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From mid-2023 to early 2024, I worked on Masterbots.ai, a platform
        delivering domain-specific chatbots optimized for complex tasks and
        long-context interactions. I contributed by designing the platform's
        architecture, integrating Next.js with the AI SDK, and implementing
        Supabase with pgvector to support scalable, context-aware interactions.
        The project involved advanced prompt engineering techniques to improve
        response quality and create more capable, user-friendly assistants that
        could handle specialized knowledge domains.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        BitLauncher: AI Investment Platform (2023-2024)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        From late 2023 into 2024, I enhanced BitLauncher—an AI crypto launchpad
        giving users early access to promising AI startups via token sales and
        batch auctions. Beyond the core platform, I implemented a conversational
        assistant powered by retrieval-augmented generation (RAG) and the
        experimental RSC AI SDK, enabling natural language access to investment
        documentation and platform data. This integration transformed how users
        researched potential investments, making complex information more
        accessible through conversation rather than traditional document
        navigation.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        LegalAgent: AI for Legal Operations (2024-2025)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My most recent AI project (2024-2025) involved developing LegalAgent's
        mobile app featuring both voice and text interfaces that transformed how
        legal teams access and understand internal documentation. By
        implementing a secure, retrieval-augmented generation (RAG) system, we
        enabled lawyers to query contracts, memos, and regulatory documents
        using natural language. This project also included a robust backend
        system to manage the AI's prompts and behavior, allowing administrators
        to fine-tune the assistant's responses for different contexts.
        Additionally, we integrated third-party systems like billing and case
        tracking APIs, resulting in a more responsive legal operation that
        accelerated knowledge access and reduced research friction.
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
