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
        Most of the work sits on the line between what the model gets to decide
        and what stays ordinary application logic.
      </Prose>

      <PageImage alt="AI product engineering" src={aiImg} priority />

      <PageSection title="LegalAgent: voice, chat, and retrieval">
        <Prose>
          For LegalAgent, I built a React Native and Expo assistant with voice,
          chat, bilingual realtime transcription and synthesis, and RAG for case
          context and document summaries. I sat with attorneys at the firm to
          see how they used the assistant. That feedback drove persona changes
          and tighter tool calling in the React Native client.
        </Prose>
        <Prose>
          I also built the TanStack Start administration system for Microsoft
          SSO, document management, prompt controls, and retrieval categories so
          the team could change access, sources, and instructions after launch.
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
          was a 2022 Flow Hackathon PWA that wired DALL-E generation into a
          Next.js flow and minted the results through Niftory.
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
