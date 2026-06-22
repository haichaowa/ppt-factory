# 步骤 1：需求收集 + 内容摄取

> 本文档是 [SKILL.md](../../SKILL.md) 步骤 1 的详细展开。

## 核心目标

收集生成 PPT 所需的**关键参数**，并将用户的原始材料持久化到 `contents/ori/{topic-slug}/main.md`。

---

## 必问参数清单

| 参数 | 说明 | 示例 |
|------|------|------|
| **主题（topic）** | 演讲主题，用于生成 topic-slug | "Claude Code 最佳实践" |
| **受众（audience）** | 目标听众身份与技术深度 | "有 3 年经验的前端开发者" |
| **时长（duration）** | 演讲时长（分钟） | 15 / 20 / 30 / 45 min |
| **风格（style）** | 期望的视觉调性 | 技术/学术/商务/创意 |
| **特殊需求** | 代码演示、图表、动画、视频等 | "需要现场 demo + 3 段视频" |
| **主题（theme）** | 5 主题之一（可选，由 agent 自动选） | glow / minimal / bold / dark-pro / neon |

---

## topic-slug 命名规范

- 小写英文 + 连字符分隔
- 简洁、可读、语义化
- 示例：
  - ✅ `claude-code-best-practices`
  - ✅ `k8s-intro`
  - ✅ `react-19-compiler`
  - ❌ `Claude_Code_Best_Practices`（大写 + 下划线）
  - ❌ `ccbp`（缩写不可读）
  - ❌ `topic-1`（无语义）

---

## 多模态输入支持（详见 [input-pipeline.md](../shared/input-pipeline.md)）

| 输入形式 | 处理工具 |
|---------|---------|
| 文本类（`.md` / `.txt` / `.docx`） | 直接复制 / `pandoc` 转换 |
| PDF 类（`.pdf`） | `marker-pdf`（保留 Figure）/ `pdftotext` / Claude vision |
| 图片类（`.png` / `.jpg`） | Claude vision / GPT-4o vision 提取文字 |
| 网页类（URL） | `defuddle` 技能 / `WebFetch` 抓取 |
| 视频类（`.mp4`） | Claude video understanding |
| 组合输入 | 多来源合并到 main.md，用 `<!-- source: xxx -->` 分隔 |

### Figure 处理（学术论文）

- **提取**：使用 `marker-pdf` 自动提取 PDF 中的 Figure 到 `assets/figures/`
- **保留**：outline.md 中标注 `figureEmbed: true` 的页使用原图
- **原则**：不重画 / 不拉伸 / 不裁切 —— 用 `object-contain` 保持原始纵横比
- **复制路径**：生成时从 `contents/ori/{slug}/assets/figures/` 复制到 `artifact/{date}-{slug}/public/figures/`

---

## ori/ 目录结构

```
contents/ori/{topic-slug}/
├── README.md       # 主题元数据（可选，用于补充受众、场合等）
├── main.md         # 主要原始内容（必需）
└── assets/         # 可选附件（图片、PDF、视频）
    └── figures/    # 学术资料中的 Figure
```

### README.md 模板

```markdown
# {主题名称}

## 元数据
- **受众**：
- **场合**：
- **时长**：
- **特殊要求**：

## 来源
- 文档 1：xxx
- 文档 2：xxx
```

---

## 检查清单

完成本步骤前确认：
- [ ] topic-slug 已确定（小写英文 + 连字符）
- [ ] 必问参数清单中至少 4 项已明确
- [ ] `contents/ori/{slug}/main.md` 已存在并包含原始材料
- [ ] 若用户提供了 PDF / 图片，已提取文本到 main.md
- [ ] 若有 Figure，已保存到 `contents/ori/{slug}/assets/figures/`
