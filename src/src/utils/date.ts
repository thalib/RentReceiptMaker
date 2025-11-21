/**
 * Date utility functions
 */

import { DATE_FORMAT } from './constants';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Format date as DD-MMM-YYYY or DD/MM/YYYY
 */
export function formatDate(date: Date, format: string = DATE_FORMAT): string {
  if (!isValidDate(date)) return '';
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  if (format === 'DD/MM/YYYY') {
    return `${day}/${String(month).padStart(2, '0')}/${year}`;
  }
  
  // Default: DD-MMM-YYYY
  return `${day}-${MONTH_NAMES[month - 1]}-${year}`;
}

/**
 * Parse date string to Date object
 */
export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  return isValidDate(date) ? date : null;
}

/**
 * Format date range for display
 */
export function formatDateRange(start: Date, end: Date): string {
  if (!isValidDate(start) || !isValidDate(end)) return '';
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.getMonth();
  const endMonth = end.getMonth();
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  
  // Same month and year: "01-31 Jan 2024"
  if (startMonth === endMonth && startYear === endYear) {
    return `${String(startDay).padStart(2, '0')}-${String(endDay).padStart(2, '0')} ${MONTH_NAMES[startMonth]} ${startYear}`;
  }
  
  // Same year: "15 Jan - 15 Feb 2024"
  if (startYear === endYear) {
    return `${String(startDay).padStart(2, '0')} ${MONTH_NAMES[startMonth]} - ${String(endDay).padStart(2, '0')} ${MONTH_NAMES[endMonth]} ${startYear}`;
  }
  
  // Different years: "01-Jan-2024 to 31-Jan-2025"
  return `${formatDate(start)} to ${formatDate(end)}`;
}

/**
 * Check if value is a valid date
 */
export function isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Check if date is in the future
 */
export function isDateInFuture(date: Date): boolean {
  if (!isValidDate(date)) return false;
  return date.getTime() > Date.now();
}

/**
 * Check if date is in the past
 */
export function isDateInPast(date: Date): boolean {
  if (!isValidDate(date)) return false;
  return date.getTime() < Date.now();
}

/**
 * Get number of days between two dates
 */
export function getDaysBetween(start: Date, end: Date): number {
  if (!isValidDate(start) || !isValidDate(end)) return 0;
  
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / msPerDay);
}
