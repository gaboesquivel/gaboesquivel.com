import Image from 'next/image';
import workshop from 'public/images/bio/gaboesquivel-workshop.jpg';
import blockchaincr from 'public/images/2018/06/blockchain-costa-rica.jpg';

export default function BioPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">My Professional Journey</h1>
      
<p className="prose prose-neutral dark:prose-invert">
    I started my journey at <a href="https://www.cenfotec.ac.cr/" target="_blank" className="prose-link">CenfoTec University</a> in San José in 2006, where I developed a passion for software product development and the possibilities of the web platform. In 2008, I began working as a web developer, mainly building WordPress sites. In 2009, I advanced to a UI Engineer role for <a href="https://www.americanexpress.com" target="_blank" className="prose-link">americanexpress.com</a>, which marked the start of my deep dive into web technologies.
</p>
<p className="prose prose-neutral dark:prose-invert">
    In 2010, I founded <a href="https://www.meetup.com/Costa-Rica-JS/" target="_blank" className="prose-link">Costa Rica JS</a>, a meetup group for JavaScript enthusiasts in San José, which later became Central America's largest meetup community in this field, with over 2000 members, as Node.js and SPA frameworks gained momentum.
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
    By 2011, I had transitioned into freelance software development, collaborating on various projects and taking on different engineering roles, which broadened my technical skills and industry knowledge.
</p>
<p className="prose prose-neutral dark:prose-invert">
    A significant turn in my career came in 2016 when I joined <a href="https://holawink.com" target="_blank" className="prose-link">Wink</a>, a neo-bank startup, as an architect. There, I led the team and the development of the app's initial version, delving into financial technologies and discovering the transformative power of blockchain and Bitcoin, sparking my interest in Web3.
</p>
<p className="prose prose-neutral dark:prose-invert">
    In 2017, I co-founded <a href="https://asoblockchain.org" target="_blank" className="prose-link">AsoBlockchain and CryptoCantinaCR</a>, a community hub for studying and promoting blockchain technology and decentralized applications in Costa Rica, and joined the <a href="http://knowledge.io" target="_blank" className="prose-link">Knowledge</a> team to develop the tokens and applications for their ICO.
</p>

 <div className="gap-4 my-8 columns-1">
 <div className="relative mb-4 h-60">
      <Image
        alt="Me giving a workshop at BlockchainCR"
        src={blockchaincr}
        fill
        sizes="(max-width: 768px) 213px, 33vw"
        priority
        className="object-cover rounded-lg"
      />
    </div>
 </div>

<p className="prose prose-neutral dark:prose-invert">
    My role at <a href="https://eoscostarica.io" target="_blank" className="prose-link">EOS Costa Rica</a> in 2018 as a lead engineer involved managing infrastructure and developing smart contracts for EOSIO networks, deepening my expertise in blockchain technology.
</p>
<p className="prose prose-neutral dark:prose-invert">
    Between 2019 and 2021, I worked on several groundbreaking decentralized applications (dapps), such as <a href="https://emanate.live" target="_blank" className="prose-link">Emanate</a>, a Web3-powered music marketplace; <a href="https://www.sense.chat/" target="_blank" className="prose-link">Sense Chat</a>, focusing on secure, private communication and transactions; and <a href="https://bitcash.org/" target="_blank" className="prose-link">Bitcash</a>, an innovative currency exchange application.
</p>
<p className="prose prose-neutral dark:prose-invert">
    In 2021, I was part of <a href="https://raremint.com/" target="_blank" className="prose-link">RareMint</a> to develop a platform offering genuine real-world sports collectible assets transformed into digital experiences through asset-backed NFTs on both the Ethereum and Polygon blockchains.
</p>
<p className="prose prose-neutral dark:prose-invert">
    In 2022, I contributed to the development of the Ethereum/WebGL communication channel at <a href="https://ztx.foundation/" target="_blank" className="prose-link">ZTX</a>, a web3 metaverse platform empowering creators and communities to build, play, and earn. ZTX is the blockchain initiative backed by Jump Crypto and ZEPETO — the largest metaverse in Asia with over 400 million lifetime users.
</p>
<p className="prose prose-neutral dark:prose-invert">
    In 2023, I joined <a href="https://bitlauncher.ai" target="_blank" className="prose-link">bitlauncher.ai</a> as a lead developer. It's an AI and Web3 launchpad revolutionizing startup funding. The platform offers a cutting-edge batch auction system for token sales, ensuring transparent and equitable price discovery. 
</p>

<p className="prose prose-neutral dark:prose-invert">
    My journey continues to evolve as remain focused on user-centric innovation and new technologies, particularly AI and Web3.
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