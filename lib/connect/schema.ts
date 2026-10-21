import { z } from "zod";

export const cleanText = (value: string) =>
  value
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();

const name = z
  .string()
  .transform(cleanText)
  .pipe(z.string().min(1, "Name is missing."));

const email = z.string().trim().email("Email is missing or invalid.");

const description = z
  .string()
  .transform(cleanText)
  .pipe(
    z
      .string()
      .min(10, "Tell me what you want to discuss.")
      .max(5000, "The note is too long. Nothing was sent.")
  );

export const bookSchema = z.object({
  description,
  duration: z.union([z.literal(15), z.literal(30)], {
    error: "Duration is 15 or 30 minutes.",
  }),
  email,
  name,
  start: z.string().datetime("Start needs an ISO time."),
  timeZone: z.string().trim().min(1, "Time zone is missing."),
});

export const noteSchema = z.object({
  description,
  email,
  name,
});

export type BookInput = z.infer<typeof bookSchema>;
export type NoteInput = z.infer<typeof noteSchema>;
