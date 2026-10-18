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
        I build AI products that pair intuitive user experiences with reliable,
        efficient, and secure agentic systems. My work spans chat, voice, and
        generative UI, exploring new ways for people to interact with AI and get
        things done.
      </Prose>
      <Prose>
        Behind those experiences, I design the tools, context, and controls
        agents need to automate repetitive tasks and operational workflows. I
        focus on clear boundaries between model decisions and application logic,
        and on improving software delivery pipelines so teams can ship and
        maintain AI products with confidence.
      </Prose>

      <PageImage alt="AI product engineering" src={aiImg} />

      <PageSection title="LegalAgent: voice, chat, and retrieval">
        <Prose>
          LegalAgent already had a React Native app, and I added voice and chat
          for case context, documents, and procedures, in Spanish or English. I
          put OpenAI&apos;s Realtime API behind bilingual voice, used the AI SDK
          for chat, and built RAG over case context, document summaries, and
          procedural guidance. After attorney sessions I adjusted the
          assistant&apos;s persona and tool calling in the Expo client.
        </Prose>
        <Prose>
          Running the assistant was a separate problem. I built a TanStack Start
          admin with Microsoft SSO where the team manages documents and system
          prompts, and sets the categories that decide what retrieval can reach.
        </Prose>

        <ProjectEvidence slugs={['legal-agent']} columns={1} />
      </PageSection>

      <PageSection title="Domain-specific assistants">
        <Prose>
          Masterbots is a platform of domain-specific assistants. I built a
          separate interface for each one and integrated the AI SDK for
          internationalization automation.
        </Prose>
        <Prose>
          At Bitlauncher I built the bitlauncher.ai RAG chatbot, with tools for
          current news and video content, Masterbots prompting, and AI-assisted
          internationalization.
        </Prose>

        <Prose>
          <Link href="/project/wizard-world" className="prose-link">
            Wizard World
          </Link>{' '}
          was a progressive web app we built with collaborators at bitcashorg
          for the February 2023 Flow Hackathon. A user could generate an image
          with OpenAI&apos;s models and mint it as an NFT on Flow through
          Niftory, and I worked on both the generation and the minting flow.
        </Prose>

        <ProjectEvidence slugs={['masterbots', 'bitlauncher']} />
      </PageSection>

      <LatestPosts
        title="Writing about AI products"
        category="Artificial Intelligence"
      />

      <PageSection title="Work together">
        <Prose>
          The roles and dates behind this work are on the{' '}
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
    "AI product engineering for LegalAgent's voice and chat, retrieval over case context and documents, and an admin for prompts and retrieval categories.",
  path: '/ai',
})
