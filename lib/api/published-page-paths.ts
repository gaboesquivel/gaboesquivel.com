import { buildRouteManifest } from "scripts/llms/routes";

export const listPublishedPagePaths = () =>
  [...buildRouteManifest()].sort((a, b) => a.localeCompare(b));
