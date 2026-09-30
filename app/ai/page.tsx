import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import {
  PageImage,
  PageSection,
  PageTitle,
  Prose,
} from 'components/shared/page-layout'
import { ProjectEvidence } from 'components/work/project-evidence'
import { pageMetadata } from 'lib/page-metadata'
import Link from 'next/link'
import aiImg from 'public/images/ai/ai.webp'

export default function AIExperiencePage() {
  return (
    <section>
      <PageTitle>AI product engineering</PageTitle>
      <Prose>
        I build the parts of an AI product that surround the model: the voice
        and chat people use, the retrieval that decides what the model sees, and
        the controls a team needs to run the assistant after launch. Most of
        that work sits on the line between what the model gets to decide and
        what stays ordinary application logic.
      </Prose>

      <PageImage alt="AI product engineering" src={aiImg} priority />

      <PageSection title="LegalAgent: voice, chat, and retrieval">
        <Prose>
          LegalAgent&apos;s assistant answers from case context, document
          summaries, and procedural guidance in Spanish and English. I built RAG
          over those sources for both voice and chat, used OpenAI&apos;s
          Realtime API for bilingual transcription and synthesis, and adjusted
          the assistant&apos;s persona and AI SDK tool calling after attorney
          sessions showed how they used it.
        </Prose>
        <Prose>
          The team runs the assistant from a TanStack Start admin with Microsoft
          SSO, where they manage documents, system prompts, and the categories
          that decide what retrieval can reach.
        </Prose>

        <ProjectEvidence slugs={['legal-agent']} columns={1} />
      </PageSection>

      <PageSection title="Specialized assistants inside larger products">
        <Prose>
          For Masterbots, I built separate interfaces for domain-specific
          assistants and integrated AI SDK tooling so each assistant stayed
          scoped to its domain.
        </Prose>
        <Prose>
          For Bitlauncher, I built a RAG chatbot with tools for current news and
          video content and added AI-assisted internationalization. The
          assistant could retrieve and explain information while balances, bids,
          contracts, and transactions remained grounded in deterministic
          application data.
        </Prose>

        <Prose>
          Further back,{' '}
          <Link href="/project/wizard-world" className="prose-link">
            Wizard World
          </Link>{' '}
          was a 2022 Flow Hackathon PWA that wired OpenAI image generation into
          a Next.js flow and minted the results as NFTs on Flow through Niftory.
        </Prose>

        <ProjectEvidence slugs={['masterbots', 'bitlauncher']} />
      </PageSection>

      <LatestPosts
        title="Writing about AI products"
        category="Artificial Intelligence"
      />

      <PageSection title="AI employment record">
        <Prose>
          The employment record behind this work is the{' '}
          <Link href="/cv?focus=ai" className="prose-link">
            AI CV
          </Link>
          .
        </Prose>
        <LetsConnect />
      </PageSection>
    </section>
  )
}

export const metadata = pageMetadata({
  title: 'AI Product Engineering | Gabo Esquivel',
  description:
    'Production AI product engineering across multimodal assistants, voice and chat, RAG, specialized agents, and operational tooling.',
})
