import type { SearchRecord } from "components/search/types";
import { editorialLink } from "components/shared/spacing";
import Link from "next/link";

export function SearchResults({
  matches,
  submitted,
  onNavigate,
}: {
  matches: SearchRecord[];
  submitted: string;
  onNavigate?: () => void;
}) {
  if (!submitted) return null;

  return (
    <section
      aria-label="Search results"
      className="mt-6 border-b border-hairline pb-6"
    >
      <h2 className="text-lg font-semibold">
        {matches.length ? "Search results" : "No matching pages"}
      </h2>
      <ul className="mt-4 flex flex-col gap-4">
        {matches.map((record) => (
          <li key={record.href}>
            <Link
              href={record.href}
              className={editorialLink}
              onClick={onNavigate}
            >
              {record.title}
            </Link>
            {record.description ? (
              <p className="mt-1 text-sm text-neutral-400">
                {record.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      {!matches.length && (
        <p className="mt-3 text-sm text-neutral-300">
          Try a project name or browse{" "}
          <Link href="/work" className="text-accent" onClick={onNavigate}>
            all work
          </Link>
          .
        </p>
      )}
    </section>
  );
}
