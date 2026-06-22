# 步骤 2：内容结构化（委托 ppt-structure-analyst）

> 本文档是 [SKILL.md](../../SKILL.md) 步骤 2 的详细展开。

## 核心目标

**必须显式调用 `ppt-structure-analyst` agent**，由 agent 完成：读取原始材料 → 分析结构 → 规划叙事 → 生成中间产物。

---

## 调用规范

**调用方式**：使用 Agent 工具，`subagent_type` 设为 `ppt-structure-analyst`

**传入上下文**：
- `topic-slug`（步骤 1 确定）
- 受众、时长、特殊需求（步骤 1 收集）
- 原始材料路径：`contents/ori/{slug}/main.md`
- 推荐主题（可选，若步骤 1 用户未指定）

---

## Agent 产出

Agent 完成后会产出两个文件到 `contents/generate/{slug}/`：

### 1. metadata.json — 生成参数

```json
{
  "topic": "topic-slug",
  "title": "演讲主标题",
  "subtitle": "演讲副标题",
  "audience": "目标受众描述",
  "duration": "20min",
  "targetPages": 25,
  "theme": "glow",
  "themeReasoning": "技术分享 + 开发者受众 → Glow 主题",
  "density": "medium",
  "style": "assertive",
  "sections": [
    {
      "title": "章节标题",
      "pages": 5,
      "description": "本章覆盖的内容概述"
    }
  ]
}
```

### 2. outline.md — 幻灯片结构大纲

每页格式：
```markdown
## 第 N 页：页面标题（断言式）

- **Pattern**：布局类型（center / card-grid / comparison 等）
- **章节**：所属章节
- **核心内容**：（贴近最终 PPT 文字，不缩略）
  - 要点 1
  - 要点 2
- **布局细节**：（根据 pattern 类型补充完整的卡片文字、数据等）
- **备注**：（可选）特殊处理说明
```

---

## Skill 的验收职责

Agent 完成后，**Skill 必须检查** `contents/generate/{slug}/` 下的两个文件：

### 必查项
- [ ] `metadata.json` 和 `outline.md` 都存在
- [ ] metadata.json 的 `targetPages` 与 outline.md 的实际页数一致
- [ ] metadata.json 的 `sections` 页数合计 = `targetPages`
- [ ] outline.md 每页都有 Pattern 标注
- [ ] outline.md 每页都有核心内容（非空）
- [ ] outline.md 使用了多种不同的 pattern（视觉多样性）
- [ ] 有封面页和结束页
- [ ] 高密度页之间有呼吸页

### 质量检查
- [ ] 文字贴近终稿（非缩略概括）
- [ ] 原始材料的核心内容完整保留
- [ ] 标题为断言式（C-06）
- [ ] 每页要点数 ≤ 6（C-01），超限已自动拆页并标注 `splitFrom`

---

## 异常处理

### 情况 1：Agent 未调用或产出缺失
- **症状**：`contents/generate/{slug}/` 下文件不存在或不完整
- **修复**：重新调用 `ppt-structure-analyst` agent，明确指定必须输出两个文件

### 情况 2：outline.md 页数与 metadata.json 不一致
- **症状**：metadata.json 写 25 页，outline.md 实际只有 22 页
- **修复**：让 agent 重新生成 outline.md 或修正 metadata.json

### 情况 3：质量不足（缩略、套话、缺核心内容）
- **症状**：outline.md 只是"要点列表"而非完整文字
- **修复**：补充提示 agent："请完整保留原始材料的论述、数据、示例，贴近终稿文字"

---

## 注意

此步骤**不再由 Skill 自行执行内容结构化**，而是完全委托给 agent。Skill 的职责是：
1. 收集需求（步骤 1）
2. 调用 agent（本步骤）
3. **验收产出**（本步骤的检查清单）
4. 基于产出生成 slides.md（步骤 3）
