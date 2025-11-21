/**
 * Form validation composable using VeeValidate
 */

import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { PAYMENT_MODES, MIN_RENT_AMOUNT, MAX_RENT_AMOUNT } from '../utils/constants';
import { isValidPAN } from '../utils/validation';

/**
 * Validation schema for receipt form using Yup
 */
export const receiptValidationSchema = toTypedSchema(
  yup.object({
    tenantName: yup
      .string()
      .required('Tenant name is required')
      .min(2, 'Tenant name must be at least 2 characters')
      .max(100, 'Tenant name must not exceed 100 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Tenant name must contain only letters and spaces'),

    landlordName: yup
      .string()
      .required('Landlord name is required')
      .min(2, 'Landlord name must be at least 2 characters')
      .max(100, 'Landlord name must not exceed 100 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Landlord name must contain only letters and spaces'),

    landlordAddress: yup
      .string()
      .required('Landlord address is required')
      .min(10, 'Landlord address must be at least 10 characters')
      .max(500, 'Landlord address must not exceed 500 characters'),

    landlordPAN: yup
      .string()
      .required('Landlord PAN is required')
      .length(10, 'PAN must be exactly 10 characters')
      .test('is-valid-pan', 'PAN must be in format AAAAA9999A', (value) => {
        return value ? isValidPAN(value) : false;
      }),

    propertyAddress: yup
      .string()
      .required('Property address is required')
      .min(10, 'Property address must be at least 10 characters')
      .max(500, 'Property address must not exceed 500 characters'),

    rentAmount: yup
      .number()
      .required('Rent amount is required')
      .min(MIN_RENT_AMOUNT, `Rent amount must be at least ₹${MIN_RENT_AMOUNT}`)
      .max(MAX_RENT_AMOUNT, `Rent amount must not exceed ₹${MAX_RENT_AMOUNT}`)
      .test('is-positive', 'Rent amount must be positive', (value) => {
        return value ? value > 0 : false;
      }),

    rentalPeriodStart: yup
      .string()
      .required('Rental period start date is required')
      .test('is-valid-date', 'Invalid date', (value) => {
        return value ? !isNaN(new Date(value).getTime()) : false;
      }),

    rentalPeriodEnd: yup
      .string()
      .required('Rental period end date is required')
      .test('is-valid-date', 'Invalid date', (value) => {
        return value ? !isNaN(new Date(value).getTime()) : false;
      })
      .test('is-after-start', 'End date must be after start date', function (value) {
        const { rentalPeriodStart } = this.parent;
        if (!value || !rentalPeriodStart) return true;
        return new Date(value) > new Date(rentalPeriodStart);
      }),

    paymentDate: yup
      .string()
      .required('Payment date is required')
      .test('is-valid-date', 'Invalid date', (value) => {
        return value ? !isNaN(new Date(value).getTime()) : false;
      })
      .test('is-after-start', 'Payment date should not be before rental period start', function (value) {
        const { rentalPeriodStart } = this.parent;
        if (!value || !rentalPeriodStart) return true;
        return new Date(value) >= new Date(rentalPeriodStart);
      }),

    paymentMode: yup
      .string()
      .required('Payment mode is required')
      .oneOf([...PAYMENT_MODES], 'Invalid payment mode'),
  })
);

/**
 * Individual field validation functions
 */
export const validators = {
  /**
   * Validate required field
   */
  required: (value: string) => {
    return value && value.trim().length > 0;
  },

  /**
   * Validate minimum length
   */
  minLength: (value: string, min: number) => {
    return value && value.trim().length >= min;
  },

  /**
   * Validate maximum length
   */
  maxLength: (value: string, max: number) => {
    return value && value.trim().length <= max;
  },

  /**
   * Validate pattern
   */
  pattern: (value: string, pattern: RegExp) => {
    return pattern.test(value);
  },

  /**
   * Validate PAN number
   */
  pan: (value: string) => {
    return isValidPAN(value);
  },

  /**
   * Validate number within range
   */
  numberInRange: (value: number, min?: number, max?: number) => {
    if (isNaN(value)) return false;
    if (min !== undefined && value < min) return false;
    if (max !== undefined && value > max) return false;
    return true;
  },

  /**
   * Validate date range (start before end)
   */
  dateRange: (start: string | Date, end: string | Date) => {
    const startDate = typeof start === 'string' ? new Date(start) : start;
    const endDate = typeof end === 'string' ? new Date(end) : end;
    return endDate > startDate;
  },

  /**
   * Validate payment date logic
   */
  paymentDateLogic: (paymentDate: string | Date, periodStart: string | Date) => {
    const payment = typeof paymentDate === 'string' ? new Date(paymentDate) : paymentDate;
    const start = typeof periodStart === 'string' ? new Date(periodStart) : periodStart;
    return payment >= start;
  },
};

/**
 * Get error messages for specific validation failures
 */
export function getErrorMessage(field: string, rule: string): string {
  const messages: Record<string, Record<string, string>> = {
    tenantName: {
      required: 'Tenant name is required',
      minLength: 'Tenant name must be at least 2 characters',
      maxLength: 'Tenant name must not exceed 100 characters',
      pattern: 'Tenant name must contain only letters and spaces',
    },
    landlordName: {
      required: 'Landlord name is required',
      minLength: 'Landlord name must be at least 2 characters',
      maxLength: 'Landlord name must not exceed 100 characters',
      pattern: 'Landlord name must contain only letters and spaces',
    },
    landlordAddress: {
      required: 'Landlord address is required',
      minLength: 'Landlord address must be at least 10 characters',
      maxLength: 'Landlord address must not exceed 500 characters',
    },
    landlordPAN: {
      required: 'Landlord PAN is required',
      format: 'PAN must be in format AAAAA9999A (e.g., ABCDE1234F)',
    },
    propertyAddress: {
      required: 'Property address is required',
      minLength: 'Property address must be at least 10 characters',
      maxLength: 'Property address must not exceed 500 characters',
    },
    rentAmount: {
      required: 'Rent amount is required',
      min: `Rent amount must be at least ₹${MIN_RENT_AMOUNT}`,
      max: `Rent amount must not exceed ₹${MAX_RENT_AMOUNT}`,
      positive: 'Rent amount must be positive',
    },
    rentalPeriodStart: {
      required: 'Rental period start date is required',
      invalid: 'Invalid date format',
    },
    rentalPeriodEnd: {
      required: 'Rental period end date is required',
      invalid: 'Invalid date format',
      logic: 'End date must be after start date',
    },
    paymentDate: {
      required: 'Payment date is required',
      invalid: 'Invalid date format',
      logic: 'Payment date should not be before rental period start',
    },
    paymentMode: {
      required: 'Payment mode is required',
      invalid: 'Invalid payment mode',
    },
  };

  return messages[field]?.[rule] || 'Invalid value';
}

/**
 * Validation composable
 */
export function useFormValidation() {
  return {
    schema: receiptValidationSchema,
    validators,
    getErrorMessage,
  };
}
