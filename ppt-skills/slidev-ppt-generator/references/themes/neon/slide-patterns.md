# Neon 主题 — 高级布局模式

Neon 主题专属的组合布局模板，围绕**霓虹光效 + 赛博朋克 + 故障美学**展开。

通用参考：
- [Slidev 内置布局参考](../../shared/layout-reference.md)
- [组件参考](../../shared/component-reference.md)
- [Neon 主题配置](./theme-config.md)

---

## 赛博封面

```markdown
---
layout: center
class: px-20
neonHue: 280
neonIntensity: 0.8
---

<div class="text-center">
  <div class="text-sm uppercase tracking-[0.4em] neon-text-cyan mb-6 font-mono">
    [ SYSTEM ONLINE ] · 2026
  </div>
  <h1 class="text-7xl font-extrabold tracking-wider uppercase neon-glitch neon-text-pink">
    CYBER FUTURE
  </h1>
  <div class="text-xl mt-8 neon-text-cyan opacity-80 font-mono">
    &gt; 在霓虹中重新定义未来_
  </div>
  <div class="mt-12 text-xs font-mono opacity-50">
    // 演讲者 · 部门 · 2026.06.22
  </div>
</div>
```

---

## 霓虹特性卡片

```markdown
---
class: py-12 px-20
clicks: 3
neonHue: 300
---

## 核心能力

<div class="grid grid-cols-3 gap-6 mt-12">

<div
  v-click="1"
  class="neon-card p-8 text-center"
  :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  transition transform duration-500
>
  <div class="text-6xl mb-4 neon-text-pink">⚡</div>
  <div class="text-xl font-bold neon-text-pink mb-2 uppercase">SPEED</div>
  <div class="text-sm opacity-80 font-mono">&gt; 1000 req/s</div>
</div>

<div
  v-click="2"
  class="neon-card-cyan p-8 text-center"
  :class="$clicks < 2 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  transition transform duration-500
>
  <div class="text-6xl mb-4 neon-text-cyan">⬢</div>
  <div class="text-xl font-bold neon-text-cyan mb-2 uppercase">SECURE</div>
  <div class="text-sm opacity-80 font-mono">AES-256 + E2E</div>
</div>

<div
  v-click="3"
  class="neon-card p-8 text-center"
  :class="$clicks < 3 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  transition transform duration-500
>
  <div class="text-6xl mb-4 neon-text-green">◈</div>
  <div class="text-xl font-bold neon-text-green mb-2 uppercase">SCALABLE</div>
  <div class="text-sm opacity-80 font-mono">∞ horizontal scale</div>
</div>

</div>
```

---

## 终端代码块

```markdown
---
class: py-10 px-20
clicks: 3
---

## 启动序列

<div class="mt-8 neon-border-cyan p-6 bg-black/60 font-mono text-sm">

<div v-click="1" :class="$clicks < 1 ? 'opacity-30' : 'opacity-100'" class="neon-text-green">
  $ ./init.sh --mode=production
</div>

<div v-click="2" :class="$clicks < 2 ? 'opacity-30' : 'opacity-100'" class="mt-2 neon-text-cyan">
  [INFO] Loading kernel modules... <span class="neon-text-green">OK</span>
</div>

<div v-click="3" :class="$clicks < 3 ? 'opacity-30' : 'opacity-100'" class="mt-2 neon-text-cyan">
  [INFO] Establishing neural link... <span class="neon-text-green">CONNECTED</span>
</div>

<div class="mt-2 neon-text-pink neon-flicker">
  [SUCCESS] System ready. Welcome to the grid.
</div>

</div>
```

---

## 数据流图（节点 + 连线）

