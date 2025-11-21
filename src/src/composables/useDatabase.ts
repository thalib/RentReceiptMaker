/**
 * Composable for database operations
 */

import { initDatabase, getDatabase, type ReceiptDatabase } from '../database';
import type { DraftData, ReceiptData } from '../types/receipt';
import { RECEIPT_PREFIX } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';

const CURRENT_DRAFT_ID = 'current_draft';

/**
 * Database composable for CRUD operations
 */
export function useDatabase() {
  let db: ReceiptDatabase | null = null;

  /**
   * Initialize database if not already initialized
   */
  async function ensureInitialized(): Promise<ReceiptDatabase> {
    if (!db) {
      db = await initDatabase();
    }
    return db;
  }

  /**
   * Save or update draft
   */
  async function saveDraft(data: Partial<DraftData>): Promise<void> {
    const database = await ensureInitialized();
    
    const draftData: DraftData = {
      id: CURRENT_DRAFT_ID,
      tenantName: data.tenantName || '',
      landlordName: data.landlordName || '',
      landlordAddress: data.landlordAddress || '',
      landlordPAN: data.landlordPAN || '',
      rentAmount: data.rentAmount || 0,
      rentalPeriodStart: data.rentalPeriodStart || new Date(),
      rentalPeriodEnd: data.rentalPeriodEnd || new Date(),
      paymentDate: data.paymentDate || new Date(),
      propertyAddress: data.propertyAddress || '',
      paymentMode: data.paymentMode || 'Cash',
      updatedAt: new Date(),
    };

    try {
      // Try to update existing draft
      const existing = await database.drafts.findOne(CURRENT_DRAFT_ID).exec();
      if (existing) {
        await existing.update({ $set: draftData });
      } else {
        // Insert new draft
        await database.drafts.insert(draftData);
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  }

  /**
   * Load current draft
   */
  async function loadDraft(): Promise<DraftData | null> {
    const database = await ensureInitialized();
    
    try {
      const draft = await database.drafts.findOne(CURRENT_DRAFT_ID).exec();
      return draft ? draft.toJSON() : null;
    } catch (error) {
      console.error('Error loading draft:', error);
      return null;
    }
  }

  /**
   * Clear current draft
   */
  async function clearDraft(): Promise<void> {
    const database = await ensureInitialized();
    
    try {
      const draft = await database.drafts.findOne(CURRENT_DRAFT_ID).exec();
      if (draft) {
        await draft.remove();
      }
    } catch (error) {
      console.error('Error clearing draft:', error);
      throw error;
    }
  }

  /**
   * Generate next receipt number for current year
   * Format: RR-YYYY-NNN
   */
  async function generateReceiptNumber(): Promise<string> {
    const database = await ensureInitialized();
    const currentYear = new Date().getFullYear();
    
    try {
      // Get all receipts for current year
      const receipts = await database.receipts
        .find({
          selector: {
            receiptNumber: {
              $regex: `^${RECEIPT_PREFIX}-${currentYear}-.*`,
            },
          },
        })
        .exec();

      // Find the highest number
      let maxNumber = 0;
      receipts.forEach((receipt) => {
        const match = receipt.receiptNumber.match(/-(\d+)$/);
        if (match && match[1]) {
          const num = parseInt(match[1], 10);
          if (num > maxNumber) {
            maxNumber = num;
          }
        }
      });

      // Generate next number with zero padding
      const nextNumber = maxNumber + 1;
      const paddedNumber = String(nextNumber).padStart(3, '0');
      
      return `${RECEIPT_PREFIX}-${currentYear}-${paddedNumber}`;
    } catch (error) {
      console.error('Error generating receipt number:', error);
      // Fallback to default
      return `${RECEIPT_PREFIX}-${currentYear}-001`;
    }
  }

  /**
   * Save a completed receipt
   */
  async function saveReceipt(data: Omit<ReceiptData, 'id' | 'createdAt' | 'receiptNumber'>): Promise<ReceiptData> {
    const database = await ensureInitialized();
    
    const receiptNumber = await generateReceiptNumber();
    const receiptData: ReceiptData = {
      id: uuidv4(),
      receiptNumber,
      ...data,
      createdAt: new Date(),
    };

    try {
      await database.receipts.insert(receiptData);
      return receiptData;
    } catch (error) {
      console.error('Error saving receipt:', error);
      throw error;
    }
  }

  /**
   * Get a receipt by ID
   */
  async function getReceipt(id: string): Promise<ReceiptData | null> {
    const database = await ensureInitialized();
    
    try {
      const receipt = await database.receipts.findOne(id).exec();
      return receipt ? receipt.toJSON() : null;
    } catch (error) {
      console.error('Error getting receipt:', error);
      return null;
    }
  }

  /**
   * Get all receipts (for future history feature)
   */
  async function getAllReceipts(): Promise<ReceiptData[]> {
    const database = await ensureInitialized();
    
    try {
      const receipts = await database.receipts.find().sort({ createdAt: 'desc' }).exec();
      return receipts.map((r) => r.toJSON());
    } catch (error) {
      console.error('Error getting receipts:', error);
      return [];
    }
  }

  /**
   * Delete a receipt
   */
  async function deleteReceipt(id: string): Promise<void> {
    const database = await ensureInitialized();
    
    try {
      const receipt = await database.receipts.findOne(id).exec();
      if (receipt) {
        await receipt.remove();
      }
    } catch (error) {
      console.error('Error deleting receipt:', error);
      throw error;
    }
  }

  return {
    ensureInitialized,
    saveDraft,
    loadDraft,
    clearDraft,
    generateReceiptNumber,
    saveReceipt,
    getReceipt,
    getAllReceipts,
    deleteReceipt,
  };
}
