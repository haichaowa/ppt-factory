# HTML 范例库复审记录

## 2026-09-30 · HTML5 UP · 第 1 轮复审

### 已检查文件

**仓库索引与规则**
- `html-references/README.md`
- `html-references/BACKLOG.md`
- `html-references/INDEX.md`
- `html-references/PROGRESS.md`
- `html-references/LOG.md`
- `html-references/index.html`

**本次 collection 交付物**
- `html-references/collections/2026-09-30-html5up/meta.md`
- `html-references/collections/2026-09-30-html5up/preview.md`
- `html-references/collections/2026-09-30-html5up/notes.md`
- `html-references/collections/2026-09-30-html5up/download-manifest.json`
- `html-references/collections/2026-09-30-html5up/screenshots/README.md`
- `html-references/collections/2026-09-30-html5up/screenshots/dimension-index-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/editorial-index-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/forty-landing-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/massively-elements-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/massively-index-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/story-index-1440x900.png`

**代表性源码证据**
- `source/massively/assets/sass/libs/_vars.scss`
- `source/dimension/assets/sass/libs/_vars.scss`
- `source/editorial/assets/sass/libs/_vars.scss`
- `source/forty/assets/sass/libs/_vars.scss`
- `source/story/assets/sass/libs/_vars.scss`
- `source/spectral/assets/sass/libs/_vars.scss`
- `source/massively/elements.html`
- `source/forty/landing.html`
- `source/editorial/index.html`

**全量自动枚举范围**
- 44 个 `source/<slug>/` 目录：aerial, alpha, arcana, astral, big-picture, dimension, directive, dopetrope, editorial, escape-velocity, ethereal, eventually, forty, fractal, future-imperfect, halcyonic, helios, highlights, hyperspace, landed, lens, massively, minimaxing, miniport, multiverse, paradigm-shift, parallelism, phantom, photon, prologue, read-only, solid-state, spectral, stellar, story, strata, striped, strongly-typed, telephasic, tessellate, twenty, txt, verti, zerofour
- 每个目录的 `index.html`、`LICENSE.txt`、`README.txt` 与顶层 HTML 页面清单
- 44 个原始 ZIP 的 SHA-256 与 manifest 对账

### 自动检查结果

- Manifest：44 条、44 个唯一 slug、无缺项。
- 源码：44 个模板目录、110 个顶层页面、2,438 个文件、150,470,994 bytes。
- 版权：44/44 保留 `LICENSE.txt`，44/44 保留 `README.txt`。
- ZIP 校验：44/44 SHA-256 与 manifest 一致。
- 排除项：`node_modules/`、`dist/`、`build/`、`.git/` 均为 0。
- Notes 清单：限定第 2 节解析后，44/44 模板与全部页面名匹配。
- 截图：6 张均为 1440×900 PNG，SHA-256 已写入截图索引。
- 导览页：无 `<script>`、无外部 CSS/JS/字体/图片依赖；本地相对链接全部存在；1440/900/560/390px 视口均无横向溢出；控制台 0 error / 0 warning。

### 本轮修复（≥5 处 P2）

1. `html-references/collections/2026-09-30-html5up/meta.md`：新增“完整性复核结果”，补齐 manifest 唯一性、44 个 ZIP SHA-256 复核、110 页面、2,438 文件、精确 bytes 与排除项证据。
2. `html-references/collections/2026-09-30-html5up/preview.md`：新增“已生成代表截图”，把 6 张截图与对应源码页面一一互链，减少从预览记录跳转时的查找成本。
3. `html-references/collections/2026-09-30-html5up/notes.md`：新增“证据锚点”，把 token、组件样张、图文交替、长文侧栏与快照清单的结论链接到具体源码文件。
4. `html-references/collections/2026-09-30-html5up/screenshots/README.md`：新增 6 张 PNG 的 SHA-256 校验表和可复现的 Playwright 捕获命令。
5. `html-references/index.html`：给缩略图补充 `width="1440" height="900" loading="lazy" decoding="async"`，避免布局抖动并优化首屏加载。
6. `html-references/PROGRESS.md`：复审状态从“待执行”改为“第 1 轮完成，第 2、3 轮待执行”，避免进度失真。

