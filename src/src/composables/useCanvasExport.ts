/**
 * Composable for exporting canvas to image
 */

import { downloadFile } from '../utils/browser'

export function useCanvasExport() {
  /**
   * Export canvas as PNG blob
   */
  async function canvasToPNG(
    canvas: HTMLCanvasElement,
    quality: number = 1.0,
  ): Promise<Blob | null> {
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob)
        },
        'image/png',
        quality,
      )
    })
  }

  /**
   * Generate filename for receipt
   * Format: Receipt-[Number]-[Date].png
   */
  function generateFilename(receiptNumber: string): string {
    const date = new Date().toISOString().split('T')[0]
    const sanitizedNumber = receiptNumber.replace(/[^a-zA-Z0-9-]/g, '_')
    return `Receipt-${sanitizedNumber}-${date}.png`
  }

  /**
   * Export canvas and trigger download
   */
  async function exportAndDownload(
    canvas: HTMLCanvasElement,
    receiptNumber: string,
  ): Promise<boolean> {
    try {
      const blob = await canvasToPNG(canvas)
      if (!blob) {
        console.error('Failed to generate PNG blob')
        return false
      }

      const filename = generateFilename(receiptNumber)
      downloadFile(blob, filename)
      return true
    } catch (error) {
      console.error('Failed to export canvas:', error)
      return false
    }
  }

  /**
   * Get data URL from canvas
   */
  function canvasToDataURL(canvas: HTMLCanvasElement): string {
    return canvas.toDataURL('image/png', 1.0)
  }

  return {
    canvasToPNG,
    generateFilename,
    exportAndDownload,
    canvasToDataURL,
  }
}
