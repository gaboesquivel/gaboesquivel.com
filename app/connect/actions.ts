'use server'

import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { z } from 'zod'
import { type ContactFormData, contactSchema } from './schema'

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

export async function submitContactForm(formData: FormData) {
  try {
    // Basic rate limiting (5 requests per hour per IP)
    const clientIP = process.env.VERCEL_IP || 'unknown'
    const now = Date.now()
    const rateLimit = rateLimitMap.get(clientIP)

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
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      timestamp: Date.now(),
    }

    // Minimum delay check (2 seconds in production, disabled in development)
    const formTimestamp = formData.get('timestamp') as string
    const isDevelopment = process.env.NODE_ENV === 'development'
    const minDelay = isDevelopment ? 0 : 2000 // No delay in dev, 2s in production

    if (formTimestamp) {
      const timestamp = Number.parseInt(formTimestamp, 10)
      if (!Number.isNaN(timestamp)) {
        const timeDiff = now - timestamp
        if (timeDiff < minDelay) {
          return {
            success: false,
            error: 'Please wait a moment before submitting.',
          }
        }
      }
    }

    const validatedData = contactSchema.parse(rawData)

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
    const { data, error } = await resend.emails.send({
      from: `${validatedData.name} <noreply@gaboesquivel.com>`,
      to: ['gabo@gaboesquivel.com'],
      replyTo: validatedData.email,
      subject: validatedData.subject,
      text: validatedData.message,
    })

    if (error) {
      return {
        success: false,
        error: 'Failed to send message. Please try again later.',
      }
    }

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
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
