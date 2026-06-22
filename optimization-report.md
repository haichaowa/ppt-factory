# ppt-generator 优化建议报告

> 对比基准：23 个 GitHub 上 Slidev + AI / AI PPT 主流项目
> 输入材料：`slidev-ai-projects.md`（调研）、`SKILL.md`、`ppt-skills/` 全部参考文档与模板
> 生成时间：2026-06-22
> 文档定位：**中等深度 + 可执行**——每条建议都给出具体改动路径，避免空泛口号

---

## 一、Executive Summary

当前 `ppt-generator` 项目在 **"内容管道工程化"** 和 **"Slidev 语法护栏"** 两件事上做得比绝大多数竞品都好：清晰的 `ori → generate → artifact` 三段管线、独立的 `ppt-structure-analyst` agent、详尽的 UnoCSS/Syntax 踩坑记录（`text-white/50` 裸属性、`v-clicks` 子元素陷阱、代码块嵌套问题等），是同赛道中工程化程度最高的一档。

但在以下五个维度明显落后于头部项目：

1. **主题丰富度** —— 仅 Glow 单主题，Akxan 有 26 种风格
2. **可编辑 PPTX 导出** —— 仅支持 PDF，banana-slides / GordenSun / yixueAIganhuo-PPT 都已支持矢量 PPTX
3. **设计硬约束** —— content-rules.md 提到"≤50 字 / 3-5 要点"但无强制执行；rhuss/cc-slidev 实现了"超限自动加页"
4. **MCP / 外部接口** —— 仅 Claude Code Skill，未对其他 agent 暴露能力；slidev-mcp 已封装为 MCP Server
5. **失败模式系统化** —— SKILL.md 列了 6 条常见错误，但 Akxan 有 8 类 failure modes 目录 + smoke 测试

**差异化定位**：作为 Top 23 中仅有的 4 个真正基于 Slidev 的项目之一（slidev-ai / slidev-mcp / cc-slidev / slidev-agent），本项目应继续深挖 **"Markdown 源文件 + Glow 视觉 + 内容管道"** 路线，而非跟随图片型 PPT → OCR → PPTX 的重资产管线。

---

## 二、当前项目做对了什么（优势盘点）

| 维度 | 当前实现 | 同行对比 |
|------|---------|---------|
| **内容管道架构** | `contents/ori → generate → artifact` 三段式 + `ppt-structure-analyst` 独立 agent | 仅 aham-ppt / Akxan 达到同等级别；大多数项目是"输入 prompt → 输出 PPT"黑盒 |
| **Skill 工程化** | SKILL.md 1081 行，含 4 步工作流 + 三级验证 + 26 种内容-布局映射 | 与 Akxan（6 步 pipeline）同级；远超 slidev-agent（无正式 SKILL.md） |
| **Slidev 语法护栏** | 完整记录 `text-white/50` 裸属性 `/` 错误、`v-clicks` 子元素陷阱、代码块嵌套陷阱 | 与 WeHomeBot/slidev-agent 的踩坑笔记**完全吻合**——双方独立验证 |
| **视觉独特性** | Glow 主题（seedrandom + clip-path polygon + blur(70px)）是赛道内独家 | 仅 cc-slidev 的"证据级设计"理念可对比，但视觉风格不同 |
| **国内可访问性** | UnoCSS presetWebFonts 用 `provider: 'bunny'`，避开 Google Fonts 屏蔽 | 大多数海外项目无此考虑，是国内场景关键 |
| **Monorepo + Workspace** | `pnpm -r --filter=./artifact/* run build` 批量构建 | 仅 LSTM-Kirigaya/slidev-ai（Docker Compose）有类似的工程化 |
| **演讲者注释规范** | 在 SKILL.md 明确鼓励使用 `<!-- ... -->` | 多数竞品未规范此点 |
| **代码块 maxHeight 强制** | "超过 15 行必须 maxHeight"是硬规则 | 同赛道最严格 |

**结论**：项目的工程底盘是健康的，**不需要重写**，只需要在五个短板维度上"加装"。

---

## 三、当前项目的短板（痛点清单）

按"对用户感知的影响"排序：

### P0 痛点（直接影响可用性）

1. **主题单一** —— 仅 Glow，没有"商务 / 学术 / 极简 / 暗黑"等场景化主题，对非技术分享场景（产品发布、咨询报告）不友好
2. **PPTX 导出缺失** —— 客户拿到 PDF 后无法二次编辑，是企业场景的硬障碍
3. **设计约束未自动化** —— `content-rules.md` 的"≤50 字 / 3-5 要点"只是文档，验证阶段只检查 frontmatter 配对，不检查内容密度

