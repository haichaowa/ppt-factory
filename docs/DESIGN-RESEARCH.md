# DESIGN-RESEARCH — PPT 设计思维高质量资料库

> 检索整理日期：2026-09-28。  
> 目标：为 PPT Factory 的内容组织、视觉系统、QA 规则和模板设计提供可追溯的外部依据。本文不是链接堆砌，而是把材料转译成可执行的设计思维。

## 0. 结论先行

高质量 PPT 的核心不是“装饰页面”，而是**为特定观众、特定场景、特定行动设计一套低认知负荷的信息体验**。设计时先处理叙事和证据，再处理版式与视觉；视觉越克制，观点越清楚。

一句话框架：

> **先想观众 → 再定行动与主张 → 后组织故事和证据 → 再设计视觉系统 → 最后用原型、可访问性和现场约束做验证。**

---

## 1. 设计思维六步法（PPT 版）

| 阶段 | 设计思维问题 | PPT 中的落地产出 |
|---|---|---|
| Empathize 共情 | 观众已知什么？缺什么？为什么在意？ | Audience brief：身份、场景、决策权、先验知识、情绪 |
| Define 定义 | 这一页/这场演讲要改变观众的什么认知？ | One-sentence message：一句话主张 + 期望行动 |
| Ideate 构思 | 有哪些讲述路径、比喻、证据和反例？ | 3 条候选叙事线，不急着画页面 |
| Prototype 原型 | 最小页面结构能否承载观点？ | 文字 storyboard / 低保真 layout skeleton |
| Test 测试 | 观众 3 秒内能否读懂页面？讲者能否顺畅讲出？ | 3-second test、读稿试讲、缩略图测试 |
| Operationalize 落地 | 投影、导出、阅读、残障访问是否可靠？ | Contrast / alt text / offline / PDF / speaker notes / backup |

来源对应关系：Stanford d.school 的 Empathize、Define、Ideate、Prototype、Test 五模式是方法骨架；PPT 场景需额外加入**现场与交付约束**。

---

## 2. 十二条可执行设计原则

1. **一页一主张**：标题尽量写结论，不写“背景介绍”“方案对比”这类主题词。
2. **结论先行**：观众先得到判断，再看证据；对应金字塔原理和学术演讲中的“主要发现放进标题”。
3. **低认知负荷**：每页只要求观众处理一个新概念；复杂流程拆页、分级、逐步揭示。
4. **视觉层级明确**：通过字号、权重、留白、颜色对比建立观看顺序；如果所有东西都强调，等于没有强调。
5. **少字多讲**：幻灯片是演讲的外部记忆和视觉证据，不是逐字稿。
6. **一稿一系统**：同一份 deck 只有一个网格、字体阶梯、色彩语义、图片处理规则。
7. **留白是功能**：留白负责分组、呼吸和引导视线，不是浪费空间。
8. **图表为证据服务**：数据图先保证可信、可读、少干扰，再考虑风格化。
9. **图像要有信息增量**：装饰图、无关图标、伪插画会增加认知负担。
10. **可访问性内建**：对比度、字号、阅读顺序、色彩盲安全、alt text 不应最后补丁式处理。
11. **为现场设计**：最后一排、投影色偏、强光环境、备用 PDF、时间限制都要进入设计条件。
12. **用原型迭代**：先做低保真 storyboard，再进入模板和视觉细节，避免把时间耗在换主题上。

---

## 3. 网站与论文级材料

### 3.1 方法论与设计原则

