import { Resend } from "resend";

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
    subject: `Note from ${name}`,
    text: description,
    to: ["contact@gaboesquivel.com"],
  });
  if (error) throw new Error("email-failed");
};
