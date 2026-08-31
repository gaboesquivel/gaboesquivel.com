import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import { ProjectEvidence } from 'components/work/project-evidence'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import aiImg from 'public/images/ai/ai.webp'

export default function AIExperiencePage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold tracking-tighter">
        AI product engineering
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        I build production AI products where models are one part of a complete
        system. The work includes conversational and voice interfaces,
        retrieval, application state, authentication, document operations, and
        the controls a team needs to run the product after launch.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        My focus is the boundary between model behavior and product behavior:
        what context reaches the model, how the interface communicates state,
        where deterministic application logic belongs, and how people manage the
        knowledge behind the assistant.
      </p>

      <div className="my-8">
        <div className="relative h-[420px]">
          <Image
            alt="AI product engineering"
            src={aiImg}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        LegalAgent: voice, chat, and retrieval
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        For LegalAgent, I built a React Native and Expo assistant with voice,
        chat, bilingual realtime transcription and synthesis, and RAG for case
        context and document summaries.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        I also built the TanStack Start administration system for Microsoft SSO,
        document management, prompt controls, and retrieval categories. Those
        tools let the team control access, maintain source material, and manage
        the instructions behind the assistant.
      </p>

      <ProjectEvidence slugs={['legal-agent']} columns={1} />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Specialized assistants inside larger products
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        For Masterbots, I worked on the Next.js architecture and built separate
        interfaces for domain-specific assistants. I integrated AI SDK tooling
        and internationalization automation, then trained the team on the
        implementation.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        For Bitlauncher, I built a RAG chatbot with tools for current news and
        video content and added AI-assisted internationalization. The assistant
        could retrieve and explain information while balances, bids, contracts,
        and transactions remained grounded in deterministic application data.
      </p>

      <ProjectEvidence slugs={['masterbots', 'bitlauncher']} />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Earlier interface experiments
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        Wizard World was a 2022 Flow Hackathon PWA that connected DALL-E image
        generation to a Next.js product flow and used Niftory to mint the
        resulting assets on Flow.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        Across these products, AI is one system boundary among many. Useful
        products still need source management, authentication, explicit tool
        boundaries, interface feedback, and operational controls.
      </p>

      <p className="mt-6">
        <Link href="/project/wizard-world" className="prose-link">
          View Wizard World
        </Link>
      </p>

      <LatestPosts
        title="Writing about AI products"
        slugs={[
          '2025-05-typescript-rag',
          '2026-01-evolution-ai-ux',
          '2025-09-why-expo',
        ]}
      />

      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        Build an AI product
      </h2>
      <LetsConnect />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'AI Product Engineering | Gabo Esquivel',
  description:
    'Production AI product engineering across multimodal assistants, voice and chat, RAG, specialized agents, and operational tooling.',
  openGraph: {
    title: 'AI Product Engineering | Gabo Esquivel',
    description:
      'Production AI products with multimodal interfaces, retrieval, specialized agents, authentication, and operational tooling.',
    type: 'website',
  },
}
