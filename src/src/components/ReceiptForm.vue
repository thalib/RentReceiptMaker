<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-6 md:py-8">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Rent Receipt Generator</h2>
    
    <!-- Auto-generated Receipt Number -->
    <div v-if="receiptNumber" class="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-6 flex justify-between items-center">
      <label class="font-medium text-gray-700">Receipt Number:</label>
      <span class="font-semibold text-gray-900 font-mono">{{ receiptNumber }}</span>
    </div>

    <form @submit.prevent="handleGenerate" class="space-y-6">
      <!-- Owner (Landlord) Section -->
      <section class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">Owner Information</h3>
        
        <div class="space-y-4">
          <div class="relative">
            <label for="landlordName" class="block font-medium text-gray-700 mb-1">
              Owner Name <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <input
                id="landlordName"
                v-model="formData.landlordName"
                type="text"
                placeholder="Enter owner name"
                required
                aria-required="true"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span v-if="formData.landlordName.trim()" class="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl" aria-label="Saved">✓</span>
            </div>
          </div>

          <div class="relative">
            <label for="landlordPAN" class="block font-medium text-gray-700 mb-1">
              Owner PAN Number <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <input
                id="landlordPAN"
                v-model="formData.landlordPAN"
                type="text"
                placeholder="AAAAA9999A"
                maxlength="10"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]"
                required
                aria-required="true"
                aria-describedby="pan-help"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase"
              />
              <span v-if="formData.landlordPAN.length === 10" class="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl" aria-label="Saved">✓</span>
            </div>
            <small id="pan-help" class="block mt-1 text-sm text-gray-600">
              Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
            </small>
          </div>

          <div class="relative">
            <label for="landlordAddress" class="block font-medium text-gray-700 mb-1">
              Owner Address <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <textarea
                id="landlordAddress"
                v-model="formData.landlordAddress"
                rows="3"
                placeholder="Enter complete address"
                required
                aria-required="true"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              ></textarea>
              <span v-if="formData.landlordAddress.trim()" class="absolute right-3 top-3 text-green-600 text-xl" aria-label="Saved">✓</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tenant Section -->
      <section class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">Tenant Information</h3>
        
        <div class="space-y-4">
          <div class="relative">
            <label for="tenantName" class="block font-medium text-gray-700 mb-1">
              Tenant Name <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <input
                id="tenantName"
                v-model="formData.tenantName"
                type="text"
                placeholder="Enter tenant name"
                required
                aria-required="true"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span v-if="formData.tenantName.trim()" class="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl" aria-label="Saved">✓</span>
            </div>
          </div>

          <div class="relative">
            <label for="propertyAddress" class="block font-medium text-gray-700 mb-1">
              Property Address <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <textarea
                id="propertyAddress"
                v-model="formData.propertyAddress"
                rows="3"
                placeholder="Enter rental property address"
                required
                aria-required="true"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              ></textarea>
              <span v-if="formData.propertyAddress.trim()" class="absolute right-3 top-3 text-green-600 text-xl" aria-label="Saved">✓</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="relative">
              <label for="rentalPeriodStart" class="block font-medium text-gray-700 mb-1">
                Period Start <span class="text-red-600">*</span>
              </label>
              <div class="relative">
                <input
                  id="rentalPeriodStart"
                  v-model="formData.rentalPeriodStart"
                  type="date"
                  required
                  aria-required="true"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <span v-if="formData.rentalPeriodStart" class="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl" aria-label="Saved">✓</span>
              </div>
            </div>

            <div class="relative">
              <label for="rentalPeriodEnd" class="block font-medium text-gray-700 mb-1">
                Period End <span class="text-red-600">*</span>
              </label>
              <div class="relative">
                <input
                  id="rentalPeriodEnd"
                  v-model="formData.rentalPeriodEnd"
                  type="date"
                  required
                  aria-required="true"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <span v-if="formData.rentalPeriodEnd" class="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl" aria-label="Saved">✓</span>
              </div>
            </div>
          </div>

          <div class="relative">
            <label for="paymentDate" class="block font-medium text-gray-700 mb-1">
              Payment Date <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <input
                id="paymentDate"
                v-model="formData.paymentDate"
                type="date"
                required
                aria-required="true"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span v-if="formData.paymentDate" class="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl" aria-label="Saved">✓</span>
            </div>
          </div>

          <div class="relative">
            <label for="rentAmount" class="block font-medium text-gray-700 mb-1">
              Rent Amount (₹) <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <input
                id="rentAmount"
                v-model.number="formData.rentAmount"
                type="number"
                min="1"
                step="0.01"
                placeholder="Enter rent amount"
                required
                aria-required="true"
                aria-describedby="rent-help"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span v-if="formData.rentAmount && formData.rentAmount > 0" class="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl" aria-label="Saved">✓</span>
            </div>
            <small id="rent-help" class="block mt-1 text-sm text-amber-600 font-medium" v-if="showRevenueStampNotice">
              ⚠️ Revenue stamp required for rent above ₹5,000/month
            </small>
          </div>

          <div class="relative">
            <label for="paymentMode" class="block font-medium text-gray-700 mb-1">
              Payment Mode <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <select
                id="paymentMode"
                v-model="formData.paymentMode"
                required
                aria-required="true"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option v-for="mode in PAYMENT_MODES" :key="mode" :value="mode">
                  {{ mode }}
                </option>
              </select>
              <span v-if="formData.paymentMode" class="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl pointer-events-none" aria-label="Saved">✓</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Preview Button and Actions -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <button
          v-if="!hasGenerated"
          type="submit"
          :disabled="!isFormValid"
          class="w-full sm:w-auto px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg disabled:hover:shadow-md transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
        >
          Preview Receipt
        </button>
        
        <button
          v-if="hasGenerated"
          type="button"
          @click="handleClear"
          :disabled="!hasData"
          class="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          New Receipt
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useReceiptStore } from '../stores/receiptStore';
import { useLocalStorage } from '../composables/useLocalStorage';
import { PAYMENT_MODES, REVENUE_STAMP_THRESHOLD } from '../utils/constants';
import { isValidPAN } from '../utils/validation';