```markdown
---
class: py-10 px-20
clicks: 4
---

## 数据流架构

<div class="flex items-center justify-center gap-2 mt-12">

<div
  v-click="1"
  class="neon-border-cyan px-6 py-8 text-center min-w-[120px]"
  :class="$clicks < 1 ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'"
  transition transform duration-500
>
  <div class="text-3xl neon-text-cyan">▣</div>
  <div class="text-sm mt-2 neon-text-cyan uppercase">INPUT</div>
</div>

<div class="text-3xl neon-text-pink opacity-50">→</div>

<div
  v-click="2"
  class="neon-border-pink px-6 py-8 text-center min-w-[120px] neon-pulse"
  :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
  transition duration-500
>
  <div class="text-3xl neon-text-pink">◈</div>
  <div class="text-sm mt-2 neon-text-pink uppercase">PROCESS</div>
</div>

<div class="text-3xl neon-text-pink opacity-50">→</div>

<div
  v-click="3"
  class="neon-border-cyan px-6 py-8 text-center min-w-[120px]"
  :class="$clicks < 3 ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'"
  transition transform duration-500
>
  <div class="text-3xl neon-text-cyan">◆</div>
  <div class="text-sm mt-2 neon-text-cyan uppercase">OUTPUT</div>
</div>

</div>

<div
  v-click="4"
  class="mt-12 text-center font-mono text-sm neon-text-green"
  :class="$clicks < 4 ? 'opacity-0' : 'opacity-100'"
  transition duration-500
>
  &gt; Throughput: 12.4 GB/s · Latency: 8ms
</div>
```

---

## 大字号宣言

```markdown
---
layout: center
class: px-24
neonHue: 320
---

<div class="text-center">
  <div class="text-9xl font-black uppercase tracking-tight neon-glitch">
    <span class="neon-text-pink">FUTURE</span>
  </div>
  <div class="text-9xl font-black uppercase tracking-tight neon-glitch mt-2">
    <span class="neon-text-cyan">IS NOW</span>
  </div>
  <div class="text-xl mt-12 opacity-60 font-mono">
    // 欢迎来到下一代基础设施
  </div>
</div>
```

---

## 状态指示器

```markdown
---
class: py-10 px-20
---

## 系统状态

<div class="grid grid-cols-2 gap-4 mt-8">

<div class="neon-card p-5 flex items-center justify-between">
  <div class="font-mono text-sm neon-text-cyan">API GATEWAY</div>
  <div class="flex items-center gap-2">
    <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
    <span class="text-xs neon-text-green font-mono">ONLINE</span>
  </div>
</div>

<div class="neon-card p-5 flex items-center justify-between">
  <div class="font-mono text-sm neon-text-cyan">DATABASE</div>
  <div class="flex items-center gap-2">
    <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
    <span class="text-xs neon-text-green font-mono">HEALTHY</span>
  </div>
</div>

<div class="neon-card p-5 flex items-center justify-between">
  <div class="font-mono text-sm neon-text-cyan">CDN</div>
  <div class="flex items-center gap-2">
    <div class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
    <span class="text-xs neon-text-yellow font-mono">DEGRADED</span>
  </div>
</div>

<div class="neon-card p-5 flex items-center justify-between">
  <div class="font-mono text-sm neon-text-cyan">CACHE</div>
  <div class="flex items-center gap-2">
    <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
    <span class="text-xs neon-text-green font-mono">SYNCED</span>
  </div>
</div>

</div>
```

---

## 故障文字章节分隔

```markdown
---
layout: section
class: px-20
neonHue: 200
---

<div class="text-center">
  <div class="text-sm uppercase tracking-[0.4em] neon-text-cyan opacity-60 font-mono mb-4">
    [ CHAPTER 02 ]
  </div>
  <h2 class="text-8xl font-extrabold uppercase tracking-wider neon-glitch neon-text-pink">
    ARCHITECTURE
  </h2>
  <div class="text-lg mt-6 opacity-70 font-mono neon-text-cyan">
    &gt; 系统如何运作_
  </div>
</div>
```

---

## CTA 结束页（霓虹召唤）

```markdown
---
layout: center
class: px-20
neonHue: 280
neonIntensity: 0.9
---

<div class="text-center">
  <div class="text-7xl font-black uppercase tracking-tight neon-glitch neon-text-pink mb-8">
    JACK IN
  </div>
  <div class="text-xl neon-text-cyan opacity-80 font-mono mb-12">
    &gt; 一起构建下一代_
  </div>
  <div class="flex justify-center gap-4">
    <span class="neon-border-pink neon-pulse px-8 py-4 font-mono uppercase tracking-wider text-sm">
      &gt; git clone future
    </span>
  </div>
  <div class="mt-12 text-xs font-mono opacity-50">
    // github.com/your-org · @handle
  </div>
</div>
```
