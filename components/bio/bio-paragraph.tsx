import { proseLink } from "components/shared/spacing";
import type { BioParagraph as BioParagraphContent } from "lib/bio/chapters";
import Link from "next/link";

export function BioNarrativeParagraph({
  paragraph,
}: {
  paragraph: BioParagraphContent;
}) {
  return (
    <p className="m-0 text-base leading-[1.75] text-neutral-400">
      {paragraph.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <Link
            key={`${segment.href}-${index}`}
            className={proseLink}
            href={segment.href}
          >
            {segment.label}
          </Link>
        )
      )}
    </p>
  );
}
