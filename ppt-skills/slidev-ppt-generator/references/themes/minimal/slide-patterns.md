# Minimal 主题 — 高级布局模式

Minimal 主题专属的组合布局模板，围绕**白底 + 衬线 + 极简**展开。

通用参考：
- [Slidev 内置布局参考](../../shared/layout-reference.md)
- [组件参考](../../shared/component-reference.md)
- [Minimal 主题配置](./theme-config.md)

---

## 学术封面

```markdown
---
layout: center
class: px-20
---

<div class="text-center">
  <div class="text-sm uppercase tracking-widest text-gray-500 mb-4">研究报告 · 2026</div>
  <h1 class="text-5xl font-semibold mb-2">研究主题</h1>
  <div class="minimal-divider mx-auto" />
  <div class="text-lg text-gray-600 italic">副标题 · 研究范围说明</div>
  <div class="mt-12 text-sm text-gray-500">
    作者姓名 · 所属机构 · 邮箱
  </div>
</div>
```

---

## 数据要点（极简卡片）

```markdown
---
class: py-12 px-20
---

## 研究发现：X 对 Y 的影响显著

<div class="grid grid-cols-3 gap-6 mt-10">

<div class="border border-gray-200 bg-white px-5 py-4 shadow-sm">
  <div class="text-3xl font-bold text-blue-700 tabular-nums">+24.5%</div>
  <div class="text-sm text-gray-600 mt-2">主要指标提升幅度</div>
</div>

<div class="border border-gray-200 bg-white px-5 py-4 shadow-sm">
  <div class="text-3xl font-bold text-gray-900 tabular-nums">1,284</div>
  <div class="text-sm text-gray-600 mt-2">样本数量</div>
</div>

<div class="border border-gray-200 bg-white px-5 py-4 shadow-sm">
  <div class="text-3xl font-bold text-emerald-700 tabular-nums">p &lt; 0.01</div>
  <div class="text-sm text-gray-600 mt-2">统计显著性</div>
</div>

</div>
```

---

## 学术引用

```markdown
---
layout: quote
class: px-24
---

<blockquote class="minimal-quote text-2xl leading-relaxed">
  引用原文内容，逐字保留原始措辞，不增不减。
  <footer class="text-sm text-gray-500 mt-4">
    —— 作者姓 名, 《书名》(年份, 页码)
  </footer>
</blockquote>
```

---

## 对比分析（细线表格）

```markdown
---
class: py-10 px-20
---

## 传统方法 vs 本研究方法

| 维度 | 传统方法 | 本研究方法 | 改进 |
|------|---------|-----------|------|
| 样本量 | 100-500 | 1,284 | 2.5-12x |
| 准确率 | 78.2% | 94.6% | +16.4 pp |
| 训练时长 | 48h | 12h | -75% |

<div class="text-xs text-gray-500 mt-4 italic">
  注：pp = percentage points，百分点
</div>
```

---

## 章节分隔（极简）

```markdown
---
layout: section
class: px-20
---

<div>
  <div class="text-sm uppercase tracking-widest text-gray-500 mb-2">第二部分</div>
  <h2 class="text-4xl font-semibold">研究方法</h2>
  <div class="minimal-divider" />
</div>
```

---

## 引用列表（参考文献）

```markdown
---
class: py-10 px-20
---

## 参考文献

<div class="text-sm leading-relaxed space-y-2">

[1] Author A, Author B. Title of the paper. *Journal Name*, 2024, 15(3): 100-115.

[2] 作者甲, 作者乙. 论文标题. *期刊名*, 2023, 12(4): 200-218.

[3] Author C. *Book Title* (2nd ed.). Publisher, 2022.

</div>
```

---

## 时间线（研究进度）

```markdown
---
class: py-10 px-20
---

## 研究时间线

<div class="ml-8 mt-6">

<div class="flex gap-6 mb-6">
  <div class="text-sm font-mono text-gray-500 w-24">2024.03</div>
  <div class="flex-1 border-l-2 border-gray-300 pl-4">
    <div class="font-semibold">文献综述完成</div>
    <div class="text-sm text-gray-600 mt-1">梳理 120+ 篇相关研究</div>
  </div>
</div>

<div class="flex gap-6 mb-6">
  <div class="text-sm font-mono text-gray-500 w-24">2024.06</div>
  <div class="flex-1 border-l-2 border-gray-300 pl-4">
    <div class="font-semibold">实验设计定稿</div>
    <div class="text-sm text-gray-600 mt-1">2×2 因子设计，1284 样本</div>
  </div>
</div>

<div class="flex gap-6">
  <div class="text-sm font-mono text-gray-500 w-24">2024.09</div>
  <div class="flex-1 border-l-2 border-gray-300 pl-4">
    <div class="font-semibold">数据收集完成</div>
    <div class="text-sm text-gray-600 mt-1">达到预设统计功效</div>
  </div>
</div>

</div>
```

---

## 定义卡片（术语表）

```markdown
---
class: py-10 px-20
---

## 核心术语

<div class="grid grid-cols-2 gap-4 mt-6">

<div class="border-l-2 border-gray-400 pl-4 py-2">
  <div class="font-semibold text-gray-900">构念效度</div>
  <div class="text-sm text-gray-600 mt-1">
    测量工具能够测出被测构念的理论程度。
  </div>
</div>

<div class="border-l-2 border-gray-400 pl-4 py-2">
  <div class="font-semibold text-gray-900">内部一致性</div>
  <div class="text-sm text-gray-600 mt-1">
    测量工具各题目之间的相关性，常用 Cronbach's α 衡量。
  </div>
</div>

</div>
```
