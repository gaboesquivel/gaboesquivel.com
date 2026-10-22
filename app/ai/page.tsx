import { LatestPosts } from "components/blog/latest-posts";
import { AiSystemDiagram } from "components/diagrams/ai-system";
import { InnerPageHero } from "components/shared/inner-page-hero";
import { LetsConnect } from "components/shared/lets-connect";
import { PageSection, proseLink, Prose } from "components/shared/page-layout";
import { ProjectEvidence } from "components/work/project-evidence";
import { cvPath } from "lib/cv-paths";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";

export default function AIExperiencePage() {
  return (
    <section>
      <InnerPageHero
        description="I build AI products where the experience matters as much as the model: voice and chat assistants, retrieval-backed workflows, and interfaces that help people understand what an agent is doing."
        title="AI Engineering"
      />
      <Prose>
        That takes work across product, design, and architecture. I shape the
        tools and context a model receives, the decisions it can make, and the
        controls teams need to inspect, adjust, and operate the system after
        launch. I also explore generative interfaces as a way to move beyond
        chat when a task calls for a clearer interaction.
      </Prose>

      <AiSystemDiagram />

      <PageSection title="LegalAgent: voice, chat, and retrieval">
        <Prose>
          For LegalAgent, I added Spanish and English voice and chat to an
          existing React Native app for legal professionals. I used
          OpenAI&apos;s Realtime API for voice, the AI SDK for chat, and
          retrieval over case context, documents, and procedures. Sessions with
          attorneys led me to adjust the assistant&apos;s persona and tool
          calling.
        </Prose>

        <ProjectEvidence
          columns={1}
          presentation="registry"
          slugs={["legal-agent"]}
        />

        <Prose>
          To make the system manageable after launch, I built a TanStack Start
          administration interface with Microsoft SSO, document management,
          prompt controls, and retrieval categories.
        </Prose>
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
          <Link href="/project/wizard-world" className={proseLink}>
            Wizard World
          </Link>{" "}
          combined OpenAI image generation with NFT minting on Flow through
          Niftory. It was an experiment in connecting generative experiences to
          blockchain transactions.
        </Prose>

        <ProjectEvidence slugs={["masterbots", "bitlauncher"]} />
      </PageSection>

      <LatestPosts
        category="Artificial Intelligence"
        limit={4}
        title="Writing about AI products"
        variant="editorial"
      />

      <PageSection title="Work together">
        <Prose>
          The roles and dates behind this work are in my{" "}
          <Link href={cvPath({ key: "ai" })} className={proseLink}>
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
    "AI engineering by Gabo Esquivel: voice and chat assistants, retrieval, agentic workflows, and production tools built for teams to operate.",
  images: [
    {
      url: "/images/work/legalagent.png",
      alt: "LegalAgent AI assistant interface",
    },
  ],
  path: "/ai",
  title: "AI Engineering | Gabo Esquivel",
});
