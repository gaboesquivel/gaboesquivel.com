import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const parseDateInput = (date: string) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date(date);
};

export function formatDate(date: string) {
  return parseDateInput(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const formatBlogListDate = (date: string) =>
  parseDateInput(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    day: "numeric",
    timeZone: "UTC",
  });
