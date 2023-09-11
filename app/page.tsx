import Image from 'next/image';
import workshop from 'public/images/gabo-workshop.jpg';

export default function HomePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">hi, I'm Gabo Esquivel ( gab-o )</h1>
      
      <p className="prose prose-neutral dark:prose-invert">
        I'm a full-stack software engineer with over 15 years of experience, the last 6 years being dedicated to web3 technologies. My background includes work on numerous blockchain projects, a decade with NodeJS and cloud platforms, as well as advanced expertise in containers, React, and TypeScript.
      </p>

 <div className="gap-4 my-8 columns-1">
 <div className="relative mb-4 h-60">
          <Image
            alt="Me giving a workshop at workshop 2019"
            src={workshop}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
 </div>
     


      <p className="prose prose-neutral dark:prose-invert">
      I advocate for the use of open source technology stacks, decentralized finance (DeFi), a DevOps culture, and streamlined agile methodologies, including mob programming. My primary focus lies at the crossroads of emerging technologies, financial services, and delivering exceptional user experiences.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
      I help companies develop software products and make technical decisions, working with stakeholders and developers in the design and implementation of software applications, taking ideas from conception to production, and successful execution. I provide my contract services via <a target="_blank" href="https://blockmatic.io">Blockmatic Labs LLC</a>.
      </p>

      <p className="prose prose-neutral dark:prose-invert">
      Blockchain, DeFi, NodeJS, Databases, Linux, Docker, Cloud, GraphQL, React, React Native
      </p>

      <p className="prose prose-neutral dark:prose-invert">
      Spoken languages: English, Spanish, Portuguese, and Italian.
      </p>

           <ul className="flex flex-col mt-8 space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        
         <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://linkedin.com/in/gaboesquivel"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">linkedIn</p>
          </a>
        </li>
        
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/gaboesquivel"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">follow me</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:contact@gaboesquivel.com"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">email me</p>
          </a>
        </li>
      </ul>
    </section>
  );
}


function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}