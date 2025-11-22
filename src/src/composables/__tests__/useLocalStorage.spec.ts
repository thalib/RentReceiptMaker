import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('Draft Operations', () => {
    it('should save a draft', () => {
      const storage = useLocalStorage()

      storage.saveDraft({
        tenantName: 'John Doe',
        landlordName: 'Jane Smith',
        landlordAddress: '123 Main St',
        landlordPAN: 'ABCDE1234F',
        rentAmount: 15000,
        rentalPeriodStart: '2024-01-01',
        rentalPeriodEnd: '2024-01-31',
        paymentDate: '2024-01-05',
        propertyAddress: '456 Rent St',
        paymentMode: 'UPI',
      })

      const saved = localStorage.getItem('rent_receipt_draft')
      expect(saved).toBeTruthy()

      const parsed = JSON.parse(saved!)
      expect(parsed.tenantName).toBe('John Doe')
      expect(parsed.landlordName).toBe('Jane Smith')
      expect(parsed.updatedAt).toBeTruthy()
    })

    it('should load a draft', () => {
      const storage = useLocalStorage()
      const testData = {
        tenantName: 'Test Tenant',
        landlordName: 'Test Landlord',
        landlordAddress: '789 Test St',
        landlordPAN: 'PQRST5678U',
        rentAmount: 20000,
        rentalPeriodStart: '2024-02-01',
        rentalPeriodEnd: '2024-02-28',
        paymentDate: '2024-02-05',
        propertyAddress: '101 Property Ave',
        paymentMode: 'Cash',
      }

      storage.saveDraft(testData)
      const loaded = storage.loadDraft()

      expect(loaded).toBeTruthy()
      expect(loaded?.tenantName).toBe('Test Tenant')
      expect(loaded?.landlordName).toBe('Test Landlord')
      expect(loaded?.rentAmount).toBe(20000)
    })

    it('should return null when no draft exists', () => {
      const storage = useLocalStorage()
      const draft = storage.loadDraft()
      expect(draft).toBeNull()
    })

    it('should clear draft', () => {
      const storage = useLocalStorage()

      storage.saveDraft({
        tenantName: 'Test',
        landlordName: 'Test',
        landlordAddress: 'Test',
        landlordPAN: 'ABCDE1234F',
        rentAmount: 10000,
        rentalPeriodStart: '2024-01-01',
        rentalPeriodEnd: '2024-01-31',
        paymentDate: '2024-01-05',
        propertyAddress: 'Test',
        paymentMode: 'Cash',
      })

      storage.clearDraft()

      const draft = storage.loadDraft()
      expect(draft).toBeNull()
    })
  })

  describe('Receipt Number Generation', () => {
    it('should generate receipt number with correct format', () => {
      const storage = useLocalStorage()
      const receiptNumber = storage.generateReceiptNumber()

      const currentYear = new Date().getFullYear()
      expect(receiptNumber).toMatch(/^RR-\d{4}-\d{3}$/)
      expect(receiptNumber).toContain(`RR-${currentYear}-`)
    })

    it('should generate sequential receipt numbers', () => {
      const storage = useLocalStorage()

      const first = storage.generateReceiptNumber()
      const second = storage.generateReceiptNumber()
      const third = storage.generateReceiptNumber()

      expect(first).toContain('-001')
      expect(second).toContain('-002')
      expect(third).toContain('-003')
    })

    it('should pad receipt numbers correctly', () => {
      const storage = useLocalStorage()

      // Generate 10 receipt numbers
      for (let i = 0; i < 10; i++) {
        storage.generateReceiptNumber()
      }

      const last = storage.generateReceiptNumber()
      expect(last).toContain('-011')
    })
  })

  describe('Receipt Operations', () => {
    it('should save a receipt', () => {
      const storage = useLocalStorage()

      const receiptData = {
        tenantName: 'John Doe',
        landlordName: 'Jane Smith',
        landlordAddress: '123 Main St',
        landlordPAN: 'ABCDE1234F',
        rentAmount: 15000,
        rentalPeriodStart: '2024-01-01',
        rentalPeriodEnd: '2024-01-31',
        paymentDate: '2024-01-05',
        propertyAddress: '456 Rent St',
        paymentMode: 'UPI',
      }

      const saved = storage.saveReceipt(receiptData)

      expect(saved.id).toBeTruthy()
      expect(saved.receiptNumber).toBeTruthy()
      expect(saved.createdAt).toBeTruthy()
      expect(saved.tenantName).toBe('John Doe')
    })

    it('should retrieve all receipts', () => {
      const storage = useLocalStorage()

      storage.saveReceipt({
        tenantName: 'Tenant 1',
        landlordName: 'Landlord 1',
        landlordAddress: 'Address 1',
        landlordPAN: 'AAAAA1111A',
        rentAmount: 10000,
        rentalPeriodStart: '2024-01-01',
        rentalPeriodEnd: '2024-01-31',
        paymentDate: '2024-01-05',
        propertyAddress: 'Property 1',
        paymentMode: 'Cash',
      })

      storage.saveReceipt({
        tenantName: 'Tenant 2',
        landlordName: 'Landlord 2',
        landlordAddress: 'Address 2',
        landlordPAN: 'BBBBB2222B',
        rentAmount: 20000,
        rentalPeriodStart: '2024-02-01',
        rentalPeriodEnd: '2024-02-28',
        paymentDate: '2024-02-05',
        propertyAddress: 'Property 2',
        paymentMode: 'UPI',
      })

      const receipts = storage.getAllReceipts()
      expect(receipts).toHaveLength(2)
      // Verify both receipts are present (order may vary based on timestamp)
      const tenantNames = receipts.map((r) => r.tenantName)
      expect(tenantNames).toContain('Tenant 1')
      expect(tenantNames).toContain('Tenant 2')
    })

    it('should get a receipt by ID', () => {
      const storage = useLocalStorage()

      const saved = storage.saveReceipt({
        tenantName: 'Test Tenant',
        landlordName: 'Test Landlord',
        landlordAddress: 'Test Address',
        landlordPAN: 'TTTTT9999T',
        rentAmount: 15000,
        rentalPeriodStart: '2024-03-01',
        rentalPeriodEnd: '2024-03-31',
        paymentDate: '2024-03-05',
        propertyAddress: 'Test Property',
        paymentMode: 'Online Transfer',
      })

      const retrieved = storage.getReceipt(saved.id)
      expect(retrieved).toBeTruthy()
      expect(retrieved?.id).toBe(saved.id)
      expect(retrieved?.tenantName).toBe('Test Tenant')
    })

    it('should return null for non-existent receipt', () => {
      const storage = useLocalStorage()
      const receipt = storage.getReceipt('non-existent-id')
      expect(receipt).toBeNull()
    })

    it('should delete a receipt', () => {
      const storage = useLocalStorage()

      const saved = storage.saveReceipt({
        tenantName: 'Delete Me',
        landlordName: 'Test Landlord',
        landlordAddress: 'Test Address',
        landlordPAN: 'DDDDD9999D',
        rentAmount: 12000,
        rentalPeriodStart: '2024-04-01',
        rentalPeriodEnd: '2024-04-30',
        paymentDate: '2024-04-05',
        propertyAddress: 'Test Property',
        paymentMode: 'Cheque',
      })

      let receipts = storage.getAllReceipts()
      expect(receipts).toHaveLength(1)

      storage.deleteReceipt(saved.id)

      receipts = storage.getAllReceipts()
      expect(receipts).toHaveLength(0)
    })
  })

  describe('Clear All', () => {
    it('should clear all data', () => {
      const storage = useLocalStorage()

      // Save draft
      storage.saveDraft({
        tenantName: 'Test',
        landlordName: 'Test',
        landlordAddress: 'Test',
        landlordPAN: 'TTTTT1111T',
        rentAmount: 10000,
        rentalPeriodStart: '2024-01-01',
        rentalPeriodEnd: '2024-01-31',
        paymentDate: '2024-01-05',
        propertyAddress: 'Test',
        paymentMode: 'Cash',
      })

      // Save receipts
      storage.saveReceipt({
        tenantName: 'Receipt 1',
        landlordName: 'Test',
        landlordAddress: 'Test',
        landlordPAN: 'TTTTT2222T',
        rentAmount: 15000,
        rentalPeriodStart: '2024-02-01',
        rentalPeriodEnd: '2024-02-28',
        paymentDate: '2024-02-05',
        propertyAddress: 'Test',
        paymentMode: 'UPI',
      })

      // Clear all
      storage.clearAll()

      // Verify everything is cleared
      expect(storage.loadDraft()).toBeNull()
      expect(storage.getAllReceipts()).toHaveLength(0)
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', () => {
      const storage = useLocalStorage()

      // Mock localStorage to throw error
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
      setItemSpy.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })

      expect(() => {
        storage.saveDraft({
          tenantName: 'Test',
          landlordName: 'Test',
          landlordAddress: 'Test',
          landlordPAN: 'TTTTT3333T',
          rentAmount: 10000,
          rentalPeriodStart: '2024-01-01',
          rentalPeriodEnd: '2024-01-31',
          paymentDate: '2024-01-05',
          propertyAddress: 'Test',
          paymentMode: 'Cash',
        })
      }).toThrow()

      setItemSpy.mockRestore()
    })

    it('should return null on parse errors when loading draft', () => {
      const storage = useLocalStorage()

      // Store invalid JSON
      localStorage.setItem('rent_receipt_draft', 'invalid json')

      const draft = storage.loadDraft()
      expect(draft).toBeNull()
    })
  })
})
