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
      company: formData.get('company') as string,
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
      from: 'Contact Form <noreply@gaboesquivel.com>',
      to: ['gabo@gaboesquivel.com'],
      replyTo: validatedData.email,
      subject: validatedData.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Company:</strong> ${validatedData.company}</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
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

Name: ${validatedData.name}
Email: ${validatedData.email}
Company: ${validatedData.company}
Subject: ${validatedData.subject}
Submitted: ${new Date().toLocaleString()}

Message:
${validatedData.message}
      `,
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
