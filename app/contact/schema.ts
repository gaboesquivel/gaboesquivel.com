import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(5000, "Message must be less than 5000 characters")
    .transform((msg) =>
      msg
        .replace(/<[^>]*>/g, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+\s*=/gi, "")
        .trim()
    ),
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
