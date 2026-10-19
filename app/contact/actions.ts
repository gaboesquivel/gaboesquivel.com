"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

import { contactSchema } from "./schema";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export async function submitContactForm(formData: FormData) {
  try {
    const requestHeaders = await headers();
    const forwardedIP = requestHeaders
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim();
    const clientIP =
      forwardedIP || requestHeaders.get("x-real-ip") || "unknown";
    const now = Date.now();
    const rateLimit = rateLimitMap.get(clientIP);

    if (rateLimit) {
      if (now - rateLimit.lastReset > 3_600_000) {
        rateLimitMap.set(clientIP, { count: 0, lastReset: now });
      } else if (rateLimit.count >= 5) {
        return {
          error: "Too many requests. Please try again later.",
          success: false,
        };
      }
    }

    const rawData = {
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      name: formData.get("name") as string,
      subject: formData.get("subject") as string,
    };

    const formTimestamp = formData.get("timestamp");
    const timestamp =
      typeof formTimestamp === "string"
        ? Number.parseInt(formTimestamp, 10)
        : Number.NaN;
    const isDevelopment = process.env.NODE_ENV === "development";
    const minDelay = isDevelopment ? 0 : 2000;
    const timeDiff = now - timestamp;

    if (Number.isNaN(timestamp) || timeDiff < minDelay) {
      return {
        error: "Please wait a moment before submitting.",
        success: false,
      };
    }

    const validatedData = contactSchema.parse(rawData);

    const currentLimit = rateLimitMap.get(clientIP) || {
      count: 0,
      lastReset: now,
    };
    rateLimitMap.set(clientIP, {
      count: currentLimit.count + 1,
      lastReset: now,
    });

    const { error } = await resend.emails.send({
      from: `${validatedData.name} <noreply@gaboesquivel.com>`,
      replyTo: validatedData.email,
      subject: validatedData.subject,
      text: validatedData.message,
      to: ["contact@gaboesquivel.com"],
    });

    if (error) {
      return {
        error: "Failed to send message. Please try again later.",
        success: false,
      };
    }

    return {
      message: "Thank you! Your message has been sent successfully.",
      success: true,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues[0]?.message || "Invalid form data.",
        success: false,
      };
    }

    return {
      error: "An unexpected error occurred. Please try again later.",
      success: false,
    };
  }
}
