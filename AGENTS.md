# AGENTS.md

多引擎 PPT 生成系统：智能体 + 本仓库确定性资产 → 多种形态的演示文稿。

## 引擎路由（先选车间，再走流程）

| 需求场景 | 引擎 | 流程入口 |
|---|---|---|
| 冻结快照 / 离线交付 / 微信直发 / 单文件 HTML | HTML 引擎（根目录 `templates/` + `patterns/`） | `docs/WORKFLOW.md` |
| 技术演讲 / 代码演示 / 强交互 / 演讲者模式 | Slidev 引擎（`engines/slidev/`） | `engines/slidev/AGENTS.md` |

## HTML 引擎（唯一权威流程，生成 / 修改 deck 必须遵守）

1. 先读 `docs/LESSONS.md` 近期教训
2. 需求澄清 → 大纲（**用户确认后才动手**）
3. 装配铁律：逐字复制 `templates/base/`（skeleton、base.css、runtime.js、主题变量）与 `patterns/`（片段 + patterns.css 整文件内联）；定制只走主题变量和 `<!-- SLOT -->` 槽位
4. QA 清单逐项打勾（`?qa=1` 溢出检查、中文排版、打印预览等）才可交付
5. deck 是冻结快照：改旧 deck 直改文件，禁止回源重组装

通用规范：`docs/AUDIENCE-BRIEF.md`（观众与叙事）、`docs/CONTENT-RULES.md`（内容组织）、`docs/DESIGN.md`（视觉/可访问性/反 slop）、`docs/DESIGN-RESEARCH.md`（外部依据）。

生成前固定顺序：**观众与主张 → 叙事大纲 → 证据与 pattern → 主题与版式 → QA**。两个引擎都不得先选视觉风格再反填内容。

## Slidev 引擎

生产规则、QA 底线、已知坑见 `engines/slidev/AGENTS.md`；生态与语法见 `engines/slidev/docs/`。
用户已有 PPT 大纲时，先读 `engines/slidev/style-library/STYLE-SEEDS.md` 选一个风格种子，再按该引擎流程创建 deck；需要精细模仿时读取对应本地源码与预览。
