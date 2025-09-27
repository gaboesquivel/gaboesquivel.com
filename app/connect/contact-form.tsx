'use client'

import { useEffect, useState, useTransition } from 'react'
import { submitContactForm } from './actions'

type FormState = {
  success: boolean
  error?: string
  message?: string
}

export function ContactForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState<FormState | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  const isEmailValid = email.includes('@') && email.includes('.')
  const isMessageValid = message.length >= 200
  const isFormValid = isEmailValid && isMessageValid && !isPending

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEmail('')
        setMessage('')
        setFormState(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('🔧 Client: Form submission started')
    setHasSubmitted(true)

    if (!isFormValid) {
      console.log('🔧 Client: Form validation failed', {
        isEmailValid,
        isMessageValid,
        email,
        messageLength: message.length,
      })
      return
    }

    console.log('🔧 Client: Form validation passed, submitting...')
    startTransition(async () => {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('message', message)
      formData.append('timestamp', Date.now().toString())

      console.log('🔧 Client: Calling server action with data:', {
        email,
        messageLength: message.length,
      })
      const result = await submitContactForm(formData)
      console.log('🔧 Client: Server response:', result)
      setFormState(result)

      if (result.success) {
        console.log('🔧 Client: Success, clearing form')
        setEmail('')
        setMessage('')
        setHasSubmitted(false)
      }
    })
  }

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

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
            required
            disabled={isPending}
          />
          {hasSubmitted && (!email || !isEmailValid) && (
            <p className="text-red-600 text-sm mt-2">
              x{' '}
              {!email
                ? 'Email address is required'
                : 'Please enter a valid email address'}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your project, timeline, and how I can help..."
            className="w-full h-60 sm:h-80 px-4 py-3 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none transition-colors"
            required
            disabled={isPending}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-600">
              {hasSubmitted && message.length < 200 ? (
                <span className="text-red-600">
                  x{' '}
                  {!message
                    ? 'Message is required'
                    : `${200 - message.length} more characters needed`}
                </span>
              ) : message.length >= 200 ? (
                <span className="text-green-600">✓ Message length is good</span>
              ) : (
                <span className="text-gray-500">
                  {200 - message.length} more characters needed
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500">{message.length}/5000</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 w-full border-accent border text-accent font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset"
          >
            {isPending ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  )
}
