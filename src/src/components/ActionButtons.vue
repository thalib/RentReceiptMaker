<template>
  <div class="action-buttons">
    <button
      type="button"
      class="btn btn-tertiary"
      @click="handleClear"
      :disabled="!hasData"
    >
      Clear Form
    </button>
    <button
      type="button"
      class="btn btn-secondary"
      @click="handleDownload"
      :disabled="!canDownload || isDownloading"
    >
      {{ isDownloading ? 'Downloading...' : 'Download PNG' }}
    </button>
    <button
      type="button"
      class="btn btn-primary"
      @click="handleGenerate"
      :disabled="!isValid"
    >
      Generate Receipt
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
  clear: [];
  download: [];
  generate: [];
}>();

const isDownloading = ref(false);

function handleClear() {
  if (confirm('Are you sure you want to clear the form? All unsaved data will be lost.')) {
    emit('clear');
  }
}

async function handleDownload() {
  isDownloading.value = true;
  emit('download');
  // Reset after a short delay
  setTimeout(() => {
    isDownloading.value = false;
  }, 1000);
}

function handleGenerate() {
  emit('generate');
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
}

.btn {
  width: 100%;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 44px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #4299e1;
  color: white;
  box-shadow: 0 2px 4px rgba(66, 153, 225, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: #3182ce;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(66, 153, 225, 0.4);
}

.btn-secondary {
  background: #48bb78;
  color: white;
  box-shadow: 0 2px 4px rgba(72, 187, 120, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background: #38a169;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(72, 187, 120, 0.4);
}

.btn-tertiary {
  background: #e2e8f0;
  color: #2d3748;
}

.btn-tertiary:hover:not(:disabled) {
  background: #cbd5e0;
}

@media (min-width: 768px) {
  .action-buttons {
    flex-direction: row;
    justify-content: flex-end;
    padding: 1.5rem;
  }

  .btn {
    width: auto;
    min-width: 160px;
  }
}
</style>
