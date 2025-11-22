/**
 * Composable for localStorage operations
 * Replaces RxDB for simpler client-side data persistence
 */

import { RECEIPT_PREFIX } from '../utils/constants'

const CURRENT_DRAFT_KEY = 'rent_receipt_draft'
const RECEIPTS_KEY = 'rent_receipts'
const RECEIPT_COUNTER_KEY = 'rent_receipt_counter'

export interface StoredDraftData {
  tenantName: string
  landlordName: string
  landlordAddress: string
  landlordPAN: string
  rentAmount: number
  rentalPeriodStart: string
  rentalPeriodEnd: string
  paymentDate: string
  propertyAddress: string
  paymentMode: string
  updatedAt: string
}

export interface StoredReceiptData {
  id: string
  receiptNumber: string
  tenantName: string
  landlordName: string
  landlordAddress: string
  landlordPAN: string
  rentAmount: number
  rentalPeriodStart: string
  rentalPeriodEnd: string
  paymentDate: string
  propertyAddress: string
  paymentMode: string
  createdAt: string
  imageDataUrl?: string
}

/**
 * LocalStorage composable for CRUD operations
 */
export function useLocalStorage() {
  /**
   * Save or update draft
   */
  function saveDraft(data: Partial<StoredDraftData>): void {
    try {
      const draftData: StoredDraftData = {
        tenantName: data.tenantName || '',
        landlordName: data.landlordName || '',
        landlordAddress: data.landlordAddress || '',
        landlordPAN: data.landlordPAN || '',
        rentAmount: data.rentAmount || 0,
        rentalPeriodStart: data.rentalPeriodStart || '',
        rentalPeriodEnd: data.rentalPeriodEnd || '',
        paymentDate: data.paymentDate || '',
        propertyAddress: data.propertyAddress || '',
        paymentMode: data.paymentMode || 'Cash',
        updatedAt: new Date().toISOString(),
      }

      localStorage.setItem(CURRENT_DRAFT_KEY, JSON.stringify(draftData))
    } catch (error) {
      console.error('Error saving draft:', error)
      throw error
    }
  }

  /**
   * Load current draft
   */
  function loadDraft(): StoredDraftData | null {
    try {
      const stored = localStorage.getItem(CURRENT_DRAFT_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Error loading draft:', error)
      return null
    }
  }

  /**
   * Clear current draft
   */
  function clearDraft(): void {
    try {
      localStorage.removeItem(CURRENT_DRAFT_KEY)
    } catch (error) {
      console.error('Error clearing draft:', error)
      throw error
    }
  }

  /**
   * Generate next receipt number for current year
   * Format: RR-YYYY-NNN
   */
  function generateReceiptNumber(): string {
    const currentYear = new Date().getFullYear()
    const counterKey = `${RECEIPT_COUNTER_KEY}_${currentYear}`

    try {
      // Get current counter for this year
      const stored = localStorage.getItem(counterKey)
      const currentCounter = stored ? parseInt(stored, 10) : 0

      // Increment counter
      const nextNumber = currentCounter + 1
      localStorage.setItem(counterKey, nextNumber.toString())

      // Generate receipt number with zero padding
      const paddedNumber = String(nextNumber).padStart(3, '0')
      return `${RECEIPT_PREFIX}-${currentYear}-${paddedNumber}`
    } catch (error) {
      console.error('Error generating receipt number:', error)
      // Fallback to default
      return `${RECEIPT_PREFIX}-${currentYear}-001`
    }
  }

  /**
   * Generate a simple UUID v4
   * Fallback for environments without crypto.randomUUID()
   */
  function generateUUID(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    // Fallback UUID v4 generation
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  /**
   * Save a completed receipt
   */
  function saveReceipt(
    data: Omit<StoredReceiptData, 'id' | 'createdAt' | 'receiptNumber'>,
  ): StoredReceiptData {
    try {
      const receiptNumber = generateReceiptNumber()
      const id = generateUUID()

      const receiptData: StoredReceiptData = {
        id,
        receiptNumber,
        ...data,
        createdAt: new Date().toISOString(),
      }

      // Get existing receipts
      const receipts = getAllReceipts()
      receipts.push(receiptData)

      // Save back to localStorage
      localStorage.setItem(RECEIPTS_KEY, JSON.stringify(receipts))

      return receiptData
    } catch (error) {
      console.error('Error saving receipt:', error)
      throw error
    }
  }

  /**
   * Get a receipt by ID
   */
  function getReceipt(id: string): StoredReceiptData | null {
    try {
      const receipts = getAllReceipts()
      return receipts.find((r) => r.id === id) || null
    } catch (error) {
      console.error('Error getting receipt:', error)
      return null
    }
  }

  /**
   * Get all receipts (for future history feature)
   */
  function getAllReceipts(): StoredReceiptData[] {
    try {
      const stored = localStorage.getItem(RECEIPTS_KEY)
      if (!stored) return []

      const receipts = JSON.parse(stored) as StoredReceiptData[]

      // Sort by creation date descending
      return receipts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    } catch (error) {
      console.error('Error getting receipts:', error)
      return []
    }
  }

  /**
   * Delete a receipt
   */
  function deleteReceipt(id: string): void {
    try {
      const receipts = getAllReceipts()
      const filtered = receipts.filter((r) => r.id !== id)
      localStorage.setItem(RECEIPTS_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error('Error deleting receipt:', error)
      throw error
    }
  }

  /**
   * Clear all data (for testing or user reset)
   */
  function clearAll(): void {
    try {
      localStorage.removeItem(CURRENT_DRAFT_KEY)
      localStorage.removeItem(RECEIPTS_KEY)

      // Clear current year counter (most common case)
      const currentYear = new Date().getFullYear()
      localStorage.removeItem(`${RECEIPT_COUNTER_KEY}_${currentYear}`)

      // Clear other year counters if they exist
      // Only check keys that match our pattern to avoid iterating all storage
      const keysToCheck = [
        `${RECEIPT_COUNTER_KEY}_${currentYear - 1}`,
        `${RECEIPT_COUNTER_KEY}_${currentYear + 1}`,
      ]

      keysToCheck.forEach((key) => {
        if (localStorage.getItem(key) !== null) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Error clearing all data:', error)
      throw error
    }
  }

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    generateReceiptNumber,
    saveReceipt,
    getReceipt,
    getAllReceipts,
    deleteReceipt,
    clearAll,
  }
}
