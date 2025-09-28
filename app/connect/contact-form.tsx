'use client'

import { useForm } from '@tanstack/react-form'
import { useState, useTransition } from 'react'
import { submitContactForm } from './actions'
import { type ContactFormData, contactSchema } from './schema'

type FormState = {
  success: boolean
  error?: string
  message?: string
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState | null>(null)
  const [isPending, startTransition] = useTransition()

  const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error
    if (error && typeof error === 'object' && 'message' in error) {
      return String(error.message)
    }
    if (
      error &&
      typeof error === 'object' &&
      'issues' in error &&
      Array.isArray(error.issues) &&
      error.issues[0] &&
      typeof error.issues[0] === 'object' &&
      'message' in error.issues[0]
    ) {
      return String(error.issues[0].message)
    }
    return 'Invalid input'
  }

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    } as ContactFormData,
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData()
      formData.append('name', value.name)
      formData.append('email', value.email)
      formData.append('company', value.company)
      formData.append('subject', value.subject)
      formData.append('message', value.message)
      formData.append('timestamp', Date.now().toString())

      startTransition(async () => {
        const result = await submitContactForm(formData)
        setFormState(result)

        if (result.success) {
          form.reset()
        }
      })
    },
  })

  return (
    <div className="space-y-6">
      {formState && (
        <div
          className={`p-4 rounded-lg ${
            formState.success
              ? ' border border-accent text-accent'
              : ' border border-red-800 text-red-800'
          }`}
        >
          {formState.success ? formState.message : formState.error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
        noValidate
      >
        <form.Field name="name">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium mb-2"
              >
                Name
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                disabled={isPending}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-600 text-sm mt-2">
                  ✗ {getErrorMessage(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                disabled={isPending}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-600 text-sm mt-2">
                  ✗ {getErrorMessage(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="company">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium mb-2"
              >
                Company
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Your company name"
                className="w-full px-4 py-3 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                disabled={isPending}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-600 text-sm mt-2">
                  ✗ {getErrorMessage(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="subject">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium mb-2"
              >
                Subject
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Email subject line"
                className="w-full px-4 py-3 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                disabled={isPending}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-600 text-sm mt-2">
                  ✗ {getErrorMessage(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="message">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Tell me about your project, timeline, and how I can help..."
                className="w-full h-60 sm:h-80 px-4 py-3 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none transition-colors"
                disabled={isPending}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-600">
                  {field.state.meta.errors.length > 0 ? (
                    <span className="text-red-600">
                      ✗ {getErrorMessage(field.state.meta.errors[0])}
                    </span>
                  ) : field.state.value.length >= 10 ? (
                    <span className="text-green-600">
                      ✓ Message length is good
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      {10 - field.state.value.length} more characters needed
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {field.state.value.length}/5000
                </p>
              </div>
            </div>
          )}
        </form.Field>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 w-full border-accent border text-accent font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset disabled:opacity-50"
          >
            {isPending ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  )
}
