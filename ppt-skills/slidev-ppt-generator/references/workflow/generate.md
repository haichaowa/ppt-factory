# 步骤 3：生成项目

> 本文档是 [SKILL.md](../../SKILL.md) 步骤 3 的详细展开。

## 核心目标

基于 `contents/generate/{slug}/` 的 metadata.json + outline.md，生成完整的 Slidev artifact 项目到 `artifact/{YYYY-MM-DD}-{slug}/`。

---

## 生成流程（7 步）

### 1. 读取输入
- `contents/generate/{slug}/outline.md`
- `contents/generate/{slug}/metadata.json`

### 2. 确定主题
- 从 metadata.json 读取 `theme` 字段
- 默认 `glow`，可选：`minimal` / `bold` / `dark-pro` / `neon`
- 详见 [主题选择矩阵](../../SKILL.md#主题选择矩阵)

### 3. 读取主题参考
- 主题专属布局：`references/themes/{theme}/slide-patterns.md`
- 主题专属配置：`references/themes/{theme}/theme-config.md`
- 通用语法护栏：[syntax-rules.md](../syntax-rules.md)

### 4. 生成 slides.md
- 按照 Slidev 语法生成，**使用对应主题的 headmatter 和 pattern**
- outline.md 的 Pattern 标注决定每页的布局
- 必须满足 [设计护栏](../content-rules.md#八硬性设计约束验证阶段强制检查)

### 5. 复制模板文件
- 基础模板：`assets/templates/default/`（package.json、uno.config.ts、style.css、setup/shiki.ts）
- 主题覆盖：`assets/themes/{theme}/`（同名文件覆盖默认）

### 6. 长演讲模块化（可选）
- 当 `targetPages > 25`，采用模块化拆分
- 详见 [modular-slides.md](../shared/modular-slides.md)

### 7. Figure 复制（学术论文场景）
- 若 outline.md 有 `figureEmbed: true` 标注
- 从 `contents/ori/{slug}/assets/figures/` 复制原图到 `artifact/{date}-{slug}/public/figures/`
- **不重画 / 不拉伸 / 不裁切**，用 `object-contain` 保持原始比例
- 详见 [input-pipeline.md Figure 处理规则](../shared/input-pipeline.md#figure-处理规则学术资料)

### 8. 项目目录命名
- 格式：`artifact/{YYYY-MM-DD}-{topic-name}/`
- 示例：`artifact/2026-03-28-docker-slides/`

---

## 生成结构

```
artifact/{YYYY-MM-DD}-{slug}/
├── slides.md                # 主文件（或 sections/ 引用，见 modular-slides）
├── uno.config.ts            # 主题专属 UnoCSS 配置
├── style.css                # 主题专属样式
├── global-bottom.vue        # 主题背景组件
├── setup/
│   └── shiki.ts             # 代码高亮配置
├── package.json             # 依赖配置
├── public/                  # 静态资源
│   ├── backgrounds/         # 背景图片（可选）
│   ├── videos/              # 视频文件（可选）
│   └── qr-code.png          # QR 码（可选）
└── sections/                # 长演讲模块化时使用（>25 页）
    ├── 00-cover.md
    ├── 01-intro.md
    └── ...
```

---

## Headmatter 生成规则

### Glow 主题（默认）
```yaml
---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: {metadata.title}
exportFilename: {slug}
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

### Minimal 主题
```yaml
---
layout: center
highlighter: shiki
css: unocss
colorSchema: light          # 必须 light
transition: fade            # 简单过渡
title: {metadata.title}
mdc: true
fonts:
  sans: 'Source Sans 3'
  serif: 'Noto Serif SC'
  mono: 'JetBrains Mono'
---
```

### Bold 主题
```yaml
---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: slide-left      # 舞台感
title: {metadata.title}
mdc: true
fonts:
  sans: 'Inter'
  mono: 'JetBrains Mono'
---
```

### Dark-Pro 主题
```yaml
---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: {metadata.title}
mdc: true
fonts:
  sans: 'Inter'
  mono: 'JetBrains Mono'
---
```

### Neon 主题
```yaml
---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: {metadata.title}
mdc: true
fonts:
  sans: 'Orbitron'
  mono: 'JetBrains Mono'
  hand: 'Press Start 2P'
neonHue: 280
neonIntensity: 0.6
---
```

---

## Pattern → 代码片段映射

每页根据 outline.md 的 Pattern 标注，从 `references/themes/{theme}/slide-patterns.md` 找对应模板，填入 outline.md 的"核心内容"和"布局细节"。

详见各主题的 slide-patterns.md：
- [Glow](../themes/glow/slide-patterns.md)
- [Minimal](../themes/minimal/slide-patterns.md)
- [Bold](../themes/bold/slide-patterns.md)
- [Dark-Pro](../themes/dark-pro/slide-patterns.md)
- [Neon](../themes/neon/slide-patterns.md)

---

## 表情包资源

- 表情包目录：`/Users/wanghaichao/develop/VsCodeProject/ChineseBQB-master`
- 使用原则：表情包必须与内容融合，嵌入卡片内部或与文字并排展示
- 禁止用 `absolute` 定位贴在角落当装饰贴纸
