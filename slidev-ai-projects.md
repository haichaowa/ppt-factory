# GitHub 上基于 Slidev + AI 的热门 PPT 项目 Top 20

> 搜集时间：2026-06-22
> 检索关键词：`slidev ai`、`slidev generator`、`ppt generator ai`、`markdown ppt ai`、`ai slides generator`、`ai presentation generator`、`ai ppt`
> 排序：Stars 降序，已对结果去重与人工筛选
> 标注：⭐⭐⭐⭐⭐ = 与当前 ppt-generator 项目高度相关、值得直接借鉴

---

## 排名 1：[slidevjs/slidev](https://github.com/slidevjs/slidev) ⭐⭐⭐⭐⭐
- ⭐ Stars: 47,305
- 📝 描述：面向开发者的演示文稿框架，用 Markdown 写幻灯片，支持 Vue 组件、Monaco 实时编码、PDF/PPTX 导出。
- 🛠️ 技术栈：TypeScript + Vite + Vue 3 + UnoCSS + Shiki
- 🤖 AI 集成：无原生 AI（是本项目的底层框架）
- 📅 最近更新：2026-06-22
- 💡 借鉴点：本项目直接基于 Slidev 构建，所有主题、布局、addon 生态都建立在其之上。关注其版本升级（当前 v52.5）与新增 layout。

---

## 排名 2：[Anionex/banana-slides](https://github.com/Anionex/banana-slides) ⭐⭐⭐⭐⭐
- ⭐ Stars: 15,001
- 📝 描述：基于 nano banana pro 🍌 模型的原生 AI PPT 生成应用，迈向"Vibe PPT"。支持上传模板图片、素材智能解析、一句话/大纲/页面描述自动生成 PPT，可口头修改指定区域，一键导出可编辑 ppt。
- 🛠️ 技术栈：Python + nano banana pro（OpenAI gpt-image-2 / Codex OAuth）+ Docker
- 🤖 AI 集成：nano banana pro（图片生成）+ GPT-image-2 + Codex（OAuth 登录）+ PaddleOCR
- 📅 最近更新：2026-06-22
- 💡 借鉴点：**图片型 PPT → OCR 识别 → 清除文字背景 → 添加可编辑文字层 → 导出 PPTX** 的完整管线非常成熟；支持"区域口头修改"是用户最爱的交互；agent skills + CLI 操作也开放（与本项目的 skill 思路一致）。

---

## 排名 3：[presenton/presenton](https://github.com/presenton/presenton)
- ⭐ Stars: 8,453
- 📝 描述：开源 AI 演示文稿生成器与 API，Gamma/Canva/Beautiful AI 的开源替代品。
- 🛠️ 技术栈：TypeScript + Python + Docker（BYOK 模型自选）
- 🤖 AI 集成：OpenAI / Gemini / Vertex AI / Azure / Bedrock / Fireworks / Together / Anthropic / Ollama / LM Studio（任何 OpenAI 兼容 provider）
- 📅 最近更新：2026-06-22
- 💡 借鉴点：**BYOK（Bring Your Own Key）+ Desktop App + Web Docker** 三位一体部署模式；可编辑 PPTX 导出；提供 AI Presentation Generation API。

---

## 排名 4：[allweonedev/presentation-ai](https://github.com/allweonedev/presentation-ai)
- ⭐ Stars: 2,868
- 📝 描述：开源 AI 演示文稿生成器，Gamma Alternative，几分钟内创建专业幻灯片，可定制主题。
- 🛠️ 技术栈：Next.js + Tailwind CSS + Plate JS（富文本编辑器）
- 🤖 AI 集成：可切换文本模型、可选联网搜索、实时流式生成
- 📅 最近更新：2026-06-20
- 💡 借鉴点：**Outline-First Workflow**（先大纲再生成幻灯片，与本项目 6 步工作流一致）；实时观看生成过程；自动保存；可配置模型/页数/语言。

---

## 排名 5：[veasion/AiPPT](https://github.com/veasion/AiPPT)
- ⭐ Stars: 1,891
- 📝 描述：商用级 AI 生成 PPT 项目，支持原生图表/动画/3D 特效的解析与渲染，支持自定义模板与智能动画。包含 AI 生成 PPT、PPT 转 JSON、JSON 反渲染 PPT 三件套。
- 🛠️ 技术栈：JavaScript + Vue
- 🤖 AI 集成：商用级 LLM（接 GPT 等）
- 📅 最近更新：2026-06-21
- 💡 借鉴点：**PPT ↔ JSON 双向解析**是商业级能力（`ppt2json` / `json2ppt`）；支持原生图表、3D 特效；自定义模板与智能动画。

