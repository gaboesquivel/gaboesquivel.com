'use server'

import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

const contactSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  message: z
    .string()
    .min(200, 'Message must be at least 200 characters long')
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

type ContactFormData = z.infer<typeof contactSchema>

export async function submitContactForm(formData: FormData) {
  console.log('🔧 Server: Contact form submission started')
  try {
    // Basic rate limiting (5 requests per hour per IP)
    const clientIP = process.env.VERCEL_IP || 'unknown'
    const now = Date.now()
    const rateLimit = rateLimitMap.get(clientIP)
    console.log('🔧 Server: Client IP:', clientIP, 'Rate limit:', rateLimit)

    if (rateLimit) {
      if (now - rateLimit.lastReset > 3600000) {
        // 1 hour
        rateLimitMap.set(clientIP, { count: 0, lastReset: now })
      } else if (rateLimit.count >= 5) {
        return {
          success: false,
          error: 'Too many requests. Please try again later.',
        }
      }
    }

    // Parse and validate form data
    const rawData = {
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      timestamp: Date.now(),
    }
    console.log('🔧 Server: Raw form data:', {
      email: rawData.email,
      messageLength: rawData.message?.length,
      timestamp: rawData.timestamp,
    })

    // Minimum delay check (2 seconds in production, disabled in development)
    const formTimestamp = formData.get('timestamp') as string
    const isDevelopment = process.env.NODE_ENV === 'development'
    const minDelay = isDevelopment ? 0 : 2000 // No delay in dev, 2s in production

    console.log('🔧 Server: Timestamp check:', {
      formTimestamp,
      now,
      timeDiff: formTimestamp
        ? now - Number.parseInt(formTimestamp, 10)
        : 'N/A',
      isDevelopment,
      minDelay,
    })
    if (formTimestamp) {
      const timestamp = Number.parseInt(formTimestamp, 10)
      if (!Number.isNaN(timestamp)) {
        const timeDiff = now - timestamp
        if (timeDiff < minDelay) {
          console.log('🔧 Server: Rate limited due to timestamp:', {
            timeDiff,
            timestamp,
            now,
            minDelay,
          })
          return {
            success: false,
            error: 'Please wait a moment before submitting.',
          }
        }
      }
    }

    const validatedData = contactSchema.parse(rawData)
    console.log('🔧 Server: Validation passed, data:', {
      email: validatedData.email,
      messageLength: validatedData.message.length,
    })

    // Update rate limit
    const currentLimit = rateLimitMap.get(clientIP) || {
      count: 0,
      lastReset: now,
    }
    rateLimitMap.set(clientIP, {
      count: currentLimit.count + 1,
      lastReset: now,
    })

    // Send email via Resend
    console.log('🔧 Server: Sending email via Resend...')
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <noreply@gaboesquivel.com>',
      to: ['gabo@gaboesquivel.com'],
      subject: `New contact form submission from ${validatedData.email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${validatedData.email}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <div style="white-space: pre-wrap; line-height: 1.6;">
              ${validatedData.message}
            </div>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

From: ${validatedData.email}
Submitted: ${new Date().toLocaleString()}

Message:
${validatedData.message}
      `,
    })

    if (error) {
      console.error('🔧 Server: Resend error:', error)
      return {
        success: false,
        error: 'Failed to send message. Please try again later.',
      }
    }

    console.log('🔧 Server: Email sent successfully:', data)

    // Log minimal metadata
    console.log('🔧 Server: Contact form submitted successfully:', {
      email: validatedData.email,
      timestamp: new Date().toISOString(),
      messageLength: validatedData.message.length,
    })

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    }
  } catch (error) {
    console.error('🔧 Server: Contact form error:', error)

    if (error instanceof z.ZodError) {
      console.log('🔧 Server: Zod validation error:', error.issues)
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid form data.',
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    }
  }
}
