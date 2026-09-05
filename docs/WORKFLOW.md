# WORKFLOW — deck 生成权威流程

本文件是本仓库生成 PPT 的**唯一权威流程**。`CLAUDE.md` / `AGENTS.md` / `.claude/skills/deck/SKILL.md` 均指向此处。执行者（AI 或人）必须按序完成第 0-5 步。

## 第 0 步：读取经验教训

必须先读 `docs/LESSONS.md` 的近期条目，避免重复踩坑。

## 第 1 步：需求澄清

一次性问全（用户已给出的不重复问）：

| 项 | 说明 |
|----|------|
| 主题 | 演讲标题与核心内容 |
| 受众 | 决定术语深度与密度（见 CONTENT-RULES 密度表） |
| 时长 | 换算页数见 `docs/CONTENT-RULES.md` |
| 风格倾向 | 从 `templates/base/themes/` 预设中选 |
| 现成素材 | 文字材料、截图、logo、二维码 |

## 第 2 步：大纲先行（关卡：必须用户确认）

按 `docs/CONTENT-RULES.md` 规则产出大纲，**一页一行**，pattern 从 `patterns/README.md` 速查表选：

```
1. cover    — 主标题：xxx / 副标题：xxx
2. section  — 章节一：xxx
3. bullets  — 观点：xxx（4 个要点，fragment 渐进）
4. code     — 演示：xxx（高亮第 2-5 行）
...
N. end      — 致谢 + 二维码
```

**未获用户确认前，禁止开始组装。**

## 第 3 步：选主题

仅从 `templates/base/themes/` 预选取（dark-glow / minimal-light）。**禁止** AI 即兴创造主题变量组（slop 入口）；定制 = 用户人工改变量值。

## 第 4 步：组装（铁律：逐字复制）

输出到 `decks/{YYYY-MM-DD}-{slug}/index.html`：

1. **逐字复制** `templates/base/skeleton.html` 作为起点
2. 主题：所选主题 `.css` 的变量组内联到主题注入点（围栏 `/* theme:dark-glow */`）
3. 样式：`base.css` 整文件内联（围栏 `/* base:v1 */`）+ `patterns/patterns.css` 整文件内联（围栏 `/* patterns:v1 */`）
4. `runtime.js` 整文件内联（围栏 `/* runtime:v1 */`）
5. 按大纲逐页把 pattern 片段**逐字复制**进舞台，只改 `<!-- SLOT -->` 槽位内容
6. 图片：压缩至 ≤200KB 后 base64 data-URI 内联（规范见 `docs/DESIGN.md`）

**禁止**：装配时即兴修改 skeleton / runtime / pattern 的结构与样式。定制只走 ① 主题变量 ② 槽位内容。

## 第 5 步：QA 清单（逐项打勾，全部通过才交付）

- [ ] 打开 `index.html?qa=1`：无任何页面被描红（溢出）
- [ ] 逐页检查：一页一观点、正文 ≤50 字、列表 3-5 条
- [ ] 中文排版：行首无悬垂标点（，。、；：？！》）；中西文之间有空隙
- [ ] fragment 顺序与讲述节奏一致，无一次全亮
- [ ] 打印预览（Ctrl+P）：每页恰好一张 16:9、无空白页、fragment 呈最终状态；深色主题抽查耗墨与色偏
- [ ] 正文对比度 ≥ WCAG AA 4.5:1
- [ ] 所有数字有出处（用户材料或可验证来源），无编造数据
- [ ] 断网打开验证：控制台无外部资源请求失败

交付时告知用户：文件位置、翻页方式（←→ / 空格 / 翻页笔）、PDF 导出方法（Ctrl+P）。

## 手术流程（修改旧 deck）

- **改内容 / 局部样式**：直接编辑该 deck 的 `index.html`。**禁止**回源重新组装（会丢手工修改）。
- **升级 runtime**：定位围栏 `/* runtime:v{n} */ … /* /runtime */` → 用 `templates/base/runtime.js` 最新版整体替换围栏内容 → 版本号 +1。若该 deck 手改过 runtime，先 diff 比对再决定。
- 手术中发现的可复用教训 → 追加到 `docs/LESSONS.md`。
