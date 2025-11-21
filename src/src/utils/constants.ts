/**
 * Constants used throughout the application
 */

export const PAYMENT_MODES = ['Cash', 'Cheque', 'Online Transfer', 'UPI'] as const;
export type PaymentMode = typeof PAYMENT_MODES[number];

export const RECEIPT_PREFIX = 'RR';
export const DATE_FORMAT = 'DD-MMM-YYYY';
export const CURRENCY_SYMBOL = '₹';
export const MIN_RENT_AMOUNT = 1;
export const MAX_RENT_AMOUNT = 100000000; // 10 crore
export const REVENUE_STAMP_THRESHOLD = 5000;
export const AUTO_SAVE_DEBOUNCE = 500; // milliseconds
export const CANVAS_REDRAW_DEBOUNCE = 100; // milliseconds
