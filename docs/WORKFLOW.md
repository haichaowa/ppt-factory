# WORKFLOW — deck 生成权威流程

本文件是 HTML 引擎生成 PPT 的**唯一权威流程**。`CLAUDE.md` / `AGENTS.md` / `.claude/skills/deck/SKILL.md` 均指向此处。执行者（AI 或人）必须按序完成第 0-5 步。跨引擎的内容与视觉原则见 `docs/AUDIENCE-BRIEF.md`、`docs/CONTENT-RULES.md`、`docs/DESIGN.md`。

## 第 0 步：读取经验教训

必须先读 `docs/LESSONS.md` 的近期条目，避免重复踩坑。

## 第 1 步：需求澄清 + Audience brief

一次性问全（用户已给出的不重复问）：

| 项 | 说明 |
|----|------|
| 主题 | 演讲标题与核心内容 |
| 受众 | 身份、已知 / 未知、决策权、关注点 |
| 场景与目标 | 时长、现场 / 录屏 / 自阅读、期望行动 |
| 风格倾向 | 从 `templates/base/themes/` 预设中选 |
| 现成素材 | 文字材料、截图、logo、二维码、数据出处 |
| 边界 | 必须保留、必须删除、可能被追问的问题 |

产出 `docs/AUDIENCE-BRIEF.md` 定义的 brief。**核心主张必须是可被证据支持的完整句**；观众假设不得编造，未知处向用户确认或显式标注为假设。

## 第 2 步：大纲先行（关卡：必须用户确认）

按 `docs/AUDIENCE-BRIEF.md` 选叙事线，按 `docs/CONTENT-RULES.md` 规则产出大纲，**一页一行**，pattern 从 `patterns/README.md` 速查表选：

```
1. cover               — 主标题：xxx / 副标题：xxx / 场合：xxx
2. claim               — 核心主张：xxx / 期望行动：xxx
3. narrative-map       — 问题 → 张力 → 转折 → 行动
4. section             — 本章结论：xxx
5. assertion-evidence  — 主张：xxx / 证据：xxx / 出处：xxx
6. code                — 演示：xxx（高亮第 2-5 行，fragment）
...
N. end                 — 回收主张：xxx / 下一步：xxx
```

大纲必须同时给出：

- 每页主张句标题
- 证据类型与出处
- fragment 节奏
- 删除的素材及原因

**未获用户确认前，禁止开始组装。**

## 第 3 步：选主题与 pattern

仅从 `templates/base/themes/` 预选取（dark-glow / minimal-light）。**禁止** AI 即兴创造主题变量组（slop 入口）；定制 = 用户人工改变量值。

pattern 选择以证据形态为准：

| 证据形态 | 首选 pattern |
|---|---|
| 一个结论 + 一张图 / 图表 / 截图 | `assertion-evidence` |
| 故事线或论证路线总览 | `narrative-map` |
| 多个同级论点 | `bullets` |
| 方案取舍 | `two-col` |
| 流程 / 管道 | `steps` |
| 数字成果 | `metrics` |
| 代码行为 | `code` |

## 第 4 步：组装（铁律：逐字复制）

输出到 `decks/{YYYY-MM-DD}-{slug}/index.html`：

1. **逐字复制** `templates/base/skeleton.html` 作为起点
2. 主题：所选主题 `.css` 的变量组内联到主题注入点（围栏 `/* theme:dark-glow */`）
3. 样式：`base.css` 整文件内联（围栏 `/* base:v1 */`）+ `patterns/patterns.css` 整文件内联（围栏 `/* patterns:v2 */`）
4. `runtime.js` 整文件内联（围栏 `/* runtime:v1 */`）
5. 按大纲逐页把 pattern 片段**逐字复制**进舞台，只改 `<!-- SLOT -->` 槽位内容
6. 图片：压缩至 ≤200KB 后 base64 data-URI 内联（规范见 `docs/DESIGN.md`）

**禁止**：装配时即兴修改 skeleton / runtime / pattern 的结构与样式。定制只走 ① 主题变量 ② 槽位内容。

## 第 5 步：QA 清单（逐项打勾，全部通过才交付）

- [ ] 打开 `index.html?qa=1`：无任何页面被描红（溢出）
- [ ] 逐页截图 / 视觉抽查：卡片、图片、代码块未超出父容器；不能只依赖页面级 scroll 检测
- [ ] 3 秒测试：每页第一眼焦点、页面主张、后续阅读路径清楚
- [ ] Squint test：页面存在明确主次，不是等权卡片墙
- [ ] 逐页检查：一页一主张、正文 ≤50 字、列表 3-5 条、句式平行
- [ ] 论证页标题为主张句；证据图 / 截图 / 数字有出处与口径
- [ ] 中文排版：行首无悬垂标点（，。、；：？！》）；中西文之间有空隙
- [ ] fragment 顺序与讲述节奏一致，无一次全亮
- [ ] 打印预览（Ctrl+P）：每页恰好一张 16:9、无空白页、fragment 呈最终状态；深色主题抽查耗墨与色偏
- [ ] 正文对比度 ≥ WCAG AA 4.5:1；色彩不是唯一语义通道
- [ ] 信息图 / 数据图有替代文本或相邻文字摘要
- [ ] 所有数字有出处（用户材料或可验证来源），无编造数据
- [ ] 断网打开验证：控制台无外部资源请求失败
- [ ] 首页承诺、结尾行动与 Audience brief 一致

交付时告知用户：文件位置、翻页方式（←→ / 空格 / 翻页笔）、PDF 导出方法（Ctrl+P）。

## 手术流程（修改旧 deck）

- **改内容 / 局部样式**：直接编辑该 deck 的 `index.html`。**禁止**回源重新组装（会丢手工修改）。
- **升级 runtime**：定位围栏 `/* runtime:v{n} */ … /* /runtime */` → 用 `templates/base/runtime.js` 最新版整体替换围栏内容 → 版本号 +1。若该 deck 手改过 runtime，先 diff 比对再决定。
- **补新 pattern 样式**：优先直接在该 deck 的 `patterns:v{n}` 围栏内追加对应 `.pat-*` 样式，并递增版本号；禁止整段替换导致旧 deck 手工样式丢失。
- 手术中发现的可复用教训 → 追加到 `docs/LESSONS.md`。
