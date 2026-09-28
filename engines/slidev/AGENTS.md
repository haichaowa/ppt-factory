# AGENTS.md — Slidev 引擎车间

本引擎负责**应用型 / 演讲型** deck：技术分享、代码演示、强交互、演讲者模式。
冻结快照 / 离线交付 / 微信直发类需求走根目录 HTML 引擎（`docs/WORKFLOW.md`）。

## 命令（均在 `engines/slidev/` 下执行）

```bash
npm run new -- <deck名> [模板]     # 从模板创建：cn-default / cn-seriph / cn-geist / cn-takahashi / cn-dracula
npm run dev -- decks/<名>/slides.md    # 预览 localhost:3030
npm run export -- decks/<名>/slides.md # 导出 PDF
npm run build -- decks/<名>/slides.md  # 构建静态网页（dist/）
```

## 生产规则

1. 新 deck 一律从模板创建，不手搓空文件
2. 用户给出大纲时，先读 `style-library/STYLE-SEEDS.md`，明确选择一个风格种子；需要模仿版式时再读对应本地源码和预览
3. 中文字体 / 排版调整只改该 deck 的 `style.css`（模板已内置回退栈）
4. **frontmatter 铁律**：`---` 与 `layout:` 之间禁止空行，否则 layout 会被当正文渲染出空白页
5. 一页一观点；代码高亮用 `{2|3-4|all}` 分步；细节写演讲备注（HTML 注释）

## QA 底线（交付前逐项过）

- [ ] `npm run export` 成功，**PDF 页数 = slide 数**（多出即有溢出/空页，必须修）
- [ ] `npm run build` 成功
- [ ] 中文无乱码；标题/正文层级清晰；对比度达标
- [ ] 代码块不溢出；Mermaid / 公式正常渲染

## 已知坑

- v53 CLI 无 `dev` 子命令：开发预览是 `slidev <entry>`（npm scripts 已配好）
- 导出日志中 `Failed to patch FloatingVue` 为上游 twoslash 兼容问题，不影响导出结果
- 大 deck 导出超时：`--timeout 120000`

规范与生态：`docs/GUIDE.md`（实操）、`docs/RESOURCES.md`（生态大全）、`docs/CHEATSHEET.md`（语法）。
