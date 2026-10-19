"use client";

import type { Spec } from "@json-render/core";
import {
  ActionProvider,
  Renderer,
  StateProvider,
  useStateStore,
  useStateValue,
  VisibilityProvider,
} from "@json-render/react";
import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

import { accentButton, fieldClass } from "./chat-styles";

const SubmitContext = createContext<
  | ((values: { description: string; email: string; name: string }) => void)
  | null
>(null);

const noteValid = ({
  description,
  email,
  name,
}: {
  description: string;
  email: string;
  name: string;
}) =>
  name.trim().length > 0 &&
  email.includes("@") &&
  description.trim().length >= 10;

const NameField = () => {
  const name = useStateValue<string>("/name") ?? "";
  const { set } = useStateStore();
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-neutral-400">Name</span>
      <input
        autoComplete="name"
        className={fieldClass}
        onChange={(event) => set("/name", event.currentTarget.value)}
        type="text"
        value={name}
      />
    </label>
  );
};

const EmailField = () => {
  const email = useStateValue<string>("/email") ?? "";
  const { set } = useStateStore();
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-neutral-400">Email</span>
      <input
        autoComplete="email"
        className={fieldClass}
        inputMode="email"
        onChange={(event) => set("/email", event.currentTarget.value)}
        type="email"
        value={email}
      />
    </label>
  );
};

const TopicField = () => {
  const description = useStateValue<string>("/description") ?? "";
  const { set } = useStateStore();
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-neutral-400">What you want to discuss</span>
      <textarea
        className={`${fieldClass} min-h-24 resize-y`}
        onChange={(event) => set("/description", event.currentTarget.value)}
        rows={4}
        value={description}
      />
    </label>
  );
};

const Submit = ({ label }: { label?: string }) => {
  const onSubmit = useContext(SubmitContext);
  const name = useStateValue<string>("/name") ?? "";
  const email = useStateValue<string>("/email") ?? "";
  const description = useStateValue<string>("/description") ?? "";
  const valid = noteValid({ description, email, name });
  return (
    <button
      className={accentButton}
      disabled={!valid}
      onClick={() =>
        onSubmit?.({ description, email: email.trim(), name: name.trim() })
      }
      type="button"
    >
      {label ?? "Send email"}
    </button>
  );
};

const NoteStack = ({ children }: { children?: ReactNode }) => (
  <div className="flex flex-col gap-4">{children}</div>
);

const registry = { EmailField, NameField, NoteStack, Submit, TopicField };

export function NoteForm({
  onSubmit,
  spec,
}: {
  onSubmit: (values: {
    description: string;
    email: string;
    name: string;
  }) => void;
  spec: Spec;
}) {
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = useCallback(
    (values: { description: string; email: string; name: string }) => {
      if (!noteValid(values) || disabled) return;
      setDisabled(true);
      onSubmit(values);
    },
    [disabled, onSubmit]
  );

  if (disabled) return null;

  return (
    <SubmitContext.Provider value={handleSubmit}>
      <StateProvider initialState={spec.state ?? {}}>
        <VisibilityProvider>
          <ActionProvider>
            <Renderer registry={registry} spec={spec} />
          </ActionProvider>
        </VisibilityProvider>
      </StateProvider>
    </SubmitContext.Provider>
  );
}
