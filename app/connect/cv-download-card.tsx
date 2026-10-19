import { FileText } from "lucide-react";
import Link from "next/link";

import type { CvDownloadPayload } from "../../lib/connect/cv-download";
import { accentButton, enter, quietButton } from "./chat-styles";

export const CvDownloadCard = ({
  filename,
  pageUrl,
  pdfUrl,
  title,
}: CvDownloadPayload) => (
  <section className={`rounded-lg border border-hairline p-4 ${enter}`}>
    <p className="font-medium text-foreground">{title}</p>
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <a
        className={`inline-flex items-center gap-2 ${accentButton}`}
        download={filename}
        href={pdfUrl}
      >
        Download PDF
        <FileText aria-hidden className="h-3.5 w-3.5" />
      </a>
      <Link
        className={quietButton}
        href={pageUrl.replace("https://gaboesquivel.com", "") || "/cv"}
      >
        View online
      </Link>
    </div>
  </section>
);
