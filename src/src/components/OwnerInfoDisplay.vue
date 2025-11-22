<template>
  <div
    class="owner-info-display bg-light border border-secondary-subtle rounded p-3 position-relative"
    role="button"
    tabindex="0"
    aria-label="Owner information, click to edit"
    @click="handleEdit"
    @keydown.enter="handleEdit"
    @keydown.space.prevent="handleEdit"
  >
    <div class="d-flex justify-content-between align-items-start">
      <div class="flex-grow-1">
        <div class="d-flex align-items-center gap-2 mb-2">
          <h4 class="fs-6 fw-semibold text-dark mb-0">Owner Information</h4>
          <button
            type="button"
            class="btn btn-sm btn-link p-0 text-primary text-decoration-none"
            aria-label="Edit owner information"
            @click.stop="handleEdit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </button>
        </div>

        <div class="text-dark">
          <div v-if="ownerInfo.landlordName.trim()" class="mb-1">
            <strong>{{ ownerInfo.landlordName }}</strong>
          </div>
          <div v-else class="text-muted fst-italic mb-1">Click to add owner information</div>

          <div v-if="ownerInfo.landlordPAN.trim()" class="small text-muted">
            PAN: {{ ownerInfo.landlordPAN }}
          </div>

          <div
            v-if="ownerInfo.landlordAddress.trim()"
            class="small text-muted mt-1"
            style="white-space: pre-line"
          >
            {{ ownerInfo.landlordAddress }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!ownerInfo.landlordName.trim()"
      class="position-absolute top-50 end-0 translate-middle-y pe-3 text-warning fs-5"
      aria-label="Required"
    >
      ⚠️
    </div>
  </div>
</template>

<script setup lang="ts">
export interface OwnerInfo {
  landlordName: string
  landlordPAN: string
  landlordAddress: string
}

defineProps<{
  ownerInfo: OwnerInfo
}>()

const emit = defineEmits<{
  edit: []
}>()

function handleEdit() {
  emit('edit')
}
</script>

<style scoped>
.owner-info-display {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.owner-info-display:hover {
  background-color: #e9ecef !important;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.owner-info-display:focus {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
}

.btn-link:hover svg {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}
</style>
