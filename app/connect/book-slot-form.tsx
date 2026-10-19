"use client";

import { useState } from "react";

import { BOOK_SLOT_LEAD } from "../../lib/connect/copy";
import { accentButton, enter, quietButton } from "./chat-styles";
import {
  ConnectEmailField,
  ConnectNameField,
  ConnectTopicField,
  contactValid,
} from "./connect-fields";

export function BookSlotForm({
  duration,
  onCancel,
  onSubmit,
  slotLabel,
}: {
  duration: 15 | 30;
  onCancel: () => void;
  onSubmit: (values: {
    description: string;
    email: string;
    name: string;
  }) => void;
  slotLabel: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const valid = contactValid({ description, email, name });

  return (
    <section className={`flex flex-col gap-4 ${enter}`}>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-neutral-400">{BOOK_SLOT_LEAD}</p>
        <p className="text-sm text-white tabular-nums">
          {duration} minutes · {slotLabel}
        </p>
      </div>
      <ConnectNameField onChange={setName} value={name} />
      <ConnectEmailField onChange={setEmail} value={email} />
      <ConnectTopicField onChange={setDescription} value={description} />
      <div className="flex flex-wrap gap-2">
        <button
          className={accentButton}
          disabled={!valid}
          onClick={() =>
            onSubmit({
              description: description.trim(),
              email: email.trim(),
              name: name.trim(),
            })
          }
          type="button"
        >
          Continue
        </button>
        <button className={quietButton} onClick={onCancel} type="button">
          Pick another time
        </button>
      </div>
    </section>
  );
}
