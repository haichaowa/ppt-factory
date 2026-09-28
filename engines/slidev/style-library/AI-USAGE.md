# Slidev × AI Coding Agent 使用手册

这份手册面向后续用 Codex / Claude Code / Cursor 等 AI Coding Agent 批量制作 Slidev 演示文稿的场景。

## 1. 官方 Skill：已经安装

Slidev v53 官方仓库自带面向 AI Coding Agent 的 Skill：

- 官方源码：`/Users/wanghaichao/develop/VsCodeProject/slidev/skills/slidev/SKILL.md`
- 本地留档：`/Users/wanghaichao/develop/VsCodeProject/personal-video-workflow/ppt-factory/engines/slidev/style-library/official-skill/SKILL.md`
- 已安装到 Codex：`/Users/wanghaichao/.codex/skills/slidev/SKILL.md`

该 Skill 包含 53 个按需加载的参考文档，覆盖语法、布局、动画、代码高亮、Monaco、Mermaid、LaTeX、导出、部署、MCP 等。**下一轮对话开始即可被 Codex 自动识别。**

通用安装命令：

```bash
npx skills add slidevjs/slidev
```

## 2. MCP：让 Agent 做结构化编辑

Slidev v52.17+ 内置 MCP Server，适合让 Agent 精确读取、插入、更新、移动幻灯片，而不是靠正则猜测 `---` 分隔符。

### 开发服务器模式

```bash
# 在具体 deck 目录运行
npx slidev slides.md --port 3030
```

MCP endpoint：

```text
http://localhost:3030/__mcp
```

可用工具包括：

| 工具 | 用途 |
|---|---|
| `slidev-get-info` | deck 概览、入口、页数、当前位置 |
| `slidev-list-slides` | 列出页码、标题、layout、源文件 |
| `slidev-get-slide` | 读取单页 frontmatter、内容、备注 |
| `slidev-update-slide` | 更新单页内容、备注、frontmatter |
| `slidev-insert-slide` | 在某页后插入 |
| `slidev-remove-slide` | 删除单页 |
| `slidev-move-slide` | 重排页面 |
| `slidev-goto-slide` | 开发服务器中跳转页面，便于视觉验证 |

### 无开发服务器模式

```bash
npx slidev mcp slides.md
```

MCP 配置示例：

```json
{
  "mcpServers": {
    "slidev": {
      "command": "npx",
      "args": ["slidev", "mcp", "slides.md"]
    }
  }
}
```

## 3. 推荐的 Agent 工作流

1. **先定风格，再写内容**：从 `STYLE-SEEDS.md` / `catalog/style-seeds.json` 选一个风格种子，读取对应 `slides.md`、theme、`style.css` 和截图。
2. **单一入口**：让 Agent 只维护 `slides.md`、`components/`、`styles/`、`public/`，不要改 `dist/`。
3. **结构化编辑**：批量增删/移动页面时优先用 MCP；生成初稿时可以直接写 Markdown。
4. **视觉验证**：开发服务器启动后用 `slidev-goto-slide` 或浏览器截图检查第 1、目录、章节页、数据页、结尾页。
5. **保持模板化**：把品牌色、字体、页眉页脚、logo 放进 theme/global layer，不在每页重复内联。
6. **控制页面密度**：每页一个论点；解释和口稿放 presenter notes：`<!-- ... -->`。
7. **可复现输出**：在 `package.json` 固定脚本：`dev`、`build`、`export`。
8. **风格模仿 ≠ 抄素材**：只学习排版、层级、色彩、留白和组件模式；图片、字体、logo、品牌资产需单独确认授权。

## 4. 高频语法速查

```md
---
theme: seriph
title: Example
layout: cover
class: text-center
transition: slide-left
---

# Title

- <v-click>第一步</v-click>
- <v-click>第二步</v-click>

<!--
Speaker notes.
-->

---
layout: two-cols
layoutClass: gap-16
---

# 左栏

::right::

# 右栏
```

代码：

````md
```ts {1|3-5|all}
const a = 1
const b = 2
const c = a + b
```
````

更多见 `official-skill/references/`。

## 5. 构建与导出

```bash
npx slidev format slides.md
npx slidev build slides.md
npx slidev export slides.md                 # PDF
npx slidev export slides.md --format pptx
npx slidev export slides.md --format png --range 1-5
npx slidev export slides.md --with-clicks --dark
```

PDF/PPTX/PNG 导出通常需要：

```bash
pnpm add -D playwright-chromium
```

## 6. 给 Agent 的标准提示词模板

```text
请使用 Slidev 官方 Skill。
风格参考：STYLE-SEEDS.md 里的「xxx」种子；
请阅读对应 local source 和预览图，但不要直接复制受版权保护的图片/字体。
目标受众：
核心结论：
页数：
语言：
输出要求：
1. slides.md
2. 组件与全局样式
3. package.json scripts
4. 开发、构建、导出命令
5. 每页 speaker notes
先给目录和信息架构，再生成完整 deck。
```
