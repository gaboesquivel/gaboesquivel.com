export const domainFromQuery = (
  query: string
): "ai" | "web3" | "all" | null => {
  if (
    /\b(web3|blockchain|wallet|smart contract|onchain|on-chain)\b/i.test(query)
  )
    return "web3";
  if (
    /\b(ai|artificial intelligence|agent|agentic|inteligencia artificial|proyectos de inteligencia)\b/i.test(
      query
    )
  )
    return "ai";
  if (
    /\b(all your work|show me all|all projects|todo(s)? (tu )?trabajo)\b/i.test(
      query
    )
  )
    return "all";
  return null;
};
