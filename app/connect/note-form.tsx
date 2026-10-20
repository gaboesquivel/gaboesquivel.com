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

import {
  ConnectEmailField,
  ConnectNameField,
  ConnectTopicField,
  contactValid,
} from "./connect-fields";
import { ConnectCard, ConnectPrimaryButton } from "./connect-gen-ui";

const SubmitContext = createContext<
  | ((values: { description: string; email: string; name: string }) => void)
  | null
>(null);

const Lead = ({ element }: { element: { props: { text?: string } } }) =>
  element.props.text ? (
    <p className="text-sm text-neutral-400">{element.props.text}</p>
  ) : null;

const NameField = () => {
  const name = useStateValue<string>("/name") ?? "";
  const { set } = useStateStore();
  return (
    <ConnectNameField onChange={(value) => set("/name", value)} value={name} />
  );
};

const EmailField = () => {
  const email = useStateValue<string>("/email") ?? "";
  const { set } = useStateStore();
  return (
    <ConnectEmailField
      onChange={(value) => set("/email", value)}
      value={email}
    />
  );
};

const TopicField = () => {
  const description = useStateValue<string>("/description") ?? "";
  const { set } = useStateStore();
  return (
    <ConnectTopicField
      onChange={(value) => set("/description", value)}
      value={description}
    />
  );
};

const Submit = ({ element }: { element: { props: { label?: string } } }) => {
  const label = element.props.label;
  const onSubmit = useContext(SubmitContext);
  const name = useStateValue<string>("/name") ?? "";
  const email = useStateValue<string>("/email") ?? "";
  const description = useStateValue<string>("/description") ?? "";
  const valid = contactValid({ description, email, name });
  return (
    <ConnectPrimaryButton
      disabled={!valid}
      onClick={() =>
        onSubmit?.({ description, email: email.trim(), name: name.trim() })
      }
    >
      {label ?? "Send email"}
    </ConnectPrimaryButton>
  );
};

const NoteStack = ({ children }: { children?: ReactNode }) => (
  <ConnectCard title="Send email">{children}</ConnectCard>
);

const registry = {
  EmailField,
  Lead,
  NameField,
  NoteStack,
  Submit,
  TopicField,
};

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
      if (!contactValid(values) || disabled) return;
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
