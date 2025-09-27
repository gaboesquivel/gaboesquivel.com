import Image from 'next/image'
import Link from 'next/link'
import workshop from 'public/images/gabo-workshop.jpg'
import { LatestPosts } from '../components/blog/latest-posts'

export default function HomePage() {
  return (
    <section className="p-0 m-0">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        Gabo Esquivel ( gab-o )
      </h1>

      <p className="prose prose-neutral dark:prose-invert">
        I help organizations turn ideas into market-ready software products.
        With over 15 years of experience as a{' '}
        <Link href="/tech" className="prose-link">
          full-stack
        </Link>{' '}
        and{' '}
        <Link href="/blog/2025-03-the-product-engineer" className="prose-link">
          product engineer
        </Link>
        , I bridge technical execution with user experience and business
        strategy, ensuring that every project moves from concept to launch with
        both technical depth and business clarity.
      </p>

      <div className="gap-4 my-8 columns-1">
        <div className="relative mb-4 h-60">
          <Image
            alt="Me giving a workshop in 2019"
            src={workshop}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <p className="prose prose-neutral dark:prose-invert">
        My focus is on emerging technologies and user-centric innovation. My
        expertise spans{' '}
        <Link href="/web3" className="prose-link">
          Web3
        </Link>
        , cloud, and full-stack web and mobile development, complemented by
        ongoing explorations in{' '}
        <Link href="/ai" className="prose-link">
          AI
        </Link>{' '}
        and how it can redefine the way people interact with software.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        My approach is rooted in agile methodologies, striving for precision in
        technology implementation and continuous improvement throughout the
        development process. I've been working remotely with international teams
        for over 12 years, bringing{' '}
        <Link href="/work" className="prose-link">
          proven experience
        </Link>{' '}
        in delivering results across time zones.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        I usually work through 1099 engagements via my US-based company,
        Blockmatic Labs LLC, which provides clients with straightforward
        contracts, built-in compliance, and IP protection. I'm based in Costa
        Rica, aligned with US Mountain Time, and only a short flight away from
        major US cities.
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        If you're building innovative solutions in{' '}
        <Link href="/ai" className="prose-link">
          AI
        </Link>{' '}
        or{' '}
        <Link href="/web3" className="prose-link">
          Web3
        </Link>
        ,{' '}
        <a href="mailto:contact@gaboesquivel.com" className="prose-link">
          let's connect
        </a>
        .
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        You can view my work portfolio{' '}
        <Link href="/work" className="prose-link">
          here
        </Link>
        .
      </p>

      <LatestPosts />
    </section>
  )
}
