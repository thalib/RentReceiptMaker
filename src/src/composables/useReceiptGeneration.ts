/**
 * Composable for receipt generation workflow
 */

import { useLocalStorage } from './useLocalStorage'
import { useCanvasExport } from './useCanvasExport'
import type { FormData } from '../types/receipt'

export function useReceiptGeneration() {
  const storage = useLocalStorage()
  const { exportAndDownload, canvasToDataURL } = useCanvasExport()

  /**
   * Validate form data before generation
   */
  function validateFormData(formData: FormData): boolean {
    return (
      formData.tenantName.trim() !== '' &&
      formData.landlordName.trim() !== '' &&
      formData.landlordAddress.trim() !== '' &&
      formData.landlordPAN.length === 10 &&
      formData.propertyAddress.trim() !== '' &&
      formData.rentAmount !== null &&
      formData.rentAmount > 0 &&
      formData.rentalPeriodStart !== '' &&
      formData.rentalPeriodEnd !== '' &&
      formData.paymentDate !== ''
    )
  }

  /**
   * Generate and save receipt
   * Returns true if successful, false otherwise
   */
  async function generateReceipt(
    formData: FormData,
    canvasElement: HTMLCanvasElement,
    autoDownload: boolean = true,
  ): Promise<boolean> {
    try {
      // Validate form data
      if (!validateFormData(formData)) {
        throw new Error('Form validation failed')
      }

      // Generate data URL for storage (optional)
      const imageDataUrl = canvasToDataURL(canvasElement)

      // Save receipt to localStorage
      const savedReceipt = storage.saveReceipt({
        tenantName: formData.tenantName,
        landlordName: formData.landlordName,
        landlordAddress: formData.landlordAddress,
        landlordPAN: formData.landlordPAN,
        rentAmount: formData.rentAmount!,
        rentalPeriodStart: formData.rentalPeriodStart,
        rentalPeriodEnd: formData.rentalPeriodEnd,
        paymentDate: formData.paymentDate,
        propertyAddress: formData.propertyAddress,
        paymentMode: formData.paymentMode,
        imageDataUrl,
      })

      // Auto-download if requested
      if (autoDownload) {
        await exportAndDownload(canvasElement, savedReceipt.receiptNumber)
      }

      // Clear draft after successful generation
      storage.clearDraft()

      return true
    } catch (error) {
      console.error('Receipt generation failed:', error)
      return false
    }
  }

  /**
   * Generate receipt without saving to database (for preview/testing)
   */
  async function downloadReceiptOnly(
    canvasElement: HTMLCanvasElement,
    receiptNumber: string,
  ): Promise<boolean> {
    try {
      await exportAndDownload(canvasElement, receiptNumber)
      return true
    } catch (error) {
      console.error('Download failed:', error)
      return false
    }
  }

  return {
    validateFormData,
    generateReceipt,
    downloadReceiptOnly,
  }
}
