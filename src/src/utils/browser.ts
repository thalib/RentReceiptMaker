/**
 * Browser utility functions
 */

/**
 * Download a file from a blob
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  
  // Revoke object URL after a short delay to ensure download starts
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Check if IndexedDB is supported
 */
export function supportsIndexedDB(): boolean {
  return 'indexedDB' in window;
}

/**
 * Check if Canvas is supported
 */
export function supportsCanvas(): boolean {
  const canvas = document.createElement('canvas');
  return !!(canvas.getContext && canvas.getContext('2d'));
}

/**
 * Check if download attribute is supported
 */
export function supportsDownload(): boolean {
  const anchor = document.createElement('a');
  return 'download' in anchor;
}

/**
 * Check if local storage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get storage quota information
 */
export async function getStorageQuota(): Promise<{ usage: number; quota: number }> {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      usage: estimate.usage || 0,
      quota: estimate.quota || 0,
    };
  }
  return { usage: 0, quota: 0 };
}
