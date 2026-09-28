<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const nav = useNav()
const progress = computed(() => {
  const total = Math.max(nav.total - 1, 1)
  return Math.min(1, Math.max(0, (nav.currentPage - 1) / total))
})
</script>

<template>
  <div class="hfx-overlay" aria-hidden="true">
    <div class="hfx-grid"></div>
    <div class="hfx-orb hfx-orb-a"></div>
    <div class="hfx-orb hfx-orb-b"></div>
    <div class="hfx-orb hfx-orb-c"></div>
    <div class="hfx-vignette"></div>
    <div class="hfx-progress-track">
      <div class="hfx-progress-fill" :style="{ transform: `scaleX(${progress})` }"></div>
    </div>
  </div>
</template>

<style scoped>
.hfx-overlay {
  position: absolute;
  inset: 0;
  z-index: 20;
  overflow: hidden;
  pointer-events: none;
}

.hfx-grid {
  position: absolute;
  inset: -1px;
  background-image:
    linear-gradient(rgba(93, 131, 146, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(93, 131, 146, 0.055) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at 50% 45%, black, transparent 78%);
  animation: hfx-grid-drift 18s linear infinite;
}

.hfx-orb {
  position: absolute;
  width: 38vmin;
  height: 38vmin;
  border-radius: 999px;
  filter: blur(38px);
  opacity: 0.18;
  mix-blend-mode: screen;
}

.hfx-orb-a {
  top: -10%;
  left: -6%;
  background: radial-gradient(circle, #4ec5d4, transparent 68%);
  animation: hfx-orb-a 13s ease-in-out infinite;
}

.hfx-orb-b {
  right: -8%;
  bottom: -12%;
  background: radial-gradient(circle, #8b5cf6, transparent 68%);
  opacity: 0.14;
  animation: hfx-orb-b 16s ease-in-out infinite;
}

.hfx-orb-c {
  left: 42%;
  top: 58%;
  width: 26vmin;
  height: 26vmin;
  background: radial-gradient(circle, #f59e0b, transparent 70%);
  opacity: 0.08;
  animation: hfx-orb-c 11s ease-in-out infinite;
}

.hfx-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, transparent 58%, rgba(0, 0, 0, 0.10));
}

.hfx-progress-track {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: rgba(127, 145, 155, 0.14);
}

.hfx-progress-fill {
  width: 100%;
  height: 100%;
  transform-origin: left center;
  background: linear-gradient(90deg, #4ec5d4, #5d8392, #8b5cf6);
  transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
}

.hfx-progress-fill::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.55), transparent);
  transform: translateX(-100%);
  animation: hfx-progress-sheen 2.8s ease-in-out infinite;
}

@keyframes hfx-grid-drift {
  from { background-position: 0 0, 0 0; }
  to { background-position: 48px 48px, 48px 48px; }
}

@keyframes hfx-orb-a {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(5%, 4%, 0) scale(1.08); }
}

@keyframes hfx-orb-b {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-5%, -5%, 0) scale(1.10); }
}

@keyframes hfx-orb-c {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.06; }
  50% { transform: translate3d(3%, -5%, 0) scale(1.16); opacity: 0.10; }
}

@keyframes hfx-progress-sheen {
  0% { transform: translateX(-100%); }
  45%, 100% { transform: translateX(100%); }
}

@media (prefers-reduced-motion: reduce) {
  .hfx-grid,
  .hfx-orb,
  .hfx-progress-fill::after {
    animation: none;
  }
}
</style>