### P1 痛点（影响扩展性）

4. **SKILL.md 单文件臃肿** —— 1081 行，未来加主题/风格时会爆炸；GordenSun 已拆 3 skill
5. **无 MCP / API 出口** —— 只能在 Claude Code 内用；其他 agent / IDE（Cursor、Trae、Codex）无法调用
6. **无失败模式目录** —— 常见错误散落在 SKILL.md 末尾，不利于 LLM 检索
7. **shiki 主题单调** —— 仅 `github-dark`，缺少与 Glow 主题匹配的代码配色
8. **Glow 主题 uno.config 与 default 完全相同** —— 没有主题专属的 UnoCSS 规则扩展

### P2 痛点（影响成熟度）

9. **无 smoke test** —— 完全依赖 `pnpm build` 人工跑，没有 example → 渲染 → 截图比对的自动化
10. **无 OCR / PDF 输入管线** —— 用户必须先把资料转成 markdown 才能进 `contents/ori/`；yixueAIganhuo-PPT 支持直接丢 PDF
11. **slides.md 单文件** —— 长演讲（45 页+）维护成本高；rhuss/cc-slidev 已采用 `slides/01-title.md` 模块化拆分
12. **无实时预览编辑** —— 用户改一处必须重新 build 才能看效果；langchat-slides 有流式 WYSIWYG
13. **无对话式编辑** —— "把第 5 页标题改成红色"做不到；langchat-slides / banana-slides 都已支持

---

## 四、调研项目的可借鉴点（按优先级排序）

