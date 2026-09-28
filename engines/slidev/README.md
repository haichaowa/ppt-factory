# Slidev 引擎（engines/slidev）

基于 [Slidev](https://github.com/slidevjs/slidev)（Markdown → 网页 PPT）的生成引擎：
**依赖只装一次，主题精选内置，中文模板开箱即用，一条命令创建 / 预览 / 导出 / 部署。**

## 快速开始

```bash
npm install                    # 只需一次

npm run new -- my-talk         # 创建新 deck（默认 cn-default 模板）
npm run dev -- decks/my-talk/slides.md    # 预览 http://localhost:3030

npm run export -- decks/my-talk/slides.md  # 导出 PDF
npm run build -- decks/my-talk/slides.md   # 构建静态网页
```

## 目录结构

```
engines/slidev/
├── templates/          # 精选模板（新建 deck 的起点）
│   ├── cn-default/     #   通用（官方 default 主题）
│   ├── cn-seriph/      #   正式汇报（衬线 + 公式）
│   ├── cn-geist/       #   Vercel 极简风
│   ├── cn-takahashi/   #   高桥流大字报
│   └── cn-dracula/     #   暗色代码风
├── decks/              # 你的演示文稿（每场一个目录）
├── style-library/      # 官方 Theme/Showcase 风格素材库（AI 选风格与模仿用）
├── docs/
│   ├── RESOURCES.md    # 生态资源大全（主题/插件/模板仓库索引）
│   ├── GUIDE.md        # 从零到发布实操指南
│   └── CHEATSHEET.md   # slides.md 语法速查
└── scripts/
    ├── new.sh          # npm run new -- <名称> [模板]
    └── list.sh         # npm run ls
```

## 命令一览

| 命令 | 作用 |
| --- | --- |
| `npm run new -- <名> [模板]` | 从模板创建 deck |
| `npm run ls` | 列出模板与已有 deck |
| `npm run dev -- <slides.md>` | 开发预览（热更新 + 演讲者模式） |
| `npm run export -- <slides.md>` | 导出 PDF |
| `npm run export:pptx -- <slides.md>` | 导出 PPTX（图片式） |
| `npm run export:dark -- <slides.md>` | 导出暗色 PDF |
| `npm run build -- <slides.md>` | 构建静态网页（dist/） |

## 内置主题依赖

| 包 | 风格 | 对应模板 |
| --- | --- | --- |
| @slidev/theme-default | 极简通用 | cn-default |
| @slidev/theme-seriph | 衬线正式 | cn-seriph |
| slidev-theme-geist | Vercel 风 | cn-geist |
| slidev-theme-takahashi | 高桥流 | cn-takahashi |
| slidev-theme-dracula | 暗色代码 | cn-dracula |
| @slidev/theme-apple-basic | Apple Keynote 风 | （按需） |

新增主题：`npm i slidev-theme-xxx` → slides.md 头部 `theme: xxx`。
完整生态索引见 **[docs/RESOURCES.md](docs/RESOURCES.md)**。已有大纲时，先在 **[style-library/STYLE-SEEDS.md](style-library/STYLE-SEEDS.md)** 选风格种子，再创建 deck。

## 更多文档

- 📖 实操指南（排练 / 导出 / 部署 / FAQ）：[docs/GUIDE.md](docs/GUIDE.md)
- ⌨️ 语法速查：[docs/CHEATSHEET.md](docs/CHEATSHEET.md)
- 🌐 官方文档：https://sli.dev · 中文：https://cn.sli.dev

## 与 HTML 引擎的关系

| | 本引擎（engines/slidev） | HTML 引擎（根目录 templates/ + patterns/） |
| --- | --- | --- |
| 形态 | 应用型（Node 项目） | 零依赖单文件 HTML |
| 强项 | 交互、代码演示、演讲者模式 | 冻结快照、离线分发 |
| 适合 | 技术演讲、直播、教学 | 归档、交付、无环境演示 |
