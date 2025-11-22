<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p class="footer-info mb-2">
        All data stays on your device. No server. No tracking. Open Source.
      </p>
      <p class="footer-text">
        <span class="feature-badge">🔒 Private</span>
        <span class="feature-badge">📱 Offline</span>
        <span class="feature-badge">🆓 Free</span>
      </p>
      <p class="footer-links">
        <a href="https://github.com/thalib/RentReceiptMaker" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span class="separator">•</span>
        <a href="https://github.com/thalib/RentReceiptMaker/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
          License
        </a>
      </p>
      <p class="footer-attribution">
        Built with ❤️ by <a href="https://devnodes.in" target="_blank" rel="noopener noreferrer">Devnodes.in</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No logic needed for now
</script>

<style scoped>
.app-footer {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1.5rem 1rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1440px;
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  margin: 0 0 0.5rem 0;
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.feature-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
}

.footer-info {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

.footer-links {
  margin: 0.75rem 0 0 0;
  font-size: 0.875rem;
}

.footer-links a {
  color: #90cdf4;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #bee3f8;
  text-decoration: underline;
}

.separator {
  margin: 0 0.5rem;
  opacity: 0.5;
}

@media (min-width: 768px) {
  .app-footer {
    padding: 2rem 1.5rem;
  }

  .footer-text {
    gap: 1rem;
  }

  .feature-badge {
    font-size: 1rem;
    padding: 0.375rem 1rem;
  }

  .footer-info,
  .footer-links {
    font-size: 1rem;
  }
}
</style>
