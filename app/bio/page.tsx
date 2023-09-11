import Image from 'next/image';
import workshop from 'public/images/bio/gaboesquivel-workshop.jpg';
import blockchaincr from 'public/images/2018/06/blockchain-costa-rica.jpg';

export default function BioPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">You Only Live Once</h1>
      
<p className="prose prose-neutral dark:prose-invert">I have several years of experience working with startups, agencies, and established companies developing web and mobile applications with a focus on FinTech and Blockchain in the recent years.</p>

<p className="prose prose-neutral dark:prose-invert">In 2006 I started my software engineering studies at CenfoTec University in San José where I discovered my passion software product development and the potential of the web platform.</p>

<p className="prose prose-neutral dark:prose-invert">In 2008 I got my first job as a web developer building WordPress sites and about a year later I was hired as a UI Engineer for americanexpress.com.</p>

<p className="prose prose-neutral dark:prose-invert">In 2010 I started Costa Rica JS, a meetup group in San José for people interested in JavaScript. At the time Node.js was starting to get traction and SPA frameworks were blooming. Today the Costa Rican JS community is the largest meetup in Central America with more than 2000 members.</p>

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
     
<p className="prose prose-neutral dark:prose-invert">In 2011 I started to work independently as a freelance developer and during the years I have had the opportunity to collaborate on many different projects and played several engineering roles.</p>

<p className="prose prose-neutral dark:prose-invert">In 2016, I joined the neo-bank startup <a href="https://holawink.com" target="_blank">Wink</a> as an architect and led the formation of the team and the development of the first version of the app. During my time working at the bank, I was doing a lot of research on financial technologies and discovered blockchain technology and bitcoin. I immediately saw the potential of the Web3, the internet of value and ownership, so I started to go down the rabbit hole. </p>

    
<p className="prose prose-neutral dark:prose-invert">
  In 2017, The same year I co-founded <a href="https://blockchaincr.com" target="_blank">BlockchainCR</a>, a community hub for studying and promoting blockchain technology and decentralized applications in Costa Rica, and I joined the <a href="http://knowledge.io" target="_blank">Knowledge</a> team to develop the token and applications for their ICO.
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

<p className="prose prose-neutral dark:prose-invert">In 2018, I joined <a href="https://eoscostarica.io" className="prose-link">EOS Costa Rica</a> as a lead engineer, responsible for managing infrastructure and developing smart contracts for EOSIO networks.</p>

<p className="prose prose-neutral dark:prose-invert">Between 2019 and 2021, I had the privilege of working with several exciting decentralized applications (dapps). Notable projects include:</p>


  <p className="prose prose-neutral dark:prose-invert"><a href="https://emanate.live" className="prose-link">Emanate</a>: A groundbreaking network marketplace designed for music enthusiasts and creators. Emanate leverages immediate payments and automated technology to connect players within the music industry like never before. Powered by Web3 technology, this platform handles the entire music creation journey, encompassing distribution, promotion, and monetization.</p>

  <p className="prose prose-neutral dark:prose-invert"><a href="https://www.sense.chat/" className="prose-link">Sense Chat</a>: A blockchain technology and DeFi (Decentralized Finance) company that focuses on developing consumer products through tokenized systems and incentives. Sense Chat offers a secure platform for chatting and conducting transactions with friends and family, ensuring that your data remains private and protected from third-party surveillance.</p>

  <p className="prose prose-neutral dark:prose-invert"><a href="https://bitcash.org/" className="prose-link">Bitcash</a>: An innovative application that facilitates the exchange of currency with others, allowing users to convert their funds into local currency stablecoins or bitUSD. Bitcash also supports the trading of bitUSD for cryptocurrencies like Bitcoin, Ethereum, USDT, and smaller coins such as Grin. BitcashDAO provides members with opportunities for participation and decision-making.</p>


<p className="prose prose-neutral dark:prose-invert">These experiences enriched my understanding of blockchain technology and decentralized applications, providing valuable insights into the dynamic world of Web3.</p>

<p className="prose prose-neutral dark:prose-invert">In 2021, I joined <a href="https://raremint.com/" className="prose-link">RareMint</a>  to develop a platform that offers genuine real-world sports collectible assets and transforms them into digital experiences through asset-backed NFTs on both the Ethereum and Polygon blockchains.</p>


<p className="prose prose-neutral dark:prose-invert">In 2022, I contributed to the development of the Ethereum/WebGL communication channel at <a href="https://ztx.foundation/" className="prose-link">ZTX</a>, a web3 metaverse platform empowering creators and communities to build, play and earn. ZTX is the blockchain initiative backed by Jump Crypto and ZEPETO — the largest metaverse in Asia with over 400 million lifetime users.
</p>



<p className="prose prose-neutral dark:prose-invert">
  ... more coming soon</p>
    
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