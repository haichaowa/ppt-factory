<script setup lang="ts">
import { computed } from 'vue'

const gradientColors = computed(() => [
  'from-orange-500 via-red-500 to-pink-500',
  'from-blue-600 via-indigo-600 to-purple-600',
  'from-emerald-500 via-teal-500 to-cyan-500',
])
</script>

<template>
  <div aria-hidden="true" class="bold-bg" />
</template>

<style scoped>
.bold-bg {
  position: absolute;
  inset: 0;
  z-index: -10;
  background:
    radial-gradient(circle at 100% 0%, rgba(255, 200, 100, 0.25), transparent 50%),
    radial-gradient(circle at 0% 100%, rgba(100, 150, 255, 0.2), transparent 50%),
    linear-gradient(135deg, #fafafa 0%, #f0f0f5 100%);
  pointer-events: none;
}

:global(.dark) .bold-bg {
  background:
    radial-gradient(circle at 100% 0%, rgba(255, 100, 50, 0.3), transparent 50%),
    radial-gradient(circle at 0% 100%, rgba(50, 100, 255, 0.25), transparent 50%),
    linear-gradient(135deg, #0a0a0f 0%, #1a1a25 100%);
}
</style>