---

## 排名 6：[GordenSun/GordenSuperPPTSkills](https://github.com/GordenSun/GordenSuperPPTSkills) ⭐⭐⭐⭐⭐
- ⭐ Stars: 1,111
- 📝 描述：自称"AI PPT 赛道终结者"——使用 GPT 生成豪华图片格式 PPT，再转换为完全可编辑 PPTX。已拆成 3 个独立 Skill：GordenImagePPTGen / GordenImage2PPTX / GordenSuperPPTSkill。
- 🛠️ 技术栈：Python（Codex 专用 Skill）
- 🤖 AI 集成：GPT-5.5（生图 + 视觉），仅限 Codex
- 📅 最近更新：2026-06-22
- 💡 借鉴点：**Skill 拆分理念**（生成图 PPT vs 图转可编辑 PPTX vs 编排两者）非常清晰，可借鉴到本项目的 SKILL.md 模块化设计；图片型→可编辑型的双层架构值得学习。

---

## 排名 7：[LSTM-Kirigaya/slidev-ai](https://github.com/LSTM-Kirigaya/slidev-ai) ⭐⭐⭐⭐⭐
- ⭐ Stars: 277
- 📝 描述：**基于 Slidev 的 AI 在线 PPT 创建平台**，面向工程师与学术场景，获 ModelScope MCP&Agent 大赛最佳应用奖。OpenMCP 生态的下游实现。
- 🛠️ 技术栈：Vue 3 + Vite（前端）+ NestJS + SQLite + Puppeteer（后端）+ Docker Compose
- 🤖 AI 集成：OpenAI API（默认 gpt-4o-mini，可换），通过 OpenMCP SDK
- 📅 最近更新：2026-06-11
- 💡 借鉴点：**与本项目最接近**！同样用 Slidev + LLM 生成 PPT。设计边界文档清晰（"能做什么/不能做什么"），值得参考；容器化部署方案（前后端分离）可直接借鉴；明确的"高密度文本 → 视觉 PPT + 演讲稿"定位。

---

## 排名 8：[LangChat/langchat-slides](https://github.com/LangChat/langchat-slides)
- ⭐ Stars: 212
- 📝 描述：基于 Vue3 的 AI PPT 产品，自然语言一句话生成信息图风格幻灯片，支持对话式编辑、多页管理、多格式导出（PDF/PNG/SVG/JPG/WebP/PPT）。
- 🛠️ 技术栈：Vue 3 + VueFlow + @antv/infographic + Shadcn UI + Tailwind CSS + Spring Boot 3
- 🤖 AI 集成：OpenAI GPT-4 / GPT-3.5 流式生成
- 📅 最近更新：2026-06-11
- 💡 借鉴点：**实时流式渲染 WYSIWYG**（边生成边出片）；声明式语法自动适配布局；对话式编辑（"把标题改成红色"）。

---

## 排名 9：[SkyworkAI/Skywork-Skills](https://github.com/SkyworkAI/Skywork-Skills) ⭐⭐⭐⭐⭐
- ⭐ Stars: 175
- 📝 描述：Skywork 出品的 Agent Skills 套件，涵盖 AI PPT、AI Document、AI Excel、AI Image、AI Search/DeepResearch、AI Music。兼容 Claude Code、Codex CLI、OpenCode、OpenClaw 等任何 skills 兼容的 agent。
- 🛠️ 技术栈：Python（标准 SKILL.md 格式）
- 🤖 AI 集成：跨 agent 通用（skywork-ppt 是其中之一）
- 📅 最近更新：2026-06-18
- 💡 借鉴点：**官方背书的 SKILL.md 跨 agent 兼容写法**（同时支持 Claude/Codex/OpenCode/OpenClaw）；`npx skills add` 安装方式；`skywork-ppt` 子 skill 的内部结构非常值得参考。

---

