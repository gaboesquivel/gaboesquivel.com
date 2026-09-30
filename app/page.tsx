import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import {
  blockGrid,
  PageImage,
  PageSection,
  PageTitle,
  Prose,
  sectionAction,
  twoColGrid,
} from 'components/shared/page-layout'
import { PathLink } from 'components/shared/path-link'
import { ProjectCard } from 'components/work/project-card'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'
import workshop from 'public/images/gabo-workshop.jpg'

const selectedProjectSlugs = ['legal-agent', 'wink', 'ztx', 'bitlauncher']
const selectedProjects = selectedProjectSlugs.flatMap((slug) =>
  projects.filter((project) => project.slug === slug),
)

export default function HomePage() {
  return (
    <section>
      <PageTitle>Gabo Esquivel — Product Engineer</PageTitle>
      <Prose>
        I build useful and delightful software products, lately where the
        technology is hard to trust: AI agents and onchain finance. I work
        across architecture and interface, deciding what belongs in the product
        and what should recede behind it.
      </Prose>

      <Prose>
        15+ years of shipping software, 12+ of them building 0→1 products for
        startups and growth-stage teams in regulated finance, consumer Web3, and
        production AI.
      </Prose>

      <PageImage
        alt="Gabo Esquivel giving a workshop in 2019"
        src={workshop}
        priority
      />

      <PageSection
        title="Selected work"
        action={
          <Link href="/work" className={sectionAction}>
            More work
          </Link>
        }
      >
        <ul className={blockGrid}>
          {selectedProjects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} priority={index === 0} showRole />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection title="Focus">
        <Prose>
          Right now I work on agentic AI and onchain finance. In both, the model
          or the chain does the hard part, and the product decides whether
          people can trust it with real work and real money.
        </Prose>
        <ul className={blockGrid}>
          <li className="h-full">
            <PathLink
              href="/ai"
              title="Agentic AI products"
              note="Agents that call tools and render generative UI, with clear limits on what the model decides and controls your team can change after launch."
            />
          </li>
          <li className="h-full">
            <PathLink
              href="/web3"
              title="Stablecoins and trading"
              note="Stablecoin flows, wallets, and trading interfaces that show people what they're about to sign, with WebAuthn key management and indexed balances behind them."
            />
          </li>
        </ul>
        <Prose>
          I ship in{' '}
          <Link href="/startups" className="prose-link">
            startups
          </Link>
          , where the first version still has to hold, and in{' '}
          <Link href="/institutions" className="prose-link">
            established companies
          </Link>
          , where the constraint is usually the systems already running.
        </Prose>
      </PageSection>

      <PageSection title="Career">
        <ul className={twoColGrid}>
          <li className="h-full">
            <PathLink
              href="/bio"
              title="Career story"
              note="From Costa Rica's JavaScript community to a neobank, Web3, and production AI."
            />
          </li>
          <li className="h-full">
            <PathLink
              href="/cv"
              title="Employment record"
              note="Titles, dates, and a printable PDF."
            />
          </li>
        </ul>
      </PageSection>

      <LatestPosts
        title="Writing"
        action={
          <Link href="/blog" className={sectionAction}>
            More writing
          </Link>
        }
      />

      <PageSection title="Work together">
        <LetsConnect />
      </PageSection>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Gabo Esquivel | Product Engineer',
  description:
    'Product engineer for agentic AI, generative UI, stablecoins, and trading interfaces. Selected work includes LegalAgent, Wink, ZTX, and Bitlauncher.',
  openGraph: {
    title: 'Gabo Esquivel | Product Engineer',
    description:
      'Product engineer for agentic AI, generative UI, stablecoins, and trading interfaces. Selected work includes LegalAgent, Wink, ZTX, and Bitlauncher.',
    type: 'website',
  },
}
