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
        I'm a full-stack software engineer with over 15 years of experience
        assisting organizations in crafting and evolving software products from
        initial concept to successful market launch, ensuring ideas are realized
        to their full potential. I act as a{' '}
        <Link href="/blog/2025-03-the-product-engineer" className="prose-link">
          product engineer
        </Link>{' '}
        who bridges technical execution with user experience and business
        strategy.
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
          web3
        </Link>
        , cloud, and full-stack web and mobile development, complemented by
        ongoing explorations in{' '}
        <Link href="/ai" className="prose-link">
          artificial intelligence
        </Link>
        .
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        My approach is rooted in agile methodologies, striving for precision in
        technology implementation. I am fluent in English, Spanish, Portuguese,
        and Italian. My professional services are offered through my company,
        Blockmatic Labs LLC. If you are developing innovative solutions in AI
        and Web3, I would love to collaborate. Please{' '}
        <a href="mailto:contact@gaboesquivel.com" className="prose-link">
          contact me
        </a>{' '}
        to discuss how we can work together.
      </p>

      <LatestPosts />
    </section>
  )
}
