/**
 * Validation helper functions
 */

/**
 * Validate PAN number format (AAAAA9999A)
 */
export function isValidPAN(pan: string): boolean {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  return panRegex.test(pan);
}

/**
 * Check if value is a valid number
 */
export function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Check if number is positive
 */
export function isPositiveNumber(value: number): boolean {
  return isValidNumber(value) && value > 0;
}

/**
 * Check if number is within range (inclusive)
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return isValidNumber(value) && value >= min && value <= max;
}

/**
 * Check if string is empty or only whitespace
 */
export function isEmptyOrWhitespace(value: string): boolean {
  return !value || value.trim().length === 0;
}

/**
 * Check if string meets minimum length
 */
export function hasMinLength(value: string, min: number): boolean {
  return Boolean(value && value.trim().length >= min);
}

/**
 * Check if string does not exceed maximum length
 */
export function hasMaxLength(value: string, max: number): boolean {
  return Boolean(value && value.trim().length <= max);
}
