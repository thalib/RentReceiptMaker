/**
 * TypeScript interfaces for receipt data
 */

import type { PaymentMode } from '../utils/constants';

/**
 * Draft data interface - stores in-progress receipt data
 */
export interface DraftData {
  id: string;              // Always 'current_draft'
  tenantName: string;
  landlordName: string;
  landlordAddress: string;
  landlordPAN: string;
  rentAmount: number;
  rentalPeriodStart: Date;
  rentalPeriodEnd: Date;
  paymentDate: Date;
  propertyAddress: string;
  paymentMode: PaymentMode;
  updatedAt: Date;
}

/**
 * Receipt data interface - stores completed receipts
 */
export interface ReceiptData {
  id: string;                  // UUID
  receiptNumber: string;       // Format: RR-YYYY-NNN
  tenantName: string;
  landlordName: string;
  landlordAddress: string;
  landlordPAN: string;
  rentAmount: number;
  rentalPeriodStart: Date;
  rentalPeriodEnd: Date;
  paymentDate: Date;
  propertyAddress: string;
  paymentMode: PaymentMode;
  createdAt: Date;
  imageDataUrl?: string;       // Base64 PNG data (optional for future)
}

/**
 * Form data interface (for Vue component state)
 */
export interface FormData {
  tenantName: string;
  landlordName: string;
  landlordAddress: string;
  landlordPAN: string;
  rentAmount: number | null;
  rentalPeriodStart: string;
  rentalPeriodEnd: string;
  paymentDate: string;
  propertyAddress: string;
  paymentMode: PaymentMode;
}
