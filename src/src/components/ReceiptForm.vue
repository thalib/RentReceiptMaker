<template>
  <div class="receipt-form">
    <h2 class="form-title">Rent Receipt Generator</h2>
    
    <!-- Auto-generated Receipt Number -->
    <div class="receipt-number" v-if="receiptNumber">
      <label>Receipt Number:</label>
      <span class="number">{{ receiptNumber }}</span>
    </div>

    <form @submit.prevent="handleGenerate">
      <!-- Tenant Information -->
      <section class="form-section">
        <h3 class="section-title">Tenant Information</h3>
        
        <div class="form-field">
          <label for="tenantName">Tenant Name <span class="required">*</span></label>
          <input
            id="tenantName"
            v-model="formData.tenantName"
            type="text"
            placeholder="Enter tenant name"
            required
            aria-required="true"
          />
        </div>
      </section>

      <!-- Landlord Information -->
      <section class="form-section">
        <h3 class="section-title">Landlord Information</h3>
        
        <div class="form-field">
          <label for="landlordName">Landlord Name <span class="required">*</span></label>
          <input
            id="landlordName"
            v-model="formData.landlordName"
            type="text"
            placeholder="Enter landlord name"
            required
            aria-required="true"
          />
        </div>

        <div class="form-field">
          <label for="landlordAddress">Landlord Address <span class="required">*</span></label>
          <textarea
            id="landlordAddress"
            v-model="formData.landlordAddress"
            rows="3"
            placeholder="Enter complete address"
            required
            aria-required="true"
          ></textarea>
        </div>

        <div class="form-field">
          <label for="landlordPAN">Landlord PAN Number <span class="required">*</span></label>
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
          />
          <small id="pan-help" class="help-text">
            Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
          </small>
        </div>
      </section>

      <!-- Property Information -->
      <section class="form-section">
        <h3 class="section-title">Property Information</h3>
        
        <div class="form-field">
          <label for="propertyAddress">Property Address <span class="required">*</span></label>
          <textarea
            id="propertyAddress"
            v-model="formData.propertyAddress"
            rows="3"
            placeholder="Enter rental property address"
            required
            aria-required="true"
          ></textarea>
        </div>
      </section>

      <!-- Payment Information -->
      <section class="form-section">
        <h3 class="section-title">Payment Information</h3>
        
        <div class="form-field">
          <label for="rentAmount">Rent Amount (₹) <span class="required">*</span></label>
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
          />
          <small id="rent-help" class="help-text" v-if="showRevenueStampNotice">
            ⚠️ Revenue stamp required for rent above ₹5,000/month
          </small>
        </div>

        <div class="form-field">
          <label for="rentalPeriodStart">Rental Period Start <span class="required">*</span></label>
          <input
            id="rentalPeriodStart"
            v-model="formData.rentalPeriodStart"
            type="date"
            required
            aria-required="true"
          />
        </div>

        <div class="form-field">
          <label for="rentalPeriodEnd">Rental Period End <span class="required">*</span></label>
          <input
            id="rentalPeriodEnd"
            v-model="formData.rentalPeriodEnd"
            type="date"
            required
            aria-required="true"
          />
        </div>

        <div class="form-field">
          <label for="paymentDate">Payment Date <span class="required">*</span></label>
          <input
            id="paymentDate"
            v-model="formData.paymentDate"
            type="date"
            required
            aria-required="true"
          />
        </div>

        <div class="form-field">
          <label for="paymentMode">Payment Mode <span class="required">*</span></label>
          <select
            id="paymentMode"
            v-model="formData.paymentMode"
            required
            aria-required="true"
          >
            <option v-for="mode in PAYMENT_MODES" :key="mode" :value="mode">
              {{ mode }}
            </option>
          </select>
        </div>
      </section>

      <!-- Form Actions -->
      <div class="form-actions">
        <button
          type="button"
          class="btn btn-secondary"
          @click="handleClear"
          :disabled="!hasData"
        >
          Clear Form
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="!isFormValid"
        >
          Generate Receipt
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

const emit = defineEmits<{
  generate: [];
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
  if (confirm('Are you sure you want to clear the form? All unsaved data will be lost.')) {
    receiptStore.clearForm();
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
.receipt-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a202c;
}

.receipt-number {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.receipt-number label {
  font-weight: 500;
  color: #4a5568;
}

.receipt-number .number {
  font-weight: 600;
  color: #2d3748;
  font-family: monospace;
}

.form-section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.form-field {
  margin-bottom: 1rem;
}

.form-field label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #4a5568;
}

.required {
  color: #e53e3e;
}

.form-field input,
.form-field textarea,
.form-field select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.form-field input:invalid,
.form-field textarea:invalid {
  border-color: #fc8181;
}

.help-text {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #718096;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #4299e1;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #3182ce;
}

.btn-secondary {
  background: #e2e8f0;
  color: #2d3748;
}

.btn-secondary:hover:not(:disabled) {
  background: #cbd5e0;
}

@media (min-width: 768px) {
  .receipt-form {
    padding: 1.5rem;
  }
}
</style>
