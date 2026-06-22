# 多模态输入管线

> 借鉴 [snowmanzhuang/yixueAIganhuo-PPT](https://github.com/snowmanzhuang/yixueAIganhuo-PPT) 的 PDF/资料 → PPT 管线。
> 用户不必再把资料手动转成 markdown，可以**直接丢任何形式的资料**到 `contents/ori/`。

## 支持的输入形式

| 输入形式 | 文件扩展名 | 处理工具 | 输出位置 |
|---------|----------|---------|---------|
| 文本类 | `.md` / `.txt` / `.docx` | 直接复制 / pandoc 转换 | `main.md` |
| PDF 类 | `.pdf` | marker-pdf / pdftotext / Claude vision | `main.md` + `assets/figures/` |
| 图片类 | `.png` / `.jpg` / `.webp` | Claude vision / GPT-4o vision | `main.md`（提取文字） |
| 网页类 | URL | WebFetch / defuddle 技能 | `main.md` |
| 视频类 | `.mp4` / `.mov` | Claude video understanding | `main.md`（时间轴 + 关键帧描述） |
| 组合输入 | 多种混合 | 分别处理后合并 | `main.md` + `<!-- source: -->` 标注 |

---

## 处理流程

### 1. 文本类（最简单）

**工具**：无（直接复制）或 `pandoc`

**命令**：
```bash
# .md / .txt：直接复制
cp /path/to/input.md contents/ori/{slug}/main.md

# .docx：用 pandoc 转 markdown
pandoc /path/to/input.docx -o contents/ori/{slug}/main.md --extract-media=contents/ori/{slug}/assets
```

**最佳实践**：用户提供的 `.md` 文件直接复制即可，无需转换。

---

### 2. PDF 类（学术论文 / 报告）

**工具选择**：

| 工具 | 适用场景 | 命令 | 输出 |
|------|---------|------|------|
| `pdftotext` | 纯文本 PDF（无 Figure） | `pdftotext input.pdf output.txt` | `.txt` 文件 |
| `marker-pdf` | 学术论文（保留 Figure、公式、表格） | `marker_single input.pdf output_dir/` | `.md` + `images/` |
| Claude vision | 扫描版 PDF / 含手写 | 让 Claude 读取 PDF 并提取 | 直接写入 main.md |
| `pdf2image` + OCR | 扫描版 PDF（备选） | `pdftoppm` + Tesseract OCR | `.txt` 文件 |

**学术论文推荐流程**（marker-pdf）：

```bash
# 安装
pip install marker-pdf

# 提取（保留 Figure、公式、表格）
marker_single /path/to/paper.pdf contents/ori/{slug}/

# 输出：
# contents/ori/{slug}/paper.md            # 主文本（含 Figure 引用）
# contents/ori/{slug}/assets/             # 资源目录
```

**Figure 处理**（见下方"Figure 处理规则"）。

---

### 3. 图片类（截图 / 照片 / 海报）

**工具**：Claude vision / GPT-4o vision / Gemini vision

**流程**：

1. 使用 Read 工具读取图片（Claude Code 内置支持）
2. Claude 自动提取文字、表格、图表描述
3. 写入 `main.md`

**示例调用**：
```
请读取 /path/to/screenshot.png，提取所有文字内容，
按原文顺序写入 contents/ori/{slug}/main.md，并保留：
- 标题层级（# / ## / ###）
- 列表结构（- / *）
- 表格格式（markdown table）
- 图片中可见的图表数据（转为 markdown table 或数据列表）
```

---

### 4. 网页类

**工具**：WebFetch / defuddle 技能 / `mcp__web-reader__webReader`

**命令**：
```bash
# WebFetch（Claude Code 内置）
# 调用 WebFetch 工具，传入 URL，获取清洁的 markdown

# 或使用 defuddle 技能
# 更适合复杂网页（去除广告 / 导航 / 页脚）
```

**最佳实践**：
- 优先使用 `defuddle` 技能（去除杂物更彻底）
- 对于 SPA / 动态网页，用 `WebFetch`（等待 JS 渲染）
- 在 `main.md` 顶部标注来源 URL

---

### 5. 视频类

**工具**：Claude video understanding / `mcp__zai-mcp-server__analyze_video`

**流程**：
1. 工具读取视频，提取时间轴 + 关键帧描述
2. 写入 `main.md`，标注关键时间点
3. 视频原文件复制到 `assets/videos/`

**适用场景**：产品演示视频、会议录像、教程视频。

---

### 6. 组合输入

用户提供多种来源时，**合并到同一个 `main.md`**，用 HTML 注释标注来源：

```markdown
<!-- source: paper.pdf (pages 1-10) -->
# 研究背景

（来自 PDF 的内容）

---

<!-- source: slides.pptx -->
# 核心方案

（来自 PPT 的内容）

---

<!-- source: https://example.com/article -->
# 相关工作

（来自网页的内容）
```

**原则**：
- 不同来源用 `---` 分隔
- 每段开头用 `<!-- source: xxx -->` 标注
- 冲突内容时，**以最新来源为准**（在 README.md 注明）

---

## Figure 处理规则（学术资料）

> 借鉴 yixueAIganhuo-PPT 的"不重画 / 不拉伸，按原比例嵌入"理念。

### 1. 提取 Figure

使用 `marker-pdf` 等工具提取 PDF 中的 Figure：

```bash
# marker-pdf 会自动提取图片到 assets/
marker_single paper.pdf contents/ori/{slug}/

# 输出结构：
# contents/ori/{slug}/paper.md
# contents/ori/{slug}/assets/
#   ├── figure_0.png
#   ├── figure_1.png
#   ├── table_0.png
#   └── equation_0.png
```

### 2. 在 outline.md 中标注 Figure 引用

```markdown
## 第 N 页：实验结果

- **Pattern**：image-right（图文混排）
- **核心内容**：
  - 实验结果显示，方法 X 在数据集 Y 上达到了 94.6% 的准确率
- **布局细节**：
  - **图片路径**：`/figures/experiment_result.png`（原始 Figure，不重画）
  - **figureEmbed**: true（标记使用原图，非重绘）
  - 图片说明：保持原始纵横比，不拉伸
- **备注**：图片从 `contents/ori/{slug}/assets/figure_0.png` 复制到 artifact 的 `public/figures/`
```

### 3. 生成阶段处理

Skill 在步骤 3（生成项目）时：

1. 检查 outline.md 中是否有 `figureEmbed: true` 标注
2. 若有，将 `contents/ori/{slug}/assets/*.png` 复制到 `artifact/{date}-{slug}/public/figures/`
3. 在 slides.md 中用原始图片路径引用：

```markdown
---
layout: image-right
---

# 实验结果

<div class="text-base">
  方法 X 在数据集 Y 上达到了 94.6% 的准确率。
</div>

::right::

<img src="/figures/experiment_result.png" class="w-full h-auto object-contain" />
```

### 4. Figure 嵌入原则

- ✅ **保持原始纵横比**：用 `object-contain` 而非 `object-cover`
- ✅ **不裁切**：用 `w-full h-auto` 让图片自适应宽度
- ✅ **不重画**：直接用原图，不用 CSS / SVG 重绘
- ✅ **添加图注**：在图片下方加 `<div class="text-sm opacity-60">图 N：xxx</div>`
- ❌ **禁止拉伸**：避免 `w-full h-full` 强制成固定比例
- ❌ **禁止裁切**：避免 `object-cover` 裁掉关键内容
- ❌ **禁止重绘**：不要用 CSS / SVG 重新绘制 Figure（失真且耗时）

---

## 输入验证清单

完成步骤 1（需求收集）前，检查：

- [ ] `contents/ori/{slug}/main.md` 存在且非空
- [ ] 若是 PDF 输入，已用 marker-pdf 提取（含 Figure）
- [ ] 若是图片输入，已用 vision LLM 提取文字
- [ ] 若是网页输入，已用 defuddle / WebFetch 抓取
- [ ] 若是组合输入，每段都有 `<!-- source: xxx -->` 标注
- [ ] 若有 Figure，已保存到 `contents/ori/{slug}/assets/figures/`
- [ ] main.md 的内容**足够生成 PPT**（不少于 500 字或 3 个章节）

## 常见问题

### Q1：PDF 是扫描版（非文字版），怎么处理？
**A**：使用 Claude vision 直接读取 PDF 页面图片，让 Claude 提取文字。或用 `pdftoppm + Tesseract OCR`。

### Q2：图片中的表格如何保留结构？
**A**：让 vision LLM 用 markdown table 格式输出。提示词："请将图片中的表格转为 markdown table，保持原始行列结构"。

### Q3：网页内容很长，如何取舍？
**A**：defuddle 会自动去除导航 / 广告 / 页脚。若仍过长，让 Claude 基于"与主题相关度"打分筛选。

### Q4：Figure 太多（>10 张），如何选择？
**A**：在 README.md 中列出所有 Figure 的描述，由 `ppt-structure-analyst` agent 决定哪些进入 outline.md。

### Q5：组合输入有冲突信息怎么办？
**A**：以最新来源为准（PDF > 网页 > 图片，因为 PDF 通常是权威版本）。在 README.md 注明冲突点和决策。
