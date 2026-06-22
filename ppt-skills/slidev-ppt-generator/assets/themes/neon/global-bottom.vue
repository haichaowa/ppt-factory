<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { currentSlideRoute } = useNav()

const formatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
const neonHue = computed<number>(() => +(formatter.value.neonHue || 280))
const neonIntensity = computed<number>(() => +(formatter.value.neonIntensity ?? 0.6))
const neonSeed = computed<string>(() => formatter.value.neonSeed || 'neon-default')
</script>

<template>
  <div aria-hidden="true" class="neon-bg" :style="{ filter: `hue-rotate(${neonHue}deg)` }">
    <div class="neon-grid" />
    <div class="neon-scanline" />
    <div class="neon-glow neon-glow-1" :style="{ opacity: neonIntensity }" />
    <div class="neon-glow neon-glow-2" :style="{ opacity: neonIntensity * 0.8 }" />
    <div class="neon-glow neon-glow-3" :style="{ opacity: neonIntensity * 0.6 }" />
  </div>
</template>

<style scoped>
.neon-bg {
  position: absolute;
  inset: 0;
  z-index: -10;
  background: #0a0014;
  overflow: hidden;
  pointer-events: none;
}

.neon-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 0, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

.neon-scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 2px,
    rgba(255, 0, 255, 0.02) 2px,
    rgba(255, 0, 255, 0.02) 4px
  );
  pointer-events: none;
}

.neon-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  mix-blend-mode: screen;
}

.neon-glow-1 {
  width: 40vw;
  height: 40vw;
  top: -10%;
  left: -5%;
  background: #ff00ff;
}

.neon-glow-2 {
  width: 35vw;
  height: 35vw;
  bottom: -10%;
  right: -5%;
  background: #00ffff;
}

.neon-glow-3 {
  width: 30vw;
  height: 30vw;
  top: 30%;
  left: 40%;
  background: #ff00aa;
}
</style>
