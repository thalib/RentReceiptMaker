<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import AppHeader from './components/AppHeader.vue';
import ReceiptForm from './components/ReceiptForm.vue';
import ReceiptCanvas from './components/ReceiptCanvas.vue';
import ActionButtons from './components/ActionButtons.vue';
import { useReceiptStore } from './stores/receiptStore';
import { useReceiptGeneration } from './composables/useReceiptGeneration';
import { useResponsive } from './composables/useResponsive';

const receiptStore = useReceiptStore();
const { formData, hasData, receiptNumber } = storeToRefs(receiptStore);
const { generateReceipt, downloadReceiptOnly } = useReceiptGeneration();
const { isMobile } = useResponsive();

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
  if (isFormValid.value && canvasComponent.value?.canvasRef) {
    const success = await generateReceipt(
      formData.value,
      canvasComponent.value.canvasRef,
      false // Don't auto-download, let user click download button
    );
    
    if (success) {
      hasGenerated.value = true;
      alert('Receipt generated successfully! You can now download it.');
      
      // Scroll to canvas on mobile
      if (isMobile.value) {
        setTimeout(() => {
          document.querySelector('.receipt-canvas')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      alert('Failed to generate receipt. Please check your data and try again.');
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
      alert('Receipt downloaded successfully!');
    } else {
      alert('Failed to download receipt. Please try again.');
    }
  }
}

function handleClear() {
  receiptStore.clearForm();
  hasGenerated.value = false;
}
</script>

<template>
  <div class="app">
    <AppHeader />
    
    <main class="main-content">
      <!-- Mobile: Vertical Layout -->
      <div v-if="isMobile" class="mobile-layout">
        <ReceiptForm @generate="handleGenerate" />
        <ReceiptCanvas ref="canvasComponent" />
      </div>
      
      <!-- Desktop: Split Layout -->
      <div v-else class="desktop-layout">
        <div class="form-pane">
          <ReceiptForm @generate="handleGenerate" />
        </div>
        <div class="canvas-pane">
          <ReceiptCanvas ref="canvasComponent" />
        </div>
      </div>
    </main>

    <ActionButtons
      :has-data="hasData"
      :is-valid="isFormValid"
      :can-download="hasGenerated"
      @clear="handleClear"
      @download="handleDownload"
      @generate="handleGenerate"
    />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7fafc;
}

.main-content {
  flex: 1;
  overflow: auto;
}

/* Mobile Layout */
.mobile-layout {
  display: flex;
  flex-direction: column;
}

/* Desktop Layout */
.desktop-layout {
  display: grid;
  grid-template-columns: 40% 60%;
  min-height: calc(100vh - 200px);
  gap: 0;
}

.form-pane {
  overflow-y: auto;
  background: white;
  border-right: 1px solid #e2e8f0;
}

.canvas-pane {
  overflow-y: auto;
  position: sticky;
  top: 0;
  height: calc(100vh - 200px);
  background: #f7fafc;
}

@media (max-width: 767px) {
  .canvas-pane {
    position: relative;
    height: auto;
  }
}
</style>
