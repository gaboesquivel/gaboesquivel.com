"use client";

import { Shimmer } from "@/components/ai-elements/shimmer";
import { formatSlotSelectionLine } from "@/lib/connect/slot-display";

import { enter } from "./chat-styles";
import { ConnectCard } from "./connect-gen-ui";

export function BookReceipt({
  description,
  duration,
  email,
  name,
  start,
  status,
  timeZone,
}: {
  description: string;
  duration: 15 | 30;
  email: string;
  name: string;
  start: string;
  status: { error: boolean; text: string };
  timeZone: string;
}) {
  const pending = !status.error && !/^booked\b/i.test(status.text);
  return (
    <ConnectCard
      aria-live="polite"
      className={enter}
      title={status.error ? "Booking" : pending ? "Booking" : "Call booked"}
    >
      {pending ? (
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
      <dl className="flex flex-col gap-3 text-sm">
        <div>
          <dt className="text-neutral-400">When</dt>
          <dd className="tabular-nums">
            {formatSlotSelectionLine({ duration, start, timeZone })}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-400">Name</dt>
          <dd>{name}</dd>
          <dd className="text-neutral-400">{email}</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Topic</dt>
          <dd className="whitespace-pre-wrap">{description}</dd>
        </div>
      </dl>
    </ConnectCard>
  );
}
