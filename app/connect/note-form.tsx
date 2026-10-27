"use client";

import { useCallback, useState } from "react";

import type { NoteFormState } from "@/lib/connect/compose";
import { initialNoteFormState } from "@/lib/connect/compose";
import { NOTE_FORM_LEAD } from "@/lib/connect/copy";

import {
  ConnectEmailField,
  ConnectNameField,
  ConnectTopicField,
  contactValid,
} from "./connect-fields";
import { ConnectCard, ConnectPrimaryButton } from "./connect-gen-ui";

export function NoteForm({
  initialState,
  onSubmit,
}: {
  initialState?: NoteFormState;
  onSubmit: (values: NoteFormState) => void;
}) {
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState(
    () => initialNoteFormState(initialState).name
  );
  const [email, setEmail] = useState(
    () => initialNoteFormState(initialState).email
  );
  const [description, setDescription] = useState(
    () => initialNoteFormState(initialState).description
  );

  const handleSubmit = useCallback(() => {
    const values = {
      description: description.trim(),
      email: email.trim(),
      name: name.trim(),
    };
    if (!contactValid(values) || disabled) return;
    setDisabled(true);
    onSubmit(values);
  }, [description, disabled, email, name, onSubmit]);

  if (disabled) return null;

  const valid = contactValid({ description, email, name });

  return (
    <ConnectCard title="Send email">
      <p className="text-sm text-neutral-400">{NOTE_FORM_LEAD}</p>
      <ConnectNameField onChange={setName} value={name} />
      <ConnectEmailField onChange={setEmail} value={email} />
      <ConnectTopicField onChange={setDescription} value={description} />
      <ConnectPrimaryButton disabled={!valid} onClick={handleSubmit}>
        Send email
      </ConnectPrimaryButton>
    </ConnectCard>
  );
}
