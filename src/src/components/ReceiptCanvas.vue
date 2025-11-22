<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-6 receipt-canvas-container">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Receipt Preview</h2>
    <div class="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-4 md:p-6 flex justify-center overflow-auto shadow-lg">
      <canvas ref="canvasRef" class="border-2 border-gray-300 shadow-xl bg-white max-w-full h-auto rounded-lg"></canvas>
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
