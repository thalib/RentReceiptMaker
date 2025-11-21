/**
 * RxDB schemas for the application
 */

import type { RxJsonSchema } from 'rxdb';
import type { DraftData, ReceiptData } from '../types/receipt';

/**
 * Schema for draft collection (stores in-progress receipt data)
 */
export const draftSchema: RxJsonSchema<DraftData> = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    tenantName: {
      type: 'string',
      maxLength: 200,
    },
    landlordName: {
      type: 'string',
      maxLength: 200,
    },
    landlordAddress: {
      type: 'string',
      maxLength: 500,
    },
    landlordPAN: {
      type: 'string',
      maxLength: 10,
    },
    rentAmount: {
      type: 'number',
      minimum: 0,
      maximum: 100000000,
    },
    rentalPeriodStart: {
      type: 'string',
      format: 'date-time',
    },
    rentalPeriodEnd: {
      type: 'string',
      format: 'date-time',
    },
    paymentDate: {
      type: 'string',
      format: 'date-time',
    },
    propertyAddress: {
      type: 'string',
      maxLength: 500,
    },
    paymentMode: {
      type: 'string',
      maxLength: 50,
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['id', 'updatedAt'],
};

/**
 * Schema for receipts collection (stores completed receipts)
 */
export const receiptSchema: RxJsonSchema<ReceiptData> = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    receiptNumber: {
      type: 'string',
      maxLength: 50,
    },
    tenantName: {
      type: 'string',
      maxLength: 200,
    },
    landlordName: {
      type: 'string',
      maxLength: 200,
    },
    landlordAddress: {
      type: 'string',
      maxLength: 500,
    },
    landlordPAN: {
      type: 'string',
      maxLength: 10,
    },
    rentAmount: {
      type: 'number',
      minimum: 0,
      maximum: 100000000,
    },
    rentalPeriodStart: {
      type: 'string',
      format: 'date-time',
    },
    rentalPeriodEnd: {
      type: 'string',
      format: 'date-time',
    },
    paymentDate: {
      type: 'string',
      format: 'date-time',
    },
    propertyAddress: {
      type: 'string',
      maxLength: 500,
    },
    paymentMode: {
      type: 'string',
      maxLength: 50,
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    imageDataUrl: {
      type: 'string',
    },
  },
  required: ['id', 'receiptNumber', 'createdAt'],
  indexes: ['receiptNumber', 'createdAt'],
};
