<script setup lang="ts">
import { computed } from 'vue'

const showGrid = computed(() => true)
</script>

<template>
  <div aria-hidden="true" class="dark-pro-bg">
    <div v-if="showGrid" class="grid-overlay" />
    <div class="gradient-overlay" />
  </div>
</template>

<style scoped>
.dark-pro-bg {
  position: absolute;
  inset: 0;
  z-index: -10;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.06), transparent 40%);
}
</style>
