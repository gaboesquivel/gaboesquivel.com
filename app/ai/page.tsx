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
        A production AI product is mostly not the model. It is the voice and
        chat around it, the retrieval that decides what the model even sees, and
        the controls a team needs to run the thing after launch. That is the
        part I build.
      </Prose>
      <Prose>
        Model behavior is probabilistic. Product behavior cannot be. Most of the
        work sits on that line, deciding what the model gets to decide and what
        stays ordinary application logic.
      </Prose>

      <PageImage alt="AI product engineering" src={aiImg} priority />

      <PageSection title="LegalAgent: voice, chat, and retrieval">
        <Prose>
          For LegalAgent, I built a React Native and Expo assistant with voice,
          chat, bilingual realtime transcription and synthesis, and RAG for case
          context and document summaries. Working from attorney feedback, I
          adjusted tone, persona, and response latency, and tightened tool
          calling so the assistant followed how they actually use it.
        </Prose>
        <Prose>
          I also built the TanStack Start administration system for Microsoft
          SSO, document management, prompt controls, and retrieval categories.
          Those tools let the team control access, maintain source material, and
          manage the instructions behind the assistant.
        </Prose>

        <ProjectEvidence slugs={['legal-agent']} columns={1} />
      </PageSection>

      <PageSection title="Specialized assistants inside larger products">
        <Prose>
          For Masterbots, I worked on the Next.js architecture and built
          separate interfaces for domain-specific assistants. I integrated AI
          SDK tooling and internationalization automation, then trained the team
          on the implementation.
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
          was a 2022 Flow Hackathon PWA that wired DALL-E generation into a
          Next.js flow and minted the results through Niftory.
        </Prose>

        <ProjectEvidence slugs={['masterbots', 'bitlauncher']} />
      </PageSection>

      <LatestPosts
        title="Writing about AI products"
        category="Artificial Intelligence"
      />

      <PageSection title="Build an AI product">
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
