import { Resend } from "resend";

import { noteEmailHtml, noteEmailText, noteSubject } from "./note-present";

export type NoteMailer = (input: {
  description: string;
  email: string;
  name: string;
}) => Promise<void>;

export const resendNote: NoteMailer = async ({ description, email, name }) => {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("email-unconfigured");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: "Gabo Esquivel site <noreply@gaboesquivel.com>",
    replyTo: email,
    html: noteEmailHtml({ description, email, name }),
    subject: noteSubject({ name }),
    text: noteEmailText({ description, email, name }),
    to: ["contact@gaboesquivel.com"],
  });
  if (error) throw new Error(error.message || "email-failed");
};