### 四维评分

| 维度 | 分数 | 说明 |
|---|---:|---|
| 正确性 | 4 | 许可证、来源、体积、页面数、SHA-256、排除项均复核；尚未做逐文件人工视觉验收。 |
| 完整性 | 4 | 6 个阶段全部完成，15 个 patterns 全部映射；仍需 2 轮复审。 |
| 精致度 | 4 | 导览页零依赖且无溢出；文档证据链已补齐，但还可继续打磨阅读路径。 |
| 可用性 | 4 | 首次使用者可从 index.html 打开代表页与拆解；尚缺更明确的“15 分钟阅读路线”。 |

### 问题分级与状态

- P0：0
- P1：0
- P2：已修复 6 处（见上）
- 遗留 P2：导览页尚无打印样式；notes 的阅读路径还可更时间盒化；最终交付自评待第 3 轮写入。

### 诚实自评

这轮产物已经能可靠支撑本地查阅和设计反推：来源、许可证、快照校验、页面清单、截图和 PPT Factory 映射都有证据。但距离“直接拿去发布”仍有差距：需要真人目检 6 张截图与导览页视觉效果，确认中文排版和卡片密度符合审美；`patterns/` 的映射只是建议，尚未经实际 deck 试装验证；未来主题 token 也只是草案，没有生成可切换主题样张。

## 2026-09-30 · HTML5 UP · 第 2 轮复审

### 已检查文件

- `html-references/index.html`
- `html-references/PROGRESS.md`
- `html-references/LOG.md`
- `html-references/review-log.md`
- `html-references/collections/2026-09-30-html5up/meta.md`
- `html-references/collections/2026-09-30-html5up/preview.md`
- `html-references/collections/2026-09-30-html5up/notes.md`
- `html-references/collections/2026-09-30-html5up/download-manifest.json`
- `html-references/collections/2026-09-30-html5up/screenshots/README.md`
- `html-references/collections/2026-09-30-html5up/screenshots/dimension-index-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/editorial-index-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/forty-landing-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/massively-elements-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/massively-index-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/story-index-1440x900.png`
- `source/massively/assets/sass/libs/_vars.scss`
- `source/forty/assets/sass/libs/_vars.scss`
- `source/massively/elements.html`

### 自动检查结果

- `index.html`：无脚本、无外部资源依赖；所有本地相对链接存在。
- 响应式：1440×1000、900×1000、560×900、390×844 均无横向溢出。
- 控制台：0 error / 0 warning。
- 对比度：`--accent` 调整为 `#0f6d86` 后，在白色和 `#f4f6f8` 背景上的对比度分别约 5.91:1 与 5.46:1，满足正文链接可读性要求。
- Markdown 本地链接：`meta.md`、`preview.md`、`notes.md`、`screenshots/README.md` 中指向本地文件的链接均存在。
- Manifest：44 条、44 个唯一 slug；44/44 ZIP SHA-256 仍与记录一致。
- Notes 清单：第 2 节限定解析后 44/44 模板与页面名匹配。

### 本轮修复（≥5 处 P2 / 含 1 处可达性缺陷）

1. `html-references/index.html`：将 `--accent` 从 `#168ba8` 调整为 `#0f6d86`，普通文本链接和主按钮文字对比度从约 3.97:1 提升到约 5.91:1，满足 WCAG AA 正文要求。
2. `html-references/index.html`：新增 `:focus-visible` 与 `.visual:focus-within` 焦点样式，键盘导航时能看到清晰焦点框。
3. `html-references/index.html`：新增 `@media print` 样式，导览页打印时去除背景、压缩卡片间距、保留可读链接与内容结构。
4. `html-references/collections/2026-09-30-html5up/notes.md`：新增“首次使用路线（15 分钟）”，把 44 套模板压缩成时间盒化阅读路径，降低第一次使用成本。
5. `html-references/collections/2026-09-30-html5up/meta.md`：新增“可复现校验”代码块，明确 manifest 与版权文件的本地验证方法。
6. `html-references/collections/2026-09-30-html5up/preview.md`：新增端口占用、Google Fonts fallback、favicon 404、相对路径四类常见问题的处理表。
7. `html-references/collections/2026-09-30-html5up/screenshots/README.md`：新增每张截图的目检要点，说明截图为视口图而非整页长图。
8. `html-references/LOG.md`：补充“来源选择结论”，说明为何最终统一使用官方端点而非镜像或 Wayback 混合快照。
9. `html-references/PROGRESS.md`：更新为第 1、2 轮完成，第 3 轮待执行。

