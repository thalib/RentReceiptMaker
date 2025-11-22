/**
 * Pinia store for receipt form state.
 * Now uses localStorage for persistence instead of RxDB.
 */

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { FormData } from '../types/receipt'
import type { PaymentMode } from '../utils/constants'
import { useLocalStorage } from '../composables/useLocalStorage'
import {
  getFirstDayOfPreviousMonth,
  getLastDayOfPreviousMonth,
  getPreviousMonth,
  getTodayDate,
  generateDefaultReceiptNumber,
} from '../utils/date'

export const useReceiptStore = defineStore('receipt', () => {
  const storage = useLocalStorage()

  // Form state with defaults
  const formData = ref<FormData>({
    tenantName: '',
    landlordName: '',
    landlordAddress: '',
    landlordPAN: '',
    rentAmount: null,
    rentalPeriodStart: getFirstDayOfPreviousMonth(),
    rentalPeriodEnd: getLastDayOfPreviousMonth(),
    rentalPeriodMonth: getPreviousMonth(),
    paymentDate: getTodayDate(),
    propertyAddress: '',
    paymentMode: 'Cash' as PaymentMode,
    receiptNumber: generateDefaultReceiptNumber(),
    useReceiptNumber: true,
    isMultiMonth: true,
  })

  // Validation state
  const isValid = ref(false)
  const errors = ref<Record<string, string>>({})

  // Load draft on initialization
  const loadDraft = () => {
    const draft = storage.loadDraft()
    if (draft) {
      const extendedDraft = draft as DraftData & {
        rentalPeriodMonth?: string
        receiptNumber?: string
        useReceiptNumber?: boolean
        isMultiMonth?: boolean
      }

      formData.value = {
        tenantName: draft.tenantName,
        landlordName: draft.landlordName,
        landlordAddress: draft.landlordAddress,
        landlordPAN: draft.landlordPAN,
        rentAmount: draft.rentAmount,
        rentalPeriodStart: draft.rentalPeriodStart,
        rentalPeriodEnd: draft.rentalPeriodEnd,
        rentalPeriodMonth: extendedDraft.rentalPeriodMonth || getPreviousMonth(),
        paymentDate: draft.paymentDate,
        propertyAddress: draft.propertyAddress,
        paymentMode: draft.paymentMode as PaymentMode,
        receiptNumber: extendedDraft.receiptNumber || generateDefaultReceiptNumber(),
        useReceiptNumber: extendedDraft.useReceiptNumber ?? true,
        isMultiMonth: extendedDraft.isMultiMonth ?? true,
      }
    }
  }

  // Auto-save draft when form data changes
  watch(
    formData,
    (newData) => {
      if (hasData.value) {
        storage.saveDraft({
          tenantName: newData.tenantName,
          landlordName: newData.landlordName,
          landlordAddress: newData.landlordAddress,
          landlordPAN: newData.landlordPAN,
          rentAmount: newData.rentAmount || 0,
          rentalPeriodStart: newData.rentalPeriodStart,
          rentalPeriodEnd: newData.rentalPeriodEnd,
          paymentDate: newData.paymentDate,
          propertyAddress: newData.propertyAddress,
          paymentMode: newData.paymentMode,
        })
      }
    },
    { deep: true },
  )

  // Computed: Check if form has any data (beyond defaults)
  const hasData = computed(() => {
    return (
      formData.value.tenantName.trim() !== '' ||
      formData.value.landlordName.trim() !== '' ||
      formData.value.landlordAddress.trim() !== '' ||
      formData.value.landlordPAN.trim() !== '' ||
      (formData.value.rentAmount !== null && formData.value.rentAmount > 0) ||
      formData.value.propertyAddress.trim() !== ''
    )
  })

  // Actions
  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    formData.value[field] = value
  }

  function setFormData(data: Partial<FormData>) {
    formData.value = {
      ...formData.value,
      ...data,
    }
  }

  function clearForm() {
    formData.value = {
      tenantName: '',
      landlordName: '',
      landlordAddress: '',
      landlordPAN: '',
      rentAmount: null,
      rentalPeriodStart: getFirstDayOfPreviousMonth(),
      rentalPeriodEnd: getLastDayOfPreviousMonth(),
      rentalPeriodMonth: getPreviousMonth(),
      paymentDate: getTodayDate(),
      propertyAddress: '',
      paymentMode: 'Cash' as PaymentMode,
      receiptNumber: generateDefaultReceiptNumber(),
      useReceiptNumber: true,
      isMultiMonth: true,
    }
    errors.value = {}
    isValid.value = false
    storage.clearDraft()
  }

  function setValidation(valid: boolean, fieldErrors: Record<string, string> = {}) {
    isValid.value = valid
    errors.value = fieldErrors
  }

  // Initialize by loading draft
  loadDraft()

  return {
    // State
    formData,
    isValid,
    errors,
    // Computed
    hasData,
    // Actions
    updateField,
    setFormData,
    clearForm,
    setValidation,
    loadDraft,
  }
})
