import { BioChapter } from "components/bio/bio-chapter";
import { LatestPosts } from "components/blog/latest-posts";
import { InnerPageHero } from "components/shared/inner-page-hero";
import { LetsConnect } from "components/shared/lets-connect";
import {
  PageImage,
  PageSection,
  proseLink,
  Prose,
} from "components/shared/page-layout";
import { ProjectEvidence } from "components/work/project-evidence";
import { pageMetadata } from "lib/page-metadata";
import Link from "next/link";
import gabocoding from "public/images/bio/gabo-coding.jpg";

export default function BioPage() {
  return (
    <section>
      <InnerPageHero
        description="I started with web interfaces in 2010. The work grew into complete products, then financial and blockchain systems, and now intelligent interfaces. This is how those stages shaped the way I build."
        title="Career story"
      />

      <BioChapter
        title="Interfaces and a JavaScript community"
        year="2010 — interfaces"
      >
        <Prose>
          At American Express, I worked on credit-card interfaces inside an
          established financial company. From 2010 to 2012, I built interactive
          comparison tools and responsive landing pages, worked with analytics
          and A/B testing, and helped migrate an older frontend toward modern
          JavaScript.
        </Prose>
        <Prose>
          I also founded{" "}
          <Link href="/project/costa-rica-js" className={proseLink}>
            Costa Rica JS
          </Link>{" "}
          in 2010. It grew into a community of more than 2,000 developers
          through meetups, NodeSchool, and Front End Day. Building that
          community mattered as much as the software: we were learning, sharing,
          and helping modern web development take root in Costa Rica.
        </Prose>
        <Prose>
          At AMC Networks, I led frontend engineering for YEAH!, an interactive
          streaming movie service launched at SXSW in 2013. Around the same
          period, I built a fantasy-tennis strategy game and a realtime
          flight-information display for ARINC.
        </Prose>

        <ProjectEvidence
          columns={1}
          presentation="editorial"
          slugs={["costa-rica-js"]}
        />
      </BioChapter>

      <BioChapter
        title="From interfaces to a banking product"
        year="2015 — product"
      >
        <Prose>
          Wink changed the scale of the work. Costa Rica&apos;s first neobank
          needed to make banking available from a phone, without a branch visit.
          I joined as Lead Engineer in 2015, built the first React Native app
          and AWS backend, integrated partner-bank APIs, and implemented
          biometric authentication through a native bridge.
        </Prose>
        <Prose>
          Shipping the product meant more than writing software. I helped select
          the technology, coordinate partners and vendors, plan delivery, and
          build the engineering team needed to take it to launch.
        </Prose>
        <Prose>
          Wink is where I settled on a principle I still hold: technology should
          expand access rather than create new gatekeepers. There, that meant
          being able to open a bank account without visiting a branch.
        </Prose>

        <ProjectEvidence
          columns={1}
          presentation="editorial"
          slugs={["wink"]}
        />
      </BioChapter>

      <BioChapter
        title="Complex financial and blockchain systems"
        year="2017 — systems"
      >
        <Prose>
          Building financial products led me toward blockchain infrastructure
          and the interfaces around it. From 2017 onward, I worked on tokens,
          marketplaces, and networks: Knowledge&apos;s ERC-20 token,
          AsoBlockchain, which I co-founded, and EOS Costa Rica, where I helped
          launch the EOS mainnet and worked on a private chain for Grant
          Thornton Labs.
        </Prose>
        <Prose>
          The work later moved closer to the experiences people use:
          Bitcash&apos;s exchange and browser signing, ChainGraph&apos;s indexed
          blockchain data, RareMint&apos;s marketplace, ZTX&apos;s in-world
          wallet, Bitlauncher&apos;s auctions, and Opyn&apos;s trading
          interface. Each involved a different part of the same challenge:
          connecting complex systems to understandable interactions.
        </Prose>

        <PageImage
          alt="Gabo Esquivel coding"
          objectClassName="object-top"
          src={gabocoding}
        />

        <ProjectEvidence
          presentation="editorial"
          slugs={["eos-costa-rica", "ztx"]}
        />
      </BioChapter>

      <BioChapter title="Intelligent interfaces" year="2024 — agents">
        <Prose>
          By 2024, I was building specialized AI assistants at Masterbots and
          Bitlauncher. In 2025, I worked on{" "}
          <Link href="/project/legal-agent" className={proseLink}>
            LegalAgent
          </Link>
          , combining voice, chat, retrieval, and the controls a team needs to
          operate an AI product. The same interest in interfaces—the point where
          a complex system becomes usable—now extends to agents.
        </Prose>

        <ProjectEvidence
          columns={1}
          presentation="editorial"
          slugs={["legal-agent"]}
        />
      </BioChapter>

      <LatestPosts limit={4} title="Writing" variant="editorial" />

      <PageSection title="What I’m focused on">
        <Prose>
          My focus today is agentic AI and onchain finance. I help teams turn
          ideas into working products, from the experience people use to the
          systems behind it. I collaborate in English, Spanish, Portuguese, and
          Italian. For dates and roles, see my{" "}
          <Link href="/cv" className={proseLink}>
            résumé
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
    "From Costa Rica JS and Wink to Web3 products and AI assistants, explore the career and product engineering approach of Gabo Esquivel.",
  images: [
    {
      url: "/images/bio/gabo-coding.jpg",
      alt: "Gabo Esquivel coding",
    },
  ],
  path: "/bio",
  title: "Gabo Esquivel | Career Story",
});
