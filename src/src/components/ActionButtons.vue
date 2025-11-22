<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
    <button
      type="button"
      @click="handleDownload"
      :disabled="!canDownload || isDownloading"
      class="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg disabled:hover:shadow-md transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
    >
      {{ isDownloading ? 'Downloading...' : '📥 Download PNG' }}
    </button>
    <button
      type="button"
      @click="handleCopy"
      :disabled="!canDownload"
      class="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg disabled:hover:shadow-md transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
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
