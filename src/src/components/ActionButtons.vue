<template>
  <div class="w-100 container px-3 py-4 d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center" style="max-width: 56rem;">
    <button
      type="button"
      @click="handleDownload"
      :disabled="!canDownload || isDownloading"
      class="btn btn-success btn-lg w-100 w-sm-auto px-4 py-2 fw-semibold shadow btn-hover-lift"
    >
      {{ isDownloading ? 'Downloading...' : '📥 Download PNG' }}
    </button>
    <button
      type="button"
      @click="handleCopy"
      :disabled="!canDownload"
      class="btn btn-primary btn-lg w-100 w-sm-auto px-4 py-2 fw-semibold shadow btn-hover-lift"
    >
      📋 Copy Image
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  hasData: boolean;
  isValid: boolean;
  canDownload: boolean;
}>();

const emit = defineEmits<{
  download: [];
  copy: [];
}>();

const isDownloading = ref(false);

async function handleDownload() {
  isDownloading.value = true;
  emit('download');
  // Reset after a short delay
  setTimeout(() => {
    isDownloading.value = false;
  }, 1000);
}

function handleCopy() {
  emit('copy');
}
</script>

<style scoped>
.btn-hover-lift:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.btn-hover-lift:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (min-width: 576px) {
  .w-sm-auto {
    width: auto !important;
  }
}
</style>
