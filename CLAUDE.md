# CLAUDE.md

PPT Factory：多引擎 PPT 生成系统（HTML 单文件 + Slidev），智能体入口见 `AGENTS.md` 引擎路由。

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

## 开发迭代约定

- 改模板 / 主题 / runtime = 影响所有未来 deck；动手前读目标目录 README（行数预算）+ `docs/LESSONS.md`
- 规范文档用"必须 / 禁止"式约束 + 示范，面向智能体可执行（AI Native 原则见 `docs/DESIGN.md`）
- Git 提交规范见 `.claude/commit-convention.md`（`<type>: <中文描述>`）
