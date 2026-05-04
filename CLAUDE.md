# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

基于 Slidev + UnoCSS + Vue 3 的 PPT 生成器 Monorepo。通过 Skill 定义（`ppt-skills/slidev-ppt-generator/SKILL.md`）驱动，将用户需求转化为 Glow 主题演示文稿。

## 常用命令

```bash
# 开发某个 artifact
cd artifact/{YYYY-MM-DD}-{topic}/ && pnpm run dev     # 启动 slidev 开发服务器（--open --remote）

# 构建
pnpm run packages:build                                # 构建所有 artifact（遍历 artifact/*）
cd artifact/{topic}/ && pnpm run build                 # 构建单个 artifact → dist/

# 导出 PDF
cd artifact/{topic}/ && pnpm run export                # slidev export --with-clicks --per-slide
```

## 架构

```
ppt-generator/
├── contents/                  # 内容管道
│   ├── ori/                   # 原始材料（用户提供的源文件）
│   │   └── {topic-slug}/      # 每个主题一个目录
│   │       ├── README.md      # 主题元数据
│   │       ├── main.md        # 主要原始内容
│   │       └── assets/        # 可选附件
│   └── generate/              # 结构化中间产物
│       └── {topic-slug}/
│           ├── metadata.json  # 生成参数（时长、受众、主题）
│           ├── outline.md     # 幻灯片结构大纲
│           └── content.md     # 完整结构化内容
├── artifact/                  # 每个 artifact 是独立的 Slidev 演示项目
│   └── {date}-{topic}/
│       ├── slides.md          # 主文件（幻灯片内容，Markdown + Vue）
│       ├── uno.config.ts      # UnoCSS 配置（继承 @slidev/client 基础配置）
│       ├── style.css          # 自定义样式
│       ├── global-bottom.vue  # Glow 主题组件
│       └── public/            # 静态资源（图片、视频等）
├── ppt-skills/slidev-ppt-generator/
│   ├── SKILL.md               # 生成器核心：6步工作流 + 布局映射 + 设计规范
│   ├── references/            # 参考文档
│   │   ├── content-rules.md   # 通用内容组织规则
│   │   ├── themes/glow/       # Glow 主题专属（slide-patterns、example-slides、theme-config）
│   │   └── shared/            # 通用参考（layout-reference、component-reference）
│   └── assets/
│       ├── templates/default/  # 默认模板（package.json、uno.config、style.css、shiki setup）
│       └── themes/glow/        # Glow 主题覆写（global-bottom.vue、uno.config、style.css）
└── package.json               # Monorepo 根配置，管理所有共享依赖
```

**内容管道**：`ori/` (原始材料) → `generate/` (结构化内容) → `artifact/` (演示文稿)
**生成流程**：SKILL.md（6步工作流）→ 复制 default 模板 → 叠加 glow 主题 → 生成 slides.md → build 验证

## 技术栈

- **Slidev** v52.5 — Markdown 演示框架
- **UnoCSS** v66 — 原子化 CSS（presetWind3 + presetAttributify + presetIcons + presetWebFonts）
- **Vue 3** — 组件系统（v-clicks 动画、动态 class 绑定）
- **Shiki** — 代码语法高亮
- **Glow 主题** — 动态发光背景（glowSeed 参数控制）

## 关键约定

### UnoCSS 裸属性中的 `/` 会导致 Vue 编译错误

`text-white/50` 作为裸属性 → `Illegal '/' in tags`。必须用 `class="text-white/50"`。
引号内的值是安全的：`bg="blue-500/20"`、`border="2 solid teal-800/50"` 没问题。

### UnoCSS Web Fonts

国内网络无法访问 Google Fonts，`presetWebFonts` 必须使用 `provider: 'bunny'`（fonts.bunny.net 是国内可访问的 Google Fonts 镜像）。`timeouts.failure` 建议设为 `60000`。

### 幻灯片布局间距

`translate-y-*` 下移容器后，其下方的兄弟元素不会跟着移动，导致重叠。减小 `translate-y` 值（如 `translate-y-8`），同时增大下方元素的 `mt-*` 间距（如 `mt-20`）来避免。

### 代码块 maxHeight

语法：`{行高亮}{maxHeight:'350px'}`，maxHeight 在独立的 `{}` 中。超过 15 行的代码块必须设置。常用值：`100px`（~5行）、`200px`（~10行）、`350px`（~18行）。

### 封面页居中

使用 `layout: center` + 简单的 `flex flex-col items-center`，避免 `translate-y-*` 偏移。

### Artifact 命名

格式：`artifact/{YYYY-MM-DD}-{topic-name}/`，如 `artifact/2026-03-28-docker-slides/`

### Git Commit 规范

格式：`<type>: <中文描述>`，type 包括 feature/bugfix/refactor/docs/style/perf/test/chore/ci。详见 `.claude/commit-convention.md`。

### `<v-clicks>` 会把所有直接子元素当作动画目标

`<v-clicks>` 会逐个动画显示每个直接子元素。如果箭头 `→` 等非交互元素也是 `<v-clicks>` 的子元素，它们会被当作动画目标出现/消失。**必须改用显式 `v-click` + `:class` 控制具体元素的动画**，把始终可见的元素（如箭头）放在 `<v-clicks>` 之外。

### 代码块（```）不能嵌在 HTML 卡片内再跟其他 HTML 元素

在 Slidev 中，当代码块（` ``` `）嵌套在 HTML `<div>` 内部时，代码块后面紧接的 HTML 元素（如 `<div>` 提示文字）无法正常渲染。**解决方案**：把提示文字移到卡片外部，作为独立的 `<div>` 放在 grid 容器之后。

## 表情包资源

- 表情包目录：`/Users/wanghaichao/develop/VsCodeProject/ChineseBQB-master`
- 使用原则：表情包必须与内容融合，嵌入卡片内部或与文字并排展示。禁止用 `absolute` 定位贴在角落当装饰贴纸。
