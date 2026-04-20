import './cv.css'
import { LatestPosts } from 'components/blog/latest-posts'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PrintButton } from '../../components/print-button'
import { ContactInfo } from '../../components/shared/contact-info'
import { experience } from './experience'
// import { skillGroups } from './skills'

export default function CVPage() {
  return (
    <section className="p-0 m-0 cv-content cv-print print:block print:w-full print:max-w-none">
      <header className="cv-header mb-8">

        <h1 className="text-2xl font-bold tracking-tighter flex justify-between items-center print:text-4xl ">
          <span>Gabo Esquivel</span>
          <PrintButton />
        </h1>
        <p className="cv-print-professional-title">
            Senior Full Stack Engineer
          </p>
      </header>
    <div className="cv-summary">
      <p className="prose prose-neutral dark:prose-invert  cv-content ">  
      Building AI-powered products and crypto-native applications. I design and ship  systems end-to-end, working with modern stacks, LLMs, APIs, and onchain integrations.
</p>
<p className="prose prose-neutral dark:prose-invert cv-content">
With 15+ years of experience, I help teams turn ideas into market-ready products across web, mobile, and cloud, collaborating across engineering, product, and user experience. Fluent in English, Spanish, Portuguese, and Italian.
</p>
</div>
<h2 className="text-xl font-semibold mb-4 mt-8">Highlights</h2>

<ul className="mb-8 space-y-1 list-none list-inside">
  <li className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] ">9+ years in crypto (DeFi, NFTs, EVM, onchain infrastructure)</li>
  <li className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] ">12+ years building 0→1 products across startups</li>
  <li className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] ">Led engineering for Costa Rica’s first neobank (Wink), from architecture to production</li>
  <li className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] ">Shipped AI, Web3, fintech, and consumer products used in production environments</li>
</ul>

<h2 className="text-xl font-semibold mb-4">Skills</h2>

<ul className="mb-8 space-y-1  list-none  list-inside">
  <li className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] ">
    <strong>Languages:</strong> TypeScript, JavaScript, Python, Solidity, SQL
  </li>
  <li className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] ">
    <strong>Frontend:</strong> React, Next.js, Tailwind, Shadcn UI, React Native, Expo, Tanstack
  </li>
  <li className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] ">
    <strong>Backend:</strong> Node.js, PostgreSQL, Supabase, Prisma, Drizzle, GraphQL
  </li>
    <li className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] ">
      <strong>Web3:</strong> Solidity, Foundry, Hardhat, Viem, Wagmi, Ponder, Ethers
  </li>
  <li className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] ">
    <strong>AI / ML:</strong> LLMs, AI SDK, RAG, Embeddings, Vector Search, Agent Workflows
  </li>
  <li className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] ">
    <strong>Cloud & Infra:</strong> AWS, GCP, Azure, Docker, Vercel, Pulumi, Terraform, Serverless
  </li>
</ul>


<h2 className="text-xl font-semibold mb-4">Experience</h2>

      <div className="cv-experience-list space-y-8 list-none list-inside">
        {experience.map((exp) => (
          <div
            key={exp.company}
            className={`${exp.pageBreak ? 'page-break-before' : ''} cv-entry`}
          >
            <h3 className="text-xl font-semibold mb-1 print:text-lg cv-entry-title">
            {exp.title}, {exp.company}
            </h3>
            {exp.title && (
              <p className="exp-duration cv-entry-meta text-sm font-medium text-gray-400 mb-4">
                {exp.location} • {exp.type} • {exp.duration}
                {/* <span className="text-sm exp-duration dark:text-gray-400 mb-2 print:text-xs">
              {exp.location} • {exp.type} • {exp.duration} 
            </span>*/}
              </p>
            )}
           
            <p className="mb-4 exp-description prose prose-neutral dark:prose-invert cv-content cv-entry-description">
              {exp.description}
            </p>
            <ul className="mb-4 space-y-1 list-none pl-0 cv-content cv-entry-achievements">
       
              {exp.achievements.map((achievement) => (
                <li
                  className="cv-content prose prose-neutral dark:prose-invert cv-bullet relative pl-5 before:absolute before:left-0 before:content-['•'] "
                  key={achievement}
                >
                  {achievement}
                </li>
              ))}
            </ul>
           
          </div>
        ))}
      </div>

      {/* <div className="mt-12 hidden print:block">
        <h2 className="text-xl font-semibold mb-4 print:text-black">
          Education
        </h2>
        <div>
          <h3 className="text-lg font-medium mb-1 print:text-black">
            Universidad Cenfotec
          </h3>
          <p className="text-sm exp-duration dark:text-gray-400 mb-1 print:text-xs">
            Bachelor of Science (BS), Software Engineering
          </p>
          <p className="text-sm exp-duration dark:text-gray-400 print:text-xs">
            2006 – 2009
          </p>
        </div>
      </div> */}

      <ContactInfo />

      <div className="print:hidden">
        <LatestPosts />
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Gabo Esquivel - Curriculum Vitae',
  description:
    'Senior Full Stack Engineer (Web3 + AI) with 15+ years in TypeScript, React, Next.js, Node.js, PostgreSQL, EVM, viem, wagmi, LLMs, and RAG.',
  keywords: [
    'software engineer',
    'senior full stack engineer',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Supabase',
    'web3',
    'EVM',
    'viem',
    'wagmi',
    'LLM',
    'RAG',
    'AI SDK',
    'fintech',
    'blockchain',
  ],
  openGraph: {
    title: 'Gabo Esquivel - Curriculum Vitae',
    description:
      'Senior Full Stack Engineer (Web3 + AI) with 15+ years in Web3, AI, and fintech.',
    type: 'profile',
  },
}
