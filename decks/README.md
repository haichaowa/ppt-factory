# decks/ — 生成产物

每次生成的演示文稿。**每个 deck 是冻结快照**（如同 PDF）：生成后不随模板演进而变。

## 规范

- 目录名：`{YYYY-MM-DD}-{topic-slug}/`，如 `2026-09-01-claude-code-intro/`
- 每个 deck 一个 `index.html`（自包含）；仅当素材超出内联预算时允许同级 `assets/`
- 修改旧 deck = **直接编辑该 deck 文件**。**禁止**回源重新组装（会丢手工修改）
- 升级 deck 内 runtime = 按 `docs/WORKFLOW.md` 手术流程整体替换版本围栏

## 检查

生成后必须完成 `docs/WORKFLOW.md` 第 5 步 QA 清单（`?qa=1` 溢出检查 → 打印预览），全部打勾才算交付。
