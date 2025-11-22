/**
 * Simple toast notification composable
 */

import { ref } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration: number
}

const toasts = ref<Toast[]>([])
let nextId = 1

export function useToast() {
  function showToast(message: string, type: Toast['type'] = 'info', duration: number = 3000) {
    const toast: Toast = {
      id: nextId++,
      message,
      type,
      duration,
    }

    toasts.value.push(toast)

    // Auto-remove after duration
    setTimeout(() => {
      removeToast(toast.id)
    }, duration)

    return toast.id
  }

  function removeToast(id: number) {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  function success(message: string, duration?: number) {
    return showToast(message, 'success', duration)
  }

  function error(message: string, duration?: number) {
    return showToast(message, 'error', duration)
  }

  function info(message: string, duration?: number) {
    return showToast(message, 'info', duration)
  }

  function warning(message: string, duration?: number) {
    return showToast(message, 'warning', duration)
  }

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
    warning,
  }
}
