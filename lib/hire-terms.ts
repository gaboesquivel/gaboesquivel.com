export const hireContractBlogPath = "/blog/2025-11-1099-contracting";

export const publicBookingUrl = "https://gaboesquivel.com/cal";

export const hireTermsLanguages = "English, Spanish, Portuguese, and Italian";

export const hireTermsLocationLine =
  "Based in Costa Rica, working US Mountain Time.";

export const hireTermsMarkdownCore = ({
  contractHref,
}: {
  contractHref: string;
}) =>
  `Open to direct hire, international hire, or [contracting through Blockmatic Labs LLC](${contractHref}). Cannot work under W-2. ${hireTermsLocationLine}`;

export const hireTermsMarkdownWithLanguages = ({
  contractHref,
}: {
  contractHref: string;
}) =>
  `${hireTermsMarkdownCore({ contractHref })} Fluent in ${hireTermsLanguages}.`;

export const hireTermsPlainIndexLine = `Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. ${hireTermsLocationLine} Fluent in ${hireTermsLanguages}.`;
