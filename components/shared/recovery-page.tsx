import {
  blockGrid,
  PageEyebrow,
  introText,
  PageTitle,
  readingMeasure,
} from "components/shared/page-layout";
import { PathLink } from "components/shared/path-link";
import { Button } from "components/ui/button";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

const exits = [
  {
    href: "/",
    note: "Overview of product engineering across regulated finance, Web3, and AI.",
    title: "Home",
  },
  {
    href: "/explore",
    note: "Every page on the site, grouped by domain, engineering capability, and career context.",
    title: "Explore",
  },
] as const;

export function RecoveryPage({
  title,
  children,
  onRetry,
  documentTitle,
}: {
  title: string;
  children: ReactNode;
  onRetry?: () => void;
  documentTitle?: string;
}) {
  return (
    <section>
      {documentTitle ? <title>{documentTitle}</title> : null}
      <PageEyebrow />
      <PageTitle>{title}</PageTitle>
      <p className={cn(introText, readingMeasure, "mt-6")}>{children}</p>
      {onRetry ? (
        <Button
          className="mt-8"
          onClick={onRetry}
          size="site"
          type="button"
          variant="siteAccent"
        >
          Try again
        </Button>
      ) : null}
      <ul className={blockGrid}>
        {exits.map((exit) => (
          <li key={exit.href} className="h-full">
            <PathLink href={exit.href} title={exit.title} note={exit.note} />
          </li>
        ))}
      </ul>
    </section>
  );
}
