<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'

const active = useIsSlideActive()
</script>

<template>
  <div class="hf-flow" :class="{ active }" aria-label="Jev System One data flow">
    <svg class="hf-flow-lines" viewBox="0 0 900 320" role="presentation">
      <path class="line line-a" d="M112 74 C168 74 205 112 260 139" />
      <path class="line line-b" d="M112 225 C168 225 205 187 260 158" />
      <path class="line line-c" d="M424 148 C474 148 482 60 536 58" />
      <path class="line line-d" d="M424 148 C474 148 482 148 536 148" />
      <path class="line line-e" d="M424 148 C474 148 482 238 536 240" />
      <path class="line line-f" d="M706 240 C760 240 762 180 764 166" />
    </svg>

    <div class="node node-state">
      <strong>state</strong>
      <span>文本 / JSON object / array</span>
    </div>
    <div class="node node-questions">
      <strong>questions</strong>
      <span>Choice / Score / Noul</span>
    </div>
    <div class="node node-engine">
      <strong>Jev</strong>
      <span>System One decision</span>
    </div>
    <div class="node node-answer">
      <strong>typed answers</strong>
      <span>可直接分支</span>
    </div>
    <div class="node node-probability">
      <strong>probabilities</strong>
      <span>候选分布</span>
    </div>
    <div class="node node-confidence">
      <strong>confidence</strong>
      <span>分布集中程度</span>
    </div>
    <div class="node node-action">
      <strong>route</strong>
      <span>自动 / 确认 / 人工</span>
    </div>
  </div>
</template>

<style scoped>
.hf-flow {
  position: relative;
  width: 100%;
  height: 310px;
  margin-top: 1rem;
  font-size: 0.72rem;
}

.hf-flow-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.line {
  fill: none;
  stroke: rgba(93, 131, 146, 0.55);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 4 8;
  opacity: 0;
  transition: opacity 350ms ease;
}

.node {
  position: absolute;
  width: 164px;
  min-height: 66px;
  padding: 0.65rem 0.7rem;
  border: 1px solid rgba(127, 145, 155, 0.32);
  border-radius: 0.65rem;
  background: rgba(24, 31, 37, 0.88);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.14);
  opacity: 0;
  transform: translate3d(0, 14px, 0) scale(0.96);
  transition:
    opacity 450ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 450ms ease,
    box-shadow 450ms ease;
}

.node strong {
  display: block;
  color: #e7eef2;
  font-size: 0.86rem;
}

.node span {
  display: block;
  margin-top: 0.2rem;
  color: rgba(231, 238, 242, 0.62);
  line-height: 1.35;
}

.node-state { left: 0; top: 36px; }
.node-questions { left: 0; top: 188px; }
.node-engine { left: 260px; top: 107px; width: 164px; }
.node-answer { left: 536px; top: 22px; }
.node-probability { left: 536px; top: 115px; }
.node-confidence { left: 536px; top: 208px; }
.node-action { left: 736px; top: 86px; width: 142px; }

.active .line {
  opacity: 1;
  animation: hfx-line-flow 1.6s linear infinite;
}

.active .line-a,
.active .node-state { transition-delay: 0ms; }
.active .line-b,
.active .node-questions { transition-delay: 80ms; }
.active .node-engine { transition-delay: 230ms; }
.active .line-c,
.active .node-answer { transition-delay: 460ms; }
.active .line-d,
.active .node-probability { transition-delay: 540ms; }
.active .line-e,
.active .node-confidence { transition-delay: 620ms; }
.active .line-f,
.active .node-action { transition-delay: 790ms; }

.active .node {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.active .node-engine {
  border-color: rgba(78, 197, 212, 0.62);
  box-shadow:
    0 0 0 1px rgba(78, 197, 212, 0.12),
    0 18px 48px rgba(78, 197, 212, 0.16);
}

.active .node-action {
  border-color: rgba(139, 92, 246, 0.55);
}

@keyframes hfx-line-flow {
  to { stroke-dashoffset: -48; }
}

@media (prefers-reduced-motion: reduce) {
  .active .line {
    animation: none;
  }
}
</style>
