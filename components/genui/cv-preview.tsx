import { resolveCv } from "gaboesquivel";
import { cvPdfFile, cvSectionTitles } from "lib/cv-paths";
import Link from "next/link";

export const CvPreview = ({ focus }: { focus?: string }) => {
  const { entries, key, variant } = resolveCv({
    focus: focus && focus !== "full" ? focus : undefined,
  });
  const pdfUrl = `/${cvPdfFile({ key })}`;
  const title = cvSectionTitles[key];

  return (
    <div className="max-w-3xl space-y-8 text-sm text-neutral-300">
      <header className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a className="text-accent hover:underline" download href={pdfUrl}>
              Download PDF
            </a>
            <Link
              className="text-accent hover:underline"
              href={`/cv?focus=${key}`}
            >
              View online
            </Link>
          </div>
        </div>
        <p className="text-base leading-relaxed text-neutral-200">
          {variant.summary}
        </p>
      </header>
      {entries.length ? (
        <section className="space-y-4">
          <h4 className="text-sm font-semibold text-white">Experience</h4>
          <ul className="space-y-4">
            {entries.slice(0, 4).map((role) => (
              <li key={`${role.company}-${role.title}`} className="space-y-1">
                <p className="font-medium text-white">
                  {role.title}, {role.company}
                </p>
                <p className="text-xs text-neutral-400">
                  {role.location} · {role.duration}
                </p>
                {role.description && (
                  <p className="line-clamp-3 text-neutral-400">
                    {role.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {variant.skills?.length ? (
        <section className="space-y-2">
          <h4 className="text-sm font-semibold text-white">Skills</h4>
          <p className="text-neutral-400">
            {variant.skills
              .flatMap((group) =>
                group.keywords.split(",").map((s) => s.trim())
              )
              .slice(0, 14)
              .join(" · ")}
          </p>
        </section>
      ) : null}
    </div>
  );
};
