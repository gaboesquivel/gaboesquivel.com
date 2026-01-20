import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parse } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateDifference(date: string): string {
  const currentDate = new Date()
  const targetDate = new Date(date)

  // Calculate the difference in milliseconds
  const diffMs = currentDate.getTime() - targetDate.getTime()

  // Convert to days, months, and years
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffMonths = Math.floor(diffDays / 30.44) // Average days in a month
  const diffYears = Math.floor(diffDays / 365.25) // Account for leap years

  if (diffYears > 0) return `${diffYears}y ago`
  if (diffMonths > 0) return `${diffMonths}mo ago`
  if (diffDays > 0) return `${diffDays}d ago`

  return 'Today'
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
