import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(5000, 'Message must be less than 5000 characters')
    .transform((msg) => {
      // Strip HTML tags and potentially harmful content
      return msg
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim()
    }),
  timestamp: z.number().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
