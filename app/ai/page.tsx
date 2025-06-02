import { LatestPosts } from 'components/blog/latest-posts'
import { Projects } from 'components/work/projects'
import { projects } from 'gaboesquivel'
import type { Metadata } from 'next'
import Link from 'next/link'

export default function AIExperiencePage() {
  return (
    <section className="p-0 m-0 cv-content print:block print:w-full print:max-w-none">
      <h1 className="mb-8 text-2xl font-bold tracking-tighter print:text-3xl flex justify-between">
        <span className="hidden print:inline text-black">
          Gabo Esquivel - AI Engineer
        </span>
        <span className="print:hidden">Artificial Intelligence Experience</span>
      </h1>

      <div className="mb-8 print:block print:text-gray-700">
        <p className="mb-4">
          With over 15 years in full-stack software engineering, I help
          organizations turn initial ideas into market-ready software products,
          ensuring concepts reach their full potential. I work as a product
          engineer, bridging technical execution with user experience and
          business strategy.
        </p>
        <p className="mb-4 hidden print:block">
          Over the past few years, I've focused deeply on building real-world AI
          applications that bridge blockchain and advanced user
          interactions—from experimental hackathon projects to specialized
          chatbot platforms and AI launchpads. Today, my work is centered on
          redefining user experience: moving beyond static interfaces to create
          systems where chat, search, and action converge. I believe AI is no
          longer just a backend feature—it's becoming the new operating system
          for software, making interactions more natural, dynamic, and
          intuitive.
        </p>
        <p className="mb-4 print:hidden">
          AI is reshaping the world, fundamentally changing how we live, work,
          and interact with technology. Over the past few years, I've focused
          deeply on building real-world AI applications that bridge blockchain
          and advanced user interactions—from experimental hackathon projects to
          specialized chatbot platforms and AI launchpads. Today, my work is
          centered on redefining user experience: moving beyond static
          interfaces to create systems where chat, search, and action converge.
          I believe AI is no longer just a backend feature—it's becoming the new
          operating system for software, making interactions more natural,
          dynamic, and intuitive.
        </p>

        {/* <div className="gap-4 my-8 columns-1">
          <div className="relative mb-4 h-60">
            <Image
              alt="Artificial Intelligence"
              src={aiPic}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="object-cover rounded-lg"
            />
          </div>
        </div> */}

        <h2 className="text-xl font-bold mb-4">Starting With OpenAI (2022)</h2>
        <p className="mb-4">
          My journey into the world of AI began in 2022 when I started
          experimenting with OpenAI's APIs. The potential of AI to revolutionize
          user experiences captivated me, and I quickly realized that AI was not
          just a trend but a transformative force that would redefine how we
          interact with technology. This realization ignited my passion for
          exploring AI-driven user experiences, where voice, text, and embedded
          capabilities lead the way.
        </p>
        <h2 className="text-xl font-bold mb-4">
          Wizard World: Hackathon Experimentation (2023)
        </h2>
        <p className="mb-4">
          During the Flow Hackathon 2022, I embarked on an exciting project
          called Wizard World. This progressive web app was designed to connect
          OpenAI's LLM models with the Flow blockchain, enabling the generation
          of AI images and their minting as NFTs.
        </p>
        <h2 className="text-xl font-bold mb-4">
          Masterbots: Specialized AI Bots (2023)
        </h2>
        <p className="mb-4">
          By focusing on domain-specific AI chatbots, Masterbots.ai provides
          users with advanced specialized bots capable of handling complex tasks
          and large contexts. We use magic prompt engineering techniques under
          the hood to provide better responses and integration of AI SDK
          streaming with Next.js to provide a better user experience.
        </p>
        <h2 className="text-xl font-bold mb-4">
          Bitlauncher: AI and Crypto Launchpad (2023)
        </h2>
        <p className="mb-4">
          Bitlauncher was conceived as a cutting-edge AI and crypto launchpad
          platform, designed to democratize the investment process by providing
          early access to promising AI unicorn startups through token sales and
          auctions. The platform's batch auction system ensured fair and
          transparent price discovery, eliminating traditional barriers and
          biases in fundraising. Recently, we introduced an AI chatbot assistant
          with RAG for document retrieval, utilizing the experimental RSC AI
          SDK. This addition has significantly enhanced user interaction and
          information access, allowing users to retrieve detailed information
          efficiently.
        </p>
        <h2 className="text-xl font-bold mb-4">
          LegalAgent: AI for Legal Operations (2024)
        </h2>
        <p className="mb-4">
          At LegalAgent, I helped with the development of a mobile app featuring
          voice and text interfaces that transformed how their legal team
          accessed and understood internal documentation. By implementing a
          secure, retrieval-augmented generation (RAG) system using OpenAI, we
          enabled lawyers to query contracts, memos, and regulatory docs in
          natural language. This project also involved developing a backend
          system to manage the system's prompts, allowing admins to adjust the
          assistant's behavior. Additionally, we integrated third-party systems
          like billing and case tracking APIs using advanced tools, resulting in
          a more responsive legal operation that accelerated knowledge access
          and reduced research friction.
        </p>
      </div>

      <div className="print:hidden">
        <Projects
          heading="Projects"
          projects={projects.filter((project) => project.type.includes('ai'))}
        />

        <LatestPosts
          category="Artificial Intelligence"
          title="Latest Artificial Intelligence Articles"
        />
      </div>
      <div className="hidden print:block print:text-gray-700">
        More details on my AI experience can be found on my website{' '}
        <Link href="/work/ai" className="text-green-700">
          gaboesquivel.com
        </Link>
        .
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Artificial Intelligence Experience - Gabo Esquivel',
  description:
    'AI Engineer with 15+ years in full-stack development, specializing in AI-driven user experiences.',
  keywords: [
    'AI engineer',
    'LLM integration',
    'retrieval-augmented generation',
    'AI-driven UX',
    'conversational interfaces',
    'vector search',
    'OpenAI',
    'AI assistants',
    'natural language processing',
    'knowledge base systems',
    'AI SDK',
    'prompt engineering',
  ],
  openGraph: {
    title: 'Artificial Intelligence Experience - Gabo Esquivel',
    description:
      'AI Engineer with 15+ years in full-stack development, specializing in AI-driven user experiences.',
    type: 'profile',
  },
}
