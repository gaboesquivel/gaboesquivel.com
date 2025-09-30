import { LatestPosts } from 'components/blog/latest-posts'
import { ContactInfo } from 'components/shared/contact-info'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function FullstackExperiencePage() {
  const type = 'fullstack'
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - Full-Stack Product Engineer
        </span>
        <span className="print:hidden">
          Full-Stack Product & Cloud Engineering Experience
        </span>
      </h1>

      <p className="prose prose-neutral dark:prose-invert print:block hidden">
        With over 15 years in full-stack software engineering, I help
        organizations turn initial ideas into market-ready software products,
        ensuring concepts reach their full potential. I work as a product
        engineer, bridging technical execution with user experience and business
        strategy.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        As a full-stack engineer, I bridge the gap between frontend experiences,
        backend systems, and cloud infrastructure. My approach focuses on
        end-to-end delivery with modern DevOps practices, ensuring that products
        are not only well-built but also maintainable, scalable, and aligned
        with business goals. I believe the most impactful engineering happens
        when we understand both user needs and system architecture.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Early Full-Stack Experience (2010-2015)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        My full-stack journey began with traditional web applications using
        jQuery and PHP/Ruby backends. At AMC Networks, I built an interactive
        video streaming platform called YEAH! TV, which combined frontend video
        player components with backend content management systems and Brightcove
        integration. This project taught me how to balance user experience
        concerns with backend performance and content delivery optimization.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Modern JavaScript Stack (2015-2018)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        As the JavaScript ecosystem matured, I embraced modern full-stack
        development with React frontends and Node.js backends. At Eat Arcade, I
        built a complete system using Node.js, AngularJS, Twilio, and Stripe
        integrations. This product combined a consumer-facing application with
        administration interfaces and third-party service integrations,
        requiring comprehensive knowledge across the entire stack.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        During this period, I also led development at Wink, Costa Rica's first
        digital bank. This project involved creating a secure banking platform
        with biometric authentication, banking API integrations, and regulatory
        compliance—all while maintaining an intuitive mobile-first user
        experience.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Blockchain Full-Stack: Knowledge.io & EOS (2017-2020)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At Knowledge.io, I led full-stack development for a tokenized Q&A
        platform, combining React marketplace interfaces with Ethereum ICO smart
        contracts and AWS serverless backend services. This project required
        integrating wallet authentication, token management, and content ranking
        algorithms into a cohesive product.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        At EOS Costa Rica, I created end-to-end solutions including blockchain
        infrastructure with Terraform, API services, and React client
        applications. One key project was a private blockchain for Grant
        Thornton, which included a complete stack from infrastructure automation
        to user interfaces for managing intercompany transactions and
        stablecoin-based payments.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Streaming Platform: Emanate (2019-2021)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At Emanate, I worked on a music streaming platform that combined React
        frontend interfaces with EOS blockchain and AWS backend services. The
        system handled artist onboarding, music uploads, streaming playback, and
        transparent royalty payments through blockchain transactions. This
        project demonstrated how full-stack engineering can create new business
        models by integrating web technologies with blockchain capabilities.
      </p>

      <h2 className="text-xl font-bold mb-4 mt-6">
        Modern Cloud-Native Full-Stack (2022-Present)
      </h2>
      <p className="prose prose-neutral dark:prose-invert">
        At BitLauncher, I designed a complete architecture using Next.js 14,
        Node.js, Solidity, Supabase, and Docker on Google Cloud Platform. This
        system supports token sales and batch auctions with real-time updates,
        wallet integrations, and secure transaction processing. The
        implementation includes frontend interfaces, backend services, smart
        contract integration, and infrastructure automation—all working together
        seamlessly.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
        Most recently, at Masterbots, I built a comprehensive AI platform using
        Next.js, the AI SDK, Supabase pgvector, and GCP infrastructure. This
        full-stack application combines frontend chat interfaces with vector
        database backends and machine learning integrations, representing the
        cutting edge of full-stack development at the intersection of web
        technologies and artificial intelligence.
      </p>

      <div className="print:hidden">
        <Projects
          heading="Projects"
          projects={projects.filter((project) => project.type.includes(type))}
        />
      </div>

      <ContactInfo />

      <LatestPosts category="Fullstack" title="Latest Fullstack Articles" />
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Full-Stack Product & Cloud Engineering Experience - Gabo Esquivel',
  description:
    'Full-Stack Engineer with 15+ years in end-to-end development, specializing in bridging frontend, backend, and cloud infrastructure',
  keywords: [
    'full-stack engineer',
    'product engineering',
    'end-to-end development',
    'cloud architecture',
    'DevOps',
    'Docker',
    'Google Cloud Platform',
    'AWS',
    'Next.js',
    'Node.js',
    'React',
    'Supabase',
    'full-stack product delivery',
  ],
  openGraph: {
    title: 'Full-Stack Product & Cloud Engineering Experience - Gabo Esquivel',
    description:
      'Full-Stack Engineer with 15+ years in end-to-end development, specializing in bridging frontend, backend, and cloud infrastructure',
    type: 'profile',
  },
}
