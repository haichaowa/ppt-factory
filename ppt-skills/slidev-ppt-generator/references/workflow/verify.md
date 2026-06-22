# 步骤 4：验证输出

> 本文档是 [SKILL.md](../../SKILL.md) 步骤 4 的详细展开。

## 核心目标

三级验证，确保生成的 slides.md 语法正确、设计达标、可成功 build。

---

## Level 1：生成前检查（对 outline.md）

在调用 generate 步骤之前先对 outline.md 做结构性检查：

- [ ] 页面数量与 metadata.json 的 `targetPages` 一致
- [ ] 每页有 Pattern 标注（不能为空）
- [ ] 每页有核心内容（不能为空）
- [ ] 代码块标注了语言（`ts` / `python` / `go` 等）
- [ ] outline.md 使用了多种不同 pattern（视觉多样性）
- [ ] 有封面页（第 1 页 Pattern = `center`）
- [ ] 有结束页（最后 1 页 Pattern = `end` 或 `center`）

---

## Level 2：生成后语法检查（对 slides.md）

### 2.1 语法正确性

- [ ] 无裸属性中的 `/`（详见 [syntax-rules.md 规则 2](../syntax-rules.md#规则-2含--的工具类必须用-class-属性)）
- [ ] 所有代码块有语言标识
- [ ] frontmatter `---` 配对正确（不能嵌套，详见 [failure-modes.md FM-04](../failure-modes.md)）
- [ ] `v-click` 数量与 `clicks:` 值匹配
- [ ] 超过 15 行的代码块有 `maxHeight`
- [ ] 无空幻灯片（frontmatter 后必须有内容）
- [ ] 必需 headmatter 键齐全（layout, highlighter, css, colorSchema）
- [ ] Glow 主题额外检查 `glowSeed`
- [ ] Neon 主题额外检查 `neonHue` / `neonIntensity`（可选）

### 2.2 设计护栏（硬性约束）

详见 [content-rules.md 第八节](../content-rules.md#八硬性设计约束验证阶段强制检查)：

- [ ] **C-01**：每页要点数 ≤ 6
- [ ] **C-02**：每页中文字数 ≤ 50（正文）
- [ ] **C-03**：正文字号 ≥ `text-lg`（18pt），标题 ≥ `text-3xl`（30pt）
- [ ] **C-04**：正文与背景对比度 ≥ 4.5:1（WCAG AA）
- [ ] **C-05**：单页元素总数 ≤ 6
- [ ] **C-06**：标题为断言式（含动词或数字）
- [ ] **C-07**：代码块行数 ≤ 15 或已设 `maxHeight`
- [ ] **C-08**：卡片网格 ≤ 3×3

任一约束超限时**必须修复后重新 build**。

---

## Level 3：Build 验证（最终）

```bash
cd artifact/{YYYY-MM-DD}-{slug}/ && pnpm run build
```

- **成功** = 结构正确，可输出 PDF
- **失败** = 对照 [failure-modes.md](../failure-modes.md) 逐项排查

### 常见失败模式速查

| 错误信息 | 对应 FM | 一句话修复 |
|---------|--------|-----------|
| `Illegal '/' in tags` | FM-01 | 把 `text-white/50` 改成 `class="text-white/50"` |
| `Element is missing end tag` | FM-02 | 代码块从 HTML 卡片内移出 |
| 箭头 `→` 随点击出现 | FM-03 | 把箭头移出 `<v-clicks>` |
| PDF 多出空白页 | FM-04 | 合并连续的 frontmatter 块 |
| 代码底部被裁切 | FM-05 | 添加 `{maxHeight:'350px'}` |
| 动画不触发或提前结束 | FM-06 | 对齐 `clicks:` 与 `v-click` 编号 |
| Glow 效果不显示 | FM-07 | 补全 headmatter 必需键 |
| 内容视觉重叠 | FM-08 | 减小 `translate-y-*` 或增大 `mt-*` |

---

## Build 后验证（可选）

### 4. Dev 预览验证
```bash
cd artifact/{YYYY-MM-DD}-{slug}/ && pnpm run dev
```
在浏览器中人工浏览每页，检查：
- 动画时序正确
- 字体加载成功
- 图片资源存在
- 代码高亮正常
- Glow / Neon 效果显示

### 5. PDF 导出验证
```bash
cd artifact/{YYYY-MM-DD}-{slug}/ && pnpm run export
```
检查导出的 PDF：
- 页数与 slides.md 一致
- 无空白页
- 无字体丢失
- 代码块排版正确

---

## 验证完成的标准

满足以下全部条件时，才可认为生成成功：
- [ ] Level 1 所有检查通过
- [ ] Level 2 所有检查通过
- [ ] Level 3 `pnpm run build` 成功
- [ ] 无 Blocker 级失败模式（FM-01、FM-02、FM-07）
- [ ] Major 级失败模式已修复或说明（FM-03、FM-04、FM-06）
