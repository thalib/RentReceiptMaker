<template>
  <div
    class="modal fade"
    id="ownerInfoModal"
    tabindex="-1"
    aria-labelledby="ownerInfoModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-bottom border-2 border-secondary-subtle">
          <h5 class="modal-title fw-semibold text-dark" id="ownerInfoModalLabel">
            Owner Information
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handleCancel"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="handleSave" id="ownerInfoForm" class="vstack gap-3">
            <div>
              <label for="modalLandlordName" class="form-label fw-medium">
                Owner Name <span class="text-danger">*</span>
              </label>
              <input
                id="modalLandlordName"
                v-model="localData.landlordName"
                type="text"
                placeholder="Enter owner name"
                required
                aria-required="true"
                class="form-control"
                :class="{ 'is-invalid': errors.landlordName }"
              />
              <div v-if="errors.landlordName" class="invalid-feedback">
                {{ errors.landlordName }}
              </div>
            </div>

            <div>
              <label for="modalLandlordPAN" class="form-label fw-medium"> Owner PAN Number </label>
              <input
                id="modalLandlordPAN"
                v-model="localData.landlordPAN"
                type="text"
                placeholder="AAAAA9999A (Optional)"
                maxlength="10"
                class="form-control text-uppercase"
                :class="{ 'is-invalid': errors.landlordPAN }"
              />
              <small class="form-text text-muted d-block mt-1">
                Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
              </small>
              <div v-if="errors.landlordPAN" class="invalid-feedback">
                {{ errors.landlordPAN }}
              </div>
            </div>

            <div>
              <label for="modalLandlordAddress" class="form-label fw-medium"> Owner Address </label>
              <textarea
                id="modalLandlordAddress"
                v-model="localData.landlordAddress"
                rows="3"
                placeholder="Enter complete address (Optional)"
                class="form-control"
                style="resize: none"
                :class="{ 'is-invalid': errors.landlordAddress }"
              ></textarea>
              <div v-if="errors.landlordAddress" class="invalid-feedback">
                {{ errors.landlordAddress }}
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer border-top border-2 border-secondary-subtle">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button type="submit" form="ownerInfoForm" class="btn btn-primary" :disabled="!isValid">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { isValidPAN, isEmptyOrWhitespace } from '../utils/validation'

export interface OwnerInfo {
  landlordName: string
  landlordPAN: string
  landlordAddress: string
}

const props = defineProps<{
  ownerInfo: OwnerInfo
}>()

const emit = defineEmits<{
  save: [ownerInfo: OwnerInfo]
}>()

// Local state for editing
const localData = ref<OwnerInfo>({
  landlordName: '',
  landlordPAN: '',
  landlordAddress: '',
})

const errors = ref<Record<string, string>>({})

// Watch for prop changes to update local state when modal opens
watch(
  () => props.ownerInfo,
  (newInfo) => {
    localData.value = { ...newInfo }
    errors.value = {}
  },
  { immediate: true, deep: true },
)

// Validation
const isValid = computed(() => {
  // Owner name is required
  if (isEmptyOrWhitespace(localData.value.landlordName)) {
    return false
  }

  // If PAN is provided, it must be valid
  if (localData.value.landlordPAN.trim() !== '' && !isValidPAN(localData.value.landlordPAN)) {
    return false
  }

  return true
})

// Validate and set errors
function validate(): boolean {
  errors.value = {}

  if (isEmptyOrWhitespace(localData.value.landlordName)) {
    errors.value.landlordName = 'Owner name is required'
  }

  if (localData.value.landlordPAN.trim() !== '' && !isValidPAN(localData.value.landlordPAN)) {
    errors.value.landlordPAN = 'Invalid PAN format'
  }

  return Object.keys(errors.value).length === 0
}

function handleSave() {
  if (validate()) {
    emit('save', { ...localData.value })
    // Bootstrap modal will be closed by the parent component
  }
}

function handleCancel() {
  // Reset to original values
  localData.value = { ...props.ownerInfo }
  errors.value = {}
}
</script>

<style scoped>
.modal-dialog {
  max-width: 500px;
}

@media (max-width: 576px) {
  .modal-dialog {
    margin: 0.5rem;
  }
}
</style>