### 四维评分

| 维度 | 分数 | 说明 |
|---|---:|---|
| 正确性 | 5 | 44 个 ZIP 哈希、44/44 版权文件、110 页面、索引链接与导览页渲染均复核通过。 |
| 完整性 | 4 | 交付物完整；仍缺第 3 轮最终交付自评与真人视觉验收记录。 |
| 精致度 | 5 | 导览页已补齐 AA 对比度、焦点、打印与响应式细节；文档阅读路径更明确。 |
| 可用性 | 5 | 首次使用者可按 15 分钟路线完成浏览、拆解与映射选择；常见问题有处理方案。 |

### 问题分级与状态

- P0：0
- P1：0
- P2：已修复 9 处（见上）
- 遗留 P2：需要真人目检截图视觉效果；映射建议尚未在真实 deck 中试装。

### 诚实自评

本轮后，导览页和文档已经达到“本地可直接使用”的水平：链接、校验、阅读路径、故障处理和可访问性细节都齐备。仍未达到“直接发布”的原因是：外部 HTML5 UP 源码本身包含旧依赖和 demo 占位内容，只适合作为参考库而非生产模板；PPT Factory 映射还停留在设计建议，没有生成试装样张；最终是否采纳新增主题 token，需要产品侧决策。

## 2026-09-30 · HTML5 UP · 第 3 轮复审（最终轮）

### 已检查文件

- `html-references/README.md`
- `html-references/BACKLOG.md`
- `html-references/INDEX.md`
- `html-references/LOG.md`
- `html-references/PROGRESS.md`
- `html-references/review-log.md`
- `html-references/index.html`
- `html-references/collections/2026-09-30-html5up/meta.md`
- `html-references/collections/2026-09-30-html5up/preview.md`
- `html-references/collections/2026-09-30-html5up/notes.md`
- `html-references/collections/2026-09-30-html5up/download-manifest.json`
- `html-references/collections/2026-09-30-html5up/screenshots/README.md`
- `html-references/collections/2026-09-30-html5up/screenshots/dimension-index-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/editorial-index-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/forty-landing-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/massively-elements-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/massively-index-1440x900.png`
- `html-references/collections/2026-09-30-html5up/screenshots/story-index-1440x900.png`
- `patterns/README.md`
- `patterns/cover.html`
- `patterns/claim.html`
- `patterns/section.html`
- `patterns/narrative-map.html`
- `patterns/assertion-evidence.html`
- `patterns/bullets.html`
- `patterns/two-col.html`
- `patterns/metrics.html`
- `patterns/timeline.html`
- `patterns/steps.html`
- `patterns/quote.html`
- `patterns/code.html`
- `patterns/table.html`
- `patterns/image-text.html`
- `patterns/end.html`
- `templates/base/base.css`

### 最终自动检查

- Manifest：44 条、44 个唯一 slug、44/44 SHA-256 匹配。
- 源码：44 模板、110 页面、2,438 文件、150,470,994 bytes；无 `node_modules/dist/build/.git`。
- 版权：44/44 `LICENSE.txt`、44/44 `README.txt`。
- Notes：第 2 节 44/44 模板与页面名一致；15 个 patterns 全部有映射。
- 截图：6 张 1440×900 PNG，SHA-256 与截图索引一致。
- 导览页：无脚本、无外部资产；本地链接全部存在；1440/900/560/390px 无横向溢出；0 error / 0 warning。
- 仓库边界：`templates/`、`patterns/`、`decks/` 在本轮均未被修改。

### 本轮修复（≥5 处 P2）

