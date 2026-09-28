# AI 可模仿的 Slidev 风格种子

> 目标不是复制素材，而是抽取排版系统：比例、层级、色彩、留白、图表语言、代码呈现和页面节奏。图片、字体、logo、品牌资产需单独确认授权。

## 快速选择表

| 种子 | 适合内容 | 主参考 | 辅助参考 |
|---|---|---|---|
| **Minimal Developer** | 技术分享、开源项目、API | `examples/official-slidev-demos/starter/slides.md` | `@slidev/theme-default`、`@slidev/theme-seriph` |
| **Elegant Technical Keynote** | 大会演讲、产品发布 | `examples/antfu-talks/2021-04-29/src/slides.md` | `@slidev/theme-seriph` |
| **AI Infra Dark** | AI 平台、云原生、架构、数据密集 | `examples/baizeai-talks/packages/2025-06-11-kubecon-hk` | `slidev-theme-tahta`、`slidev-theme-geist` |
| **Visual Research Narrative** | 逆向工程、安全研究、复杂故事线 | `examples/denuvo-slides/slides.md` | `slidev-theme-dracula` |
| **Formal Academic** | 论文、课程、学术报告 | `examples/dev-environment-as-code/slides.md` | `slidev-theme-academic`、`slidev-theme-hep` |
| **Friendly Education** | 教学、训练营、科普 | `examples/py-intro/slides.md` | `@slidev/theme-bricks`、`slidev-theme-neversink` |
| **Chinese Product UI** | 中文产品介绍、后台系统、Naive UI | `examples/naive-ui-ppt-template/slides.md` | `slidev-theme-tahta`、`slidev-theme-geist` |
| **Hand-drawn Whiteboard** | 工作坊、方案推演、咨询说明 | `examples/hacker-numerology/slides.md` | `slidev-theme-excali-slide` |
| **SVG / Diagram Editorial** | 图形、可视化、设计系统 | `examples/intro-to-svg/slides.md` | `slidev-theme-light-icons` |
| **Large-Type Impact** | 观点型演讲、发布会、轻字数稿 | `slidev-theme-takahashi` | `@slidev/theme-apple-basic` |

## 种子详解

### 1. Minimal Developer

- **关键词**：干净、代码优先、少装饰、层级清楚。
- **主参考**：`examples/official-slidev-demos/starter/slides.md`
- **主题源码**：`templates/slidevjs-themes/packages/theme-default`
- **预览**：`reference-images/themes/official--slidev-theme-default/`
- **页面节奏**：cover → 简短价值主张 → 特性列表 → 代码演示 → 总结。
- **AI 模仿要点**：16:9；大标题；少量强调色；代码块使用行高亮与 `v-click`；每页只有一个核心信息。

### 2. Elegant Technical Keynote

- **关键词**：开发者大会、摄影封面、serif 标题、正式。
- **主参考**：`examples/antfu-talks/2021-04-29/src/slides.md`
- **主题源码**：`templates/slidevjs-themes/packages/theme-seriph`
- **预览**：`reference-images/themes/official--slidev-theme-seriph/`
- **AI 模仿要点**：封面用高质量背景和低透明遮罩；章节页保持仪式感；正文页克制；代码动画与讲述节奏同步。

### 3. AI Infra Dark

- **关键词**：深色、数据密集、架构图、Kubernetes / LLM 平台、工程感。
- **主参考**：`examples/baizeai-talks/packages/2025-06-11-kubecon-hk/slides.md`
- **辅助主题**：`templates/community-theme-packages/src/slidev-theme-tahta`
- **AI 模仿要点**：统一设计 token；深色背景下保证正文对比度；流程图用统一节点/连线；指标页强调一个结论而不是塞满数字。

### 4. Visual Research Narrative

- **关键词**：安全研究、逆向工程、证据链、截图、反差。
- **主参考**：`examples/denuvo-slides/slides.md`
- **AI 模仿要点**：章节感强；大量截图/反汇编片段要有裁切和标注；用时间线或流程线把证据串起来；避免证据淹没结论。

### 5. Formal Academic

- **关键词**：学术、引用、图表、稳重。
- **主参考**：`examples/dev-environment-as-code/slides.md`
- **主题源码**：`templates/community-theme-packages/src/slidev-theme-academic`
- **预览**：`reference-images/themes/community-slidev-theme-academic/`
- **AI 模仿要点**：明确研究问题、方法、实验、结论；图表编号和来源完整；少营销化语言；适合引用与脚注。

### 6. Friendly Education

- **关键词**：轻快、课程、循序渐进、图标、浅色。
- **主参考**：`examples/py-intro/slides.md`
- **主题源码**：`templates/slidevjs-themes/packages/theme-bricks`
- **辅助主题**：`templates/community-theme-packages/src/slidev-theme-neversink`
- **AI 模仿要点**：每节课一个知识点；示例代码由浅入深；用 `v-click` 控制推导；结尾给练习与 checklist。

### 7. Chinese Product UI

- **关键词**：中文、产品介绍、后台系统、组件化、Naive UI。
- **主参考**：`examples/naive-ui-ppt-template/slides.md`
- **辅助主题**：`templates/community-theme-packages/src/slidev-theme-tahta`
- **AI 模仿要点**：中文字号略大；避免英文长段；产品截图统一切角和描边；用卡片/参数表/流程图说明能力边界。

### 8. Hand-drawn Whiteboard

- **关键词**：工作坊、手绘、思考过程、非正式。
- **主参考**：`examples/hacker-numerology/slides.md`
- **辅助主题**：`templates/community-theme-packages/src/slidev-theme-excali-slide`
- **AI 模仿要点**：粗描边、手写感字体、圈画强调；减少复杂渐变；适合从问题拆解到方案。

### 9. SVG / Diagram Editorial

- **关键词**：图形化、浅色、图解、设计系统。
- **主参考**：`examples/intro-to-svg/slides.md`
- **辅助主题**：`templates/community-theme-packages/src/slidev-theme-light-icons`
- **AI 模仿要点**：图形本身是主角；配色和线条统一；图注清楚；代码与渲染结果左右对照。

### 10. Large-Type Impact

- **关键词**：少字、大字、观点、节奏。
- **主参考**：`templates/community-theme-packages/src/slidev-theme-takahashi`
- **预览**：`reference-images/themes/community-slidev-theme-takahashi/`
- **AI 模仿要点**：每页只保留一个短语或数字；口稿放 notes；页面切换形成论证链。

## 后续生成建议

1. 每个系列先产出 3 页试稿：cover、典型内容页、数据/代码页。
2. 固化一个 `style-tokens.md`：色彩、字体、间距、边框、阴影、图表语言。
3. 用同一种章节页和结尾页，让多套 PPT 形成系列感。
4. 用 MCP 做批量扩展，用浏览器截图做回归检查。
