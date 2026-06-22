---
name: slidev-ppt-generator
description: 从用户需求生成专业的Slidev演示文稿，使用Markdown语法、Vue组件、代码高亮、动画效果。适用于技术分享、会议演讲、代码演示、教程培训等场景。
---

# Slidev PPT 生成器

基于 Slidev 框架 + Glow 主题，将用户需求转化为具有动态发光效果、卡片式布局、毛玻璃质感的 Web 演示文稿。

## 适用场景

技术分享、会议演讲、代码演示、教程培训、产品介绍、项目汇报

## 内容管道

```
contents/ori/ (原始材料) → [ppt-structure-analyst agent] → contents/generate/ (outline.md + metadata.json) → artifact/ (演示文稿)
```

- **ori/**：用户提供的原始材料（文件、URL、粘贴内容），每个主题一个目录
- **generate/**：由 `ppt-structure-analyst` agent 生成的结构化中间产物（metadata.json + outline.md）
- **artifact/**：最终生成的 Slidev 演示文稿项目

## 四步工作流程

### 步骤 1：需求收集 + 内容摄取

向用户询问关键信息：主题、受众、时长、风格、特殊需求（代码演示、图表、动画等）

同时检查 `contents/ori/` 是否已有相关材料：
- 如果用户提供了新材料（文件/URL/目录/粘贴内容），保存到 `contents/ori/{topic-slug}/main.md`
- 如果 `ori/` 已有材料，直接读取
- 可选：使用 MCP 联网工具搜索补充材料

**topic-slug 命名规范**：小写英文，连字符分隔，如 `claude-code-best-practices`、`k8s-intro`

### 步骤 2：内容结构化（委托 ppt-structure-analyst）

**必须显式调用 `ppt-structure-analyst` agent 完成本步骤**，由 agent 负责：读取原始材料、分析结构、规划叙事、生成中间产物。

**调用方式**：使用 Agent 工具，`subagent_type` 设为 `ppt-structure-analyst`，传入以下上下文：
- topic-slug（步骤 1 确定）
- 受众、时长、特殊需求（步骤 1 收集）
- 原始材料路径：`contents/ori/{slug}/main.md`

Agent 产出两个文件到 `contents/generate/{slug}/`：

1. **metadata.json** — 生成参数（受众、时长、目标页数、主题选择、section 列表）
2. **outline.md** — 幻灯片结构大纲（每页标题、布局 pattern、核心内容、布局细节）

Agent 完成后，检查 `contents/generate/{slug}/` 下是否已生成 `metadata.json` 和 `outline.md`。若缺失或质量不足，补充完善。

**注意**：此步骤不再由 skill 自行执行内容结构化，而是完全委托给 agent。skill 的职责是收集需求、调用 agent、验收产出。

### 步骤 3：生成项目

1. 读取 `contents/generate/{slug}/outline.md` 和 `contents/generate/{slug}/metadata.json` 作为输入
2. 根据 metadata.json 的 `theme` 字段确定主题（默认 `glow`，详见下方"主题选择矩阵"）
3. 读取主题专属的模式参考：`references/themes/{theme}/slide-patterns.md`（`ppt-structure-analyst` 已在 outline.md 中标注了每页的 pattern）
4. 读取主题配置 `references/themes/{theme}/theme-config.md`
5. 按照 Slidev 语法生成 `slides.md` 文件，**使用对应主题的 headmatter 和 pattern**
6. 复制 `assets/templates/default/` 模板文件，叠加 `assets/themes/{theme}/` 主题文件（`global-bottom.vue`、`uno.config.ts`、`style.css`）
7. **项目目录命名规则**：`artifact/{YYYY-MM-DD}-{主题名称}/`，例如 `artifact/2026-03-28-docker-slides/`

### 步骤 4：验证输出

三级验证，确保生成质量：

**Level 1：生成前检查（对 outline.md）**
- 页面数量与 metadata.json 目标一致
- 每页有 pattern 标注
- 代码块有语言标识

**Level 2：生成后语法检查（对 slides.md）**

语法正确性：
- 无裸属性中的 `/`（必须 `class="..."`）
- 所有代码块有语言标识
- frontmatter `---` 配对正确
- `v-click` 数量与 `clicks:` 值匹配
- 超过 15 行的代码块有 `maxHeight`
- 无空幻灯片（frontmatter 后无内容）
- 必需 headmatter 键齐全（layout, highlighter, css, colorSchema, glowSeed）

设计护栏（详见 [content-rules.md 第八节](references/content-rules.md#八硬性设计约束验证阶段强制检查)）：
- [ ] **C-01**：每页要点数 ≤ 6
- [ ] **C-02**：每页中文字数 ≤ 50（正文）
- [ ] **C-03**：正文字号 ≥ `text-lg`（18pt），标题 ≥ `text-3xl`（30pt）
- [ ] **C-04**：正文与背景对比度 ≥ 4.5:1（WCAG AA）
- [ ] **C-05**：单页元素总数 ≤ 6
- [ ] **C-06**：标题为断言式（含动词或数字，非"关于 X 的介绍"）
- [ ] **C-07**：代码块行数 ≤ 15 或已设 `maxHeight`
- [ ] **C-08**：卡片网格 ≤ 3×3

任一约束超限时**必须修复后重新 build**，修复策略见 content-rules.md §8.3 自动拆页规则。

**Level 3：Build 验证（最终）**
```bash
cd artifact/{YYYY-MM-DD}-{slug}/ && pnpm run build
```
成功 = 结构正确；失败 = 根据错误对照"常见错误"章节修复

## 内容-布局映射表

### Slidev 内置布局

| 内容特征 | 推荐布局 | 判断依据 |
|---------|---------|---------|
| 封面标题 | `center` | 演示开头，主标题 + 副标题 |
| 居中强调 | `center` | 核心观点、关键信息 |
| 标准内容 | `default` | 标题 + 列表，最常用 |
| 章节分隔 | `section` | 主题切换、段落过渡 |
| 双栏对比 | `two-cols` | 左右对比、优缺点分析 |
| 带标题双栏 | `two-cols-header` | 有统一标题的左右对比 |
| 图文混排 | `image-left` / `image-right` | 配图说明 |
| 全屏图片 | `image` | 视觉冲击力强的图片 |
| 引言引用 | `quote` | 名人名言、核心理念 |
| 数据展示（单个） | `fact` | 关键数据、统计结果 |
| 核心陈述 | `statement` | 核心结论、一句话总结 |
| 介绍页 | `intro` | 演讲者介绍、背景说明 |
| 结束页 | `end` | 致谢、联系方式 |
| 嵌入网页 | `iframe` | 在线演示、外部链接 |

### 高级组合布局（default + UnoCSS + Vue）

| 内容特征 | 推荐布局 | 实现方式 |
|---------|---------|---------|
| 特性/功能列举 | `card-grid` | UnoCSS grid + 卡片组件 |
| 多步骤流程 | `steps-pipeline` | 水平步骤卡片 + 箭头 |
| 代码逐段讲解 | `code-focus` | 左代码 + 右注释栏 |
| 新旧方案对比 | `comparison` | 双栏卡片 + 代码块 |
| 技术演进 | `timeline` | 纵向时间线 + 圆点 |
| 系统架构 | `architecture` | 分层卡片 + 层间箭头 |
| 关键指标 | `metrics` | 大数字 + 说明文字 |
| 参数对比 | `data-table` | Markdown 表格 |
| 问答互动 | `faq` | Q/A 卡片逐个展开 |
| 参数/配置详解 | `annotated-list` | 左参数名 + 右说明 |

完整模板见 [Glow 布局模式](references/themes/glow/slide-patterns.md) 和 [Slidev 布局参考](references/shared/layout-reference.md)

## Headmatter 配置

全局配置位于文件开头的 `---` 块中。

### 推荐 Headmatter（Glow 主题 — 必须使用）

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
glowSeed: 150
routerMode: hash
fonts:
  sans: 'DM Sans'
  mono: 'Fira Code'
---
```

**关键配置说明：**
- `css: unocss` — 必须启用 UnoCSS 才能使用工具类
- `colorSchema: dark` — 深色背景配合发光效果
- `transition: fade-out` — 平滑淡入淡出过渡
- `glowSeed` — 发光效果的随机种子，每页可不同
- `preload: false` — 禁用预加载，提升大项目启动速度
- `routerMode: hash` — 使用 hash 路由，方便本地预览
- `mdc: true` — 启用 Markdown Components 语法

### Per-Slide Glow 配置

每张幻灯片通过 frontmatter 控制发光效果：

```yaml
---
glow: right          # 发光位置: full / top / bottom / left / right / center / top-left / top-right / bottom-left / bottom-right
glowOpacity: 0.4     # 透明度 (0-1)
glowHue: 0           # 色调偏移
glowSeed: 368        # 随机种子，每页不同获得变化效果
---
```

## 核心视觉设计模式（重要）

### 语法规则（关键 - 避免编译错误）

**规则 1：属性值中不能包含引号**
- ❌ 错误：`<div opacity-70">文字</div>`
- ✅ 正确：`<div opacity-70>文字</div>`
- ❌ 错误：`<div text-blue-300">标题</div>`
- ✅ 正确：`<div text-blue-300>标题</div>`

**规则 2：含 `/` 的工具类必须用 class 属性**
- ❌ 错误：`<span text-white/50>文字</span>` （`/` 导致 Vue 编译错误）
- ✅ 正确：`<span class="text-white/50">文字</span>`
- ❌ 错误：`<div text="white/50">文字</div>`
- ✅ 正确：`<div class="text-white/50">文字</div>`
- **原则**：任何包含 `/`（如透明度修饰符 `text-white/50`、`bg-blue-500/20`）的工具类，作为 HTML 属性直接写会导致 `Illegal '/' in tags` 错误，必须改用 `class="..."` 包裹
- 注意：`bg="blue-500/20"` 和 `border="2 solid teal-800/50"` 这种写在引号内的值是安全的，不会报错

**规则 3：使用 class 属性处理复杂样式**
- ✅ 正确：`<div opacity-70>文字</div>` 或 `<div class="opacity-70">文字</div>`
- 对于 `opacity`、`text-*`、`bg-*` 等常用工具类，推荐使用 `class` 属性

**规则 3：v-click 动态绑定必须用 :class**
```md
<div
  v-click="1"
  :class="$clicks < 1 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
>
  内容
</div>
```

### 1. 卡片组件 — 渐变边框 + 毛玻璃

所有概念卡片使用统一的渐变边框 + 半透明背景设计：

```md
<div border="2 solid violet-800/50" rounded-lg>
  <div flex items-center bg="violet-800/30" px-3 py-2 text-violet-300>
    <div i-carbon:machine-learning-model text-sm mr-1 />
    <div text-xs><em>卡片标题</em></div>
  </div>
  <div bg="violet-800/10" px-4 py-3>
    卡片描述内容
  </div>
</div>
```

**配色方案（每个卡片使用不同颜色）：**
- `violet` / `purple` / `fuchsia` — 主色系
- `blue` / `cyan` / `sky` — 辅助色
- `green` / `indigo` / `yellow` — 强调色

### 2. 动画渐进展示（v-click + Transform）

使用 `v-click` 配合 Transform 动画实现内容逐步呈现：

```md
---
class: py-10
clicks: 3
glow: right
glowSeed: 300
---

## 标题

<div flex items-center gap-10 translate-y-30>
  <div
    v-click="1"
    flex-1 transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'"
  >
    <div flex items-center justify-center mb-5>
      <div i-carbon:machine-learning-model text-6xl text-purple-500 />
    </div>
    <div text-center font-bold mb-2>卡片标题</div>
    <div text-sm text-center>卡片描述</div>
  </div>
  <!-- 更多 v-click 卡片 -->
</div>
```

**常用动画模式：**
- 从左滑入：`translate-x--20 opacity-0` → `translate-x-0 opacity-100`
- 从下滑入：`translate-y-10 opacity-0` → `translate-y-0 opacity-100`
- 缩放出现：`scale-95 opacity-0` → `scale-100 opacity-100`
- 延迟出现：添加 `delay-250` / `delay-500`

### 2.1 v-clicks 组件（批量动画）

`<v-clicks>` 自动为子元素添加递进的 v-click 动画，无需手动编号：

```md
---
class: py-10
clicks: 4
glowSeed: 350
---

## 标题

<div grid grid-cols-2 gap-3>
<v-clicks>

  <div border="2 solid violet-800/50" rounded-lg bg="violet-900/10">
    卡片 A 内容
  </div>

  <div border="2 solid blue-800/50" rounded-lg bg="blue-900/10">
    卡片 B 内容
  </div>

  <div border="2 solid green-800/50" rounded-lg bg="green-900/10">
    卡片 C 内容
  </div>

  <div border="2 solid amber-800/50" rounded-lg bg="amber-900/10">
    卡片 D 内容
  </div>

</v-clicks>
</div>
```

**注意**：`<v-clicks>` 内的元素会自动获得递增的 click 编号

### 3. 双栏卡片对比（渐变边框）

```md
---
class: py-10
clicks: 2
glowSeed: 400
---

## 对比标题

<div grid grid-cols-2 gap-8 mt-10>
  <div
    v-click="1"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-blue-500/30 rounded-lg p-5 bg-blue-500/10"
  >
    <div text-xl font-bold mb-4 text-blue-300>方案 A</div>
    <div text-sm>描述内容</div>
  </div>
  <div
    v-click="2"
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
    class="border-2 border-green-500/30 rounded-lg p-5 bg-green-500/10"
  >
    <div text-xl font-bold mb-4 text-green-300>方案 B</div>
    <div text-sm>描述内容</div>
  </div>
</div>
```

### 4. 图标集成

**支持的图标集：**
- Carbon Icons: `i-carbon:*`
- Devicon: `i-devicon:*`
- Remix Icon: `i-ri:*`
- Simple Icons: `i-simple-icons:*`
- Logos: `i-logos:*`
- Twemoji: `i-twemoji:*`
- Fluent Emoji: `i-fluent-emoji:*`
- Lobe Icons (external): 通过 `@proj-airi/lobe-icons` 加载

```md
<!-- 使用 iconify 图标 -->
<div i-carbon:machine-learning text-6xl />
<div i-devicon:kubernetes inline-block />
<div i-ri:github-fill />
<div i-simple-icons:kubernetes text-4xl />
<div i-logos:vue />
<div i-twemoji:brain />
```

**最佳实践：**
- 图标名使用连字符分隔（`machine-learning`，不是 `machineLearning`）
- 使用 `inline-block` 确保正确对齐
- 颜色使用 `text-*` 工具类控制

### 5. Grid 布局图标卡片

```md
<div grid grid-cols-3 gap-6 pt-8>
  <div text-center>
    <div flex items-center justify-center mb-4>
      <div i-carbon:container text-5xl text-violet-400 />
    </div>
    <div font-bold mb-1>概念名称</div>
    <div text-sm opacity-70>描述文字</div>
  </div>
  <!-- 更多卡片 -->
</div>
```

### 6. section - 章节分隔

```md
---
layout: section
glowSeed: 500
---

# 章节标题
```

### 7. quote - 引用页

```md
---
layout: quote
glowSeed: 600
---

> 引用内容

— 作者
```

### 8. 代码展示

````md
```typescript {2,3}
function add(a: number, b: number) {
  return a + b  // 高亮
}
```
````

### 9. 点击式高亮

````md
```typescript {1|2-3|all}
const a = 1
function add(x: number, y: number) {
  return x + y
}
```
````

### 10. 平衡动画（Balance Animations）

新增的动画效果，可用于特殊装饰元素：

```md
<!-- 摇晃动画 -->
<div class="animate-balance-shake">
  <div i-carbon:warning text-4xl />
</div>

<!-- 左右移动动画 -->
<div class="animate-balance-move-left">
  内容
</div>

<div class="animate-balance-move-right">
  内容
</div>
```

### 11. 背景图片支持

Glow 主题支持在封面页使用背景图片：

```md
---
layout: center
glowSeed: 100
---

# 封面标题

<!-- 在 public/backgrounds/cover.png 放置背景图片 -->
```

### 12. Powered-by Logo

在需要展示 "powered by" 信息时启用：

```md
---
layout: section
poweredBy: true
glowSeed: 200
---

# 章节标题

<!-- 在 public/powered-by.png 放置 logo -->
```

### 13. 视频嵌入

直接在幻灯片中嵌入视频，适合产品演示和效果展示：

```md
---
class: px-0! pt-6! text-center
---

<div px-10 text-4xl mb-4>
  视频标题
</div>

<video autoplay muted loop>
  <source src="/videos/demo.mp4" />
</video>
```

**视频放置**：将视频文件放在 `public/videos/` 目录下

**视频堆叠效果**（多视频渐进展示）：
```md
<div relative>
  <video v-click autoplay muted loop class="relative rounded-md w-120"
    :class="[$clicks === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-100', $clicks > 1 ? 'opacity-30 scale-75' : '']"
    transition="all duration-500 ease-in-out">
    <source src="/videos/video-1.mp4" />
  </video>
  <video v-click autoplay muted loop class="absolute rounded-md w-120 top-1/4 left-[calc(25%-4rem)]"
    :class="[$clicks === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-100', $clicks > 2 ? 'opacity-30 scale-75' : '']"
    transition="all duration-500 ease-in-out">
    <source src="/videos/video-2.mp4" />
  </video>
</div>
```

### 14. 过渡问句页（Question/Answer）

用大字问句引导观众思考，点击后缩小淡出并显示答案：

```md
---
class: flex justify-center items-center gap-20 px-40 text-xl
---

<div
  absolute text-5xl
  :class="$clicks < 1 ? 'text-white' : 'translate-y--18 scale-40 text-white/30'"
  transition duration-500 ease-in-out
>
  <span>这里放一个问题？</span>
</div>

<div flex flex-col items-center>
  <v-clicks>
    <div mt-4>
      <h1 flex items-center text="5xl!">
        <span>答案是...</span>
      </h1>
    </div>
  </v-clicks>
</div>
```

**效果**：问句先以大字显示，点击后缩小并淡出，同时答案从下方出现。适合章节间的过渡和引导。

### 15. 悬停效果（Hover Interaction）

图片悬停时显示叠加内容（如二维码）：

```md
<div
  relative
  class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-50 hover:cursor-pointer hover:grayscale-100"
  rounded-lg overflow-hidden bg="black" h-fit
  transition="all duration-250 ease-in-out"
>
  <img src="/screenshot.png" class="img" opacity-100 transition="all duration-250 ease-in-out">
  <img src="/qr-code.png" class="qr" w-60 absolute top-0 left-0 opacity-0 transition="all duration-250 ease-in-out">
</div>
```

### 16. 自定义背景色幻灯片

使用自定义纯色背景（如品牌色）：

```md
---
class: py-0! px-0! bg-[#ff9d00] relative
---

<div class="absolute bg-[#ff9d00] flex items-center justify-center h-full translate-y--15">
  <img src="/logo.png" class="scale-85">
</div>

<div grid="~ cols-2" gap-4 class="relative z-10 translate-y-100 px-6">
  <!-- 内容卡片 -->
</div>
```

### 17. 带图片的概念卡片

图片在上、文字在下的卡片布局：

```md
<div
  rounded-lg
  border="2 solid amber-900" bg="amber-900/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
  flex flex-col items-center
>
  <img src="/category.avif" class="aspect-[1.32] object-cover rounded-md h-full">
  <div bg="amber-900/30" w-full px-4 py-2 flex items-center justify-center text-center text-base>
    <span>分类名称</span>
  </div>
</div>
```

### 18. 流程/步骤展示（Pipeline Cards）

用横向排列的大图标卡片展示流程步骤：

```md
---
class: py-10
clicks: 6
---

## 标题

<span>副标题</span>

<div mt-8 />

<div flex items-center gap-4>
<v-clicks>

<div
  rounded-lg
  border="2 solid amber-900" bg="amber-900/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:reel-bold-duotone size-20 />
  </div>
  <div bg="amber-900/30" w-full px-4 py-2 flex items-center justify-center text-center text-base>
    <span>步骤 1</span>
  </div>
</div>

<!-- 更多步骤卡片... -->

</v-clicks>
</div>
```

**Solar 图标集推荐**：`i-solar:*-bold-duotone` 系列图标适合大尺寸展示（如 `i-solar:reel-bold-duotone`、`i-solar:database-bold-duotone`）

### 19. 推荐的 Headmatter 增强配置

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
glowSeed: 150
routerMode: hash
fonts:
  sans: 'DM Sans'
  mono: 'Fira Code'
---
```

**新增配置说明：**
- `preload: false` — 禁用预加载，提升大项目启动速度
- `routerMode: hash` — 使用 hash 路由，方便本地预览
- `clicks: 0` — 全局点击计数器初始值

### 20. 毛玻璃卡片（Glassmorphism）

使用 `backdrop-blur` + 半透明背景 + 彩色边框打造毛玻璃质感：

```md
<div
  rounded-lg
  border="2 solid cyan-800" bg="cyan-800/20"
  backdrop-blur
  flex-1 h-full
  transition duration-500 ease-in-out
>
  <div px-5 py-16 flex items-center justify-center>
    <div i-solar:chat-round-like-bold-duotone size-20 />
  </div>
  <div bg="cyan-800/30" w-full px-4 py-2 flex items-center justify-center text-center>
    <span>卡片标题</span>
  </div>
</div>
```

**配色系列推荐（同色系渐变）：**
- `teal` / `cyan` / `sky` — 冷色系
- `green` / `emerald` / `lime` — 自然色系
- `blue` / `indigo` / `violet` — 深色系
- `amber` / `orange` / `rose` — 暖色系

### 21. 文字描边效果

使用 CSS text-stroke 创建空心/描边文字：

```md
<div
  text="20" font-bold text-rose-400
  style="-webkit-text-stroke: 6px #ffeef7; paint-order: stroke;"
  flex flex-col items-center
>
  Neuro-sama
</div>
```

**关键属性：**
- `-webkit-text-stroke: 6px <color>` — 描边宽度和颜色
- `paint-order: stroke` — 确保描边在填充之下渲染，避免文字被遮挡

### 22. 图片模糊叠加转场

点击时图片模糊放大，同时显示叠加内容：

```md
---
class: py-0! px-0!
clicks: 1
---

<div>
  <!-- 半透明遮罩层 -->
  <div
    w-full h-full bg="black/15" absolute backdrop-blur-sm z-100
    :class="[$clicks < 1 ? 'opacity-0' : 'opacity-100']"
    transition duration-1200 ease-in-out
  />
  <!-- 背景图片（点击后模糊放大） -->
  <img
    :class="[$clicks < 1 ? '' : 'blur-lg scale-120']"
    src="/character.webp"
    transition duration-1200 ease-in-out
  />
  <!-- 叠加内容层 -->
  <div
    :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
    absolute inset-0 translate="x-68 y-50" w-fit h-fit
    transition duration-500 ease-in-out z-101
  >
    <div text-4xl font-bold>叠加文字内容</div>
  </div>
</div>
```

**层级结构**：z-100 遮罩 → 背景图片 → z-101 内容层

### 23. QR 码悬停叠加（进阶版）

更精细的 QR 码悬停效果，使用 UnoCSS 子选择器：

```md
<div
  relative
  class="[&_.qr]:hover:opacity-100 [&_.img]:hover:opacity-50 hover:cursor-pointer hover:grayscale-100"
  rounded-lg overflow-hidden bg="black" h-fit
  transition="all duration-250 ease-in-out"
>
  <img src="/screenshot.png" class="img" opacity-100 transition="all duration-250 ease-in-out">
  <img src="/qr-code.png" class="qr" w-60 absolute top-0 left-0 translate-x="[40%]" opacity-0 transition="all duration-250 ease-in-out">
</div>
```

**CSS 选择器技巧：**
- `[&_.qr]:hover:opacity-100` — 父级 hover 时子元素 `.qr` 显示
- `[&_.img]:hover:opacity-50` — 父级 hover 时子元素 `.img` 半透明
- `translate-x="[40%]"` — UnoCSS 任意值语法

### 24. 图片亮度滤镜

QR 码等图片在暗色背景上可能不清晰，使用 CSS 滤镜调整：

```md
<img src="/qr-code.png" w-70 style="filter: brightness(1.5);" />
```

**常用滤镜：**
- `brightness(1.5)` — 提亮（适合暗色 QR 码）
- `contrast(1.2)` — 增加对比度
- `saturate(0)` — 去色（灰度）

### 25. 自定义 Vue 组件注册

在 `setup/main.ts` 中注册全局自定义组件：

```typescript
import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ app }) => {
  // 注册自定义组件
  app.component('MyComponent', MyComponent)
})
```

**使用场景**：需要第三方 Vue 组件（如视频播放器、图表库）时使用

### 26. UnoCSS 任意值语法

当预设工具类不够用时，使用方括号语法：

```md
<div w="[calc(100%-20%)]" />           <!-- CSS calc -->
<div translate-x="[40%]" />           <!-- 百分比位移 -->
<div text="[48px]" />                 <!-- 精确像素值 -->
<div px-0! />                         <!-- !important -->
<div size-14 />                       <!-- 自定义尺寸 -->
<div gap-3 />                         <!-- 间距简写 -->
```

## 代码块高级功能

### 行号

````md
```ts {6,7}{lines:true,startLine:5}
function add(
  a: Ref<number> | number,
  b: Ref<number> | number
) {
  return computed(() => unref(a) + unref(b))
}
```
````

### 最大高度与滚动

当代码超出幻灯片高度时，使用 `maxHeight` 设置固定高度并启用滚动：

````md
```ts {2|3|7|12}{maxHeight:'100px'}
function add(
  a: Ref<number> | number,
  b: Ref<number> | number
) {
  return computed(() => unref(a) + unref(b))
}
/// ...很多行代码
const c = add(1, 2)
```
````

**语法**：在代码块语言标识后追加 `{maxHeight:'<value>'}`

**推荐值**：
- `maxHeight:'100px'` — 约 5 行代码，适合嵌入卡片中
- `maxHeight:'200px'` — 约 10 行代码，紧凑展示
- `maxHeight:'350px'` — 约 18 行代码，占大部分幻灯片高度

**使用场景**：
- 代码超过 15 行时，必须使用 `maxHeight` 避免溢出
- 配合行高亮 `{1-5|6-10|all}` 分步展示效果更佳
- 可以使用 `{*}` 作为高亮占位符：`{*}{maxHeight:'200px'}`

**重要**：`maxHeight` 放在行高亮语法后面的 `{}` 中，例如：
````
```javascript {1-8|10-16|all}{maxHeight:'350px'}
````


### Monaco 编辑器

````md
```ts {monaco}
console.log('HelloWorld')
```
````

### Monaco 差异编辑器

````md
```ts {monaco-diff}
console.log('Original text')
~~~
console.log('Modified text')
```
````

### Shiki Magic Move

````md
````md magic-move {lines: true}
```js
console.log(`Step ${1}`)
```
```js
console.log(`Step ${1 + 1}`)
```
```ts
console.log(`Step ${3}` as string)
```
````
````

## 演讲者注释

```md
# 幻灯片标题

内容

<!--
演讲者注释：提醒听众注意 X
-->
```

## 常见错误（避免编译失败）

### 错误 1：属性值中包含多余引号

```md
<!-- ❌ 错误 - 会引发 Vue 模板编译错误 -->
<div opacity-70">文字</div>
<div text-blue-300">标题</div>
<div mb-4">内容</div>

<!-- ✅ 正确 -->
<div opacity-70>文字</div>
<div text-blue-300>标题</div>
<div mb-4>内容</div>

<!-- ✅ 使用 class 属性（推荐） -->
<div class="opacity-70">文字</div>
<div class="text-blue-300">标题</div>
<div class="mb-4">内容</div>
```

### 错误 2：含 `/` 的工具类作为裸属性

```md
<!-- ❌ 错误 - "Illegal '/' in tags" Vue 编译错误 -->
<span text-white/50>文字</span>
<div text="white/50">文字</div>

<!-- ✅ 正确 - 必须使用 class 属性包裹 -->
<span class="text-white/50">文字</span>
<div class="text-white/50">文字</div>

<!-- ✅ 写在引号值内是安全的 -->
<div bg="blue-500/20">文字</div>
<div border="2 solid teal-800/50">文字</div>
```

**原因**：Vue 模板编译器将裸属性中的 `/` 解析为 HTML 标签闭合符，导致编译失败。引号内的值（如 `bg="..."`、`border="..."`）不受影响。

### 错误 3：v-click 使用错误的属性绑定

```md
<!-- ❌ 错误 -->
<div v-click="1" class="$clicks < 1 ? 'opacity-0' : 'opacity-100'">

<!-- ✅ 正确 - 必须用 :class 进行动态绑定 -->
<div v-click="1" :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'">
```

### 错误 4：代码块语法错误

```md
<!-- ❌ 错误 - 缺少语言标识 -->
```
code here
```

<!-- ✅ 正确 - 指定语言 -->
```typescript
code here
```
```

### 错误 5：grid/grid-cols 语法错误

```md
<!-- ❌ 错误 - 使用了等号 -->
<div grid="~ cols-2">

<!-- ✅ 正确 - 使用连字符 -->
<div grid grid-cols-2>
```

### 错误 6：孤立的 frontmatter 块产生空白页

```md
<!-- ❌ 错误 - 会产生空白页 -->
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

**问题**: 中间的 `---` 会被识别为新的幻灯片分隔符，`class: py-8` 等会被当作文本内容而非 frontmatter，产生空白页。

```md
<!-- ✅ 正确 - 每个幻灯片只有一个 frontmatter 块 -->
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

**Slidev 幻灯片结构规则**:
- `---` 开始 frontmatter
- `---` 结束 frontmatter，后面是内容
- 下一个 `---` 前的所有内容属于当前幻灯片
- **每个幻灯片必须有自己的完整 frontmatter 块**

## 快速命令

```bash
pnpm create slidev    # 创建项目
pnpm run dev          # 启动开发服务器
pnpm run build        # 构建静态文件
pnpm run export       # 导出 PDF
```

## 主题系统

主题通过**文件覆盖**实现：

1. 以 `default` 模板为基础生成所有文件
2. 根据内容场景选择主题（见下方"主题选择矩阵"），用 `assets/themes/{theme}/` 下的同名文件覆盖默认文件
3. 读取 `references/themes/{theme}/theme-config.md` 和 `slide-patterns.md` 获取主题专属配置和布局模式

### 可用主题（5 主题矩阵）

| 主题 | 说明 | 适用场景 |
|------|------|---------|
| `glow` | 动态发光多边形背景 + 毛玻璃卡片 + 深色基调（**默认推荐**） | 技术分享、开发者大会 |
| `minimal` | 白底 + 衬线字体 + 无动效，学术克制 | 学术答辩、咨询报告、论文汇报 |
| `bold` | 大字号 + 强对比 + 渐变背景，Keynote 风 | 产品发布、主题演讲、商业提案 |
| `dark-pro` | 深蓝灰 + 细网格 + 数据导向，企业稳重 | 企业汇报、季度 review、战略汇报 |
| `neon` | 霓虹光效 + 赛博网格 + 故障美学 | 创意分享、黑客马拉松、设计相关 |

### 主题选择矩阵

根据**受众 + 内容类型 + 场合**选择主题：

| 受众 | 内容类型 | 推荐主题 | 推荐密度 |
|------|---------|---------|---------|
| 开发者 / 技术人员 | 技术分享、代码演示 | `glow` | medium-high |
| 学者 / 研究人员 | 论文答辩、研究报告 | `minimal` | low |
| 高管 / 决策者 | 战略汇报、业务复盘 | `dark-pro` | medium |
| 客户 / 大众 | 产品发布、商业提案 | `bold` | low |
| 设计师 / 创意从业者 | 创意分享、设计展示 | `neon` | medium |
| 企业内部团队 | 季度 review、项目汇报 | `dark-pro` | medium-high |
| 学生 / 入门者 | 教程、培训 | `glow` | medium |

**若用户未明确指定，默认使用 `glow`**，并由 `ppt-structure-analyst` agent 根据 metadata.json 的 `theme` 字段决定。

### 扩展新主题

在 `assets/themes/{theme-name}/` 下放入覆盖文件（`global-bottom.vue`、`uno.config.ts`、`style.css`），并在 `references/themes/{theme-name}/` 下创建 `theme-config.md` 和 `slide-patterns.md`。

## 模板文件

生成项目时参考以下模板文件：

| 文件 | 默认路径 | 主题专属覆盖路径 |
|------|---------|----------------|
| package.json | `assets/templates/default/package.json` | — |
| UnoCSS 配置 | `assets/templates/default/uno.config.ts` | `assets/themes/{theme}/uno.config.ts` |
| 自定义样式 | `assets/templates/default/style.css` | `assets/themes/{theme}/style.css` |
| 代码高亮 | `assets/templates/default/setup/shiki.ts` | — |
| 背景效果组件 | — | `assets/themes/{theme}/global-bottom.vue`（minimal 为空组件） |

## 参考文档

### 通用
- [内容规则](references/content-rules.md) — 核心原则、页面数量、内容→布局映射、**第八节硬性设计约束**
- [Slidev 布局参考](references/shared/layout-reference.md) — 内置布局模板和 headmatter 配置
- [组件参考](references/shared/component-reference.md) — v-click、Link、Toc 等组件用法

### 主题专属
- [Glow 布局模式](references/themes/glow/slide-patterns.md) — Glow 主题高级组合布局模板
- [Glow 完整示例](references/themes/glow/example-slides.md) — 可运行的 Glow 主题 slides.md
- [Glow 主题配置](references/themes/glow/theme-config.md) — Glow 专属配置和设计约束
- [Minimal 布局模式](references/themes/minimal/slide-patterns.md) — 学术/咨询场景布局
- [Minimal 主题配置](references/themes/minimal/theme-config.md) — 白底衬线极简约束
- [Bold 布局模式](references/themes/bold/slide-patterns.md) — 产品发布/Keynote 风布局
- [Bold 主题配置](references/themes/bold/theme-config.md) — 大字号强对比配置
- [Dark-Pro 布局模式](references/themes/dark-pro/slide-patterns.md) — 企业汇报/数据看板布局
- [Dark-Pro 主题配置](references/themes/dark-pro/theme-config.md) — 深蓝灰稳重风格
- [Neon 布局模式](references/themes/neon/slide-patterns.md) — 赛博朋克/创意分享布局
- [Neon 主题配置](references/themes/neon/theme-config.md) — 霓虹光效故障美学

## 使用示例

**用户请求**：帮我生成一个关于 Vue 3 组合式 API 的演示文稿

**执行步骤**：

1. 确认需求：10 分钟技术分享，面向有 Vue 2 基础的开发者
2. 调用 `ppt-structure-analyst` agent，传入 topic-slug、受众、时长，生成 `metadata.json` + `outline.md`
3. 根据 outline.md 生成 slides.md，使用 Glow 主题（glowSeed、动画、卡片式布局）
4. 验证代码高亮和动画效果
