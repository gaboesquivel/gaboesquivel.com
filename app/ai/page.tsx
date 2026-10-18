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
        I build the parts of an AI product around the model: the voice and chat
        people use, the retrieval that decides what the model gets to see, and
        the controls a team needs once the assistant is live. Most of the work
        is drawing the line between what the model decides and what stays
        ordinary application logic.
      </Prose>

      <PageImage alt="AI product engineering" src={aiImg} priority />

      <PageSection title="LegalAgent: voice, chat, and retrieval">
        <Prose>
          LegalAgent already had a React Native app, and attorneys needed to get
          at case context, documents, and procedures from it by voice or chat,
          in Spanish or English. I put OpenAI&apos;s Realtime API behind
          bilingual voice, used the AI SDK for chat, and built RAG over case
          context, document summaries, and procedural guidance. Once attorneys
          were using it, I adjusted the assistant&apos;s persona and tool
          calling in the Expo client based on what they did with it.
        </Prose>
        <Prose>
          Running the assistant was a separate problem. I built a TanStack Start
          admin with Microsoft SSO where the team manages documents and system
          prompts, and sets the categories that decide what retrieval can reach.
        </Prose>

        <ProjectEvidence slugs={['legal-agent']} columns={1} />
      </PageSection>

      <PageSection title="Specialized assistants inside larger products">
        <Prose>
          Masterbots is a platform of domain-specific assistants. I gave each
          one its own interface and used AI SDK tooling to keep it inside its
          domain.
        </Prose>
        <Prose>
          At Bitlauncher the assistant sat next to auctions and balances, so I
          kept balances, bids, contracts, and transactions on deterministic
          application data. The assistant is a RAG chatbot with tools for
          current news and video content, and I added AI-assisted
          internationalization on top. It retrieves and explains, and the
          numbers come from the system.
        </Prose>

        <Prose>
          Further back,{' '}
          <Link href="/project/wizard-world" className="prose-link">
            Wizard World
          </Link>{' '}
          was a progressive web app we built with collaborators at bitcashorg
          for the February 2023 Flow Hackathon. You generated an image with
          OpenAI&apos;s models and minted it as an NFT on Flow through Niftory,
          and I worked on both the generation and the minting flow.
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
    'Production AI product engineering across multimodal assistants, voice and chat, RAG, specialized agents, and operational tooling.',
})
