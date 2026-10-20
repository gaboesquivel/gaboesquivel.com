import { siteFieldClass } from "components/shared/spacing";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ConnectNameField = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => (
  <Field>
    <FieldLabel htmlFor="connect-name">Name</FieldLabel>
    <Input
      autoComplete="name"
      className={siteFieldClass}
      id="connect-name"
      onChange={(event) => onChange(event.currentTarget.value)}
      type="text"
      value={value}
    />
  </Field>
);

export const ConnectEmailField = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => (
  <Field>
    <FieldLabel htmlFor="connect-email">Email</FieldLabel>
    <Input
      autoComplete="email"
      className={siteFieldClass}
      id="connect-email"
      inputMode="email"
      onChange={(event) => onChange(event.currentTarget.value)}
      type="email"
      value={value}
    />
  </Field>
);

export const ConnectTopicField = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => (
  <Field>
    <FieldLabel htmlFor="connect-topic">What you want to discuss</FieldLabel>
    <Textarea
      className={`${siteFieldClass} min-h-24 resize-y`}
      id="connect-topic"
      onChange={(event) => onChange(event.currentTarget.value)}
      rows={4}
      value={value}
    />
  </Field>
);

export const contactValid = ({
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
