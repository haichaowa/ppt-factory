<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { onSlideEnter, onSlideLeave, useIsSlideActive } from '@slidev/client'

const active = useIsSlideActive()
const progress = ref(0)
let frame = 0
let startedAt = 0

const groups = [
  {
    title: 'Re-ranking',
    source: '40 个法律查询 · 30 个候选段落',
    metrics: [
      { label: 'Top-1', before: 5, after: 18, max: 70, suffix: '%' },
      { label: 'Top-10', before: 38, after: 62, max: 70, suffix: '%' },
    ],
  },
  {
    title: 'Skill suggestion',
    source: '错误加载率下降',
    metrics: [
      { label: 'Error load', before: 16.8, after: 7.3, max: 20, suffix: '%' },
    ],
  },
]

const parallel = [
  { label: '成本下降', value: 12.2, suffix: '×' },
  { label: '速度提升', value: 10.0, suffix: '×' },
]

const rounded = computed(() => groups.map(group => ({
  ...group,
  metrics: group.metrics.map(metric => ({
    ...metric,
    beforeText: `${metric.before}${metric.suffix}`,
    afterText: `${metric.after}${metric.suffix}`,
    beforeWidth: `${Math.min(100, (metric.before / metric.max) * 100)}%`,
    afterWidth: `${Math.min(100, (metric.after / metric.max) * 100)}%`,
  })),
})))

function cancel() {
  if (frame)
    cancelAnimationFrame(frame)
  frame = 0
}

function tick(now: number) {
  if (!startedAt)
    startedAt = now
  const t = Math.min(1, (now - startedAt) / 850)
  progress.value = 1 - (1 - t) ** 3
  if (t < 1)
    frame = requestAnimationFrame(tick)
  else
    frame = 0
}

function play() {
  cancel()
  startedAt = 0
  progress.value = 0
  frame = requestAnimationFrame(tick)
}

watch(active, value => value ? play() : cancel(), { immediate: true })
onSlideEnter(play)
onSlideLeave(cancel)
onBeforeUnmount(cancel)
</script>

<template>
  <div class="cookbook-metrics" :class="{ active }">
    <div class="parallel-row">
      <div v-for="item in parallel" :key="item.label" class="parallel-card">
        <span>{{ item.label }}</span>
        <strong>{{ (item.value * progress).toFixed(1) }}{{ item.suffix }}</strong>
      </div>
      <div class="parallel-note">Parallel questions · 官方 Cookbook 示例</div>
    </div>

    <div class="metric-groups">
      <div v-for="group in rounded" :key="group.title" class="metric-group">
        <div class="group-head">
          <strong>{{ group.title }}</strong>
          <span>{{ group.source }}</span>
        </div>
        <div v-for="metric in group.metrics" :key="metric.label" class="metric-row">
          <div class="metric-label">{{ metric.label }}</div>
          <div class="bar-pair">
            <div class="bar-track">
              <div class="bar before" :style="{ width: active ? metric.beforeWidth : '0%' }"></div>
            </div>
            <div class="bar-track">
              <div class="bar after" :style="{ width: active ? metric.afterWidth : '0%' }"></div>
            </div>
          </div>
          <div class="metric-values">
            <span>{{ metric.beforeText }}</span>
            <span class="arrow">→</span>
            <span>{{ metric.afterText }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cookbook-metrics {
  display: grid;
  gap: 0.9rem;
  color: #e7f0f5;
}

.parallel-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  gap: 0.75rem;
  align-items: stretch;
}

.parallel-card {
  border: 1px solid rgba(132, 229, 240, 0.24);
  border-radius: 0.65rem;
  padding: 0.75rem 0.85rem;
  background: linear-gradient(145deg, rgba(93, 131, 146, 0.22), rgba(8, 17, 26, 0.78));
}

.parallel-card span,
.parallel-note {
  color: rgba(231, 240, 245, 0.65);
  font-size: 0.72rem;
}

.parallel-card strong {
  display: block;
  margin-top: 0.25rem;
  color: #8ce8f7;
  font-family: "PT Mono", ui-monospace, monospace;
  font-size: 1.5rem;
}

.parallel-note {
  display: flex;
  align-items: center;
  border-left: 2px solid rgba(132, 229, 240, 0.35);
  padding-left: 0.65rem;
}

.metric-groups {
  display: grid;
  grid-template-columns: 1.35fr .65fr;
  gap: 0.75rem;
}

.metric-group {
  border: 1px solid rgba(127, 145, 155, 0.26);
  border-radius: 0.65rem;
  padding: 0.75rem;
  background: rgba(8, 17, 26, 0.74);
}

.group-head {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
}

.group-head strong {
  color: #f4f9fb;
  font-size: 0.86rem;
}

.group-head span {
  color: rgba(231, 240, 245, 0.58);
  font-size: 0.68rem;
  text-align: right;
}

.metric-row {
  display: grid;
  grid-template-columns: 62px minmax(0, 1fr) 108px;
  gap: 0.65rem;
  align-items: center;
  padding: 0.3rem 0;
  font-size: 0.7rem;
}

.metric-label {
  color: rgba(231, 240, 245, 0.68);
}

.bar-pair {
  display: grid;
  gap: 3px;
}

.bar-track {
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(127, 145, 155, 0.15);
}

.bar {
  height: 100%;
  border-radius: inherit;
  transform-origin: left center;
  transition: width 800ms cubic-bezier(0.22, 1, 0.36, 1);
}

.bar.before {
  background: rgba(148, 175, 190, 0.48);
}

.bar.after {
  background: linear-gradient(90deg, rgba(78, 197, 212, .72), #4ec5d4);
}

.metric-values {
  display: flex;
  justify-content: space-between;
  color: rgba(231, 240, 245, 0.78);
  font-family: "PT Mono", ui-monospace, monospace;
}

.metric-values .arrow {
  color: rgba(132, 229, 240, 0.65);
}

@media (prefers-reduced-motion: reduce) {
  .bar {
    transition: none;
  }
}
</style>
