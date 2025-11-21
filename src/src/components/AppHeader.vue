<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="app-title">Rent Receipt Generator</h1>
      <p class="app-tagline">Free • Offline • Private</p>
    </div>
  </header>
</template>

<script setup lang="ts">
// No logic needed for now
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1440px;
  margin: 0 auto;
  text-align: center;
}

.app-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.5rem;
}

.app-tagline {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
  font-weight: 300;
}

@media (min-width: 768px) {
  .app-header {
    padding: 2rem 1.5rem;
  }

  .app-title {
    font-size: 2.25rem;
  }

  .app-tagline {
    font-size: 1rem;
  }
}
</style>