1. `html-references/index.html`：外部来源与许可证链接增加 `target="_blank"`、`rel="noopener noreferrer"`，避免本地导览被外部页面替换，并降低反向 tab-nabbing 风险。
2. `html-references/collections/2026-09-30-html5up/notes.md`：新增“交付边界与下一步决策”，明确可直接使用范围、待产品决策项和明确不迁移项。
3. `html-references/collections/2026-09-30-html5up/meta.md`：新增 6 项真人验收清单，把后续人工检查从口头要求落成可勾选流程。
4. `html-references/INDEX.md`：索引行补充复审记录入口，方便验收者直接查看三轮检查证据。
5. `html-references/LOG.md`：新增交付前检查清单，区分已完成自动验证与仍需真人/产品决策的事项。
6. `html-references/PROGRESS.md`：复审循环更新为 3 轮完成、P0/P1 为 0，并明确剩余事项不阻塞本地使用。

### 四维评分

| 维度 | 分数 | 说明 |
|---|---:|---|
| 正确性 | 5 | 来源、许可证、哈希、页面清单、链接、渲染和控制台均逐项复核。 |
| 完整性 | 5 | 阶段 1–6、3 轮复审、索引、日志、进度和截图索引全部完成。 |
| 精致度 | 5 | 导览页、截图索引、预览排障、阅读路线和验收清单均已打磨。 |
| 可用性 | 5 | 首次接触者可从导览页直达代表页、拆解、映射、校验和复审记录。 |

### 问题分级与状态

- P0：0
- P1：0
- P2：本轮已修复 6 处；无阻断或明显缺陷。
- 后续非本轮缺口：真人视觉验收、真实 deck 试装、主题 token 产品决策。

### 最终诚实自评

这份 HTML5 UP 参考库已经达到“本地可直接使用”的交付标准：来源权威、许可证与署名完整、44 套源码可浏览、110 页清单准确、6 张截图可对照、设计系统拆解有源码证据、15 个 PPT Factory pattern 均有映射建议，导览页零依赖且经过响应式与控制台验证。

它还不是“可直接发布的产品资产”：外部源码包含旧 jQuery、重复资产、demo 表单和占位内容，不能整体进入 PPT Factory；映射结论也尚未用真实 deck 试装验证。若要进入产品，下一步应先按 `notes.md` 第 9 节选择一个主题方向，生成一页 `cover` + 一页 `assertion-evidence` + 一页 `metrics` 的试装样张，再决定是否扩展主题 token。若只是作为设计参考库，当前产物已经可以直接使用。

## 2026-10-02 · SB Admin 2 · 第 1 轮复审

### 已检查文件

**任务规则与总索引**
- `html-references/README.md`
- `html-references/BACKLOG.md`
- `html-references/INDEX.md`
- `html-references/PROGRESS.md`
- `html-references/LOG.md`
- `html-references/index.html`

