# Dark-Pro 主题 — 高级布局模式

Dark-Pro 主题专属的组合布局模板，围绕**深蓝灰 + 数据 + 稳重**展开。

通用参考：
- [Slidev 内置布局参考](../../shared/layout-reference.md)
- [组件参考](../../shared/component-reference.md)
- [Dark-Pro 主题配置](./theme-config.md)

---

## 季度 Review 封面

```markdown
---
layout: center
class: px-20
---

<div class="text-center">
  <span class="dark-pro-badge mb-4">Q3 2026 · 业务汇报</span>
  <h1 class="text-5xl font-bold mb-4 mt-4">季度业绩复盘</h1>
  <div class="dark-pro-divider mx-auto" />
  <div class="text-lg text-slate-400 mt-4">
    汇报人 · 部门 · 2026-09-30
  </div>
</div>
```

---

## KPI 指标看板

```markdown
---
class: py-12 px-20
clicks: 4
---

## 核心 KPI 达成情况

<div class="grid grid-cols-4 gap-6 mt-10">

<div
  v-click="1"
  class="dark-pro-card p-6"
  :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
  transition duration-300
>
  <div class="text-sm text-slate-400 mb-2">营业收入</div>
  <div class="dark-pro-metric text-3xl font-bold text-blue-400">¥1.28B</div>
  <div class="text-sm text-emerald-400 mt-2">↑ 56% YoY</div>
</div>

<div
  v-click="2"
  class="dark-pro-card p-6"
  :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
  transition duration-300
>
  <div class="text-sm text-slate-400 mb-2">活跃用户</div>
  <div class="dark-pro-metric text-3xl font-bold text-cyan-400">2.4M</div>
  <div class="text-sm text-emerald-400 mt-2">↑ 45% YoY</div>
</div>

<div
  v-click="3"
  class="dark-pro-card p-6"
  :class="$clicks < 3 ? 'opacity-0' : 'opacity-100'"
  transition duration-300
>
  <div class="text-sm text-slate-400 mb-2">毛利率</div>
  <div class="dark-pro-metric text-3xl font-bold text-emerald-400">68.2%</div>
  <div class="text-sm text-emerald-400 mt-2">↑ 4.2 pp</div>
</div>

<div
  v-click="4"
  class="dark-pro-card p-6"
  :class="$clicks < 4 ? 'opacity-0' : 'opacity-100'"
  transition duration-300
>
  <div class="text-sm text-slate-400 mb-2">NPS</div>
  <div class="dark-pro-metric text-3xl font-bold text-amber-400">52</div>
  <div class="text-sm text-rose-400 mt-2">↓ 3 pts</div>
</div>

</div>
```

---

## 状态徽章列表（项目进展）

```markdown
---
class: py-10 px-20
---

## 重点项目进展

<div class="space-y-4 mt-8">

<div class="dark-pro-card p-5 flex items-center justify-between">
  <div>
    <div class="font-semibold text-slate-100">用户画像系统升级</div>
    <div class="text-sm text-slate-400 mt-1">负责人：张三 · 预计 10.15 上线</div>
  </div>
  <span class="dark-pro-badge dark-pro-badge-success">已完成 85%</span>
</div>

<div class="dark-pro-card p-5 flex items-center justify-between">
  <div>
    <div class="font-semibold text-slate-100">支付链路优化</div>
    <div class="text-sm text-slate-400 mt-1">负责人：李四 · 预计 10.30 上线</div>
  </div>
  <span class="dark-pro-badge">进行中 · 60%</span>
</div>

<div class="dark-pro-card p-5 flex items-center justify-between">
  <div>
    <div class="font-semibold text-slate-100">数据中台迁移</div>
    <div class="text-sm text-slate-400 mt-1">负责人：王五 · 预计 11.20 上线</div>
  </div>
  <span class="dark-pro-badge dark-pro-badge-warning">风险 · 进度落后</span>
</div>

<div class="dark-pro-card p-5 flex items-center justify-between">
  <div>
    <div class="font-semibold text-slate-100">推荐算法 v2</div>
    <div class="text-sm text-slate-400 mt-1">负责人：赵六 · 预计 12.01 上线</div>
  </div>
  <span class="dark-pro-badge dark-pro-badge-danger">阻塞 · 待决策</span>
</div>

</div>
```

---

## 数据对比柱状图

```markdown
---
class: py-12 px-20
---

## 各季度营收对比

<div class="space-y-5 mt-10">

<div class="flex items-center gap-6">
  <div class="text-sm w-16 text-slate-400">Q1</div>
  <div class="flex-1 bg-slate-800 rounded h-8 relative overflow-hidden">
    <div class="absolute inset-y-0 left-0 bg-blue-500 rounded flex items-center justify-end px-3" style="width: 55%">
      <span class="text-xs font-bold">¥720M</span>
    </div>
  </div>
  <div class="text-sm tabular-nums w-12 text-right text-slate-400">100%</div>
</div>

<div class="flex items-center gap-6">
  <div class="text-sm w-16 text-slate-400">Q2</div>
  <div class="flex-1 bg-slate-800 rounded h-8 relative overflow-hidden">
    <div class="absolute inset-y-0 left-0 bg-blue-500 rounded flex items-center justify-end px-3" style="width: 72%">
      <span class="text-xs font-bold">¥950M</span>
    </div>
  </div>
  <div class="text-sm tabular-nums w-12 text-right text-emerald-400">+32%</div>
</div>

<div class="flex items-center gap-6">
  <div class="text-sm w-16 text-slate-400">Q3</div>
  <div class="flex-1 bg-slate-800 rounded h-8 relative overflow-hidden">
    <div class="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded flex items-center justify-end px-3" style="width: 97%">
      <span class="text-xs font-bold">¥1.28B</span>
    </div>
  </div>
  <div class="text-sm tabular-nums w-12 text-right text-emerald-400">+35%</div>
</div>

</div>
```

