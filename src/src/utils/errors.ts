/**
 * Error handling utilities
 */

export class ReceiptError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message)
    this.name = 'ReceiptError'
  }
}

/**
 * Convert any error to a user-friendly message
 */
export function handleError(error: unknown): string {
  if (error instanceof ReceiptError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'An unexpected error occurred'
}
