const ROUTE_ALIASES: Record<string, string> = {
  "/project/legalagent": "/project/legal-agent",
  "/tech/next-js": "/tech/nextjs",
  "/tech/node-js": "/tech/nodejs",
  "/tech/react": "/tech/reactjs",
};

export const canonicalizePath = (path: string) => {
  const normalized = path.split("?")[0];
  return ROUTE_ALIASES[normalized] ?? normalized;
};
