import { defineTool } from "eve/tools";
import { z } from "zod";

import { cvDownloadPayload } from "../../lib/connect/cv-download";

const focusSchema = z.enum(["full", "ai", "web3", "fullstack"]).optional();

export default defineTool({
  approval: () => "not-applicable",
  description:
    "Return download links for Gabo Esquivel's CV PDF and HTML page. Use when they ask for a CV, resume, or PDF. Default focus is full; use ai, web3, or fullstack only when they name that version.",
  execute: ({ focus }) => cvDownloadPayload({ focus }),
  inputSchema: z.object({ focus: focusSchema }),
  outputSchema: z.object({
    filename: z.string(),
    pageUrl: z.string().url(),
    pdfUrl: z.string().url(),
    title: z.string(),
    variant: z.enum(["full", "ai", "web3", "fullstack"]),
  }),
  toModelOutput: (output) => ({ type: "json", value: output }),
});
