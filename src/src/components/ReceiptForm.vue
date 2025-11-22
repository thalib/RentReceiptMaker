<template>
  <div class="container px-3 py-4 py-md-5" style="max-width: 56rem">
    <form @submit.prevent="handleGenerate" class="vstack gap-4">
      <!-- Receipt Number Section -->
      <section class="bg-white rounded shadow-sm border border-secondary-subtle p-3 p-md-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3 class="fs-5 fw-semibold text-dark mb-0">Receipt Number</h3>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="useReceiptNumberSwitch"
              v-model="formData.useReceiptNumber"
            />
            <label class="form-check-label" for="useReceiptNumberSwitch">
              {{ formData.useReceiptNumber ? 'Enabled' : 'Disabled' }}
            </label>
          </div>
        </div>

        <div v-if="formData.useReceiptNumber" class="position-relative">
          <input
            id="receiptNumber"
            v-model="formData.receiptNumber"
            type="text"
            placeholder="RR-YYYYMM-001"
            class="form-control font-monospace"
            aria-describedby="receipt-help"
          />
          <small id="receipt-help" class="form-text text-muted d-block mt-1">
            Format: RR-YYYYMM-NNN (e.g., RR-202410-001)
          </small>
        </div>
      </section>
      <!-- Owner Info Display (Compact) -->
      <OwnerInfoDisplay :owner-info="ownerInfo" @edit="openOwnerModal" />

      <!-- Tenant Section -->
      <section class="bg-white rounded shadow-sm border border-secondary-subtle p-3 p-md-4">
        <h3
          class="fs-4 fw-semibold text-dark mb-3 pb-2 border-bottom border-2 border-secondary-subtle"
        >
          Tenant Information
        </h3>

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
              <span
                v-if="formData.tenantName.trim()"
                class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5"
                aria-label="Saved"
                >✓</span
              >
            </div>
          </div>

          <div class="position-relative">
            <label for="propertyAddress" class="form-label fw-medium"> Property Address </label>
            <div class="position-relative">
              <textarea
                id="propertyAddress"
                v-model="formData.propertyAddress"
                rows="3"
                placeholder="Enter rental property address (Optional)"
                class="form-control"
                style="resize: none"
              ></textarea>
              <span
                v-if="formData.propertyAddress.trim()"
                class="position-absolute top-0 end-0 translate-middle-y pe-3 mt-3 text-success fs-5"
                aria-label="Saved"
                >✓</span
              >
            </div>
          </div>

          <!-- Rental Period Mode Toggle -->
          <div class="d-flex justify-content-between align-items-center">
            <label class="form-label fw-medium mb-0">Rental Period</label>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="isMultiMonthSwitch"
                v-model="formData.isMultiMonth"
                @change="handlePeriodModeChange"
              />
              <label class="form-check-label" for="isMultiMonthSwitch">
                {{ formData.isMultiMonth ? 'Multi-month' : 'Single month' }}
              </label>
            </div>
          </div>

          <!-- Single Month Mode -->
          <div v-if="!formData.isMultiMonth" class="position-relative">
            <label for="rentalPeriodMonth" class="form-label fw-medium">
              Month <span class="text-danger">*</span>
            </label>
            <div class="position-relative">
              <input
                id="rentalPeriodMonth"
                v-model="formData.rentalPeriodMonth"
                type="month"
                required
                aria-required="true"
                class="form-control"
                @change="handleMonthChange"
              />
              <span
                v-if="formData.rentalPeriodMonth"
                class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5"
                aria-label="Saved"
                >✓</span
              >
            </div>
          </div>

          <!-- Multi-Month Mode -->
          <div v-if="formData.isMultiMonth" class="row g-3">
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
                <span
                  v-if="formData.rentalPeriodStart"
                  class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5"
                  aria-label="Saved"
                  >✓</span
                >
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
                <span
                  v-if="formData.rentalPeriodEnd"
                  class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5"
                  aria-label="Saved"
                  >✓</span
                >
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
              <span
                v-if="formData.paymentDate"
                class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5"
                aria-label="Saved"
                >✓</span
              >
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
              <span
                v-if="formData.rentAmount && formData.rentAmount > 0"
                class="position-absolute top-50 end-0 translate-middle-y pe-3 text-success fs-5"
                aria-label="Saved"
                >✓</span
              >
            </div>
            <small
              id="rent-help"
              class="form-text text-warning fw-medium d-block mt-1"
              v-if="showRevenueStampNotice"
            >
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
              <span
                v-if="formData.paymentMode"
                class="position-absolute top-50 end-0 translate-middle-y pe-5 text-success fs-5"
                style="pointer-events: none"
                aria-label="Saved"
                >✓</span
              >
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
          class="btn btn-warning btn-lg px-4 py-2 fw-semibold shadow form-btn-hover"
          style="width: 100%; min-width: auto"
        >
          Preview Receipt
        </button>

        <button
          v-if="hasGenerated"
          type="button"
          @click="handleClear"
          :disabled="!hasData"
          class="btn btn-secondary btn-lg px-4 py-2 fw-semibold"
          style="width: 100%; min-width: auto"
        >
          New Receipt
        </button>
      </div>
    </form>

    <!-- Owner Info Modal -->
    <OwnerInfoModal :owner-info="ownerInfo" @save="handleOwnerSave" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Modal } from 'bootstrap'
