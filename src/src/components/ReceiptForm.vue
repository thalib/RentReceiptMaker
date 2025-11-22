<template>
  <div class="w-100 container px-3 py-4 py-md-5" style="max-width: 56rem;">
    <h2 class="display-6 display-md-5 fw-bold text-dark mb-4 text-center">Rent Receipt Generator</h2>
    
    <!-- Auto-generated Receipt Number -->
    <div v-if="receiptNumber" class="bg-light border border-secondary rounded p-3 mb-4 d-flex justify-content-between align-items-center">
      <label class="fw-medium text-dark">Receipt Number:</label>
      <span class="fw-semibold text-dark font-monospace">{{ receiptNumber }}</span>
    </div>

    <form @submit.prevent="handleGenerate" class="vstack gap-4">
      <!-- Owner (Landlord) Section -->
      <section class="bg-white rounded shadow-sm border border-secondary-subtle p-3 p-md-4">
        <h3 class="fs-4 fw-semibold text-dark mb-3 pb-2 border-bottom border-2 border-secondary-subtle">Owner Information</h3>
        
        <div class="vstack gap-3">
          <div class="position-relative">
            <label for="landlordName" class="form-label fw-medium">
              Owner Name <span class="text-danger">*</span>
            </label>
            <div class="position-relative">
              <input
                id="landlordName"
                v-model="formData.landlordName"
                type="text"
                placeholder="Enter owner name"
                required
                aria-required="true"
                class="form-control"
              />
              <span v-if="formData.landlordName.trim()" class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5" aria-label="Saved">✓</span>
            </div>
          </div>

          <div class="position-relative">
            <label for="landlordPAN" class="form-label fw-medium">
              Owner PAN Number <span class="text-danger">*</span>
            </label>
            <div class="position-relative">
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
                class="form-control text-uppercase"
              />
              <span v-if="formData.landlordPAN.length === 10" class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5" aria-label="Saved">✓</span>
            </div>
            <small id="pan-help" class="form-text text-muted d-block mt-1">
              Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
            </small>
          </div>

          <div class="position-relative">
            <label for="landlordAddress" class="form-label fw-medium">
              Owner Address <span class="text-danger">*</span>
            </label>
            <div class="position-relative">
              <textarea
                id="landlordAddress"
                v-model="formData.landlordAddress"
                rows="3"
                placeholder="Enter complete address"
                required
                aria-required="true"
                class="form-control"
                style="resize: none;"
              ></textarea>
              <span v-if="formData.landlordAddress.trim()" class="position-absolute top-0 end-0 translate-middle-y pe-3 mt-3 text-success fs-5" aria-label="Saved">✓</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tenant Section -->
      <section class="bg-white rounded shadow-sm border border-secondary-subtle p-3 p-md-4">
        <h3 class="fs-4 fw-semibold text-dark mb-3 pb-2 border-bottom border-2 border-secondary-subtle">Tenant Information</h3>
        
        <div class="vstack gap-3">
          <div class="position-relative">
            <label for="tenantName" class="form-label fw-medium">
              Tenant Name <span class="text-danger">*</span>
            </label>
            <div class="position-relative">
              <input
                id="tenantName"
                v-model="formData.tenantName"
                type="text"
                placeholder="Enter tenant name"
                required
                aria-required="true"
                class="form-control"
              />
              <span v-if="formData.tenantName.trim()" class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5" aria-label="Saved">✓</span>
            </div>
          </div>

          <div class="position-relative">
            <label for="propertyAddress" class="form-label fw-medium">
              Property Address <span class="text-danger">*</span>
            </label>
            <div class="position-relative">
              <textarea
                id="propertyAddress"
                v-model="formData.propertyAddress"
                rows="3"
                placeholder="Enter rental property address"
                required
                aria-required="true"
                class="form-control"
                style="resize: none;"
              ></textarea>
              <span v-if="formData.propertyAddress.trim()" class="position-absolute top-0 end-0 translate-middle-y pe-3 mt-3 text-success fs-5" aria-label="Saved">✓</span>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-12 col-md-6 position-relative">
              <label for="rentalPeriodStart" class="form-label fw-medium">
                Period Start <span class="text-danger">*</span>
              </label>
              <div class="position-relative">
                <input
                  id="rentalPeriodStart"
                  v-model="formData.rentalPeriodStart"
                  type="date"
                  required
                  aria-required="true"
                  class="form-control"
                />
                <span v-if="formData.rentalPeriodStart" class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5" aria-label="Saved">✓</span>
              </div>
            </div>

            <div class="col-12 col-md-6 position-relative">
              <label for="rentalPeriodEnd" class="form-label fw-medium">
                Period End <span class="text-danger">*</span>
              </label>
              <div class="position-relative">
                <input
                  id="rentalPeriodEnd"
                  v-model="formData.rentalPeriodEnd"
                  type="date"
                  required
                  aria-required="true"
                  class="form-control"
                />
                <span v-if="formData.rentalPeriodEnd" class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5" aria-label="Saved">✓</span>
              </div>
            </div>
          </div>

          <div class="position-relative">
            <label for="paymentDate" class="form-label fw-medium">
              Payment Date <span class="text-danger">*</span>
            </label>
            <div class="position-relative">
              <input
                id="paymentDate"
                v-model="formData.paymentDate"
                type="date"
                required
                aria-required="true"
                class="form-control"
              />
              <span v-if="formData.paymentDate" class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5" aria-label="Saved">✓</span>
            </div>
          </div>

          <div class="position-relative">
            <label for="rentAmount" class="form-label fw-medium">
              Rent Amount (₹) <span class="text-danger">*</span>
            </label>
            <div class="position-relative">
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
                class="form-control"
              />
              <span v-if="formData.rentAmount && formData.rentAmount > 0" class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5" aria-label="Saved">✓</span>
            </div>
            <small id="rent-help" class="form-text text-warning fw-medium d-block mt-1" v-if="showRevenueStampNotice">
              ⚠️ Revenue stamp required for rent above ₹5,000/month
            </small>
          </div>

          <div class="position-relative">
            <label for="paymentMode" class="form-label fw-medium">
              Payment Mode <span class="text-danger">*</span>
            </label>
            <div class="position-relative">
              <select
                id="paymentMode"
                v-model="formData.paymentMode"
                required
                aria-required="true"
                class="form-select"
              >
                <option v-for="mode in PAYMENT_MODES" :key="mode" :value="mode">
                  {{ mode }}
                </option>
              </select>
              <span v-if="formData.paymentMode" class="position-absolute top-50 end-0 translate-middle-y pe-5 text-success fs-5" style="pointer-events: none;" aria-label="Saved">✓</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Preview Button and Actions -->
      <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
        <button
          v-if="!hasGenerated"
          type="submit"
          :disabled="!isFormValid"
          class="btn btn-warning btn-lg w-100 w-sm-auto px-4 py-2 fw-semibold shadow form-btn-hover"
        >
          Preview Receipt
        </button>
        
        <button
          v-if="hasGenerated"
          type="button"
          @click="handleClear"
          :disabled="!hasData"
          class="btn btn-secondary btn-lg w-100 w-sm-auto px-4 py-2 fw-semibold"
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

<style scoped>
.form-btn-hover:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

@media (min-width: 576px) {
  .w-sm-auto {
    width: auto !important;
  }
}
</style>
