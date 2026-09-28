<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'

const active = useIsSlideActive()
</script>

<template>
  <div class="route-notification" :class="{ active }" role="figure" aria-label="Ticket routed notification">
    <div class="app-icon">Jev</div>
    <div class="notification-body">
      <div class="notification-title">Ticket routed</div>
      <div class="notification-text">Billing · High priority · Refund workflow</div>
      <div class="notification-meta">confidence 0.94 → auto action</div>
    </div>
    <div class="notification-now">now</div>
  </div>
</template>

<style scoped>
.route-notification {
  position: absolute;
  right: 1.5rem;
  bottom: 5.4rem;
  z-index: 3;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.7rem;
  align-items: center;
  width: 315px;
  padding: 0.7rem 0.8rem;
  border: 1px solid rgba(226, 232, 240, 0.20);
  border-radius: 0.85rem;
  background: rgba(13, 22, 31, 0.94);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.30);
  opacity: 0;
  transform: translate3d(0, 16px, 0) scale(0.97);
  transition:
    opacity 450ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.route-notification.active {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
  transition-delay: 650ms;
}

.app-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: #4ec5d4;
  color: #041018;
  font-size: 0.66rem;
  font-weight: 800;
}

.notification-title {
  color: #f4f9fb;
  font-size: 0.78rem;
  font-weight: 700;
}

.notification-text {
  margin-top: 0.12rem;
  color: rgba(231, 240, 245, 0.78);
  font-size: 0.68rem;
}

.notification-meta {
  margin-top: 0.18rem;
  color: #8ce8f7;
  font-family: "PT Mono", ui-monospace, monospace;
  font-size: 0.60rem;
}

.notification-now {
  color: rgba(231, 240, 245, 0.48);
  font-size: 0.60rem;
}

@media (prefers-reduced-motion: reduce) {
  .route-notification {
    transition: none;
  }

  .route-notification.active {
    transition-delay: 0ms;
  }
}
</style>