import { useReceiptStore } from '../stores/receiptStore'
import { PAYMENT_MODES, REVENUE_STAMP_THRESHOLD } from '../utils/constants'
import { isValidPAN } from '../utils/validation'
import { monthToDateRange } from '../utils/date'
import OwnerInfoDisplay from './OwnerInfoDisplay.vue'
import OwnerInfoModal from './OwnerInfoModal.vue'
import type { OwnerInfo } from './OwnerInfoModal.vue'

defineProps<{
  hasGenerated: boolean
}>()

const emit = defineEmits<{
  generate: []
  clear: []
}>()

const receiptStore = useReceiptStore()
const { formData, hasData } = storeToRefs(receiptStore)

// Modal reference
const ownerModalInstance = ref<Modal | null>(null)

// Owner info computed from form data
const ownerInfo = computed<OwnerInfo>(() => ({
  landlordName: formData.value.landlordName,
  landlordPAN: formData.value.landlordPAN,
  landlordAddress: formData.value.landlordAddress,
}))

// Computed properties
const showRevenueStampNotice = computed(() => {
  return formData.value.rentAmount !== null && formData.value.rentAmount > REVENUE_STAMP_THRESHOLD
})

const isFormValid = computed(() => {
  const baseValid =
    formData.value.tenantName.trim() !== '' &&
    formData.value.landlordName.trim() !== '' &&
    formData.value.rentAmount !== null &&
    formData.value.rentAmount > 0 &&
    formData.value.paymentDate !== '' &&
    // PAN is optional, but if provided must be valid
    (formData.value.landlordPAN.trim() === '' || isValidPAN(formData.value.landlordPAN))

  // Period validation depends on mode
  const periodValid = formData.value.isMultiMonth
    ? formData.value.rentalPeriodStart !== '' && formData.value.rentalPeriodEnd !== ''
    : formData.value.rentalPeriodMonth !== ''

  return baseValid && periodValid
})

// Load draft on mount
onMounted(() => {
  try {
    // Draft is already loaded by receiptStore initialization
    // Initialize Bootstrap modal
    const modalElement = document.getElementById('ownerInfoModal')
    if (modalElement) {
      ownerModalInstance.value = new Modal(modalElement)
    }
  } catch (error) {
    console.error('Failed to initialize form:', error)
  }
})

// Handle clear form
function handleClear() {
  if (confirm('Are you sure you want to start a new receipt? Current data will be cleared.')) {
    receiptStore.clearForm()
    emit('clear')
  }
}

// Handle generate receipt
function handleGenerate() {
  if (isFormValid.value) {
    emit('generate')
  }
}

// Owner modal handlers
function openOwnerModal() {
  ownerModalInstance.value?.show()
}

function handleOwnerSave(updatedInfo: OwnerInfo) {
  receiptStore.setFormData({
    landlordName: updatedInfo.landlordName,
    landlordPAN: updatedInfo.landlordPAN,
    landlordAddress: updatedInfo.landlordAddress,
  })
  ownerModalInstance.value?.hide()
}

// Handle period mode change
function handlePeriodModeChange() {
  if (formData.value.isMultiMonth) {
    // Switching to multi-month: convert month to date range
    if (formData.value.rentalPeriodMonth) {
      const { start, end } = monthToDateRange(formData.value.rentalPeriodMonth)
      formData.value.rentalPeriodStart = start
      formData.value.rentalPeriodEnd = end
    }
  } else {
    // Switching to single month: extract month from start date
    if (formData.value.rentalPeriodStart) {
      const [year, month] = formData.value.rentalPeriodStart.split('-')
      formData.value.rentalPeriodMonth = `${year}-${month}`
    }
  }
}

// Handle month change in single-month mode
function handleMonthChange() {
  if (!formData.value.isMultiMonth && formData.value.rentalPeriodMonth) {
    const { start, end } = monthToDateRange(formData.value.rentalPeriodMonth)
    formData.value.rentalPeriodStart = start
    formData.value.rentalPeriodEnd = end
  }
}
</script>

<style scoped>
.form-btn-hover:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

@media (min-width: 576px) {
  .btn {
    width: auto !important;
  }
}
</style>
