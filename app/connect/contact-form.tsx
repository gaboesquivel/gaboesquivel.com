"use client";

import { useForm } from "@tanstack/react-form";
import { useRef, useState } from "react";

import { submitContactForm } from "./actions";
import { contactSchema } from "./schema";
import type { ContactFormData } from "./schema";

interface FormState {
  success: boolean;
  error?: string;
  message?: string;
}

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  if (
    error &&
    typeof error === "object" &&
    "issues" in error &&
    Array.isArray(error.issues) &&
    error.issues[0] &&
    typeof error.issues[0] === "object" &&
    "message" in error.issues[0]
  ) {
    return String(error.issues[0].message);
  }

  return "Invalid input";
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState | null>(null);
  const [isPending, setIsPending] = useState(false);
  const formOpenedAt = useRef(Date.now());

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    } as ContactFormData,
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("email", value.email);
      formData.append("subject", value.subject);
      formData.append("message", value.message);
      formData.append("timestamp", formOpenedAt.current.toString());

      setIsPending(true);

      try {
        const result = await submitContactForm(formData);
        setFormState(result);

        if (result.success) {
          form.reset();
          formOpenedAt.current = Date.now();
        }
      } catch {
        setFormState({
          success: false,
          error: "Unable to send your message. Please try again.",
        });
      } finally {
        setIsPending(false);
      }
    },
    validators: {
      onSubmit: contactSchema,
    },
  });

  return (
    <div className="space-y-6">
      {formState && (
        <div
          key={formState.success ? "success" : "error"}
          role={formState.success ? "status" : "alert"}
          aria-live="polite"
          className={`rounded-lg p-4 motion-safe:transition-[opacity,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity motion-reduce:duration-[120ms] motion-safe:starting:scale-[0.97] motion-safe:starting:opacity-0 motion-reduce:starting:opacity-0 ${
            formState.success
              ? "border border-accent text-accent"
              : "border border-red-800 text-red-800"
          }`}
        >
          {formState.success ? formState.message : formState.error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        className="space-y-4"
        noValidate
      >
        <form.Field name="name">
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium"
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
                className="w-full rounded-lg border border-hairline bg-transparent px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent focus:outline-none"
                disabled={isPending}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-2 text-sm text-red-600">
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
                className="mb-2 block text-sm font-medium"
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
                className="w-full rounded-lg border border-hairline bg-transparent px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent focus:outline-none"
                disabled={isPending}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-2 text-sm text-red-600">
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
                className="mb-2 block text-sm font-medium"
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
                className="w-full rounded-lg border border-hairline bg-transparent px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent focus:outline-none"
                disabled={isPending}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-2 text-sm text-red-600">
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
                className="mb-2 block text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Describe the product, team, and what you need help with..."
                className="h-60 w-full resize-none rounded-lg border border-hairline bg-transparent px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent focus:outline-none sm:h-80"
                disabled={isPending}
              />
              <div className="mt-2 flex items-center justify-between">
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
            className="focus:ring-offset w-full rounded-lg border border-accent px-6 py-2 font-medium text-accent transition-[color,background-color,border-color,transform] ease-[cubic-bezier(0.23,1,0.32,1)] focus:ring-2 focus:ring-accent focus:outline-none disabled:opacity-50 motion-safe:duration-[160ms] motion-safe:active:scale-[0.97] motion-reduce:duration-[80ms] motion-reduce:active:scale-[0.99]"
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
