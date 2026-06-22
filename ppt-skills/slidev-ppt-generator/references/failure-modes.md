# Slidev 生成失败模式目录

> 借鉴 [Akxan/ppt-agent-skill](https://github.com/Akxan/ppt-agent-skill) 的 8 种 failure modes 目录理念。
> 每条 FM 包含：症状、严重度、检测方法、修复方案、示例对照。

## 使用方法

1. **Build 失败时**：对照错误信息，在下方表格中搜索"症状"关键词
2. **生成前预检**：对照"检测"列，主动扫描 slides.md 避免已知坑
3. **未来新坑**：发现新的失败模式时，按本格式追加到对应章节

---

## FM 总览（按严重度）

| 编号 | 名称 | 严重度 | 关键症状 |
|------|------|--------|---------|
| [FM-01](#fm-01unocss-裸属性--编译错误) | UnoCSS 裸属性 `/` 编译错误 | 🔴 Blocker | `Illegal '/' in tags` |
| [FM-02](#fm-02代码块嵌套在-html-卡片内导致编译失败) | 代码块嵌套在 HTML 卡片内 | 🔴 Blocker | `Element is missing end tag` |
| [FM-03](#fm-03v-clicks-把箭头当动画目标) | `<v-clicks>` 把箭头当动画目标 | 🟡 Major | 箭头 `→` 随点击出现/消失 |
| [FM-04](#fm-04孤立-frontmatter-产生空白页) | 孤立 frontmatter 产生空白页 | 🟡 Major | build 成功但 PDF 多出空白页 |
| [FM-05](#fm-05代码块超出幻灯片高度) | 代码块超出幻灯片高度 | 🟢 Minor | 代码底部被裁切 |
| [FM-06](#fm-06v-click-编号与-clicks-不匹配) | `v-click` 编号与 `clicks:` 不匹配 | 🟡 Major | 动画不触发或提前结束 |
| [FM-07](#fm-07headmatter-缺少必需键) | headmatter 缺少必需键 | 🟡 Major | Glow 效果不显示 / 字体未加载 |
| [FM-08](#fm-08translate-y--下移后兄弟元素重叠) | `translate-y-*` 下移后兄弟元素重叠 | 🟢 Minor | 内容视觉重叠 |

**严重度定义**：
- 🔴 **Blocker**：build 直接失败，必须修复才能继续
- 🟡 **Major**：build 成功但功能异常（动画/效果/空白页），影响演示质量
- 🟢 **Minor**：视觉瑕疵，不阻断演示但影响美观

---

## FM-01：UnoCSS 裸属性 `/` 编译错误

### 症状
```
[vite:vue] Element is missing end tag.
Illegal '/' in tags.
```

### 严重度
🔴 **Blocker**

### 检测方法

**自动检测脚本**（grep 模式）：
```bash
grep -nE '<[a-zA-Z][^>]*\s(text|bg|border|opacity)-[a-z]+/[0-9]+' slides.md
```

**人工检查**：扫描所有 HTML 标签的裸属性，凡是含 `/` 的必须改为 `class="..."`。

### 修复方案

| 场景 | ❌ 错误 | ✅ 正确 |
|------|--------|---------|
| 文字透明度 | `<span text-white/50>文字</span>` | `<span class="text-white/50">文字</span>` |
| 背景透明度 | `<div bg-blue-500/20>...</div>` | `<div class="bg-blue-500/20">...</div>` 或 `<div bg="blue-500/20">...</div>` |
| 边框透明度 | `<div border-violet-800/50>...</div>` | `<div border="2 solid violet-800/50">...</div>` |

### 例外（引号内安全）

```md
<!-- ✅ 写在引号值内是安全的 -->
<div bg="blue-500/20">文字</div>
<div border="2 solid teal-800/50">文字</div>
```

### 原因

Vue 模板编译器将裸属性中的 `/` 解析为 HTML 标签闭合符，导致后续内容被当作新标签。引号内的值（`bg="..."`、`border="..."`）被当作字符串，不受影响。

### 相关规则

[syntax-rules.md 规则 2](./syntax-rules.md#规则-2含--的工具类必须用-class-属性)

---

## FM-02：代码块嵌套在 HTML 卡片内导致编译失败

### 症状
```
[vite:vue] Element is missing end tag.
```

或者**没有报错但代码块后的 HTML 元素不渲染**。

### 严重度
🔴 **Blocker**

### 检测方法

**人工检查**：扫描所有 `<div>` / `<section>` 等 HTML 容器，若内部包含 ` ``` ` 代码块，且代码块后**还有其他 HTML 元素**，即触发。

### 修复方案

```md
<!-- ❌ 错误 - 代码块嵌套在卡片内 + 后跟 HTML 元素 -->
<div class="card">
  ```ts
  const x = 1
  ```

  <div>提示文字</div>  <!-- 无法渲染 -->
</div>

<!-- ✅ 正确 - 把代码块和文字都放在卡片外部 -->
<div class="card">
  <!-- 卡片其他内容 -->
</div>

```ts
const x = 1
```

<div>提示文字</div>
```

### 原因

Slidev 的 Markdown 解析器在处理 HTML 标签内的代码块时，会误判代码块的结束位置，导致后续 HTML 元素被吞掉。

### 相关规则

[syntax-rules.md 规则 5](./syntax-rules.md#规则-5代码块--不能嵌套在-html-卡片内)

---

## FM-03：`<v-clicks>` 把箭头当动画目标

### 症状

箭头 `→`、`⬇`、`➜` 等**非交互元素**随点击出现/消失，破坏流程图的连续性。

### 严重度
🟡 **Major**

### 检测方法

**人工检查**：扫描所有 `<v-clicks>` 标签，查看其直接子元素中是否有箭头、连接符等应该始终可见的元素。

### 修复方案

```md
<!-- ❌ 错误 - 箭头会随点击出现/消失 -->
<v-clicks>
  <div>步骤 1</div>
  <div>→</div>  <!-- 被当作动画目标 -->
  <div>步骤 2</div>
</v-clicks>

<!-- ✅ 方案 A：把箭头放在 <v-clicks> 外部 -->
<v-clicks>
  <div>步骤 1</div>
</v-clicks>
<div class="opacity-50">→</div>
<v-clicks>
  <div>步骤 2</div>
</v-clicks>

<!-- ✅ 方案 B（推荐）：用显式 v-click -->
<div v-click="1">步骤 1</div>
<div class="opacity-50">→</div>  <!-- 始终可见 -->
<div v-click="2">步骤 2</div>
```

### 原因

`<v-clicks>` 组件自动为**每个直接子元素**添加递增的 v-click 编号。箭头等纯装饰性元素被错误地纳入了动画序列。

### 相关规则

[syntax-rules.md 规则 4](./syntax-rules.md#规则-4v-clicks-把所有直接子元素当作动画目标)

---

## FM-04：孤立 frontmatter 产生空白页

### 症状

- `pnpm run build` 成功
- 但导出的 PDF **多出空白页**
- 或 `pnpm run dev` 时看到不该有的空白幻灯片

### 严重度
🟡 **Major**

### 检测方法

**自动检测脚本**：
```bash
# 查找连续的 frontmatter 块（两个 --- 之间没有内容）
awk '/^---$/{count++; if (count == 2 && prev_line != "---") {prev_content=0}; if (count == 4 && prev_content == 0) print NR": empty slide"} {prev_line=$0; if ($0 !~ /^---$/ && $0 !~ /^[a-z]+:/) prev_content=1}' slides.md
```

**人工检查**：每个幻灯片应该**只有一个 frontmatter 块**。若发现连续两个 `--- ... ---` 之间没有可见内容，就是空白页。

### 修复方案

```md
<!-- ❌ 错误 - 中间的 --- 被识别为新幻灯片分隔符 -->
---
layout: section
glowSeed: 350
---

# 章节标题

---
class: py-8
glowSeed: 400
---

## 内容标题

<!-- 问题：中间的 --- 后没有内容，class: py-8 被当作文本，下一页才是新页 -->

<!-- ✅ 正确 - 每个幻灯片只有一个完整 frontmatter 块 -->
---
layout: section
glowSeed: 350
---

# 章节标题

---
class: py-8
glowSeed: 400
---

## 内容标题
```

### 原因

Slidev 的幻灯片分隔规则：
- `---` 开始 frontmatter
- `---` 结束 frontmatter
- 下一个 `---` 前的所有内容属于当前幻灯片
- **每个幻灯片必须有自己的完整 frontmatter 块**

### 相关规则

[syntax-rules.md 规则 9](./syntax-rules.md#规则-9frontmatter---不能嵌套)

---

## FM-05：代码块超出幻灯片高度

### 症状

代码底部被裁切，看不到最后几行。

### 严重度
🟢 **Minor**

### 检测方法

**自动检测**：
```bash
# 统计每个代码块的行数，超过 15 行的标记出来
awk '/^```[a-z]+/{start=NR; lang=$0} /^```$/{if (NR-start > 16) print "Line "start": code block exceeds 15 lines ("NR-start" lines)"}' slides.md
```

**人工检查**：代码行数 > 15 时必须设置 `maxHeight`。

### 修复方案

````md
<!-- ❌ 错误 - 长代码无 maxHeight -->
```ts
function add(a, b) {
  // ... 20 行代码
}
```

<!-- ✅ 正确 - 添加 maxHeight -->
```ts {1-5|6-10|all}{maxHeight:'350px'}
function add(a, b) {
  // ... 20 行代码
}
```
````

### 推荐值

| maxHeight | 约行数 | 适用 |
|-----------|-------|------|
| `100px` | ~5 行 | 嵌入卡片 |
| `200px` | ~10 行 | 紧凑展示 |
| `350px` | ~18 行 | 占大部分幻灯片高度 |

### 相关规则

[syntax-rules.md 规则 8](./syntax-rules.md#规则-8代码块-maxheight-语法) · [content-rules.md C-07](./content-rules.md#81-约束矩阵)

---

## FM-06：`v-click` 编号与 `clicks:` 不匹配

### 症状

- 部分动画不触发
- 动画提前结束
- 最后一个 v-click 元素始终可见 / 始终隐藏

### 严重度
🟡 **Major**

### 检测方法

**自动检测脚本**：
```bash
# 提取每页 frontmatter 的 clicks 值，与该页最大 v-click 编号对比
grep -E '(clicks:|v-click=")' slides.md
```

**人工检查**：
1. 找到某页 frontmatter 的 `clicks: N`
2. 数该页所有 `v-click="X"` 的最大 X
3. `N` 应该 ≥ 最大 `X`

### 修复方案

```md
<!-- ❌ 错误 - clicks: 2 但有 3 个 v-click -->
---
class: py-10
clicks: 2
---

<div v-click="1">第一个</div>
<div v-click="2">第二个</div>
<div v-click="3">第三个</div>  <!-- 永远不显示 -->

<!-- ✅ 正确 - 对齐 clicks 数值 -->
---
class: py-10
clicks: 3
---

<div v-click="1">第一个</div>
<div v-click="2">第二个</div>
<div v-click="3">第三个</div>
```

### 替代方案

使用 `<v-clicks>` 组件自动管理编号：
```md
---
class: py-10
clicks: 3  <!-- = 子元素数量 -->
---

<v-clicks>
  <div>第一个</div>
  <div>第二个</div>
  <div>第三个</div>
</v-clicks>
```

### 相关规则

[syntax-rules.md 规则 3](./syntax-rules.md#规则-3v-click-动态绑定必须用-class)

---

## FM-07：headmatter 缺少必需键

### 症状

- Glow 效果不显示（背景全黑或全白）
- 字体未加载（fallback 到系统字体）
- 动画 / 过渡异常

### 严重度
🟡 **Major**

### 检测方法

**必需键 checklist**：

| 主题 | 必需 headmatter 键 |
|------|-------------------|
| 通用 | `layout` / `highlighter: shiki` / `css: unocss` / `colorSchema` |
| Glow | 上述 + `glowSeed` |
| Neon | 上述 + `neonHue`（推荐）/ `neonIntensity`（推荐） |

**人工检查**：打开 slides.md 第一个 `---` 块，核对所有必需键是否存在。

### 修复方案

补全缺失的 headmatter 键。不同主题的完整 headmatter 模板见 [generate.md](./workflow/generate.md#headmatter-生成规则)。

### Glow 主题完整 headmatter

```yaml
---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: 演讲标题
exportFilename: 导出文件名
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 150        # ← Glow 必需
routerMode: hash
fonts:
  sans: 'DM Sans'
  mono: 'Fira Code'
---
```

### 相关规则

[syntax-rules.md 规则 10](./syntax-rules.md#规则-10必需-headmatter-键齐全)

---

## FM-08：`translate-y-*` 下移后兄弟元素重叠

### 症状

某元素下方的兄弟元素**没有跟着移动**，导致视觉上重叠覆盖。

### 严重度
🟢 **Minor**

### 检测方法

**人工检查**：
1. 找到所有使用 `translate-y-*` 的元素
2. 查看其下一个兄弟元素的 `mt-*` 间距
3. 若 `mt-*` 过小（如 `mt-4`），就会重叠

### 修复方案

```md
<!-- ❌ 导致重叠 -->
<div class="translate-y-30">上方内容</div>
<div class="mt-4">下方内容</div>  <!-- 被上方覆盖 -->

<!-- ✅ 方案 A：减小 translate-y + 增大 mt-* -->
<div class="translate-y-8">上方内容</div>
<div class="mt-20">下方内容</div>

<!-- ✅ 方案 B：使用 Flex 布局，避免 translate -->
<div class="flex flex-col gap-8">
  <div>上方内容</div>
  <div>下方内容</div>
</div>
```

### 修复策略表

| 原 translate-y | 原 mt-* | 推荐新 translate-y | 推荐新 mt-* |
|---------------|---------|-------------------|------------|
| `translate-y-30` | `mt-4` | `translate-y-8` | `mt-20` |
| `translate-y-20` | `mt-2` | `translate-y-6` | `mt-16` |
| `translate-y-40` | `mt-8` | `translate-y-10` | `mt-24` |

### 原因

CSS `transform: translateY()` 只改变视觉位置，不改变文档流布局，所以后续元素不会跟着移动。需要用 `mt-*`（margin-top）来主动推开。

### 相关规则

[syntax-rules.md 规则 11](./syntax-rules.md#规则-11translate-y--下移后兄弟元素重叠)

---

## 附录：Preflight 脚本（可选自动化）

未来可以创建 `scripts/preflight-check.sh`，对生成的 `slides.md` 自动跑以下检测：

| FM | 检测命令 | 动作 |
|----|---------|------|
| FM-01 | `grep -nE 'text\|bg\|border-[a-z]+/[0-9]+'` | 报告行号 |
| FM-04 | 查找连续 frontmatter | 报告页号 |
| FM-05 | 统计代码块行数 | 报告超限代码块 |
| FM-06 | 对比 `clicks:` 和 `v-click` 编号 | 报告不匹配页 |
| FM-07 | 检查必需 headmatter 键 | 报告缺失键 |

此脚本为可选增强，**当前阶段**（P0-4）先完成文档化目录，脚本留待后续迭代。

---

## 贡献新 FM

发现新的失败模式时，按以下格式追加到本文件：

```markdown
## FM-XX：标题

### 症状
（具体的错误信息或视觉异常）

### 严重度
🔴 Blocker / 🟡 Major / 🟢 Minor

### 检测方法
（自动脚本或人工检查步骤）

### 修复方案
（❌ 错误 vs ✅ 正确的对照）

### 原因
（技术原理简述）

### 相关规则
（syntax-rules.md 第 X 条）
```