## 排名 10：[snowmanzhuang/yixueAIganhuo-PPT](https://github.com/snowmanzhuang/yixueAIganhuo-PPT)
- ⭐ Stars: 167
- 📝 描述：把论文/PDF/Figure/截图/报告自动做成高质量 PPT 的 AI skill，适合论文精读、组会汇报、教学培训。
- 🛠️ 技术栈：Python（Claude Code Skill）
- 🤖 AI 集成：gpt-image-2（生图）+ PaddleOCR v5（文字识别）
- 📅 最近更新：2026-06-20
- 💡 借鉴点：**资料理解 → 页面规划 → 生图 → OCR → 清字背景 → 加可编辑文字层** 的完整 pipeline；自动按原始比例嵌入 Figure（不重画、不拉伸）；生成的 PPTX 可带演讲稿备注。

---

## 排名 11：[YOOTeam/ChatPPT-MCP](https://github.com/YOOTeam/ChatPPT-MCP)
- ⭐ Stars: 145
- 📝 描述：基于 ChatPPT 的 AI PPT 生成 MCP 服务，支持主题/要求/上传文档生成 PPT，可在线编辑、下载、换模板、改配色字体。BIYOO 提供 18 个智能文档处理 API。
- 🛠️ 技术栈：JavaScript + Python（STDIO + Streamable HTTP 双协议）
- 🤖 AI 集成：ChatPPT 服务端 + MCP 协议
- 📅 最近更新：2026-06-22
- 💡 借鉴点：**MCP Server 的 STDIO + Streamable HTTP 双协议**部署模式；Cursor/Trae 直接配置使用；适合作为本项目的 MCP 对外接口参考。

---

## 排名 12：[YOYZHANG/ai-ppt](https://github.com/YOYZHANG/ai-ppt)
- ⭐ Stars: 144
- 📝 描述：基于 RevealJS 语法的 AI PPT 生成器（类似 Slidev 但用 RevealJS）。
- 🛠️ 技术栈：Next.js + Tailwind CSS + Supabase + Stripe + Gemini API
- 🤖 AI 集成：Google Gemini
- 📅 最近更新：2026-04-27
- 💡 借鉴点：与本项目思路相同（Markdown → 演示框架 → AI 生成），但用 RevealJS 替代 Slidev；完整集成了 OAuth + 支付（Stripe），是 SaaS 化参考。

---

## 排名 13：[metaimagine/ai-pptx](https://github.com/metaimagine/ai-pptx)
- ⭐ Stars: 104
- 📝 描述：用 LLM 生成 PPT，**并且支持按用户 favorite 的 PPT 模板生成**——只需修改模板参数即可。
- 🛠️ 技术栈：Python
- 🤖 AI 集成：LLM 模板参数化生成
- 📅 最近更新：2026-05-08
- 💡 借鉴点：**用户自备模板 + 参数化替换** 的生成模式，可作为本项目的"模板继承"功能补充。

---

## 排名 14：[LSTM-Kirigaya/slidev-mcp](https://github.com/LSTM-Kirigaya/slidev-mcp) ⭐⭐⭐⭐⭐
- ⭐ Stars: 91
- 📝 描述：**为 Slidev 打造的 MCP Server**，让 AI 通过 MCP 工具调用直接操作 Slidev——能 `create_slidev` / `make_cover` / `add_page` / `set_page` / `get_page` / `websearch` 等。
- 🛠️ 技术栈：TypeScript + Jinja（OpenMCP SDK）
- 🤖 AI 集成：通过 MCP 暴露 Slidev 操作给任意 LLM agent
- 📅 最近更新：2026-06-08
- 💡 借鉴点：**把 Slidev 项目操作封装为 MCP tools** 的标准实现！与本项目的 skill 路线互补——skill 是"教 LLM 怎么写"，MCP 是"让 LLM 直接调"。可以参考它的 tool 切分粒度（页面级而非字符级）。

---

## 排名 15：[Akxan/ppt-agent-skill](https://github.com/Akxan/ppt-agent-skill) ⭐⭐⭐⭐⭐
- ⭐ Stars: 88
- 📝 描述：世界级 AI 演示文稿生成系统——Claude Code Skill，把一句话变成 PPT 设计公司级别的成品（HTML + 可编辑矢量 PPTX）。**26 种风格 + 18 种图表**，对标 Linear / Anthropic / Stripe / Apple / NYT。
- 🛠️ 技术栈：Python（Claude Code Skill）+ HTML→SVG→PPTX 管线
- 🤖 AI 集成：Claude（skill）+ AI 配图
- 📅 最近更新：2026-06-21
- 💡 借鉴点：**6 步 Pipeline**（调研 → 资料搜集 → 大纲 → 策划稿 → HTML 设计 → SVG+PPTX 后处理）与本项目几乎一致！但风格系统（26 风格 + 排版铁律）远比本项目成熟；失败模式目录（8 种 failure modes）和 smoke 测试也值得学习。

