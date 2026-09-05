# AGENTS.md

模板化 PPT 生成系统：智能体 + 本仓库前端资产 → 零依赖单文件 HTML 演示文稿。

**生成 / 修改 deck 必须按 `docs/WORKFLOW.md` 执行**（唯一权威流程）：

1. 先读 `docs/LESSONS.md` 近期教训
2. 需求澄清 → 大纲（**用户确认后才动手**）
3. 装配铁律：逐字复制 `templates/base/`（skeleton、base.css、runtime.js、主题变量）与 `patterns/`（片段 + patterns.css 整文件内联）；定制只走主题变量和 `<!-- SLOT -->` 槽位
4. QA 清单逐项打勾（`?qa=1` 溢出检查、中文排版、打印预览等）才可交付
5. deck 是冻结快照：改旧 deck 直改文件，禁止回源重组装

规范：`docs/DESIGN.md`（设计/中文排版/反 slop）、`docs/CONTENT-RULES.md`（内容组织）。
