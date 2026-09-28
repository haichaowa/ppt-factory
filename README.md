# PPT Factory

AI Native 的**多引擎** PPT 生成系统：前沿智能体（Claude Code / Codex / …）+ 本仓库的确定性资产 → 多种形态的演示文稿。

- **HTML 引擎**（根目录 `templates/` + `patterns/`）：零依赖单文件 HTML——双击即放、断网可用、微信直发、Ctrl+P 导出 PDF、固定 16:9 等比缩放
- **Slidev 引擎**（`engines/slidev/`）：Markdown → 应用型网页 PPT——代码演示、演讲者模式、强交互，可导出 PDF / PPTX / 静态网页

## 架构理念

**智能放调用方，确定性放仓库。**

- 内容理解、内容→模式映射等智能工作交给智能体——模型进步，生成质量免费升级
- 模板、模式库、主题、设计规范、QA 规则沉淀在本仓库——可人工精修、可长期迭代

## 目录结构

```
ppt-factory/
├── engines/
│   └── slidev/            # Slidev 引擎：5 套中文模板 + 脚手架 + 导出链路（自带工具链）
│       └── style-library/ # 官方主题/Showcase 风格种子与本地参考源码
├── templates/base/        # HTML 引擎资产：skeleton.html + base.css + runtime.js
│   └── themes/            # 主题 = 单文件 CSS 变量组（dark-glow、minimal-light）
├── patterns/              # 布局模式库：15 种模式片段 + patterns.css + 速查表（含 claim / narrative-map / assertion-evidence）
├── decks/                 # 生成产物（{YYYY-MM-DD}-{slug}/index.html，冻结快照）
├── examples/              # 金样（curated 质量锚点，兼回归基线）
├── docs/                  # WORKFLOW（权威流程）/ AUDIENCE-BRIEF / DESIGN / CONTENT-RULES / DESIGN-RESEARCH / LESSONS
├── .claude/skills/deck/   # Claude Code 的 skill 入口（薄接口）
├── CLAUDE.md / AGENTS.md  # 智能体入口（指向 docs/WORKFLOW.md）
└── README.md
```

## 快速上手

- **让 AI 生成 PPT**：在本仓库打开 Claude Code（或读 AGENTS.md 的智能体），说"帮我生成一个关于 X 的 PPT"——AGENTS.md 会按场景路由到 HTML 引擎（`docs/WORKFLOW.md`）或 Slidev 引擎（`engines/slidev/AGENTS.md`）
- **用 Slidev 做演讲型 PPT**：`cd engines/slidev && npm run new -- my-talk cn-seriph`，详见 `engines/slidev/README.md`
- **人工开发模板**：从各目录 README 开始，每个目录写明了职责、文件规范、行数预算和扩展方式
- **人工修改 deck**：直接编辑 `decks/{name}/index.html`（deck 是冻结快照，禁止回源重组装）

## 项目状态

| 阶段 | 内容 | 状态 |
|------|------|------|
| 架构落地 | 目录结构 + 全部规范文档（本仓库当前状态） | ✅ |
| P0 | runtime.js / base.css / skeleton.html / 主题 / patterns 实现 | ⏳ 逐轮迭代 |
| P1 | examples/demo 金样 + 首个真实使用周期 | 待启动 |
| P2 | 扩展主题与模式、AI API 驱动器、视觉 QA 工具 | 路线图 |

技术选型依据（reveal.js 的固定舞台缩放模型、presenton/PPTAgent 的大纲先行工作流等）与设计决策记录见 `docs/`。
