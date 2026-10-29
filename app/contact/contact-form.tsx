"use client";

import { useForm } from "@tanstack/react-form";
import { enter } from "components/shared/motion";
import { siteFieldClass } from "components/shared/spacing";
import { Button } from "components/ui/button";
import { Field, FieldError, FieldLabel } from "components/ui/field";
import { Input } from "components/ui/input";
import { Textarea } from "components/ui/textarea";
import { cn } from "lib/utils";
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
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error)
    return String(error.message);
  if (
    error &&
    typeof error === "object" &&
    "issues" in error &&
    Array.isArray(error.issues) &&
    error.issues[0] &&
    typeof error.issues[0] === "object" &&
    "message" in error.issues[0]
  )
    return String(error.issues[0].message);

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
      const data = new FormData();
      data.append("name", value.name);
      data.append("email", value.email);
      data.append("subject", value.subject);
      data.append("message", value.message);
      data.append("timestamp", formOpenedAt.current.toString());

      setIsPending(true);

      try {
        const result = await submitContactForm(data);
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
          className={cn(
            "rounded-lg p-4",
            enter,
            formState.success
              ? "border border-accent text-accent"
              : "border border-red-800 text-red-800"
          )}
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
            <Field>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                className={siteFieldClass}
                disabled={isPending}
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Your full name"
                value={field.state.value}
              />
              {field.state.meta.errors.length > 0 && (
                <FieldError>
                  ✗ {getErrorMessage(field.state.meta.errors[0])}
                </FieldError>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
              <Input
                className={siteFieldClass}
                disabled={isPending}
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="your@email.com"
                type="email"
                value={field.state.value}
              />
              {field.state.meta.errors.length > 0 && (
                <FieldError>
                  ✗ {getErrorMessage(field.state.meta.errors[0])}
                </FieldError>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="subject">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
              <Input
                className={siteFieldClass}
                disabled={isPending}
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Email subject line"
                value={field.state.value}
              />
              {field.state.meta.errors.length > 0 && (
                <FieldError>
                  ✗ {getErrorMessage(field.state.meta.errors[0])}
                </FieldError>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="message">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Message</FieldLabel>
              <Textarea
                className={`${siteFieldClass} h-44 resize-none sm:h-52`}
                disabled={isPending}
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Describe the product, team, and what you need help with..."
                value={field.state.value}
              />
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm text-neutral-400">
                  {field.state.meta.errors.length > 0 ? (
                    <span className="text-red-400">
                      ✗ {getErrorMessage(field.state.meta.errors[0])}
                    </span>
                  ) : field.state.value.length >= 10 ? (
                    <span className="text-accent">
                      ✓ Message length is good
                    </span>
                  ) : (
                    <span className="text-neutral-400">
                      {10 - field.state.value.length} more characters needed
                    </span>
                  )}
                </p>
                <p className="text-sm text-neutral-400">
                  {field.state.value.length}/5000
                </p>
              </div>
            </Field>
          )}
        </form.Field>

        <div className="flex justify-end">
          <Button
            className="w-full"
            disabled={isPending}
            size="site"
            type="submit"
            variant="siteAccent"
          >
            {isPending ? "Sending..." : "Send message"}
          </Button>
        </div>
      </form>
    </div>
  );
}
