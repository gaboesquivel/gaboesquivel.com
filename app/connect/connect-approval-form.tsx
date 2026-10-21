"use client";

import { useState } from "react";

import {
  ConnectEmailField,
  ConnectNameField,
  ConnectTopicField,
  contactValid,
} from "./connect-fields";
import {
  ConnectActions,
  ConnectCard,
  ConnectPrimaryButton,
  ConnectSecondaryButton,
} from "./connect-gen-ui";

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
  }) => void | Promise<void>;
  onCancel: () => void;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  const initial = readContact(input);
  const [name, setName] = useState(initial.name);
  const [email, setEmail] = useState(initial.email);
  const [description, setDescription] = useState(initial.description);
  const [settled, setSettled] = useState(false);
  const valid = contactValid({ description, email, name });
  const bookingFieldsMissing =
    booking &&
    ((input.duration !== 15 && input.duration !== 30) ||
      typeof input.start !== "string");

  return (
    <ConnectCard title={booking ? "Confirm booking" : "Confirm email"}>
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
      <ConnectActions>
        <ConnectPrimaryButton
          disabled={settled || !valid || bookingFieldsMissing}
          onClick={() => {
            if (settled || !valid || bookingFieldsMissing) return;
            setSettled(true);
            void Promise.resolve(
              onApprove({
                description: description.trim(),
                email: email.trim(),
                name: name.trim(),
              })
            ).catch(() => setSettled(false));
          }}
        >
          {primaryLabel}
        </ConnectPrimaryButton>
        <ConnectSecondaryButton disabled={settled} onClick={onCancel}>
          {secondaryLabel}
        </ConnectSecondaryButton>
      </ConnectActions>
    </ConnectCard>
  );
}