**SB Admin 2 交付物**
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/meta.md`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/preview.md`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/notes.md`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/README.md`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/01-index-dashboard.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/02-cards-components.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/03-tables-datatable.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/04-charts-visualizations.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/05-utilities-color-tokens.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/06-login-authentication.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/07-404-error-state.png`

**源码与映射证据**
- `source/LICENSE`
- `source/README.md`
- `source/package.json`
- `source/scss/_variables.scss`
- `source/scss/_global.scss`
- `source/scss/_buttons.scss`
- `source/scss/_cards.scss`
- `source/scss/_charts.scss`
- `source/scss/_login.scss`
- `source/scss/navs/_sidebar.scss`
- `source/scss/navs/_topbar.scss`
- 14 个顶层 HTML：`404.html`、`blank.html`、`buttons.html`、`cards.html`、`charts.html`、`forgot-password.html`、`index.html`、`login.html`、`register.html`、`tables.html`、`utilities-animation.html`、`utilities-border.html`、`utilities-color.html`、`utilities-other.html`
- `vendor/bootstrap/js/bootstrap.js`
- `vendor/chart.js/Chart.js`
- `vendor/datatables/jquery.dataTables.js`
- `vendor/jquery/jquery.js`
- `vendor/jquery-easing/jquery.easing.js`
- `vendor/fontawesome-free/LICENSE.txt`
- `patterns/README.md` 与 15 个 `patterns/*.html`

### 自动检查结果

- Manifest：1,878 个源码文件、18,153,426 bytes、14 个顶层 HTML，源码树 SHA-256 复算一致。
- 版权：根 `LICENSE`、`README.md`、作者与内嵌第三方版权头均存在。
- 排除项：无 `node_modules/`、`.git/`、顶层 `dist/`、顶层 `build/`。
- 截图：7 张 PNG 的 SHA-256 与截图索引一致。
- 映射：15 个 PPT Factory patterns 全部在 notes 中有逐项映射。
- 导览页：28 个本地 `href/src` 全部存在，0 个 `<script>`；1440/900/560/390px 无横向溢出，0 error / 0 warning。
- 仓库边界：`patterns/`、`templates/`、`decks/` 相对 HEAD 无改动。

### 本轮修复（7 处 P2）

1. `collections/2026-10-02-startbootstrap-sb-admin-2/download-manifest.json`：新增 1,878 个源码文件的字节数与逐文件 SHA-256、源码树 digest、版本与 commit，补齐可复算完整性证据。
2. `collections/2026-10-02-startbootstrap-sb-admin-2/meta.md`：新增“快照完整性”与“内嵌第三方许可与署名”，区分模板 MIT 与 vendor 版权头。
3. `collections/2026-10-02-startbootstrap-sb-admin-2/preview.md`：新增 7 张代表截图到查看意图的映射，补齐从预览记录到图像证据的路径。
4. `collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/README.md`：新增 7 张 PNG 的 SHA-256 表，截图后续可对账。
5. `collections/2026-10-02-startbootstrap-sb-admin-2/notes.md`：修正“认知恢复”为“账号/密码恢复”，避免中文误读。
6. `collections/2026-10-02-startbootstrap-sb-admin-2/notes.md`：把认证卡及其迁移建议中的 0.5rem 圆角修正为源码实际的 0.35rem，并删除“高度高度”重复。
7. `html-references/index.html`：统计标签由“代表页面”改为“收录页面”，与 110+14 的统计口径一致。

### 四维评分

| 维度 | 分数 | 说明 |
|---|---:|---|
| 正确性 | 4.5 | 来源、许可证、体积、manifest、页面、截图哈希和渲染已复核；可访问性细节还可进一步量化。 |
| 完整性 | 4.5 | 6 个阶段完成，15 个 pattern 全映射；还需两轮复审和更明确的人工验收清单。 |
| 精致度 | 4 | 文档证据链已明显增强；导览信息架构可用但尚未做逐区块视觉细查。 |
| 可用性 | 4 | 可从导览直达源码、截图和拆解；首次使用者还缺一条时间盒阅读路线。 |

### 问题分级与状态

- P0：0
- P1：0
- P2：本轮修复 7 处；遗留为可访问性数据量化、人工验收清单、阅读路线与最终发布差距说明。

### 诚实自评

本轮后，SB Admin 2 已是可复查的本地参考快照：源码、版权、页面、截图和映射都有证据链。但还不能称“可直接发布”：导览和截图尚未由真人目检；设计 token 只是建议，未在真实 PPT deck 中试装；旧依赖与外部资源限制也必须由使用者理解。下一轮应补齐这些可执行判断，而不是继续增加无关收藏。

## 2026-10-02 · SB Admin 2 · 第 2 轮复审

### 已检查文件

- `html-references/README.md`
- `html-references/BACKLOG.md`
- `html-references/INDEX.md`
- `html-references/LOG.md`
- `html-references/PROGRESS.md`
- `html-references/index.html`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/meta.md`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/preview.md`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/notes.md`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/download-manifest.json`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/README.md`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/01-index-dashboard.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/02-cards-components.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/03-tables-datatable.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/04-charts-visualizations.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/05-utilities-color-tokens.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/06-login-authentication.png`
- `html-references/collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/07-404-error-state.png`
- `source/LICENSE`
- `source/README.md`
- `source/package.json`
- `source/css/sb-admin-2.css`
- `source/scss/_global.scss`
- `source/scss/_variables.scss`
- `source/scss/_cards.scss`
- `source/scss/_charts.scss`
- `source/scss/_login.scss`
- `source/scss/navs/_sidebar.scss`
- `source/scss/navs/_topbar.scss`
- `source/scss/utilities/_animation.scss`
- `source/scss/utilities/_background.scss`
- `source/scss/utilities/_border.scss`
- `source/scss/utilities/_text.scss`
- 14 个顶层 HTML 页面
- `patterns/README.md` 与 15 个 `patterns/*.html`

### 自动检查结果

- Manifest：1,878 个文件、18,153,426 bytes、源码树 SHA-256 复算一致；JSON 语法有效。
- 可访问性扫描：量化 4 处 SCSS `outline:none`、46 处占位 `alt="..."`、34 处初始 `aria-expanded="true"`；计算 `#858796` 白底对比度 3.56:1、`#4e73df` 4.34:1。
- 完整性：`LICENSE`、`README.md`、第三方版权头存在；无 `node_modules/.git/dist/build`。
- 映射：15 个 patterns 全部存在且覆盖。
- 导览页：本地链接全部存在；1440/900/560/390px 无横向溢出；0 error / 0 warning。
- 仓库边界：本轮仍只改动 `html-references/`，`patterns/templates/decks` 无差异。

### 本轮修复（8 处 P2）

1. `collections/2026-10-02-startbootstrap-sb-admin-2/download-manifest.json`：补充 author、license path、local path、snapshot policy 与排除项，降低快照策略歧义。
2. `collections/2026-10-02-startbootstrap-sb-admin-2/meta.md`：明确“记录 HEAD 后移除 `.git`，源码 payload 未修改”，并把 28MiB 解释为移除前的浅克隆工作区体积。
3. `collections/2026-10-02-startbootstrap-sb-admin-2/meta.md`：新增 6 项真人验收清单，覆盖导览、仪表盘、卡片交互、表格、断网回退与 token 决策。
4. `collections/2026-10-02-startbootstrap-sb-admin-2/preview.md`：新增 15 分钟时间盒阅读路线，明确每段看什么、不看什么。
5. `collections/2026-10-02-startbootstrap-sb-admin-2/notes.md`：将可访问性缺陷量化为对比度、alt、aria 与 focus 数据，避免停留在泛泛描述。
6. `collections/2026-10-02-startbootstrap-sb-admin-2/notes.md`：新增“4.6 证据锚点”，把设计结论逐项指回 SCSS/HTML/CSS 源文件。
7. `collections/2026-10-02-startbootstrap-sb-admin-2/screenshots/README.md`：补充本地服务器与 Playwright 参数的截图复现方式。
8. `html-references/index.html` 与 `html-references/LOG.md`：为 commit 片段补充克制的 inline code 样式，并在日志中记录源码树 SHA-256。

### 四维评分

| 维度 | 分数 | 说明 |
|---|---:|---|
| 正确性 | 4.7 | 事实链、哈希、许可、可访问性数值和渲染均复核；尚未做真实键盘逐项操作测试。 |
| 完整性 | 4.7 | 阶段、映射、证据锚点、阅读路线与验收清单齐备；还差最终轮交付声明。 |
| 精致度 | 4.5 | 文档路径与导览细节更清晰；截图本身仍需真人目检。 |
| 可用性 | 4.7 | 首次接触者可在 15 分钟路线内完成重点阅读，但 token 试装仍需产品决策。 |

### 问题分级与状态

- P0：0
- P1：0
- P2：本轮修复 8 处；遗留为最终三轮状态收口、真实键盘/断网人工操作、真人视觉验收和 token 产品决策。

### 诚实自评

现在这份收藏已经从“可浏览”推进到“可验收”：用户知道看什么、点哪里、哪些结论来自哪个源码文件、哪些风险不能迁移。但它仍不是产品化资产：未修改外部源码的历史可访问性问题无法在本档案内修复；PPT Factory 迁移建议仍缺真实 deck 试装；真人也尚未确认截图和导览的视觉手感。第 3 轮应做最终边界声明和收尾检查，而不是为了分数继续扩写。
