/**
 * Pinia store for receipt form state
 * Now uses localStorage for persistence instead of RxDB
 */

import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { FormData } from '../types/receipt';
import type { PaymentMode } from '../utils/constants';
import { useLocalStorage } from '../composables/useLocalStorage';

export const useReceiptStore = defineStore('receipt', () => {
  const storage = useLocalStorage();

  // Form state
  const formData = ref<FormData>({
    tenantName: '',
    landlordName: '',
    landlordAddress: '',
    landlordPAN: '',
    rentAmount: null,
    rentalPeriodStart: '',
    rentalPeriodEnd: '',
    paymentDate: '',
    propertyAddress: '',
    paymentMode: 'Cash' as PaymentMode,
  });

  // Validation state
  const isValid = ref(false);
  const errors = ref<Record<string, string>>({});

  // Receipt number (will be generated when saving)
  const receiptNumber = ref<string>('');

  // Load draft on initialization
  const loadDraft = () => {
    const draft = storage.loadDraft();
    if (draft) {
      formData.value = {
        tenantName: draft.tenantName,
        landlordName: draft.landlordName,
        landlordAddress: draft.landlordAddress,
        landlordPAN: draft.landlordPAN,
        rentAmount: draft.rentAmount,
        rentalPeriodStart: draft.rentalPeriodStart,
        rentalPeriodEnd: draft.rentalPeriodEnd,
        paymentDate: draft.paymentDate,
        propertyAddress: draft.propertyAddress,
        paymentMode: draft.paymentMode as PaymentMode,
      };
    }
  };

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
        });
      }
    },
    { deep: true }
  );

  // Computed: Check if form has any data
  const hasData = computed(() => {
    return (
      formData.value.tenantName.trim() !== '' ||
      formData.value.landlordName.trim() !== '' ||
      formData.value.landlordAddress.trim() !== '' ||
      formData.value.landlordPAN.trim() !== '' ||
      (formData.value.rentAmount !== null && formData.value.rentAmount > 0) ||
      formData.value.rentalPeriodStart !== '' ||
      formData.value.rentalPeriodEnd !== '' ||
      formData.value.paymentDate !== '' ||
      formData.value.propertyAddress.trim() !== ''
    );
  });

  // Actions
  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    formData.value[field] = value;
  }

  function setFormData(data: Partial<FormData>) {
    formData.value = {
      ...formData.value,
      ...data,
    };
  }

  function clearForm() {
    formData.value = {
      tenantName: '',
      landlordName: '',
      landlordAddress: '',
      landlordPAN: '',
      rentAmount: null,
      rentalPeriodStart: '',
      rentalPeriodEnd: '',
      paymentDate: '',
      propertyAddress: '',
      paymentMode: 'Cash' as PaymentMode,
    };
    errors.value = {};
    isValid.value = false;
    storage.clearDraft();
  }

  function setValidation(valid: boolean, fieldErrors: Record<string, string> = {}) {
    isValid.value = valid;
    errors.value = fieldErrors;
  }

  function setReceiptNumber(number: string) {
    receiptNumber.value = number;
  }

  // Initialize by loading draft
  loadDraft();

  return {
    // State
    formData,
    isValid,
    errors,
    receiptNumber,
    // Computed
    hasData,
    // Actions
    updateField,
    setFormData,
    clearForm,
    setValidation,
    setReceiptNumber,
    loadDraft,
  };
});
