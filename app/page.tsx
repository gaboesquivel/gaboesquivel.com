import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import {
  blockGrid,
  PageImage,
  PageSection,
  PageTitle,
  Prose,
  sectionAction,
} from 'components/shared/page-layout'
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
        I build useful and delightful software products. I move between
        architecture and interface, deciding what belongs in the product and
        what should recede behind it.
      </Prose>

      <Prose>
        15+ years of shipping software, 12+ of them leading 0→1 product work:
        regulated finance, consumer Web3, production AI. I work from Costa Rica
        on US Mountain Time with distributed teams.
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

      <Prose>
        I ship in{' '}
        <Link href="/startups" className="prose-link">
          startups
        </Link>{' '}
        and{' '}
        <Link href="/institutions" className="prose-link">
          established companies
        </Link>
        . The current focus is{' '}
        <Link href="/ai" className="prose-link">
          AI product engineering
        </Link>{' '}
        and{' '}
        <Link href="/web3" className="prose-link">
          Web3 systems
        </Link>
        .
      </Prose>

      <Prose>
        The career story is on{' '}
        <Link href="/bio" className="prose-link">
          /bio
        </Link>
        . The employment record is on{' '}
        <Link href="/cv" className="prose-link">
          /cv
        </Link>
        .
      </Prose>

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
    'Product engineer across regulated finance, consumer Web3, and production AI. Selected work includes LegalAgent, Wink, ZTX, and Bitlauncher.',
  openGraph: {
    title: 'Gabo Esquivel | Product Engineer',
    description:
      'Product engineer across regulated finance, consumer Web3, and production AI. Selected work includes LegalAgent, Wink, ZTX, and Bitlauncher.',
    type: 'website',
  },
}
