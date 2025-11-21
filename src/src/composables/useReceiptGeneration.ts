/**
 * Composable for receipt generation workflow
 */

import { useDatabase } from './useDatabase';
import { useCanvasExport } from './useCanvasExport';
import type { FormData } from '../types/receipt';

export function useReceiptGeneration() {
  const { saveReceipt, clearDraft } = useDatabase();
  const { exportAndDownload, canvasToDataURL } = useCanvasExport();

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
    );
  }

  /**
   * Generate and save receipt
   * Returns true if successful, false otherwise
   */
  async function generateReceipt(
    formData: FormData,
    canvasElement: HTMLCanvasElement,
    autoDownload: boolean = true
  ): Promise<boolean> {
    try {
      // Validate form data
      if (!validateFormData(formData)) {
        throw new Error('Form validation failed');
      }

      // Convert dates to Date objects
      const rentalPeriodStart = new Date(formData.rentalPeriodStart);
      const rentalPeriodEnd = new Date(formData.rentalPeriodEnd);
      const paymentDate = new Date(formData.paymentDate);

      // Generate data URL for storage (optional)
      const imageDataUrl = canvasToDataURL(canvasElement);

      // Save receipt to database
      const savedReceipt = await saveReceipt({
        tenantName: formData.tenantName,
        landlordName: formData.landlordName,
        landlordAddress: formData.landlordAddress,
        landlordPAN: formData.landlordPAN,
        rentAmount: formData.rentAmount!,
        rentalPeriodStart,
        rentalPeriodEnd,
        paymentDate,
        propertyAddress: formData.propertyAddress,
        paymentMode: formData.paymentMode,
        imageDataUrl,
      });

      // Auto-download if requested
      if (autoDownload) {
        await exportAndDownload(canvasElement, savedReceipt.receiptNumber);
      }

      // Clear draft after successful generation
      await clearDraft();

      return true;
    } catch (error) {
      console.error('Receipt generation failed:', error);
      return false;
    }
  }

  /**
   * Generate receipt without saving to database (for preview/testing)
   */
  async function downloadReceiptOnly(
    canvasElement: HTMLCanvasElement,
    receiptNumber: string
  ): Promise<boolean> {
    try {
      await exportAndDownload(canvasElement, receiptNumber);
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      return false;
    }
  }

  return {
    validateFormData,
    generateReceipt,
    downloadReceiptOnly,
  };
}