---

## 排名 16：[StarryKit/starry-slides](https://github.com/StarryKit/starry-slides)
- ⭐ Stars: 68
- 📝 描述：AI 幻灯片编辑器与 Agent skill，**以 HTML 作为源文件**，生成完全可编辑的幻灯片。提供 WYSIWYG 编辑体验。
- 🛠️ 技术栈：TypeScript + npm 包 `starry-slides`
- 🤖 AI 集成：Agent Skills 标准（兼容多 agent）
- 📅 最近更新：2026-06-20
- 💡 借鉴点：**HTML 作为源文件**而非 Markdown（与 Slidev 思路对比）；WYSIWYG 可视化编辑而不放弃源码；npm 包化分发。

---

## 排名 17：[MYZY-AI/dokie-ai-ppt](https://github.com/MYZY-AI/dokie-ai-ppt)
- ⭐ Stars: 64
- 📝 描述：（无 README 描述）基于 HTML 的 AI PPT 项目。
- 🛠️ 技术栈：HTML
- 🤖 AI 集成：未明确
- 📅 最近更新：2026-06-05
- 💡 借鉴点：待补充调研。

---

## 排名 18：[wilingna/ai-ppt-toolkit](https://github.com/wilingna/ai-ppt-toolkit)
- ⭐ Stars: 54
- 📝 描述：NotebookLM + Gemini + Gamma 三件套做 PPT 的完整工作流（Web 版升级为 ai-ppt-web）。
- 🛠️ 技术栈：HTML 工作流教程
- 🤖 AI 集成：NotebookLM（资料整理）+ Gemini（生成）+ Gamma（设计）
- 📅 最近更新：2026-06-18
- 💡 借鉴点：**多工具协同工作流设计**——把不同 AI 工具的优势组合起来（资料类用 NotebookLM，内容类用 Gemini，排版类用 Gamma）。

---

## 排名 19：[rhuss/cc-slidev](https://github.com/rhuss/cc-slidev) ⭐⭐⭐⭐⭐
- ⭐ Stars: 40
- 📝 描述：**Claude Code Plugin for Slidev**——专为开发者技术演讲设计，强制执行基于认知科学的"证据级设计护栏"（Miller 定律等）。
- 🛠️ 技术栈：Shell（Claude Code Plugin）
- 🤖 AI 集成：Claude Code
- 📅 最近更新：2026-06-07
- 💡 借鉴点：**与本项目思路最接近**！同样是 Claude + Slidev 的组合。它的"硬性约束"哲学非常值得借鉴：每页 ≤6 元素、每页 <50 词、一个观点一页、有意义断言式标题、18pt+ 字号、4.5:1+ 对比度、色盲友好色板——**超限自动加页而非挤一页**。模块化 slides/ 目录（`01-title.md`、`02-hook.md`）也值得学。

---

## 排名 20：[li599198347-svg/aham-ppt](https://github.com/li599198347-svg/aham-ppt)
- ⭐ Stars: 37
- 📝 描述：咨询级 AI PPT 制作技能——"丢一堆素材，幻灯片出来了"。
- 🛠️ 技术栈：Python（Claude Code Skill）
- 🤖 AI 集成：Claude
- 📅 最近更新：2026-06-22
- 💡 借鉴点：**素材驱动（非主题驱动）**的生成模式——用户丢一堆原始素材，AI 自动组织成咨询级 PPT，与本项目的 `contents/ori → generate → artifact` 管线理念相同。

---

## 排名 21：[1624899/ai-ppt-maker](https://github.com/1624899/ai-ppt-maker)
- ⭐ Stars: 33
- 📝 描述：AI 驱动的 PPT 生成系统，支持可编辑分层 PPTX 导出。
- 🛠️ 技术栈：Python
- 🤖 AI 集成：LLM
- 📅 最近更新：2026-06-18
- 💡 借鉴点：分层 PPTX 导出（背景/骨架/图标/文本 四层），与 GordenSun 项目思路类似。

---