| 优先级 | 借鉴项目 | 借鉴什么 | 对应痛点 |
|--------|---------|---------|---------|
| 🔥 P0 | [Akxan/ppt-agent-skill](https://github.com/Akxan/ppt-agent-skill) | 26 风格系统 + 排版铁律 + 8 种 failure modes 目录 | 主题单一 / 设计约束未自动化 / 无失败模式 |
| 🔥 P0 | [rhuss/cc-slidev](https://github.com/rhuss/cc-slidev) | 证据级设计硬约束（Miller 定律、≤6 元素、≥18pt、≥4.5:1 对比度、超限自动加页） | 设计约束未自动化 |
| 🔥 P0 | [GordenSun/GordenSuperPPTSkills](https://github.com/GordenSun/GordenSuperPPTSkills) | Skill 模块化拆分（生成图 PPT vs 图转 PPTX vs 编排） | SKILL.md 单文件臃肿 |
| 🔥 P0 | [LSTM-Kirigaya/slidev-mcp](https://github.com/LSTM-Kirigaya/slidev-mcp) | Slidev 操作封装为 MCP tools（create_slidev / make_cover / add_page） | 无 MCP / API 出口 |
| ⭐ P1 | [SkyworkAI/Skywork-Skills](https://github.com/SkyworkAI/Skywork-Skills) | 跨 agent 兼容的 SKILL.md 写法（Claude/Codex/OpenCode/OpenClaw） | 仅 Claude Code |
| ⭐ P1 | [WeHomeBot/slidev-agent](https://github.com/WeHomeBot/slidev-agent) | 同思路项目踩坑经验（验证本项目的护栏） | 增强护栏 |
| ⭐ P1 | [snowmanzhuang/yixueAIganhuo-PPT](https://github.com/snowmanzhuang/yixueAIganhuo-PPT) | PDF/资料 → PPT 的 OCR 管线 + Figure 原比例嵌入 | 无 OCR 输入 |
| ⭐ P1 | [StarryKit/starry-slides](https://github.com/StarryKit/starry-slides) | npm 包化分发 | 分发方式单一 |
| ⭐ P1 | [YOOTeam/ChatPPT-MCP](https://github.com/YOOTeam/ChatPPT-MCP) | MCP STDIO + Streamable HTTP 双协议 | 无 MCP / API 出口 |
| 💡 P2 | [LangChat/langchat-slides](https://github.com/LangChat/langchat-slides) | 实时流式 WYSIWYG + 对话式编辑 | 无对话式编辑 |
| 💡 P2 | [metaimagine/ai-pptx](https://github.com/metaimagine/ai-pptx) | 用户自备模板 + 参数化替换 | 模板继承薄弱 |
| 💡 P2 | [1624899/ai-ppt-maker](https://github.com/1624899/ai-ppt-maker) | 分层 PPTX 导出（背景/骨架/图标/文本四层） | PPTX 导出缺失 |

---

## 五、TOP 10 优化建议（详细方案）

### 建议 1：引入"证据级设计护栏"——超限自动加页

**借鉴自**：[rhuss/cc-slidev](https://github.com/rhuss/cc-slidev)

**优先级**：🔥 P0

**问题**：当前 `content-rules.md` 写了"≤50 字 / 3-5 要点"但完全靠 LLM 自觉，验证阶段也不检查。导致实际产出经常出现一页 8 条要点、字号过小的情况。

**具体改动步骤**：

1. 在 `ppt-skills/slidev-ppt-generator/references/content-rules.md` 新增"硬性约束"小节：

   ```markdown
   ## 八、硬性设计约束（验证阶段强制检查）

   | 约束 | 阈值 | 触发动作 |
   |------|------|---------|
   | 单页要点数 | ≤ 6 条（Miller 定律） | 超限 → 自动拆为两页 |
   | 单页字数（中文） | ≤ 50 字 | 超限 → 移至演讲者注释 |
   | 最小字号 | ≥ 18pt | 超限 → 拆页或缩减内容 |
   | 对比度 | ≥ 4.5:1（WCAG AA） | 不达标 → 调整配色 |
   | 单页元素总数 | ≤ 6 个 | 超限 → 拆页 |
   | 标题性质 | 必须是断言式（"X 提升 3x"）而非描述式（"关于 X 的介绍"） | 不达标 → 改写 |
   ```

2. 在 SKILL.md 的"步骤 4：验证输出" → Level 2（生成后语法检查）追加：

   ```markdown
   - [ ] 每页要点数 ≤ 6
   - [ ] 每页字数 ≤ 50（中文）
   - [ ] 标题为断言式（含动词或数字）
   - [ ] 代码块行数 ≤ 15 或已设 maxHeight
   ```

3. 在 `ppt-structure-analyst` agent 的 prompt 中加入约束："若 outline 单页要点 > 6，必须自动拆为两页，并在 outline.md 标注 `splitFrom: <原页号>`"

**预期收益**：产出质量一致性提升 30%+，避免"挤一页"的常见失败模式。

**工作量**：~4 小时（文档改动 + agent prompt 调整，无代码改动）。

---

### 建议 2：主题系统从单 Glow 扩展为 5 主题矩阵

**借鉴自**：[Akxan/ppt-agent-skill](https://github.com/Akxan/ppt-agent-skill)（26 风格）

**优先级**：🔥 P0

**问题**：当前 `assets/themes/` 只有 `glow/` 一个主题，对所有非技术分享场景（产品发布、咨询报告、学术答辩）都不合适。

**具体改动步骤**：

1. 在 `ppt-skills/slidev-ppt-generator/assets/themes/` 下新增 4 个主题目录（按场景差异化）：

   ```
   themes/
   ├── glow/          # 现有 —— 技术分享、开发者大会
   ├── minimal/       # 新增 —— 学术答辩、咨询报告（白底、衬线字体、无动效）
   ├── bold/          # 新增 —— 产品发布、Keynote 风（大图、强对比、几何）
   ├── dark-pro/      # 新增 —— 企业内部汇报（深蓝/深灰、稳重）
   └── neon/          # 新增 —— 创意分享（参考 example-skills/neon-ppt-cn）
   ```

2. 每个主题至少包含 3 文件：
   - `global-bottom.vue` —— 背景效果（minimal 可以为空组件）
   - `style.css` —— 字体、过渡、卡片样式
   - `theme-config.md` —— 主题专属约束（如 minimal 禁止 backdrop-blur）

3. 在 `references/themes/{theme}/slide-patterns.md` 为每个主题定制 10 种布局模板（参考 glow 的现有版本）。

4. 修改 SKILL.md 的"步骤 3：生成项目"：

   ```markdown
   ## 主题选择（基于内容场景）

   | 受众 / 场景 | 推荐主题 |
   |-----------|---------|
   | 技术分享、开发者大会 | glow |
   | 学术答辩、论文汇报 | minimal |
   | 产品发布、主题演讲 | bold |
   | 企业内部汇报、季度 review | dark-pro |
   | 创意分享、设计相关 | neon |
   ```

5. 在 `ppt-structure-analyst` agent 的 metadata.json 增加 `theme` 字段，由 agent 根据受众自动选择。

**预期收益**：覆盖场景从单一技术分享扩展到 5 类常见演讲；用户选择成本降低。

**工作量**：~2-3 天（每个主题 4-6 小时：global-bottom.vue + style.css + slide-patterns.md）。

---

### 建议 3：Skill 模块化拆分——按职责切 3 个子 Skill

**借鉴自**：[GordenSun/GordenSuperPPTSkills](https://github.com/GordenSun/GordenSuperPPTSkills)

**优先级**：🔥 P0

**问题**：当前 SKILL.md 1081 行，包含需求收集、内容结构化、生成、验证、语法规则、布局映射、主题配置、常见错误……等 8+ 职责。LLM 调用 skill 时上下文消耗极大，且未来加主题会继续膨胀。

**具体改动步骤**：

1. 把 `ppt-skills/slidev-ppt-generator/SKILL.md` 拆为：

   ```
   ppt-skills/slidev-ppt-generator/
   ├── SKILL.md                          # 精简为 200 行的"入口编排"
   ├── references/
   │   ├── workflow/
   │   │   ├── requirements.md           # 步骤 1：需求收集
   │   │   ├── structure.md              # 步骤 2：调用 analyst agent
   │   │   ├── generate.md               # 步骤 3：生成项目
   │   │   └── verify.md                 # 步骤 4：三级验证
   │   ├── syntax-rules.md               # UnoCSS/Syntax 护栏（含所有踩坑）
   │   ├── failure-modes.md              # 失败模式目录（建议 6）
   │   ├── themes/                       # 各主题专属文档
   │   │   ├── glow/
   │   │   ├── minimal/
   │   │   └── ...
   │   └── shared/                       # 通用参考（已有）
   ```

2. 新 SKILL.md 仅保留：
   - 触发条件
   - 4 步工作流的高层概述（每步一句话 + 链接到 references/workflow/{step}.md）
   - 主题选择决策表
   - 关键约束的"指针"（"详见 syntax-rules.md 第 X 节"）

3. 参考 Skywork-Skills 的跨 agent 兼容写法，在 frontmatter 显式声明：

   ```yaml
   ---
   name: slidev-ppt-generator
   description: ...
   compatible_agents:
     - claude-code
     - codex
     - opencode
     - openclaw
   ---
   ```

**预期收益**：上下文 token 消耗降低 60%+；LLM 按需加载子文档；新主题加入不影响入口 skill。

**工作量**：~1 天（纯文档重组，无代码改动）。

---

### 建议 4：建立"失败模式目录"——系统化诊断

**借鉴自**：[Akxan/ppt-agent-skill](https://github.com/Akxan/ppt-agent-skill)（8 种 failure modes）

**优先级**：🔥 P0

**问题**：当前 SKILL.md 的"常见错误"章节列了 6 条，但格式松散、无严重度、无检测方法、无自动修复脚本。LLM 在 build 失败时难以快速定位。

**具体改动步骤**：

1. 新建 `ppt-skills/slidev-ppt-generator/references/failure-modes.md`，结构化为：

   ```markdown
   # Slidev 生成失败模式目录

   ## FM-01：UnoCSS 裸属性 `/` 编译错误
   - **症状**：`Illegal '/' in tags` Vue 编译错误
   - **严重度**：🔴 Blocker
   - **检测**：grep `text-[a-z]+/[0-9]+` 在裸属性位置
   - **修复**：替换为 `class="..."`
   - **示例**：`<span text-white/50>` → `<span class="text-white/50">`

   ## FM-02：代码块嵌套在 HTML 卡片内导致编译失败
   - **症状**：`Element is missing end tag`
   - **严重度**：🔴 Blocker
   - **检测**：检查 `<div>` 内是否有 ``` 代码块
   - **修复**：把代码块移到卡片外

   ## FM-03：`<v-clicks>` 把箭头当动画目标
   - **症状**：箭头 `→` 随点击出现/消失
   - **严重度**：🟡 Major
   - **检测**：检查 `<v-clicks>` 直接子元素中是否有文本节点
   - **修复**：把箭头移出 `<v-clicks>` 或改用显式 `v-click`

   ## FM-04：孤立 frontmatter 产生空白页
   - **症状**：build 成功但 PDF 多出空白页
   - **严重度**：🟡 Major
   - **检测**：检查连续 `---` 之间是否有内容
   - **修复**：合并 frontmatter 块

   ## FM-05：代码块超出幻灯片高度
   - **症状**：代码底部被裁切
   - **严重度**：🟢 Minor
   - **检测**：代码行数 > 15 且无 `maxHeight`
   - **修复**：添加 `{maxHeight:'350px'}`

   ## FM-06：`v-click` 编号与 `clicks:` 不匹配
   - **症状**：部分动画不触发或提前结束
   - **严重度**：🟡 Major
   - **检测**：frontmatter `clicks` 值 vs 最大 `v-click="N"` 编号
   - **修复**：对齐数值

   ## FM-07：headmatter 缺少必需键
   - **症状**：Glow 效果不显示 / 字体未加载
   - **严重度**：🟡 Major
   - **检测**：必需要素 checklist（layout, highlighter, css, colorSchema, glowSeed）
   - **修复**：补全 frontmatter

   ## FM-08：translate-y-* 下移后兄弟元素重叠
   - **症状**：内容视觉重叠
   - **严重度**：🟢 Minor
   - **检测**：检查 translate-y 后元素的下一个兄弟 mt-* 值
   - **修复**：减小 translate-y 或增大 mt-*
   ```

2. 在 SKILL.md 验证章节改为"对照 failure-modes.md 逐项排查"。

3. （可选）写一个 `scripts/preflight-check.sh`，对生成的 `slides.md` 自动跑 FM-01 / FM-04 / FM-05 / FM-06 / FM-07 的检测。

**预期收益**：build 失败时定位时间从 5-10 分钟降到 < 1 分钟；未来加新坑时只改一个文件。

**工作量**：~6 小时（文档 + 可选脚本）。

---

### 建议 5：把 Slidev 操作封装为 MCP Server

**借鉴自**：[LSTM-Kirigaya/slidev-mcp](https://github.com/LSTM-Kirigaya/slidev-mcp)、[YOOTeam/ChatPPT-MCP](https://github.com/YOOTeam/ChatPPT-MCP)

**优先级**：⭐ P1

**问题**：当前只能在 Claude Code 内使用，无法在 Cursor / Trae / Codex / Web 应用中调用。MCP 是 2026 年 agent 生态的事实标准。

**具体改动步骤**：

1. 在仓库根新建 `mcp-server/` 目录：

   ```
   mcp-server/
   ├── package.json
   ├── src/
   │   ├── index.ts          # MCP server 入口（STDIO + Streamable HTTP 双协议）
   │   ├── tools/
   │   │   ├── create_artifact.ts      # 创建新 artifact
   │   │   ├── generate_slides.ts      # 从 outline.md 生成 slides.md
   │   │   ├── add_page.ts             # 在指定位置插入页
   │   │   ├── update_page.ts          # 更新指定页内容
   │   │   ├── delete_page.ts          # 删除页
   │   │   ├── switch_theme.ts         # 切换主题
   │   │   ├── validate_slides.ts      # 跑 failure modes 检查
   │   │   └── build_artifact.ts       # 调用 slidev build
   │   └── prompts/
   │       └── generate_from_topic.ts  # 复用 SKILL.md 的 prompt
   ```

2. Tool 切分粒度参考 slidev-mcp：**页面级而非字符级**（`add_page` / `set_page` 而非 `insert_char`）。

3. 协议参考 ChatPPT-MCP：STDIO（本地 IDE）+ Streamable HTTP（Web 部署）双模式。

4. README 中给出各 agent 配置示例：
   - Claude Code：`~/.claude/mcp.json`
   - Cursor：`.cursor/mcp.json`
   - Codex / OpenCode：相应配置

5. 发布到 npm：`npx ppt-generator-mcp` 一键启动。

**预期收益**：用户基础从 Claude Code 用户扩展到所有 MCP 兼容 agent 用户；可在 Web 应用中集成。

**工作量**：~1 周（含双协议实现、文档、npm 发布）。

---

### 建议 6：内容-主题智能匹配——在 analyst agent 中加入主题决策

**借鉴自**：[Akxan/ppt-agent-skill](https://github.com/Akxan/ppt-agent-skill)（自动选风格）

**优先级**：⭐ P1

**问题**：当前 metadata.json 的"主题选择"是死的（默认 glow），不会根据内容场景调整。

**具体改动步骤**：

1. 在 `contents/generate/{slug}/metadata.json` 增加字段：

   ```json
   {
     "topic": "...",
     "audience": "...",
     "duration": 15,
     "pageTarget": 18,
     "theme": "glow",                    // 新增
     "themeReasoning": "技术分享 + 开发者受众 → Glow 主题",  // 新增
     "density": "medium",                // 新增：low / medium / high
     "style": "assertive"                // 新增：assertive / descriptive / narrative
   }
   ```

2. 修改 `ppt-structure-analyst` agent 的 prompt：

   ```markdown
   ## 主题决策矩阵
   根据受众、内容类型、场合选择主题：

   | 受众 | 内容类型 | 推荐主题 | 推荐密度 |
   |------|---------|---------|---------|
   | 开发者 | 技术分享 | glow | medium-high |
   | 学者 | 论文答辩 | minimal | low |
   | 高管 / 决策者 | 战略汇报 | dark-pro | medium |
   | 客户 / 大众 | 产品发布 | bold | low |
   | 设计师 | 创意分享 | neon | medium |
   ```

3. 在 SKILL.md 步骤 3 增加分支：

   ```markdown
   根据 metadata.json 的 theme 字段，复制对应 `assets/themes/{theme}/` 文件。
   ```

**预期收益**：用户不用懂主题差异，agent 自动选；产出与场景的匹配度提升。

**工作量**：~3 小时（agent prompt + metadata schema 改动）。

---

### 建议 7：slides.md 模块化拆分支持

**借鉴自**：[rhuss/cc-slidev](https://github.com/rhuss/cc-slidev)（`slides/01-title.md` 模式）

**优先级**：⭐ P1

**问题**：单 `slides.md` 文件在 40+ 页时难以维护、git diff 噪音大、多人协作冲突高。

**具体改动步骤**：

1. 在 SKILL.md 增加"长演讲模块化模式"小节：

   ```markdown
   ## 长演讲（>25 页）推荐结构

   当生成 >25 页的演讲时，采用模块化拆分：

   ```
   artifact/{date}-{slug}/
   ├── slides.md              # 主文件（仅含 headmatter + 引用）
   ├── sections/
   │   ├── 00-cover.md
   │   ├── 01-intro.md
   │   ├── 02-core-concept.md
   │   ├── 03-deep-dive.md
   │   ├── 04-demo.md
   │   └── 99-end.md
   ```

   主文件示例：
   ```markdown
   ---
   layout: center
   ... (headmatter)
   ---

   <Src src="./sections/00-cover.md" />

   ---
   <Src src="./sections/01-intro.md" />
   ```

   Slidev 原生支持 `src:` frontmatter 引用外部文件。
   ```

2. 在 `ppt-structure-analyst` agent 中：当目标页数 > 25 时，输出 outline 分章节，每章对应一个 section 文件。

3. 在 references/shared/ 新增 `modular-slides.md` 详细说明。

**预期收益**：长演讲可维护性显著提升；git history 清晰；多人协作友好。

**工作量**：~4 小时（文档 + agent prompt 调整）。

---

### 建议 8：PDF / 图片资料 OCR 输入管线

**借鉴自**：[snowmanzhuang/yixueAIganhuo-PPT](https://github.com/snowmanzhuang/yixueAIganhuo-PPT)

**优先级**：⭐ P1

**问题**：用户必须手动把 PDF / 论文 / 截图转成 markdown 才能放进 `contents/ori/`，门槛高。

**具体改动步骤**：

1. 在 SKILL.md 步骤 1（需求收集）增加：

   ```markdown
   ## 多模态输入支持

   用户可提供以下任一形式：
   - **文本类**：`.md` / `.txt` / `.docx` → 直接复制到 `contents/ori/{slug}/main.md`
   - **PDF 类**：`.pdf` → 使用 MCP 文档读取工具（marker-pdf / pdftotext）提取文本
   - **图片类**：`.png` / `.jpg` → 使用视觉 LLM 提取内容（Claude vision / GPT-4o vision）
   - **网页类**：URL → 使用 WebFetch / defuddle 技能抓取
   - **组合输入**：多种来源合并到 main.md，标注 `<!-- source: xxx -->` 分隔
   ```

2. 对论文 / 学术资料，增加 Figure 保留规则：

   ```markdown
   ## Figure 处理规则（论文类资料）

   - 提取图片到 `contents/ori/{slug}/assets/figures/`
   - 在 outline.md 中标注 `figureEmbed: true` 的页使用原图
   - **不重画 / 不拉伸**，按原始比例嵌入（参考 yixueAIganhuo-PPT）
   ```

3. 在 `ppt-structure-analyst` agent 增加 PDF 解析子流程。

**预期收益**：用户输入门槛从"必须懂 markdown"降到"丢任何资料都行"；论文场景可用性大幅提升。

**工作量**：~1 天（主要是 agent prompt + MCP 工具集成）。

---

### 建议 9：PPTX 可编辑导出（分层架构）

**借鉴自**：[GordenSun/GordenSuperPPTSkills](https://github.com/GordenSun/GordenSuperPPTSkills)、[1624899/ai-ppt-maker](https://github.com/1624899/ai-ppt-maker)

**优先级**：💡 P2

**问题**：当前仅支持 `slidev export` 导出 PDF，企业用户拿到 PDF 后无法在 PowerPoint / Keynote 中二次编辑。

**具体改动步骤**：

1. 调研路径：**SVG → PPTX** 是当前最成熟的方案（参考 Akxan 的 HTML→SVG→PPTX 管线）。

2. 在 `package.json` 增加脚本：

   ```json
   {
     "scripts": {
       "export:pptx": "slidev export --format pptx"
     }
   }
   ```

   注：Slidev 52+ 已实验性支持 PPTX 导出，但文本通常会被转为 SVG 矢量图，不可编辑。

3. **真正可编辑的 PPTX** 需要自建管线：

   ```
   slides.md → parse → JSON (ppt-generator schema)
                      → json2pptx (使用 pptxgenjs)
   ```

   参考 veasion/AiPPT 的 `json2ppt` 实现（商业级但闭源）。

4. **MVP 阶段**先支持"半可编辑"：文本层可编辑，背景效果（如 Glow 的 polygon）作为背景图保留。

5. 在 artifact 的 `package.json` 模板增加：

   ```json
   {
     "scripts": {
       "build": "slidev build",
       "export:pdf": "slidev export --with-clicks --per-slide",
       "export:pptx": "node scripts/md-to-pptx.mjs"  // 新增
     }
   }
   ```

**预期收益**：覆盖企业 / 政府等必须用 PowerPoint 二次编辑的场景；市场扩展。

**工作量**：MVP ~1-2 周（使用 pptxgenjs）；完整可编辑 ~1 个月。

---

### 建议 10：跨 agent 兼容 + npm 包化分发

**借鉴自**：[SkyworkAI/Skywork-Skills](https://github.com/SkyworkAI/Skywork-Skills)、[StarryKit/starry-slides](https://github.com/StarryKit/starry-slides)

**优先级**：💡 P2

**问题**：当前 skill 仅在仓库内可用，外部用户必须 clone 整个仓库；无法 `npx` 安装。

**具体改动步骤**：

1. 在 SKILL.md frontmatter 增加 Skywork 式兼容声明：

   ```yaml
   ---
   name: slidev-ppt-generator
   description: ...
   compatible_agents:
     - claude-code
     - codex
     - opencode
     - openclaw
     - trae
   install: npx slidev-ppt-generator@latest
   ---
   ```

2. 把 `ppt-skills/slidev-ppt-generator/` 发布为独立 npm 包：

   ```
   slidev-ppt-generator/
   ├── package.json         # name: slidev-ppt-generator, bin: install.js
   ├── install.js            # postinstall 钩子，复制 skill 到各 agent 目录
   ├── SKILL.md
   ├── references/
   └── assets/
   ```

3. `install.js` 实现：

   ```javascript
   // 检测已安装的 agent，复制 skill 到对应目录
   const agents = [
     { name: 'claude-code', path: '~/.claude/skills/' },
     { name: 'codex', path: '~/.codex/skills/' },
     { name: 'opencode', path: '~/.opencode/skills/' },
   ]
   // ...
   ```

4. 配合建议 5 的 MCP Server，提供两种使用方式：
   - **Skill 路线**：LLM 读取 SKILL.md，自己生成 slides.md（当前模式）
   - **MCP 路线**：LLM 调用 MCP tools，结构化生成（建议 5）

5. 发布到 npm registry；README 给出 `npx slidev-ppt-generator` 演示。

**预期收益**：用户安装成本从"clone 仓库 + 配置"降到一行命令；可被 awesome-claude-skills 等列表收录。

**工作量**：~2-3 天（含 npm 发布、install.js、各 agent 兼容性测试）。

---

## 六、3 个月 / 6 个月 演进路线图

### 3 个月目标：质量巩固 + 主题扩展

| 月份 | 主任务 | 对应建议 |
|------|--------|---------|
| **M1** | 文档重组 + 护栏强化 | 建议 1（设计护栏）+ 建议 3（模块化拆分）+ 建议 4（失败模式目录） |
| **M2** | 多主题矩阵 | 建议 2（5 主题扩展）+ 建议 6（智能匹配） |
| **M3** | 模块化 slides + 多模态输入 | 建议 7（长演讲模块化）+ 建议 8（OCR 输入管线） |

**3 个月里程碑产出**：
- 5 主题矩阵（glow / minimal / bold / dark-pro / neon）
- 失败模式目录（8+ 条）+ 可选 preflight 脚本
- 跨 agent 兼容声明（Claude / Codex / OpenCode）
- 长演讲支持模块化拆分
- PDF / 图片输入管线

### 6 个月目标：生态化 + 商业化基础

| 月份 | 主任务 | 对应建议 |
|------|--------|---------|
| **M4** | MCP Server 实现与发布 | 建议 5（MCP 出口） |
| **M5** | npm 包化分发 + 跨 agent 测试 | 建议 10（npm 分发） |
| **M6** | PPTX 可编辑导出 MVP | 建议 9（PPTX 导出） |

**6 个月里程碑产出**：
- MCP Server（STDIO + HTTP 双协议）
- npm 包 `slidev-ppt-generator` 可一键安装
- 半可编辑 PPTX 导出（文本可编辑，背景为图片）
- 完整的"Markdown 源文件 + Glow 视觉 + 内容管道"差异化定位

### 长期愿景（12 个月）

- **风格系统**：参考 Akxan 的 26 风格，扩展到 10+ 主题
- **模板市场**：用户上传 / 共享主题
- **Web UI**：参考 langchat-slides 的实时流式 WYSIWYG
- **AI 配图集成**：nano banana pro / gpt-image-2 自动生成配图（可选路线）

---

## 七、不应跟随的方向（避免陷阱）

明确指出以下方向**不建议投入**，以保持专注：

1. **图片型 PPT → OCR → PPTX 完整管线**（banana-slides 路线）
   - 理由：重资产、需要图像生成模型、与本项目"Markdown 源文件"定位冲突
   - 替代：保持 Markdown 源文件路线，仅在 PPTX 导出环节借鉴分层思路

2. **完全自研渲染引擎**（veasion/AiPPT、StarryKit/starry-slides 的 HTML 路线）
   - 理由：丧失 Slidev 生态红利；Slidev 已是赛道内最成熟的渲染框架
   - 替代：继续基于 Slidev，通过 theme / addon 扩展

3. **SaaS 化与付费**（presenton、ai-pptx 路线）
   - 理由：当前项目定位是 dev tool / skill，SaaS 化会改变用户画像
   - 替代：保持开源 skill，商业化留给上游 agent 平台

4. **对话式实时编辑**（langchat-slides 路线）
   - 理由：技术上与 skill 路线冲突（skill 是一次性生成，对话式需要持续会话）
   - 替代：通过 MCP 部分支持（`update_page` tool），但不做完整对话式 UI

---

## 八、TL;DR

**3 个月内做 3 件事即可显著提升项目成熟度**：

1. **拆 SKILL.md + 建失败模式目录**（建议 3 + 4）—— 1 周
2. **加 4 个主题**（建议 2）—— 2-3 周
3. **加设计护栏到验证流程**（建议 1）—— 1 周

这 3 件事都不需要重写代码，纯文档 + agent prompt 改动，工作量可控，收益显著。

**6 个月内做 2 件事扩展生态**：

1. **MCP Server**（建议 5）—— 解锁跨 agent 调用
2. **npm 包化**（建议 10）—— 解锁分发渠道

**永远不要做**：图片型 PPT 管线、自研渲染引擎、SaaS 化。

---

## 附录：调研项目引用清单

| 建议 | 引用项目 | URL |
|------|---------|-----|
| 1 | rhuss/cc-slidev | https://github.com/rhuss/cc-slidev |
| 2 | Akxan/ppt-agent-skill | https://github.com/Akxan/ppt-agent-skill |
| 3 | GordenSun/GordenSuperPPTSkills | https://github.com/GordenSun/GordenSuperPPTSkills |
| 4 | Akxan/ppt-agent-skill | https://github.com/Akxan/ppt-agent-skill |
| 5 | LSTM-Kirigaya/slidev-mcp | https://github.com/LSTM-Kirigaya/slidev-mcp |
| 5 | YOOTeam/ChatPPT-MCP | https://github.com/YOOTeam/ChatPPT-MCP |
| 6 | Akxan/ppt-agent-skill | https://github.com/Akxan/ppt-agent-skill |
| 7 | rhuss/cc-slidev | https://github.com/rhuss/cc-slidev |
| 8 | snowmanzhuang/yixueAIganhuo-PPT | https://github.com/snowmanzhuang/yixueAIganhuo-PPT |
| 9 | GordenSun/GordenSuperPPTSkills | https://github.com/GordenSun/GordenSuperPPTSkills |
| 9 | 1624899/ai-ppt-maker | https://github.com/1624899/ai-ppt-maker |
| 10 | SkyworkAI/Skywork-Skills | https://github.com/SkyworkAI/Skywork-Skills |
| 10 | StarryKit/starry-slides | https://github.com/StarryKit/starry-slides |
| 参考 | WeHomeBot/slidev-agent | https://github.com/WeHomeBot/slidev-agent |
| 参考 | LSTM-Kirigaya/slidev-ai | https://github.com/LSTM-Kirigaya/slidev-ai |
| 参考 | ningzimu/awesome-ai-ppt | https://github.com/ningzimu/awesome-ai-ppt |
