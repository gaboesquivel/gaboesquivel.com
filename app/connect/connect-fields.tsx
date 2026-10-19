import { fieldClass } from "./chat-styles";

export const ConnectNameField = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => (
  <label className="flex flex-col gap-2 text-sm">
    <span className="text-neutral-400">Name</span>
    <input
      autoComplete="name"
      className={fieldClass}
      onChange={(event) => onChange(event.currentTarget.value)}
      type="text"
      value={value}
    />
  </label>
);

export const ConnectEmailField = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => (
  <label className="flex flex-col gap-2 text-sm">
    <span className="text-neutral-400">Email</span>
    <input
      autoComplete="email"
      className={fieldClass}
      inputMode="email"
      onChange={(event) => onChange(event.currentTarget.value)}
      type="email"
      value={value}
    />
  </label>
);

export const ConnectTopicField = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => (
  <label className="flex flex-col gap-2 text-sm">
    <span className="text-neutral-400">What you want to discuss</span>
    <textarea
      className={`${fieldClass} min-h-24 resize-y`}
      onChange={(event) => onChange(event.currentTarget.value)}
      rows={4}
      value={value}
    />
  </label>
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