## 排名 22：[ningzimu/awesome-ai-ppt](https://github.com/ningzimu/awesome-ai-ppt) ⭐⭐⭐⭐⭐
- ⭐ Stars: 31
- 📝 描述：AI PPT、PowerPoint 自动化、PPTX 编辑、slides 工作流工具的精选列表（Awesome List）。
- 🛠️ 技术栈：—
- 🤖 AI 集成：—
- 📅 最近更新：2026-06-21
- 💡 借鉴点：**作为持续跟踪 AI PPT 生态的索引**，可作为本调研报告的补充源。

---

## 排名 23：[WeHomeBot/slidev-agent](https://github.com/WeHomeBot/slidev-agent) ⭐⭐⭐⭐⭐
- ⭐ Stars: 6
- 📝 描述：**用 Trae + Slidev 创作 AI PPT 的最佳实践**——把 prompt rules 放到 `.trae/rules/` 下，配合 Trae Builder 智能体使用。
- 🛠️ 技术栈：Vue（Slidev）+ Trae
- 🤖 AI 集成：Trae Builder Agent
- 📅 最近更新：2026-04-15
- 💡 借鉴点：**与本项目的 SKILL.md 几乎是同一思路**！它的设计原则可以直接对照：
  - 卡片风格排版，注意卡片高度
  - HTML 片段标签中间禁止有空行（与本项目踩过的坑一致！）
  - 列表不超过 6 行
  - 详细文字放演讲者注释
  - 禁止 Markdown 代码块放入 Vue 组件（**与本项目 CLAUDE.md 完全相同的踩坑经验**）
  - 禁止使用官方 Toc 组件

---

## 重点借鉴清单

按"对当前 ppt-generator 项目的参考价值"排序：

| 优先级 | 项目 | 借鉴方向 |
|---|---|---|
| 🔥 必读 | LSTM-Kirigaya/slidev-ai | 同为 Slidev + AI 的完整产品形态（Vue + NestJS + Docker） |
| 🔥 必读 | LSTM-Kirigaya/slidev-mcp | Slidev 操作的 MCP tool 切分粒度 |
| 🔥 必读 | rhuss/cc-slidev | Claude + Slidev 的"证据级设计护栏"硬约束 |
| 🔥 必读 | WeHomeBot/slidev-agent | 同思路项目的踩坑经验（与本 CLAUDE.md 高度吻合） |
| 🔥 必读 | Akxan/ppt-agent-skill | 6 步 Pipeline + 26 风格系统 + failure modes 目录 |
| 🔥 必读 | GordenSun/GordenSuperPPTSkills | Skill 模块化拆分 + 图片型/可编辑型双层架构 |
| ⭐ 推荐 | SkyworkAI/Skywork-Skills | 跨 agent 兼容的 SKILL.md 官方写法 |
| ⭐ 推荐 | snowmanzhuang/yixueAIganhuo-PPT | PDF/资料 → PPT 的完整 OCR 管线 |
| ⭐ 推荐 | YOOTeam/ChatPPT-MCP | MCP STDIO + Streamable HTTP 双协议部署 |
| ⭐ 推荐 | Anionex/banana-slides | nano banana pro 的图片型 PPT 路线（不同流派的竞品） |

---

## 总结观察

1. **Slidev + AI 是小众但清晰的赛道**：排名前 20 中，只有 4 个项目（slidev-ai、slidev-mcp、cc-slidev、slidev-agent）真正基于 Slidev，其余都是自研 HTML/PPTX 渲染管线。**这是本项目的差异化机会**。

2. **Skill 化是主流趋势**：排名 6/9/10/14/15/19/20/23 都采用 SKILL.md 格式，跨 agent 兼容（Claude Code / Codex / OpenCode）已成为共识。

3. **图片型 PPT → 可编辑 PPTX** 是 2026 年的新热点（banana-slides、GordenSuperPPTSkills、yixueAIganhuo-PPT、ai-ppt-maker 全部采用此管线），与传统的"Markdown/HTML 直渲"路线形成两条技术路径。

4. **6 步工作流**已是行业共识（调研 → 资料 → 大纲 → 内容 → 渲染 → 后处理），本项目的 SKILL.md 设计与主流一致。

5. **风格系统的成熟度**是关键差异化（Akxan 26 风格 + 排版铁律 vs 本项目当前 Glow 单主题），值得作为下一步演进方向。
