const LEAK_PATTERNS = [
  /\bparseNoteFormPayload\b/i,
  /\bnoteFormMessage\b/i,
  /\buser-approval\b/i,
  /\bnot-applicable\b/i,
  /\bbrowser approval\b/i,
  /\bwithout (?:waiting for )?(?:browser )?approval\b/i,
  /\bsecond confirm\b/i,
  /\bagent\/tools\b/i,
  /\bagent\/instructions\b/i,
  /\blib\/connect\b/i,
  /\beve-thread\b/i,
  /\bnote-receipt\b/i,
  /\bapproval-requested\b/i,
  /\bharness\b/i,
  /\bfresh\b.{0,40}\bsession\b/i,
  /\bstart a (?:fresh|new) (?:\/ask )?session\b/i,
  /\breload\b/i,
  /\brefresh (?:the |this )?(?:page|session|chat)\b/i,
  /\bchannel marker\b/i,
  /\[site:(?:book|note|ask)\b/i,
  /\bdefineTool\b/i,
  /\bform payload\b/i,
  /\boptimistic(?:Receipt|Note)?\b/i,
  /\btools\/connect\.ts\b/i,
  /\bvisitor-facing\b/i,
];

export const assistantTextLeaksInternals = (text: string) =>
  LEAK_PATTERNS.some((pattern) => pattern.test(text));

export const visitorFacingAssistantText = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed || assistantTextLeaksInternals(trimmed)) return "";
  return trimmed;
};
