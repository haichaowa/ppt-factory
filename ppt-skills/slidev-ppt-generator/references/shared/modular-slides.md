# 长演讲模块化拆分指南

> 借鉴 [rhuss/cc-slidev](https://github.com/rhuss/cc-slidev) 的 `slides/01-title.md` 模式。
> 单个 `slides.md` 文件超过 40 页后，维护成本急剧上升：git diff 噪音大、多人协作冲突高、章节定位困难。

## 何时启用模块化

| targetPages | 推荐结构 | 说明 |
|------------|---------|------|
| ≤ 25 页 | 单 `slides.md` | 默认方式，无需拆分 |
| 25 - 40 页 | 可选拆分 | 视章节边界清晰度而定 |
| > 40 页 | **必须拆分** | 强制采用模块化结构 |

## 目录结构

```
artifact/{YYYY-MM-DD}-{slug}/
├── slides.md              # 主文件（仅含 headmatter + 引用）
├── sections/              # 所有章节文件
│   ├── 00-cover.md        # 封面
│   ├── 01-intro.md        # 引言 / 背景
│   ├── 02-problem.md      # 问题揭示
│   ├── 03-solution.md     # 方案展开
│   ├── 04-deep-dive.md    # 深入讲解
│   ├── 05-demo.md         # 演示 / 案例
│   ├── 06-results.md      # 结果数据
│   ├── 07-summary.md      # 总结
│   └── 99-end.md          # 结束页
├── uno.config.ts
├── style.css
├── global-bottom.vue
└── public/
```

## 命名规范

- 前缀：`{两位数序号}-{kebab-case-标题}.md`
- 起始：`00`（封面）
- 结束：`99`（致谢/结束页）
- 示例：
  - ✅ `00-cover.md` / `03-solution.md` / `99-end.md`
  - ❌ `cover.md`（无序号）/ `1.intro.md`（单位数）/ `03Solution.md`（驼峰）

## 主文件示例（slides.md）

```markdown
---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: 演讲主标题
glowSeed: 150
fonts:
  sans: 'DM Sans'
  mono: 'Fira Code'
---

<Src src="./sections/00-cover.md" />

---
<Src src="./sections/01-intro.md" />

---
<Src src="./sections/02-problem.md" />

---
<Src src="./sections/03-solution.md" />

---
<Src src="./sections/04-deep-dive.md" />

---
<Src src="./sections/05-demo.md" />

---
<Src src="./sections/06-results.md" />

---
<Src src="./sections/07-summary.md" />

---
<Src src="./sections/99-end.md" />
```

### 主文件规则

- **只包含 headmatter（全局）+ `<Src />` 引用**
- 每个章节之间用 `---` 分隔
- **章节内的 per-slide frontmatter（如 `glowSeed`、`clicks`）放在对应章节文件内**
- 全局 headmatter 中的 `theme`、`fonts`、`colorSchema` 对所有章节生效

## 章节文件示例

### 00-cover.md（封面）

```markdown
---
glowSeed: 100
---

# 演讲主标题

<div class="text-xl opacity-70 mt-4">
  副标题 / 一句话价值主张
</div>

<div class="mt-20 text-sm opacity-50">
  演讲者 · 日期
</div>
```

### 03-solution.md（多页章节）

一个章节文件**可以包含多张幻灯片**，用 `---` 分隔：

```markdown
---
layout: section
glowSeed: 300
---

# 第三章：解决方案

---
class: py-10
clicks: 3
glowSeed: 310
---

## 核心架构

<div class="grid grid-cols-3 gap-6 mt-10">
  <!-- 3 个特性卡片 -->
</div>

---
class: py-10
clicks: 2
glowSeed: 320
---

## 数据流

<!-- 流程图 -->
```

## `<Src />` 组件说明

Slidev 原生支持 `<Src src="..." />` 组件，用于引用外部 Markdown 文件。

### 特性
- **递归支持**：章节文件内也可以引用子章节（但避免超过 2 层嵌套）
- **变量继承**：全局 headmatter 的变量在所有章节内可用
- **路径相对**：相对于主 `slides.md` 文件
- **热更新**：dev 模式下修改章节文件会自动热更新

### 限制
- 章节文件**不能有自己的全局 headmatter**（只有第一个文件的 headmatter 生效）
- 章节文件的 frontmatter 仅作用于该文件的幻灯片
- 路径中**不能使用变量**（`<Src :src="path" />` 不支持）

## 在 ppt-structure-analyst 中的处理

当 `targetPages > 25` 时，agent 应在 outline.md 中**按章节分组**：

```markdown
# outline.md（模块化）

## 章节 0：封面
- 第 1 页：封面

## 章节 1：引言
- 第 2 页：背景介绍
- 第 3 页：问题定义

## 章节 2：方案
- 第 4 页：核心架构
- 第 5 页：数据流
- 第 6 页：关键算法

...
```

在 metadata.json 中标注：
```json
{
  "targetPages": 40,
  "modular": true,
  "sections": [
    { "title": "封面", "pages": 1, "file": "00-cover.md" },
    { "title": "引言", "pages": 2, "file": "01-intro.md" },
    { "title": "方案", "pages": 3, "file": "02-solution.md" }
  ]
}
```

## 在 Skill 生成阶段的处理

Skill 在步骤 3（生成项目）时：

1. 读取 metadata.json 的 `modular` 字段
2. 若 `modular: true`：
   - 创建 `sections/` 目录
   - 按 metadata.json 的 `sections` 列表生成对应章节文件
   - 主 `slides.md` 仅包含 headmatter + `<Src />` 引用
3. 若 `modular: false` 或未设置：
   - 生成单一 `slides.md`（默认行为）

## 优势

| 维度 | 单文件 | 模块化 |
|------|--------|--------|
| Git diff 可读性 | 一次改动可能影响 40+ 页 | 改动局限于单章节文件 |
| 多人协作 | 冲突率高 | 章节级隔离，冲突少 |
| 章节定位 | Ctrl+F 搜索 | 文件树直接定位 |
| 局部 rebuild | 需要全量 build | dev 模式只重载改动章节 |
| AI 生成 token | 单次大 token 消耗 | 可分章节独立生成 |

## 注意事项

1. **主文件的 headmatter 是全局唯一的** —— 章节文件的 headmatter 仅是 per-slide 级别
2. **章节文件的 `---` 分隔符** —— 章节文件内部多页之间仍需 `---` 分隔
3. **public/ 资源路径不变** —— `sections/01.md` 中引用 `/images/x.png` 仍然指向 `public/images/x.png`
4. **相对路径引用慎用** —— `sections/01.md` 中若引用 `../other.md`，行为不确定，避免使用
