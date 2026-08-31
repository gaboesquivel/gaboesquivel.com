import { type ClassValue, clsx } from 'clsx'
import { format, parse } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  // Parse date-only strings (YYYY-MM-DD) as local dates to avoid timezone shifts
  // For date-only strings, parse them directly to avoid UTC interpretation
  let dateObj: Date
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    // Date-only format: parse as local date to avoid timezone issues
    dateObj = parse(date, 'yyyy-MM-dd', new Date())
  } else {
    // Other formats: use standard Date parsing
    dateObj = new Date(date)
  }

  return format(dateObj, 'MMMM d, yyyy')
}

export function capitalizeWords(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
