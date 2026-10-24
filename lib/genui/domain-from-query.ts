import type { GenuiProjectDomain } from "./project-domain";

const web3DomainPattern =
  /\b(web3|blockchain|wallet|wallets|smart contract|onchain|on-chain|onchain products)\b/i;
const aiDomainPattern =
  /\b(ai|ia\b|artificial intelligence|inteligencia artificial|proyectos de (ia|inteligencia)|agentic)\b/i;
const fintechDomainPattern =
  /\b(fintech|fin tech|mobile banking|neobank|banking experience)\b/i;
const agentBrowsePattern = /\bagent(s)?\b/i;
const projectBrowsePattern =
  /\b(project|projects|proyectos|built|portfolio|products)\b/i;
const allWorkDomainPattern =
  /\b(all your work|show me all|all projects|todo(s)? (tu )?trabajo)\b/i;

export const domainFromQuery = (query: string): GenuiProjectDomain | null => {
  if (fintechDomainPattern.test(query)) return "fintech";
  if (web3DomainPattern.test(query)) return "web3";
  if (
    aiDomainPattern.test(query) ||
    (agentBrowsePattern.test(query) && projectBrowsePattern.test(query))
  )
    return "ai";
  if (allWorkDomainPattern.test(query)) return "all";
  return null;
};