defineProps<{
  hasGenerated: boolean;
}>();

const emit = defineEmits<{
  generate: [];
  clear: [];
}>();

const receiptStore = useReceiptStore();
const { formData, hasData, receiptNumber } = storeToRefs(receiptStore);
const storage = useLocalStorage();

// Computed properties
const showRevenueStampNotice = computed(() => {
  return formData.value.rentAmount !== null && formData.value.rentAmount > REVENUE_STAMP_THRESHOLD;
});

const isFormValid = computed(() => {
  return (
    formData.value.tenantName.trim() !== '' &&
    formData.value.landlordName.trim() !== '' &&
    formData.value.landlordAddress.trim() !== '' &&
    isValidPAN(formData.value.landlordPAN) &&
    formData.value.propertyAddress.trim() !== '' &&
    formData.value.rentAmount !== null &&
    formData.value.rentAmount > 0 &&
    formData.value.rentalPeriodStart !== '' &&
    formData.value.rentalPeriodEnd !== '' &&
    formData.value.paymentDate !== ''
  );
});

// Load draft on mount and generate receipt number
onMounted(() => {
  try {
    // Draft is already loaded by receiptStore initialization
    // Just generate receipt number
    const number = storage.generateReceiptNumber();
    receiptStore.setReceiptNumber(number);
  } catch (error) {
    console.error('Failed to initialize form:', error);
  }
});

// Handle clear form
function handleClear() {
  if (confirm('Are you sure you want to start a new receipt? Current data will be cleared.')) {
    receiptStore.clearForm();
    emit('clear');
  }
}

// Handle generate receipt
function handleGenerate() {
  if (isFormValid.value) {
    emit('generate');
  }
}
</script>
