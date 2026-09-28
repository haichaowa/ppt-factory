<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { onSlideEnter, onSlideLeave, useIsSlideActive } from '@slidev/client'

const props = withDefaults(defineProps<{
  to: number
  from?: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
}>(), {
  from: 0,
  decimals: 0,
  prefix: '',
  suffix: '',
  duration: 900,
})

const active = useIsSlideActive()
const display = ref(props.from)
let frame = 0
let startedAt = 0

const text = computed(() => `${props.prefix}${display.value.toFixed(props.decimals)}${props.suffix}`)

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function cancel() {
  if (frame)
    cancelAnimationFrame(frame)
  frame = 0
}

function tick(now: number) {
  if (!startedAt)
    startedAt = now
  const progress = Math.min(1, (now - startedAt) / props.duration)
  display.value = props.from + (props.to - props.from) * easeOutCubic(progress)
  if (progress < 1)
    frame = requestAnimationFrame(tick)
  else
    frame = 0
}

function play() {
  cancel()
  startedAt = 0
  display.value = props.from
  frame = requestAnimationFrame(tick)
}

watch(active, value => value ? play() : cancel(), { immediate: true })
onSlideEnter(play)
onSlideLeave(cancel)
onBeforeUnmount(cancel)
</script>

<template>
  <span class="hfx-animated-number">{{ text }}</span>
</template>
