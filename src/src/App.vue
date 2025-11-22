<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import ReceiptForm from './components/ReceiptForm.vue';
import ReceiptCanvas from './components/ReceiptCanvas.vue';
import ActionButtons from './components/ActionButtons.vue';
import ToastContainer from './components/ToastContainer.vue';
import { useReceiptStore } from './stores/receiptStore';
import { useReceiptGeneration } from './composables/useReceiptGeneration';
import { useToast } from './composables/useToast';

const receiptStore = useReceiptStore();
const { formData, hasData, receiptNumber } = storeToRefs(receiptStore);
const { generateReceipt, downloadReceiptOnly } = useReceiptGeneration();
const toast = useToast();

const canvasComponent = ref<InstanceType<typeof ReceiptCanvas> | null>(null);
const hasGenerated = ref(false);

// Validate form
const isFormValid = computed(() => {
  return (
    formData.value.tenantName.trim() !== '' &&
    formData.value.landlordName.trim() !== '' &&
    formData.value.landlordAddress.trim() !== '' &&
    formData.value.landlordPAN.length === 10 &&
    formData.value.propertyAddress.trim() !== '' &&
    formData.value.rentAmount !== null &&
    formData.value.rentAmount > 0 &&
    formData.value.rentalPeriodStart !== '' &&
    formData.value.rentalPeriodEnd !== '' &&
    formData.value.paymentDate !== ''
  );
});

async function handleGenerate() {
  if (isFormValid.value) {
    // Set hasGenerated first so the canvas gets rendered
    hasGenerated.value = true;
    
    // Wait for next tick to ensure canvas is rendered
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (canvasComponent.value?.canvasRef) {
      const success = await generateReceipt(
        formData.value,
        canvasComponent.value.canvasRef,
        false // Don't auto-download, let user click download button
      );
      
      if (success) {
        toast.success('Receipt generated successfully! You can now download it.');
        
        // Scroll to canvas
        setTimeout(() => {
          document.querySelector('.receipt-canvas-container')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        toast.error('Failed to generate receipt. Please check your data and try again.');
        hasGenerated.value = false;
      }
    } else {
      toast.error('Canvas not ready. Please try again.');
      hasGenerated.value = false;
    }
  }
}

async function handleDownload() {
  if (canvasComponent.value?.canvasRef && receiptNumber.value) {
    const success = await downloadReceiptOnly(
      canvasComponent.value.canvasRef,
      receiptNumber.value
    );
    
    if (success) {
      toast.success('Receipt downloaded successfully!');
    } else {
      toast.error('Failed to download receipt. Please try again.');
    }
  }
}

function handleClear() {
  receiptStore.clearForm();
  hasGenerated.value = false;
}

async function handleCopy() {
  if (canvasComponent.value?.canvasRef) {
    try {
      const canvas = canvasComponent.value.canvasRef;
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            toast.success('Receipt copied to clipboard!');
          } catch {
            toast.error('Failed to copy receipt. Your browser may not support this feature.');
          }
        }
      }, 'image/png');
    } catch {
      toast.error('Failed to copy receipt. Please try again.');
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <ToastContainer />
    <AppHeader />
    
    <main class="flex-1 w-full">
      <div class="w-full flex flex-col">
        <ReceiptForm 
          @generate="handleGenerate"
          @clear="handleClear"
          :has-generated="hasGenerated"
        />
        
        <div v-if="hasGenerated" class="w-full">
          <ReceiptCanvas ref="canvasComponent" />
          
          <ActionButtons
            :has-data="hasData"
            :is-valid="isFormValid"
            :can-download="hasGenerated"
            @download="handleDownload"
            @copy="handleCopy"
          />
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>


