<template>
  <footer class="bg-dark text-light py-4 px-3 py-md-5 px-md-4 mt-auto">
    <div class="container text-center">
      <p class="fs-6 fs-md-5 opacity-75 mb-4">
        All data stays on your device. No server. No tracking. Open Source.
      </p>
      <div class="d-flex justify-content-center gap-3 gap-md-4 flex-wrap mb-4">
        <span
          class="d-inline-flex align-items-center gap-1 fs-6 fw-medium px-3 py-1 px-md-4 py-md-2 badge-custom"
          >🔒 Private</span
        >
        <span
          class="d-inline-flex align-items-center gap-1 fs-6 fw-medium px-3 py-1 px-md-4 py-md-2 badge-custom"
          >📱 Offline</span
        >
        <span
          class="d-inline-flex align-items-center gap-1 fs-6 fw-medium px-3 py-1 px-md-4 py-md-2 badge-custom"
          >🆓 Free</span
        >
      </div>
      <p class="fs-6 fs-md-5 mb-3">
        <a
          href="https://github.com/thalib/RentReceiptMaker"
          target="_blank"
          rel="noopener noreferrer"
          class="text-info text-decoration-none link-custom"
        >
          GitHub
        </a>
        <span class="mx-2 opacity-50">•</span>
        <a
          href="https://github.com/thalib/RentReceiptMaker/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          class="text-info text-decoration-none link-custom"
        >
          License
        </a>
      </p>
      <p class="fs-6">
        Built with ❤️ by
        <a
          href="https://devnodes.in"
          target="_blank"
          rel="noopener noreferrer"
          class="text-info text-decoration-none link-custom"
          >Devnodes.in</a
        >
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No logic needed for now
</script>

<style scoped>
.badge-custom {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
}

.link-custom:hover {
  text-decoration: underline !important;
  color: #9ec5fe !important;
}
</style>