---

## SWOT 矩阵

```markdown
---
class: py-10 px-20
---

## 战略 SWOT 分析

<div class="grid grid-cols-2 gap-4 mt-8">

<div class="dark-pro-card p-6 border-l-4 border-l-emerald-500">
  <div class="flex items-center gap-2 mb-3">
    <span class="dark-pro-badge dark-pro-badge-success">S</span>
    <div class="font-bold text-emerald-300">优势</div>
  </div>
  <ul class="text-sm space-y-2 text-slate-300">
    <li>• 技术壁垒领先 2 年</li>
    <li>• 客户留存率 92%</li>
    <li>• 现金流充足</li>
  </ul>
</div>

<div class="dark-pro-card p-6 border-l-4 border-l-blue-500">
  <div class="flex items-center gap-2 mb-3">
    <span class="dark-pro-badge">W</span>
    <div class="font-bold text-blue-300">劣势</div>
  </div>
  <ul class="text-sm space-y-2 text-slate-300">
    <li>• 海外市场认知度低</li>
    <li>• 大客户依赖度 45%</li>
    <li>• 人才储备不足</li>
  </ul>
</div>

<div class="dark-pro-card p-6 border-l-4 border-l-cyan-500">
  <div class="flex items-center gap-2 mb-3">
    <span class="dark-pro-badge">O</span>
    <div class="font-bold text-cyan-300">机会</div>
  </div>
  <ul class="text-sm space-y-2 text-slate-300">
    <li>• 政策利好持续</li>
    <li>• 下游需求增长 40%</li>
    <li>• 海外竞品退出</li>
  </ul>
</div>

<div class="dark-pro-card p-6 border-l-4 border-l-amber-500">
  <div class="flex items-center gap-2 mb-3">
    <span class="dark-pro-badge dark-pro-badge-warning">T</span>
    <div class="font-bold text-amber-300">威胁</div>
  </div>
  <ul class="text-sm space-y-2 text-slate-300">
    <li>• 新进入者价格战</li>
    <li>• 原材料上涨</li>
    <li>• 地缘政治风险</li>
  </ul>
</div>

</div>
```

---

## 时间线（项目里程碑）

```markdown
---
class: py-10 px-20
clicks: 4
---

## 关键里程碑

<div class="ml-6 mt-8">

<v-clicks>

<div class="flex gap-6 mb-6">
  <div class="flex flex-col items-center">
    <div class="w-3 h-3 rounded-full bg-emerald-500 mt-2"></div>
    <div class="w-0.5 flex-1 bg-emerald-800/50 mt-1"></div>
  </div>
  <div class="flex-1 pb-2">
    <div class="text-xs font-mono text-slate-500">2026.01</div>
    <div class="font-semibold text-emerald-300">v1.0 发布</div>
    <div class="text-sm text-slate-400 mt-1">核心功能上线，首批 100 客户</div>
  </div>
</div>

<div class="flex gap-6 mb-6">
  <div class="flex flex-col items-center">
    <div class="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>
    <div class="w-0.5 flex-1 bg-blue-800/50 mt-1"></div>
  </div>
  <div class="flex-1 pb-2">
    <div class="text-xs font-mono text-slate-500">2026.04</div>
    <div class="font-semibold text-blue-300">海外市场启动</div>
    <div class="text-sm text-slate-400 mt-1">进入东南亚 3 国，签约 20 客户</div>
  </div>
</div>

<div class="flex gap-6 mb-6">
  <div class="flex flex-col items-center">
    <div class="w-3 h-3 rounded-full bg-cyan-500 mt-2"></div>
    <div class="w-0.5 flex-1 bg-cyan-800/50 mt-1"></div>
  </div>
  <div class="flex-1 pb-2">
    <div class="text-xs font-mono text-slate-500">2026.07</div>
    <div class="font-semibold text-cyan-300">B 轮融资完成</div>
    <div class="text-sm text-slate-400 mt-1">融资 ¥500M，估值 ¥5B</div>
  </div>
</div>

<div class="flex gap-6">
  <div class="flex flex-col items-center">
    <div class="w-3 h-3 rounded-full bg-amber-500 mt-2"></div>
  </div>
  <div class="flex-1">
    <div class="text-xs font-mono text-slate-500">2026.12（预期）</div>
    <div class="font-semibold text-amber-300">v2.0 发布</div>
    <div class="text-sm text-slate-400 mt-1">AI 能力集成，生态开放</div>
  </div>
</div>

</v-clicks>

</div>
```

---

## 强调结论卡片

```markdown
---
class: py-12 px-20
---

## 本季度核心结论

<div class="dark-pro-card-accent py-6 px-8 mt-8">
  <div class="text-lg font-bold text-blue-300 mb-2">
    营收增长 56%，但 NPS 下降 3 点
  </div>
  <div class="text-base text-slate-300 leading-relaxed">
    增长主要来自新客户获取（+62%），老客户满意度下降值得关注。
    下季度重点：在不放缓增长的前提下，提升服务质量。
  </div>
</div>

<div class="mt-6 text-sm text-slate-500 italic">
  详见附录 A · 数据来源：CRM 系统 + 客户调研（N=1,284）
</div>
```