| 材料 | 为什么值得读 | 对 PPT 的直接启发 |
|---|---|---|
| [Stanford d.school — Design Thinking Bootleg](https://dschool.stanford.edu/tools/design-thinking-bootleg) | 官方设计思维工具卡，覆盖 Empathize / Define / Ideate / Prototype / Test，含可操作方法 | 把 PPT 从“排版任务”变成“观众问题解决任务”；适合在大纲前做 audience brief |
| [U.S. Web Design System — Design Principles](https://designsystem.digital.gov/design-principles/) | 官方设计系统原则：Start with real user needs、Earn trust、Embrace accessibility、Promote continuity、Listen | PPT 也可建立 design principles：真实观众需求、可信证据、可访问、跨页连续性、持续倾听反馈 |
| [NN/g — Visual Hierarchy in UX](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/) | 说明 color/contrast、scale、proximity/common region 如何引导注意力 | 页面第一眼焦点、次要信息、行动信息必须分层；可转成 squint test |
| [NN/g — Minimize Cognitive Load](https://www.nngroup.com/articles/minimize-cognitive-load/) | 解释 extraneous cognitive load 与视觉杂讯的关系 | 删除无意义动效、字体变化、图标、边框；让观众资源集中在核心信息 |
| [Laws of UX](https://lawsofux.com/) | 汇总认知与行为规律，如选择过载、Hick's Law、Miller's Law、von Restorff effect | 每页选项不要过多；唯一重点要被隔离和强化；相似内容要分组 |

### 3.2 演讲与叙事

| 材料 | 为什么值得读 | 对 PPT 的直接启发 |
|---|---|---|
| [Duarte — Resources](https://www.duarte.com/resources/) | Duarte 是 Slide:ology、DataStory 等方法论团队，资源涵盖故事结构、幻灯片设计、数据叙事、演讲交付 | 先写故事，再做视觉；区分演讲型 slide 与可阅读 slidedoc |
| [Garr Reynolds — Presentation Zen / slide design](https://www.garrreynolds.com/tips) | 强调 restraint、simplicity、naturalness，并引用多媒体学习理论 | 反对“Slideument”；幻灯片要服务口头讲述与视觉理解 |
| [Nature — How to give a great scientific talk](https://www.nature.com/articles/d41586-018-07780-5) | 专家经验总结，关注吸引和维持会议听众注意力 | 明确目标、控制节奏、面向非专业听众解释术语 |
| [Nature — How to tell a compelling story in scientific presentations](https://www.nature.com/articles/d41586-021-03603-2) | 讲科学叙事结构，建议主发现进入标题，用 “but” 制造张力 | 学术 PPT 的标题可以是完整主张，而不是笼统分类词 |
| [Penn State — Oral Presentation and PowerPoint](https://courses.ems.psu.edu/styleforstudents/node/1981) | 面向工程/科学写作者的开放课程，有幻灯片基础规则 | 每张图一个主要观点；平行 bullet；控制行长、行数、字号、颜色一致性；从观众位置检查视觉 |
| [Michael Alley — Rethinking the Design of Presentation Slides (PDF)](https://www.writing.engr.psu.edu/speaking/rethinking_psu.pdf) | Assertion-Evidence 思路的经典材料 | 用“主张句 + 证据图”替代大段 bullet；标题承担推理功能 |

### 3.3 版式、PowerPoint 机制与可访问性

| 材料 | 为什么值得读 | 对 PPT 的直接启发 |
|---|---|---|
| [Microsoft — Create professional slide layouts with Designer](https://support.microsoft.com/en-us/powerpoint/create-professional-slide-layouts-with-designer) | 官方说明 PowerPoint Designer 的版式生成逻辑 | 自动设计只是候选方案；仍需用内容结构、层级和一致性判断 |
| [Microsoft — What is a slide layout?](https://support.microsoft.com/en-us/powerpoint/what-is-a-slide-layout) | 官方解释 placeholder、layout、slide master 的关系 | 模板系统应先定义 layout 类型与 placeholder，而不是每页手工排版 |
| [Microsoft — Make your PowerPoint presentations accessible](https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible-to-people-with-disabilities) | 官方可访问 PPT 检查清单 | reading order、alt text、对比度、标题结构、Accessibility Checker 都应进入 QA |
| [W3C WAI — Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | WCAG 官方对比度标准 | 正文 4.5:1、大字 3:1 是最低要求；投影环境建议更保守 |
| [W3C WAI — Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | 官方图片替代文本方法 | 信息图、图表、装饰图要有不同 alt text 策略 |
| [Atlassian Design System — Foundations](https://atlassian.design/foundations/) | 工业级设计系统基础：tokens、grid、spacing、typography、accessibility | PPT 模板应定义 token 与版式约束，而不是复制视觉表象 |

### 3.4 数据可视化与科研图

| 材料 | 为什么值得读 | 对 PPT 的直接启发 |
|---|---|---|
| [PLOS Computational Biology — Ten Simple Rules for Better Figures](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003833) | 论文级图形设计规则，覆盖受众、信息密度、标注、颜色、冗余 | 图表先回答观众问题；删掉不能帮助理解的元素 |
| [ScientificFigures GitHub](https://github.com/nrokh/ScientificFigures) | 科研图表 workshop，含 figure spectrum 与评估 rubric | 用六项标准审图：分辨率、单位标注、颜色、强调、ink/content ratio、可访问性 |
| [ColorBrewer 2.0](https://colorbrewer2.org/) | 经典配色工具，支持 colorblind-safe 与 sequential/diverging 选择 | 数据色板要按数据类型选择，而不是按主题美观选择 |

---

## 4. GitHub 资源分层

### 4.1 优先研究源码与模板机制

| 仓库 | Stars（2026-09-28） | 研究价值 |
|---|---:|---|
| [hakimel/reveal.js](https://github.com/hakimel/reveal.js) | 72,355 | 固定舞台缩放、导航、fragment、演讲者视图、导出与插件模型 |
| [slidevjs/slidev](https://github.com/slidevjs/slidev) | 48,865 | 开发者友好：Markdown、组件、代码高亮、presenter mode、互动能力 |
| [gnab/remark](https://github.com/gnab/remark) | 13,006 | Markdown-driven 极简幻灯片模型，适合学习最小核心抽象 |
| [marp-team/marp](https://github.com/marp-team/marp) | 12,571 | Markdown presentation ecosystem；主题、导出、协作生态完整 |
| [maaslalani/slides](https://github.com/maaslalani/slides) | 11,669 | 终端内幻灯片，值得研究极简语法与无鼠标演示体验 |
| [marp-team/marp-cli](https://github.com/marp-team/marp-cli) | 3,841 | Markdown → HTML/PDF/PPTX 等转换链路，可参考工程化导出 |
| [quarto-dev/quarto-cli](https://github.com/quarto-dev/quarto-cli) | 6,025 | 学术/技术出版与可复现文档，适合把 PPT 纳入文档工作流 |
| [nrokh/ScientificFigures](https://github.com/nrokh/ScientificFigures) | 246 | 直接给出科研图表评估 rubric、教学材料、可访问性资源 |

### 4.2 索引类仓库：可找线索，但不作为权威标准

| 仓库 | 用途 | 注意事项 |
|---|---|---|
| [ToseaAI/awesome-html-slide-skills](https://github.com/ToseaAI/awesome-html-slide-skills) | 查找 AI agent slide skills / HTML 模板库 | 星数和新鲜度不等于设计质量，需逐个审查 |
| [ningzimu/awesome-ai-ppt](https://github.com/ningzimu/awesome-ai-ppt) | 查找 AI PPT、PPTX 自动化、转换、MCP 工具 | 偏工作流索引，不能替代叙事和视觉原则 |
| [marp-team/awesome-marp](https://github.com/marp-team/awesome-marp) | 查找 Marp 主题与生态 | 主题要结合品牌、中文字体和投影环境调整 |

---

## 5. 从材料中沉淀出的 QA 观察法

### 5.1 三秒测试

把页面缩到缩略图大小，问：

1. 第一眼看到什么？
2. 这页想证明什么？
3. 我接下来应该看哪里？

三者不清楚，就优先改标题、焦点和层级，而不是换主题。

### 5.2 斜眼测试 / Squint Test

眯眼看页面时，只剩明暗和块状结构。如果所有块权重相同、没有主次，说明视觉层级失败。

### 5.3 首尾测试

- 封面是否说明“给谁看、解决什么问题、为什么现在”？
- 结尾是否回收主张和行动？
- 第二页是否兑现封面承诺？

### 5.4 投影测试

- 在低亮度和高亮度环境下是否都能读？
- 深色背景文字是否过细？
- 黄色、浅蓝、红色是否会被投影仪削弱或偏色？
- 最后一排能否看清最小有效文字？
- 图表轴标签是否比装饰更清楚？

### 5.5 无讲者测试 / 有讲者测试

- 无讲者测试：作为 PDF 阅读时是否能理解基本逻辑？必要处是否需要 slidedoc 而非演讲 slide？
- 有讲者测试：讲者是否需要读屏？观众是否被迫与讲者竞争阅读？
- 两者目标不同，不应混在一种页面密度里。

---

## 6. 与 PPT Factory 的结合建议

1. **WORKFLOW 增加 Audience brief**
   - 输入：观众、场景、时长、决策、已知/未知、行动目标。
   - 输出：一句话核心主张和 3 段式叙事线。

2. **DESIGN 增加 Assertion layout**
   - 页面标题使用完整主张句。
   - 主体是图示、数据或对比证据。
   - bullet 页必须有明确视觉结构，不做长句堆砌。

3. **patterns 增加 Narrative anatomy**
   - problem → tension → options → evidence → recommendation → risk → next step。
   - 让模板服务叙事，而不是叙事迁就模板。

4. **QA 增加 3-second / squint / projection / accessibility gates**
   - 每页生成后自动截图；
   - 检查溢出、对比度、字号、数据出处、标题是否为主题词而非结论。

5. **建立“金样反例库”**
   - 同一页的 dense 版、normal 版、assertion-evidence 版、data-story 版。
   - 用真实差异训练 agent 的模式选择，而不是写抽象规则。

---

## 7. 延伸书籍

这些不必立刻购买，但若系统研究 PPT 设计，价值高于零散博客：

- Nancy Duarte, *Slide:ology*；*Resonate*；*DataStory*
- Garr Reynolds, *Presentation Zen*；*Presentation Zen Design*
- Richard E. Mayer, *Multimedia Learning*
- Michael Alley, *The Craft of Scientific Presentations*
- Jonathan Schwabish, *Better Presentations*
- Colin Ware, *Information Visualization*
