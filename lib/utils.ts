import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
  const fullDate = new Date(date).toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `${fullDate}`
}

export function capitalizeWords(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
