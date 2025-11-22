<template>
  <div class="w-100 container px-3 py-4 receipt-canvas-container" style="max-width: 56rem;">
    <h2 class="display-6 display-md-5 fw-bold text-dark mb-4 text-center">Receipt Preview</h2>
    <div class="canvas-wrapper border border-2 rounded-3 p-3 p-md-4 d-flex justify-content-center overflow-auto shadow-lg">
      <canvas ref="canvasRef" class="border border-2 border-secondary shadow bg-white mw-100 h-auto rounded"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useReceiptStore } from '../stores/receiptStore';
import { useReceiptCanvas } from '../composables/useReceiptCanvas';
import { useDebounceFn } from '@vueuse/core';
import { CANVAS_REDRAW_DEBOUNCE } from '../utils/constants';

const receiptStore = useReceiptStore();
const { formData, receiptNumber } = storeToRefs(receiptStore);
const { drawReceipt } = useReceiptCanvas();

const canvasRef = ref<HTMLCanvasElement | null>(null);

// Debounced redraw function
const debouncedRedraw = useDebounceFn(() => {
  if (canvasRef.value && receiptNumber.value) {
    drawReceipt(canvasRef.value, formData.value, receiptNumber.value);
  }
}, CANVAS_REDRAW_DEBOUNCE);

// Watch form data for changes
watch(formData, debouncedRedraw, { deep: true });

// Watch receipt number
watch(receiptNumber, debouncedRedraw);

// Initial draw on mount
onMounted(() => {
  if (canvasRef.value && receiptNumber.value) {
    drawReceipt(canvasRef.value, formData.value, receiptNumber.value);
  }
});

// Expose canvas ref for parent components
defineExpose({
  canvasRef,
});
</script>

<style scoped>
.canvas-wrapper {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-color: #dee2e6 !important;
}
</style>
