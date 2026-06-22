# Bold 主题 — 高级布局模式

Bold 主题专属的组合布局模板，围绕**大字号 + 强对比 + 渐变**展开。

通用参考：
- [Slidev 内置布局参考](../../shared/layout-reference.md)
- [组件参考](../../shared/component-reference.md)
- [Bold 主题配置](./theme-config.md)

---

## Hero 封面（Apple / Stripe 风）

```markdown
---
layout: center
class: px-24
transition: slide-left
---

<div class="text-center">
  <div class="text-sm uppercase tracking-widest opacity-60 mb-6">2026 · 产品发布</div>
  <h1 class="text-8xl font-extrabold tracking-tighter leading-none">
    <span class="bold-gradient-text">产品名</span>
  </h1>
  <div class="text-2xl mt-8 opacity-80 font-light">
    一句话价值主张，说清为谁解决什么问题
  </div>
  <div class="mt-12 flex justify-center gap-4">
    <span class="px-6 py-2 rounded-full bg-white text-gray-900 font-semibold">立即体验</span>
    <span class="px-6 py-2 rounded-full border border-white/30">了解更多</span>
  </div>
</div>
```

---

## 大数字 Hero

```markdown
---
layout: center
class: px-24
---

<div class="text-center">
  <div class="text-9xl font-black tabular-nums leading-none">
    <span class="bold-gradient-text">10x</span>
  </div>
  <div class="text-3xl mt-6 font-semibold">性能提升</div>
  <div class="text-lg mt-4 opacity-70">对比上一代产品</div>
</div>
```

---

## 特性卡片（大图标 + 大字）

```markdown
---
class: py-16 px-20
clicks: 3
---

## 三个核心特性

<div class="grid grid-cols-3 gap-8 mt-12">

<div
  v-click="1"
  class="bold-card bg-white/10 dark:bg-gray-800/50 p-10 text-center"
  :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  transition transform duration-700
>
  <div class="text-7xl mb-6">⚡</div>
  <div class="text-3xl font-extrabold mb-3">极速</div>
  <div class="text-lg opacity-70">毫秒级响应</div>
</div>

<div
  v-click="2"
  class="bold-card bg-white/10 dark:bg-gray-800/50 p-10 text-center"
  :class="$clicks < 2 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  transition transform duration-700
>
  <div class="text-7xl mb-6">🔒</div>
  <div class="text-3xl font-extrabold mb-3">安全</div>
  <div class="text-lg opacity-70">端到端加密</div>
</div>

<div
  v-click="3"
  class="bold-card bg-white/10 dark:bg-gray-800/50 p-10 text-center"
  :class="$clicks < 3 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  transition transform duration-700
>
  <div class="text-7xl mb-6">🎨</div>
  <div class="text-3xl font-extrabold mb-3">优雅</div>
  <div class="text-lg opacity-70">极致用户体验</div>
</div>

</div>
```

---

## 大引用（Keynote 风）

```markdown
---
layout: center
class: px-32
---

<div class="text-center">
  <div class="text-6xl font-bold leading-tight tracking-tight">
    "简洁是<br/><span class="bold-gradient-text">终极的复杂。</span>"
  </div>
  <div class="text-xl mt-8 opacity-60 font-light">—— Leonardo da Vinci</div>
</div>
```

---

## 对比页（大卡片）

```markdown
---
class: py-16 px-20
clicks: 2
---

## 从复杂到简单

<div class="grid grid-cols-2 gap-12 mt-10">

<div
  v-click="1"
  class="bold-card p-12"
  :class="$clicks < 1 ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'"
  transition transform duration-700
  style="background: rgba(239, 68, 68, 0.1); border: 2px solid rgba(239, 68, 68, 0.3);"
>
  <div class="text-sm uppercase tracking-widest text-red-400 mb-4">过去</div>
  <div class="text-4xl font-extrabold mb-4">复杂</div>
  <div class="text-lg opacity-70">需要 10 步配置</div>
</div>

<div
  v-click="2"
  class="bold-card p-12"
  :class="$clicks < 2 ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'"
  transition transform duration-700
  style="background: rgba(16, 185, 129, 0.1); border: 2px solid rgba(16, 185, 129, 0.3);"
>
  <div class="text-sm uppercase tracking-widest text-emerald-400 mb-4">现在</div>
  <div class="text-4xl font-extrabold mb-4">简单</div>
  <div class="text-lg opacity-70">一行命令即可</div>
</div>

</div>
```

---

## 章节分隔（大字号）

```markdown
---
layout: section
class: px-20
---

<div>
  <div class="text-sm uppercase tracking-widest opacity-60 mb-4">02</div>
  <h2 class="text-7xl font-extrabold tracking-tighter">问题</h2>
  <div class="text-xl mt-6 opacity-70 font-light">我们到底在解决什么</div>
</div>
```

---

## 数据指标墙

```markdown
---
layout: center
class: px-20
clicks: 4
---

<div class="grid grid-cols-4 gap-8">

<div
  v-click="1"
  class="text-center"
  :class="$clicks < 1 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
  transition duration-500
>
  <div class="text-7xl font-extrabold tabular-nums bold-gradient-text">1M+</div>
  <div class="text-lg mt-2 opacity-70">用户</div>
</div>

<div
  v-click="2"
  class="text-center"
  :class="$clicks < 2 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
  transition duration-500
>
  <div class="text-7xl font-extrabold tabular-nums bold-gradient-text">99.9%</div>
  <div class="text-lg mt-2 opacity-70">可用性</div>
</div>

<div
  v-click="3"
  class="text-center"
  :class="$clicks < 3 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
  transition duration-500
>
  <div class="text-7xl font-extrabold tabular-nums bold-gradient-text">50+</div>
  <div class="text-lg mt-2 opacity-70">国家</div>
</div>

<div
  v-click="4"
  class="text-center"
  :class="$clicks < 4 ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'"
  transition duration-500
>
  <div class="text-7xl font-extrabold tabular-nums bold-gradient-text">4.9★</div>
  <div class="text-lg mt-2 opacity-70">用户评分</div>
</div>

</div>
```

---

## CTA 行动召唤（结束页）

```markdown
---
layout: center
class: px-24
---

<div class="text-center">
  <div class="text-6xl font-extrabold tracking-tight mb-8">
    <span class="bold-gradient-text">立即开始</span>
  </div>
  <div class="text-2xl opacity-80 mb-12 font-light">
    30 天免费试用，无需信用卡
  </div>
  <div class="flex justify-center gap-6">
    <span class="px-10 py-4 rounded-full bg-white text-gray-900 text-xl font-bold animate-bold-pulse">
      免费试用 →
    </span>
  </div>
  <div class="text-sm mt-12 opacity-50 font-mono">product.com</div>
</div>
```
