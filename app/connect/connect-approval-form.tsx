"use client";

import { useState } from "react";

import { accentButton, quietButton } from "./chat-styles";
import {
  ConnectEmailField,
  ConnectNameField,
  ConnectTopicField,
  contactValid,
} from "./connect-fields";

const readContact = (input: Record<string, unknown>) => ({
  description: typeof input.description === "string" ? input.description : "",
  email: typeof input.email === "string" ? input.email : "",
  name: typeof input.name === "string" ? input.name : "",
});

export function ConnectApprovalForm({
  booking,
  bookingSummary,
  input,
  onApprove,
  onCancel,
  primaryLabel,
  secondaryLabel,
}: {
  booking: boolean;
  bookingSummary?: string;
  input: Record<string, unknown>;
  onApprove: (contact: {
    description: string;
    email: string;
    name: string;
  }) => void;
  onCancel: () => void;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  const initial = readContact(input);
  const [name, setName] = useState(initial.name);
  const [email, setEmail] = useState(initial.email);
  const [description, setDescription] = useState(initial.description);
  const valid = contactValid({ description, email, name });
  const bookingFieldsMissing =
    booking &&
    ((input.duration !== 15 && input.duration !== 30) ||
      typeof input.start !== "string");

  return (
    <div className="flex flex-col gap-4">
      {booking && bookingSummary ? (
        <p className="text-sm text-neutral-400 tabular-nums">
          {bookingSummary}
        </p>
      ) : null}
      <ConnectNameField onChange={setName} value={name} />
      <ConnectEmailField onChange={setEmail} value={email} />
      <ConnectTopicField onChange={setDescription} value={description} />
      {bookingFieldsMissing ? (
        <p className="text-sm text-red-400">
          The time or duration is missing. Pick a slot again. Nothing was
          booked.
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <button
          className={accentButton}
          disabled={!valid || bookingFieldsMissing}
          onClick={() =>
            onApprove({
              description: description.trim(),
              email: email.trim(),
              name: name.trim(),
            })
          }
          type="button"
        >
          {primaryLabel}
        </button>
        <button className={quietButton} onClick={onCancel} type="button">
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
