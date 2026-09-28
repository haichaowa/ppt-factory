# LESSONS — 经验教训日志

**生成 deck 前必读近期 10 条**（WORKFLOW 第 0 步）。每次真实使用后追加条目。

## 条目格式

```
## {YYYY-MM-DD} {deck 名或场景}

- 问题：观察到的现象
- 原因：根因分析
- 改进：采取的措施（若涉及规范变更，注明改了 docs/ 哪个文件）
```

---

## 2026-09-01 examples/demo 首次组装 + QA

- 问题：metrics 页数字 `−11670`（5 位）在 68px 字号下溢出卡片右边界，单位"行"被挤换行
- 原因：`.pat-metric-num` 固定 68px，卡片列宽 minmax(230px,1fr) 容不下 5 位数字；且 `?qa=1` 只检测页面级溢出（.slide 的 scrollHeight），检测不到"子元素溢出父卡片"（nowrap 文本横向跑出但不产生页面滚动）
- 改进：① patterns.css 给 `.pat-metric-num` 加 `white-space: nowrap`（单位不再折行）；② patterns/metrics.html 增加铁律"数字 ≤4 位，大数用 万/亿 单位"；③ demo 内容改为 `1.17万行`。规范变更：无（只加了用法约束）
- 遗留：`?qa=1` 无法覆盖卡片级溢出——QA 时必须配合视觉抽查（本次用 headless Edge 截图 + 视觉检查抓到）；后续可考虑 runtime 的 qa 模式增加"子元素超界检测"


---

## 2026-09-28 设计思维资料研究 + 生成规范演进

- 问题：原流程已约束视觉质量，但需求澄清偏“素材清单”，缺少观众、核心主张、叙事线和证据边界；论证页容易退化为 bullet 堆砌
- 原因：PPT 被当成排版任务，而不是面向观众认知的信息产品设计；pattern 库缺少“结论 + 证据”的首选结构
- 改进：① 新增 `docs/AUDIENCE-BRIEF.md` 与 `docs/DESIGN-RESEARCH.md`；② `CONTENT-RULES` 引入叙事骨架、主张句标题、数据叙事纪律；③ `DESIGN` 引入 3 秒测试、Squint test、Assertion-Evidence、证据视觉和可访问性规则；④ `WORKFLOW` 增加观众 brief、证据选型、逐页视觉抽查和首尾一致性 QA；⑤ patterns 新增 `claim` / `narrative-map` / `assertion-evidence`；⑥ Slidev 引擎同步遵守跨引擎原则
- 验证：新增 3 个 pattern 已用 1280×720 逻辑舞台 + `?qa=1` 逐页检查；`examples/demo` 同步扩展到 17 页并覆盖 15 种模式，页面级与子元素出界均为 0；打印 PDF 页数为 17（同时压缩 timeline 垂直间距修复 5 节点溢出）
