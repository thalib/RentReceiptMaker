/**
 * String utility functions
 */

/**
 * Capitalize first letter of a string
 */
export function capitalize(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(text: string): string {
  if (!text) return ''
  return text
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ')
}

/**
 * Truncate text to maximum length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Sanitize input by removing special characters and trimming whitespace
 */
export function sanitizeInput(text: string): string {
  if (!text) return ''
  return text.trim().replace(/[<>]/g, '')
}

/**
 * Generate slug from text (for filenames)
 */
export function generateSlug(text: string): string {
  if (!text) return ''
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
