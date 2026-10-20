import { LatestPosts } from "components/blog/latest-posts";
import { LetsConnect } from "components/shared/lets-connect";
import {
  PageImage,
  PageSection,
  PageTitle,
  Prose,
} from "components/shared/page-layout";
import { ProjectEvidence } from "components/work/project-evidence";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";
import aiImg from "public/images/ai/ai.webp";

export default function AIExperiencePage() {
  return (
    <section>
      <PageTitle>AI product engineering</PageTitle>
      <Prose>
        I build AI products where the experience matters as much as the model:
        voice and chat assistants, retrieval-backed workflows, and interfaces
        that help people understand what an agent is doing.
      </Prose>
      <Prose>
        That takes work across product, design, and architecture. I shape the
        tools and context a model receives, the decisions it can make, and the
        controls teams need to inspect, adjust, and operate the system after
        launch. I also explore generative interfaces as a way to move beyond
        chat when a task calls for a clearer interaction.
      </Prose>

      <PageImage alt="AI product engineering" src={aiImg} />

      <PageSection title="LegalAgent: voice, chat, and retrieval">
        <Prose>
          For LegalAgent, I added Spanish and English voice and chat to an
          existing React Native app for legal professionals. I used
          OpenAI&apos;s Realtime API for voice, the AI SDK for chat, and
          retrieval over case context, documents, and procedures. Sessions with
          attorneys led me to adjust the assistant&apos;s persona and tool
          calling.
        </Prose>
        <Prose>
          To make the system manageable after launch, I built a TanStack Start
          administration interface with Microsoft SSO, document management,
          prompt controls, and retrieval categories.
        </Prose>

        <ProjectEvidence slugs={["legal-agent"]} columns={1} />
      </PageSection>

      <PageSection title="Domain-specific assistants">
        <Prose>
          At Masterbots, I built interfaces for domain-specific assistants and
          integrated AI SDK tooling, including automation for multilingual
          content.
        </Prose>
        <Prose>
          At Bitlauncher, I built a retrieval-backed assistant with tools for
          news and video content, plus AI-assisted internationalization. The
          assistant could explain product information while bids, balances,
          contracts, and transactions remained grounded in deterministic
          application data.
        </Prose>

        <Prose>
          Earlier,{" "}
          <Link href="/project/wizard-world" className="prose-link">
            Wizard World
          </Link>{" "}
          combined OpenAI image generation with NFT minting on Flow through
          Niftory. It was an experiment in connecting generative experiences to
          blockchain transactions.
        </Prose>

        <ProjectEvidence slugs={["masterbots", "bitlauncher"]} />
      </PageSection>

      <LatestPosts
        title="Writing about AI products"
        category="Artificial Intelligence"
        limit={4}
      />

      <PageSection title="Work together">
        <Prose>
          The roles and dates behind this work are in my{" "}
          <Link href="/cv?focus=ai" className="prose-link">
            AI CV
          </Link>
          .
        </Prose>
        <LetsConnect />
      </PageSection>
    </section>
  );
}

export const metadata = pageMetadata({
  description:
    "AI product engineering by Gabo Esquivel: voice and chat assistants, retrieval, agentic workflows, and production tools built for teams to operate.",
  images: [
    {
      url: "/images/work/legalagent.png",
      alt: "LegalAgent AI assistant interface",
    },
  ],
  path: "/ai",
  title: "AI Product Engineering | Gabo Esquivel",
});
