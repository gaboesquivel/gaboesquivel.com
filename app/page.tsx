import { LatestPosts } from 'components/blog/latest-posts'
import { LetsConnect } from 'components/shared/lets-connect'
import { ProjectCard } from 'components/work/project-card'
import { projects } from 'gaboesquivel'
import Image from 'next/image'
import Link from 'next/link'
import workshop from 'public/images/gabo-workshop.jpg'

const selectedProjectSlugs = ['legal-agent', 'wink', 'ztx', 'bitlauncher']
const selectedProjects = selectedProjectSlugs.flatMap((slug) =>
  projects.filter((project) => project.slug === slug),
)

export default function HomePage() {
  return (
    <section className="p-0 m-0">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        Gabo Esquivel — Product Engineer
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        I work across product, interface, and systems, taking ideas from early
        technical decisions through shipped software. Since 2010, that has
        included regulated finance, consumer Web3, and production AI.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        I move between architecture and interface, deciding what belongs in the
        product and what should recede behind it. I operate across engineering,
        product, and user experience, helping teams turn concepts into working
        software that delivers measurable value.
      </p>

      <div className="my-8 columns-1 gap-4">
        <div className="relative mb-4 h-60">
          <Image
            alt="Gabo Esquivel giving a workshop in 2019"
            src={workshop}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <p className="prose prose-neutral dark:prose-invert">
        I work remotely with international teams, and I ship in{' '}
        <Link href="/startups" className="prose-link">
          startups
        </Link>{' '}
        and{' '}
        <Link href="/institutions" className="prose-link">
          established companies
        </Link>
        .
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        The career story is on{' '}
        <Link href="/bio" className="prose-link">
          /bio
        </Link>
        . The employment record is on{' '}
        <Link href="/cv" className="prose-link">
          /cv
        </Link>
        .
      </p>

      {/* <p className="prose prose-neutral dark:prose-invert">
        LegalAgent uses voice and chat so people can work with case context.
        Wink made regulated finance usable on a phone. In ZTX, blockchain
        infrastructure recedes into a consumer virtual world. Bitlauncher is a
        launchpad for token sales and auctions around AI startups.
      </p> */}

      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tighter">Selected work</h2>
        <Link href="/work" className="cta-link text-sm">
          More work
        </Link>
      </div>

      <ul className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {selectedProjects.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard project={project} priority={index === 0} showRole />
          </li>
        ))}
      </ul>

      <h2 className="mb-4 mt-14 text-2xl font-bold tracking-tighter">
        Work together
      </h2>

      <LetsConnect />

      <LatestPosts title="Writing" />
    </section>
  )
}
