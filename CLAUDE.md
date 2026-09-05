# CLAUDE.md

模板化 PPT 生成系统：智能体 + 本仓库前端模板资产 → 零依赖单文件 HTML deck（16:9、翻页、fragment 渐进、打印导 PDF）。

## 铁律（必须遵守）

1. 生成 / 修改 deck **必须**走 `docs/WORKFLOW.md`（唯一权威流程，第 0-5 步 + QA 清单）
2. 装配 = **逐字复制** `templates/` 与 `patterns/` 的文件；定制只走 ① 主题变量 ② 内容槽位
3. deck 是**冻结快照**：改旧 deck 直改文件，**禁止**回源重新组装
4. 大纲未经用户确认，**禁止**开始组装
5. 规范变更必须同步 `docs/` 对应文档，并在 `docs/LESSONS.md` 记录

## 目录速查

| 目录 | 职责 |
|------|------|
| `templates/base/` | deck 引擎：skeleton / base.css / runtime.js / themes |
| `patterns/` | 布局模式库（12 种片段 + 速查表） |
| `decks/` | 生成产物（冻结快照） |
| `examples/` | 金样（质量锚点 + 回归基线） |
| `docs/` | WORKFLOW（权威流程）/ DESIGN / CONTENT-RULES / LESSONS |
| `ppt-skills/slidev-ppt-generator/` | 遗留：Slidev 生成路线（见下节） |

## 开发迭代约定

- 改模板 / 主题 / runtime = 影响所有未来 deck；动手前读目标目录 README（行数预算）+ `docs/LESSONS.md`
- 规范文档用"必须 / 禁止"式约束 + 示范，面向智能体可执行（AI Native 原则见 `docs/DESIGN.md`）
- Git 提交规范见 `.claude/commit-convention.md`（`<type>: <中文描述>`）

## 遗留：Slidev 生成路线（ppt-skills/）

本仓库早期基于 Slidev + UnoCSS + Vue 3 的 Monorepo（`contents/` → `artifact/` 内容管道），后重构为零依赖 HTML 模板系统（当前主架构）。`ppt-skills/slidev-ppt-generator/` 保留了该路线的完整 Skill 开发成果，未随重构删除：

- `SKILL.md` — 生成器核心（模块化工作流）
- `references/syntax-rules.md` — Slidev/UnoCSS 语法陷阱（裸属性 `/`、代码块 maxHeight、v-clicks 行为等）
- `references/failure-modes.md` — 失败模式目录（FM-01 ~ FM-08）
- `references/themes/` — 5 套主题（glow / minimal / bold / dark-pro / neon）
- `references/shared/` — 多模态输入管线、长演讲 `<Src />` 章节拆分

走 Slidev 路线生成时以此为入口；两条路线互不影响。若要继续维护该路线，语法细节以 `references/syntax-rules.md` 为准，不在本文档展开。

## 表情包资源

- 表情包目录：`/Users/wanghaichao/develop/VsCodeProject/ChineseBQB-master`
- 使用原则：表情包必须与内容融合，嵌入卡片内部或与文字并排展示。禁止用 `absolute` 定位贴在角落当装饰贴纸。
