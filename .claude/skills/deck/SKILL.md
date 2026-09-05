---
name: deck
description: 生成零依赖单文件 HTML 演示文稿（PPT）。用户要制作 PPT、演示文稿、slides、deck、幻灯片时使用。产出 1280×720 固定舞台的单文件 HTML，支持键盘翻页、fragment 渐进展示、演讲者备注、Ctrl+P 打印导出 PDF。也可用于修改已有 deck。
---

# deck 生成

完整流程见 `docs/WORKFLOW.md`（唯一权威，第 0-5 步）。核心要点：

1. **先读** `docs/LESSONS.md` 近期教训
2. 需求澄清 → 产出大纲（一页一行，pattern 选型查 `patterns/README.md`）→ **用户确认**
3. 装配：逐字复制 `templates/base/` 骨架 → 内联主题变量 / base.css / patterns.css / runtime.js（各自带版本围栏）→ 逐页填 pattern 片段（只改 `<!-- SLOT -->` 槽位）
4. QA 清单全打勾才交付（`?qa=1` 溢出描红、中文排版、打印预览、数据出处）

**铁律**：逐字复制、禁止即兴改模板结构与样式；大纲未确认不组装；旧 deck 直改不重组装；禁止编造数据。
