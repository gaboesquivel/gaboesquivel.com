import { Resend } from "resend";

import { noteEmailHtml, noteEmailText, noteSubject } from "./note-present";

export type NoteMailer = (input: {
  description: string;
  email: string;
  idempotencyKey?: string;
  name: string;
}) => Promise<{ providerId?: string }>;

export const resendNote: NoteMailer = async ({
  description,
  email,
  idempotencyKey,
  name,
}) => {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("email-unconfigured");
  const resend = new Resend(key);
  const { data, error } = await resend.emails.send({
    from: "Gabo Esquivel site <noreply@gaboesquivel.com>",
    replyTo: email,
    html: noteEmailHtml({ description, email, name }),
    subject: noteSubject({ name }),
    text: noteEmailText({ description, email, name }),
    to: ["contact@gaboesquivel.com"],
    ...(idempotencyKey
      ? { headers: { "Idempotency-Key": idempotencyKey } }
      : {}),
  });
  if (error) throw new Error(error.message || "email-failed");
  return { providerId: data?.id };
};
