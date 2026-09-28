# Slidev AI 风格素材库

这是一个为「AI 模仿优秀 Slidev 风格并批量生成 PPT」准备的本地素材库，基于 Slidev v53.0.0 官方 Theme Gallery 与 Showcases 收集。

## 目录

```text
engines/slidev/style-library/
├── AI-USAGE.md                 # Slidev 官方 Skill / MCP / Agent 工作流
├── STYLE-SEEDS.md              # 10 个可模仿的风格种子与 AI 提示要点
├── official-skill/             # Slidev 官方 AI Skill 留档
├── catalog/
│   ├── slidev-official-catalog.json
│   ├── style-seeds.json
│   ├── themes.md
│   └── showcases.md
├── reference-images/
│   └── themes/                 # 22 个主题、124 张官方/画廊预览图
├── templates/
│   ├── slidevjs-themes/        # 官方主题 monorepo，5 个官方主题源码
│   └── community-theme-packages/src/  # 24 个社区主题源码
└── examples/                   # 9 个精选案例源码 + 3 个官方 demo
```

## 当前收集规模

- Slidev 官方框架：`/Users/wanghaichao/develop/VsCodeProject/slidev`，已更新到 `v53.0.0`
- 官方 AI Skill：已安装到 Codex，下一轮对话可用
- 官方主题：5 个，全部已下载源码
  - Default、Seriph、Apple Basic、Bricks、Shibainu
- 官方画廊社区主题：24 个，全部已下载源码
- 官方 Showcase：25 个，其中 9 个精选案例已下载源码，其余保留在线链接
- 本地主题预览图：124 张

## 怎么用

1. 先看 `STYLE-SEEDS.md` 选风格。
2. 需要浏览所有主题/案例时看 `catalog/themes.md` 和 `catalog/showcases.md`。
3. 机器读取用 `catalog/slidev-official-catalog.json`。
4. 风格种子机器读取用 `catalog/style-seeds.json`。
5. 生成新 deck 时让 AI 阅读 `AI-USAGE.md` 与对应风格种子的本地源码。

## 重要提醒

这里的第三方案例和主题仅作为风格学习与本地研究使用。不要直接复制别人的图片、字体、logo、品牌资产或大段内容；应重新创作文案，并使用自己有权使用的素材。
