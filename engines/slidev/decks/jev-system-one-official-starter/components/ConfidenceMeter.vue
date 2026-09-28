<script setup lang="ts">
import { computed } from 'vue'
import { useIsSlideActive } from '@slidev/client'

const props = withDefaults(defineProps<{
  label: string
  value: number
  max?: number
  decimals?: number
  suffix?: string
  tone?: 'cyan' | 'amber' | 'violet'
}>(), {
  max: 1,
  decimals: 0,
  suffix: '',
  tone: 'cyan',
})

const active = useIsSlideActive()
const percent = computed(() => Math.min(100, Math.max(0, (props.value / props.max) * 100)))
const valueText = computed(() => props.value.toFixed(props.decimals))
</script>

<template>
  <div class="hfx-meter" :class="[`tone-${tone}`, { active }]">
    <div class="hfx-meter-head">
      <span>{{ label }}</span>
      <strong>{{ valueText }}{{ suffix }}</strong>
    </div>
    <div class="hfx-meter-track">
      <div class="hfx-meter-fill" :style="{ width: active ? `${percent}%` : '0%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.hfx-meter {
  --hf-meter-color: #4ec5d4;
  padding: 0.7rem 0.8rem;
  border: 1px solid rgba(127, 145, 155, 0.28);
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.035);
}

.tone-amber { --hf-meter-color: #f59e0b; }
.tone-violet { --hf-meter-color: #a78bfa; }

.hfx-meter-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.76rem;
}

.hfx-meter-head strong {
  color: var(--hf-meter-color);
  font-variant-numeric: tabular-nums;
}

.hfx-meter-track {
  position: relative;
  height: 6px;
  margin-top: 0.5rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(127, 145, 155, 0.16);
}

.hfx-meter-fill {
  position: relative;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hf-meter-color) 55%, transparent), var(--hf-meter-color));
  transition: width 850ms cubic-bezier(0.22, 1, 0.36, 1);
}

.hfx-meter-fill::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.55), transparent);
  transform: translateX(-100%);
  animation: hfx-meter-sheen 2.4s ease-in-out infinite;
}

@keyframes hfx-meter-sheen {
  0% { transform: translateX(-100%); }
  45%, 100% { transform: translateX(100%); }
}

@media (prefers-reduced-motion: reduce) {
  .hfx-meter-fill::after {
    animation: none;
  }
}
</style>
