---
theme: geist
title: Geist 技术分享模板
highlighter: shiki
transition: slide-left
mdc: true
lang: zh-CN
---

# Geist 技术分享

### Vercel 设计语言 · 黑白极简 + 等宽点缀

<div class="pt-12 font-mono text-sm opacity-60">
  $ whoami —— 演讲人 / 2026-09
</div>

---

# 议程

- <span class="font-mono text-sm">01</span> 背景与动机
- <span class="font-mono text-sm">02</span> 架构设计
- <span class="font-mono text-sm">03</span> 核心实现
- <span class="font-mono text-sm">04</span> 性能数据
- <span class="font-mono text-sm">05</span> 总结

---

# 架构设计

极简排版：大标题、短句子、大留白。

<v-click>

每一页只讲一件事。

</v-click>

<v-click>

多余装饰全部去掉，信息密度让位于清晰度。

</v-click>

---

# 核心实现

```ts {3-5|7|all}
import { defineConfig } from 'vite'

export default defineConfig({
  // 按需加载，冷启动毫秒级
  plugins: [svelte(), importAnalysis()],
})

build: { target: 'esnext' }
```

---

# 性能数据

<div class="grid grid-cols-3 gap-6 pt-8">

<div class="text-center">

<div class="font-mono text-5xl font-bold">98</div>
<div class="pt-2 text-sm opacity-70">Lighthouse 得分</div>

</div>

<div class="text-center">

<div class="font-mono text-5xl font-bold">0.3s</div>
<div class="pt-2 text-sm opacity-70">首屏渲染</div>

</div>

<div class="text-center">

<div class="font-mono text-5xl font-bold">-42%</div>
<div class="pt-2 text-sm opacity-70">包体积下降</div>

</div>

</div>

---
layout: center
---

<div class="text-center">

# 谢谢

### `git push` 而非 PPT

<div class="pt-6 font-mono text-sm opacity-60">
  github.com/yourname · @yourname
</div>

</div>
