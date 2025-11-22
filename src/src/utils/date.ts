/**
 * Date utility functions
 */

import { DATE_FORMAT } from './constants'

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/**
 * Format date as DD-MMM-YYYY or DD/MM/YYYY
 */
export function formatDate(date: Date, format: string = DATE_FORMAT): string {
  if (!isValidDate(date)) return ''

  const day = String(date.getDate()).padStart(2, '0')
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  if (format === 'DD/MM/YYYY') {
    return `${day}/${String(month).padStart(2, '0')}/${year}`
  }

  // Default: DD-MMM-YYYY
  return `${day}-${MONTH_NAMES[month - 1]}-${year}`
}

/**
 * Parse date string to Date object
 */
export function parseDate(dateString: string): Date | null {
  if (!dateString) return null

  const date = new Date(dateString)
  return isValidDate(date) ? date : null
}

/**
 * Format date range for display
 */
export function formatDateRange(start: Date, end: Date): string {
  if (!isValidDate(start) || !isValidDate(end)) return ''

  const startDay = start.getDate()
  const endDay = end.getDate()
  const startMonth = start.getMonth()
  const endMonth = end.getMonth()
  const startYear = start.getFullYear()
  const endYear = end.getFullYear()

  // Same month and year: "01-31 Jan 2024"
  if (startMonth === endMonth && startYear === endYear) {
    return `${String(startDay).padStart(2, '0')}-${String(endDay).padStart(2, '0')} ${MONTH_NAMES[startMonth]} ${startYear}`
  }

  // Same year: "15 Jan - 15 Feb 2024"
  if (startYear === endYear) {
    return `${String(startDay).padStart(2, '0')} ${MONTH_NAMES[startMonth]} - ${String(endDay).padStart(2, '0')} ${MONTH_NAMES[endMonth]} ${startYear}`
  }

  // Different years: "01-Jan-2024 to 31-Jan-2025"
  return `${formatDate(start)} to ${formatDate(end)}`
}

/**
 * Check if value is a valid date
 */
export function isValidDate(date: unknown): boolean {
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Check if date is in the future
 */
export function isDateInFuture(date: Date): boolean {
  if (!isValidDate(date)) return false
  return date.getTime() > Date.now()
}

/**
 * Check if date is in the past
 */
export function isDateInPast(date: Date): boolean {
  if (!isValidDate(date)) return false
  return date.getTime() < Date.now()
}

/**
 * Get number of days between two dates
 */
export function getDaysBetween(start: Date, end: Date): number {
  if (!isValidDate(start) || !isValidDate(end)) return 0

  const msPerDay = 24 * 60 * 60 * 1000
  const diffMs = end.getTime() - start.getTime()
  return Math.round(diffMs / msPerDay)
}

/**
 * Get first day of previous month
 */
export function getFirstDayOfPreviousMonth(): string {
  const now = new Date()
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
  const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1
  return `${year}-${String(month + 1).padStart(2, '0')}-01`
}

/**
 * Get last day of previous month
 */
export function getLastDayOfPreviousMonth(): string {
  const now = new Date()
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
  const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1
  const lastDay = new Date(year, month + 1, 0).getDate()
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`
}

/**
 * Get previous month in YYYY-MM format
 */
export function getPreviousMonth(): string {
  const now = new Date()
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
  const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/**
 * Convert YYYY-MM month format to start and end dates
 */
export function monthToDateRange(monthStr: string): { start: string; end: string } {
  const parts = monthStr.split('-')
  const year = parseInt(parts[0] || '2024', 10)
  const month = parseInt(parts[1] || '1', 10)
  const lastDay = new Date(year, month, 0).getDate()
  return {
    start: `${year}-${String(month).padStart(2, '0')}-01`,
    end: `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`,
  }
}

/**
 * Generate default receipt number in format RR-YYYYMM-001
 */
export function generateDefaultReceiptNumber(): string {
  const prevMonth = getPreviousMonth()
  const [year, month] = prevMonth.split('-')
  return `RR-${year}${month}-001`
}
