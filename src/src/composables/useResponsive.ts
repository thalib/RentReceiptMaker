/**
 * Composable for responsive breakpoint detection
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
}

export function useResponsive() {
  const windowWidth = ref(window.innerWidth)
  const windowHeight = ref(window.innerHeight)

  // Update dimensions with debounce
  const updateDimensions = useDebounceFn(() => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }, 100)

  // Computed breakpoint properties
  const isMobile = computed(() => windowWidth.value < BREAKPOINTS.mobile)
  const isTablet = computed(
    () => windowWidth.value >= BREAKPOINTS.mobile && windowWidth.value < BREAKPOINTS.tablet,
  )
  const isDesktop = computed(() => windowWidth.value >= BREAKPOINTS.tablet)

  // Specific breakpoint checks
  const isSmallMobile = computed(() => windowWidth.value < 480)
  const isLargeDesktop = computed(() => windowWidth.value >= BREAKPOINTS.desktop)

  // Current breakpoint name
  const breakpoint = computed(() => {
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    return 'desktop'
  })

  // Set up resize listener
  onMounted(() => {
    window.addEventListener('resize', updateDimensions)
  })

  // Clean up
  onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions)
  })

  return {
    windowWidth,
    windowHeight,
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
    isLargeDesktop,
    breakpoint,
  }
}
