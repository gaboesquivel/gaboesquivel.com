import { siteRelativePath } from "lib/site-path";
import { FileText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { CvDownloadPayload } from "../../lib/connect/cv-download";
import { enter } from "./chat-styles";

export const CvDownloadCard = ({
  filename,
  pageUrl,
  pdfUrl,
  title,
}: CvDownloadPayload) => (
  <Card className={`gap-3 p-4 ${enter}`}>
    <p className="font-medium text-foreground">{title}</p>
    <div className="flex flex-wrap items-center gap-2">
      <Button
        className="inline-flex items-center gap-2"
        nativeButton={false}
        render={
          <a aria-label="Download PDF" download={filename} href={pdfUrl} />
        }
        size="site"
        variant="siteAccent"
      >
        Download PDF
        <FileText aria-hidden className="h-3.5 w-3.5" />
      </Button>
      <Button
        nativeButton={false}
        render={<Link href={siteRelativePath(pageUrl) || "/cv"} />}
        size="site"
        variant="siteQuiet"
      >
        View online
      </Button>
    </div>
  </Card>
);
