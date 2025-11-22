<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
        @click="removeToast(toast.id)"
      >
        <span class="toast-icon">{{ getIcon(toast.type) }}</span>
        <span class="toast-message">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '../composables/useToast'

const { toasts, removeToast } = useToast()

function getIcon(type: string): string {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }
  return icons[type as keyof typeof icons] || 'ℹ'
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  min-width: 300px;
  max-width: 500px;
  background: white;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s ease;
}

.toast:hover {
  transform: translateX(-4px);
  box-shadow:
    0 6px 8px rgba(0, 0, 0, 0.15),
    0 3px 6px rgba(0, 0, 0, 0.1);
}

.toast-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
}

.toast-message {
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #2d3748;
}

.toast-success {
  border-left: 4px solid #48bb78;
}

.toast-success .toast-icon {
  background: #48bb78;
  color: white;
}

.toast-error {
  border-left: 4px solid #f56565;
}

.toast-error .toast-icon {
  background: #f56565;
  color: white;
}

.toast-warning {
  border-left: 4px solid #ed8936;
}

.toast-warning .toast-icon {
  background: #ed8936;
  color: white;
}

.toast-info {
  border-left: 4px solid #4299e1;
}

.toast-info .toast-icon {
  background: #4299e1;
  color: white;
}

/* Transition animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

@media (max-width: 640px) {
  .toast-container {
    top: auto;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }

  .toast {
    min-width: unset;
    width: 100%;
  }

  .toast:hover {
    transform: translateY(-2px);
  }

  .toast-enter-from {
    transform: translateY(100%);
  }

  .toast-leave-to {
    transform: translateY(100%) scale(0.9);
  }
}
</style>
