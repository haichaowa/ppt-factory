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

