"use client";

import Link from "next/link";

import { Shimmer } from "@/components/ai-elements/shimmer";

import { noteMessageLines, noteSubject } from "../../lib/connect/note-present";
import { enter } from "./chat-styles";

const NoteLink = ({ href, label }: { href: string; label: string }) => {
  const internal =
    href.startsWith("/") || href.startsWith("https://gaboesquivel.com");
  const path = href.replace("https://gaboesquivel.com", "") || "/";
  if (internal)
    return (
      <Link className="prose-link" href={path}>
        {label}
      </Link>
    );
  return (
    <a className="prose-link" href={href} rel="noreferrer" target="_blank">
      {label}
    </a>
  );
};

const NoteMessage = ({ text }: { text: string }) => (
  <div className="flex flex-col gap-2 break-words">
    {noteMessageLines({ text }).map((paragraph, paragraphIndex) => (
      <p key={paragraphIndex}>
        {paragraph.map((line, lineIndex) => (
          <span key={lineIndex}>
            {lineIndex > 0 ? <br /> : null}
            {line.map((segment, segmentIndex) =>
              segment.href ? (
                <NoteLink
                  href={segment.href}
                  key={segmentIndex}
                  label={segment.text}
                />
              ) : (
                <span key={segmentIndex}>{segment.text}</span>
              )
            )}
          </span>
        ))}
      </p>
    ))}
  </div>
);

export function NoteReceipt({
  description,
  email,
  name,
  status,
}: {
  description: string;
  email: string;
  name: string;
  status: { error: boolean; text: string };
}) {
  const sending = !status.error && status.text !== "Sent.";
  return (
    <section
      className={`flex w-full flex-col gap-4 rounded-lg border border-hairline p-4 text-sm ${enter}`}
    >
      {sending ? (
        <Shimmer className="text-sm text-neutral-400" duration={1}>
          {status.text}
        </Shimmer>
      ) : (
        <p
          className={`text-sm ${status.error ? "text-red-400" : "text-neutral-400"}`}
        >
          {status.text}
        </p>
      )}
      <dl className="flex flex-col gap-3">
        <div>
          <dt className="text-neutral-400">Title:</dt>
          <dd>{name}</dd>
          <dd className="text-neutral-400">{email}</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Subject:</dt>
          <dd>{noteSubject({ name })}</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Message:</dt>
          <dd>
            <NoteMessage text={description} />
          </dd>
        </div>
      </dl>
    </section>
  );
}
