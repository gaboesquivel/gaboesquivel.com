export type GenuiTaskIntent =
  | "browse-projects"
  | "project-detail"
  | "compare-projects"
  | "explain-experience"
  | "explain-architecture"
  | "browse-writing"
  | "profile"
  | "cv"
  | "contact"
  | "booking"
  | "unknown";

const normalize = (query: string) =>
  query.trim().toLowerCase().replace(/\s+/g, " ");

export const wantsProjectsLanguage = (query: string) =>
  /\b(project|projects|projetos|work|portfolio|built|proyectos|trabajo)\b/i.test(
    query
  );

export const wantsArchitectureIntent = (query: string) =>
  /\b(architecture|diagram|system flow|flowchart|arquitectura)\b/i.test(
    query
  ) && /\b(show|explain|inspect|walk|describe|can you|diagrama)\b/i.test(query);

export const wantsBrowseProjects = (query: string) => {
  if (wantsArchitectureIntent(query)) return false;
  if (/\bcompare\b/i.test(query) && wantsProjectsLanguage(query)) {
    return false;
  }
  if (/\bshow me all your work\b/i.test(normalize(query))) return true;
  if (
    /\b(muestra|muéstrame|mostre)\b/i.test(query) &&
    wantsProjectsLanguage(query)
  ) {
    return true;
  }
  if (
    /\b(show|see|browse|list|view)\b/i.test(query) &&
    wantsProjectsLanguage(query)
  ) {
    return true;
  }
  return false;
};

export const wantsCompareProjects = (query: string) =>
  /\b(compare|versus|vs\.?)\b/i.test(query) && wantsProjectsLanguage(query);

export const wantsExplainExperience = (query: string) =>
  /\b(what is your experience|experience building|how do you build|tell me about your experience)\b/i.test(
    query
  ) && !wantsBrowseProjects(query);

export const classifyTaskIntent = (query: string): GenuiTaskIntent => {
  const trimmed = query.trim();
  if (!trimmed) return "unknown";

  if (/\b(cv|curriculum|curr[ií]culum|r[eé]sum[eé]|resume)\b/i.test(trimmed)) {
    return "cv";
  }
  if (
    (/\b(book|booking|schedule|agendar|reservar)\b/i.test(trimmed) &&
      /\b(meeting|call|llamada|cita|intro|availability|booking)\b/i.test(
        trimmed
      )) ||
    /\bbook me\b/i.test(trimmed)
  ) {
    return "booking";
  }
  if (
    /\b(contact|reach|touch|inquir|inquiry|hire|contrat|contatt)/i.test(
      trimmed
    ) &&
    (!wantsProjectsLanguage(trimmed) || /\binquiry\b/i.test(trimmed))
  ) {
    return "contact";
  }
  if (
    /\b(article|articles|blog|post|posts|writing|publication)\b/i.test(
      trimmed
    ) ||
    (/\blatest\b/i.test(trimmed) && /\b(post|article)\b/i.test(trimmed))
  ) {
    return "browse-writing";
  }
  if (wantsArchitectureIntent(trimmed)) return "explain-architecture";
  if (wantsCompareProjects(trimmed)) return "compare-projects";
  if (wantsExplainExperience(trimmed)) return "explain-experience";
  if (
    /\b(who is gabo|professional background|technology stack|how long have you been)\b/i.test(
      trimmed
    )
  ) {
    return "profile";
  }
  if (wantsBrowseProjects(trimmed)) return "browse-projects";
  if (
    /\b(tell me about|show me the)\b/i.test(trimmed) &&
    wantsProjectsLanguage(trimmed)
  ) {
    return "project-detail";
  }
  return "unknown";
};
