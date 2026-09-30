# Review log · OpenAI homepage archive

## Round 1 — 2026-09-29 11:50

### Scores (before → after)

| Dimension | Before | After | Reason |
|---|---:|---:|---|
| Correctness | 4.2 | 4.7 | Removed invalid `$schema` usage; checksums now cover all archive artifacts. |
| Completeness | 4.5 | 4.8 | Added mobile computed styles to metadata and explicit artifact inventories. |
| Polish | 4.0 | 4.6 | Fixed section filename/caption mismatch and documented exact screenshot dimensions. |
| Usability | 3.9 | 4.6 | A reviewer can now understand how to open the MHTML and navigate evidence without guessing. |

### P0/P1

- **P1-1 fixed**: `tokens.json` incorrectly declared itself as a JSON Schema document via `$schema`. Removed; it is a token data document.
- No P0 found.

### P2 fixes (6)

1. Renamed `sections/03-recent-news-rail.png` to `sections/03-recent-news-grid.png` to match the actual two-column grid.
2. Updated `sections/README.md` to reference the corrected filename.
3. Added `archive/README.md` explaining the MHTML, DOM, style probes, and locale capture detail.
4. Added `screenshots/README.md` with viewport and full-page dimensions.
5. Rebuilt `archive/SHA256SUMS` to cover MHTML, DOM, both computed-style probes, selected styles, and robots.txt—not only two files.
6. Corrected `meta.md` capture window to include the later 375px style capture.

### Post-fix verification

- Required paths present: archive / screenshots / sections / notes / tokens / meta.
- `python3 -m json.tool tokens.json` passes.
- PNG dimensions match the documented 1440, 1280, and 375 outputs.
- No P0/P1 remains.

## Round 2 — 2026-09-29 11:58

### Scores (before → after)

| Dimension | Before | After | Reason |
|---|---:|---:|---|
| Correctness | 4.7 | 4.9 | Added machine-readable MHTML structure validation and automated artifact verification. |
| Completeness | 4.8 | 4.9 | Documented that MHTML preserves HTML/CSS/images but not guaranteed autoplay video bytes. |
| Polish | 4.6 | 4.8 | Resource inventory, provenance, and review state are now explicit. |
| Usability | 4.6 | 4.9 | Reviewer can audit completeness without opening every binary manually. |

### P0/P1

- None found.

### P2 fixes (6)

1. Added `archive/mhtml-manifest.json` with all 58 unique resource locations, content types, byte counts, and hashes.
2. Added `archive/verification.json` to automate required-file, JSON, MHTML, checksum, and PNG dimension checks.
3. Documented the MHTML fidelity boundary: 1 HTML + 44 CSS + 13 WebP parts; autoplay video bytes are not guaranteed.
4. Added screenshot provenance: campaign banner dismissed and lazy content scrolled before capture.
5. Updated `meta.md` to reference the manifest and verification report.
6. Updated `web-clones/PROGRESS.md` with the complete OpenAI batch state and review entry point.

### Post-fix verification

- `overallPass: true`.
- Required files: all present.
- Token JSON valid; all archive checksums match.
- Screenshot dimensions match 1440×6624, 1280×6457, and 375×8695.
- No P0/P1 remains.

## Round 3 — 2026-09-29 12:05

### Scores (before → after)

| Dimension | Before | After | Reason |
|---|---:|---:|---|
| Correctness | 4.9 | 5.0 | Checksum coverage now matches the archive README claim, including manifest and verification files. |
| Completeness | 4.9 | 5.0 | Top-level manifest and navigation close the review path from artifact to evidence. |
| Polish | 4.8 | 4.9 | Section captions now include exact pixel dimensions. |
| Usability | 4.9 | 5.0 | A first-time reviewer has a six-step reading order and fallback if MHTML reopening stalls. |

### P0/P1

- **P1-2 fixed**: after Round 2, `archive/README.md` claimed all archive artifacts were checksummed, but `mhtml-manifest.json` and `verification.json` had not yet been added to `SHA256SUMS`. Both are now covered.
- No P0 found; no remaining P1.

### P2 fixes (6)

1. Added top-level `README.md` with the intended six-step review order.
2. Added top-level `MANIFEST.json` listing 25 files and excluding the manifest itself with paths and byte sizes.
3. Included `mhtml-manifest.json` and `verification.json` in `archive/SHA256SUMS`.
4. Added exact pixel dimensions to every section caption.
5. Updated `meta.md` with the measured archive size after Round 2 additions.
6. Rewrote `web-clones/PROGRESS.md` to remove the stale “next: openai” entry and point to `claude.com/product/claude-code`.

### Post-fix verification

- Required files: 14/14 present.
- Token JSON valid.
- MHTML valid multipart with 58 unique resources.
- Full-page PNG dimensions all match.
- Five section screenshots present.
- Top-level manifest present.
- No P0/P1 remains.

## Honest final assessment

The batch is directly usable as a local design-research asset: the rendered page, three responsive full-page captures, five section captures, DOM, root variables, desktop/mobile computed styles, structured tokens, checksums, and machine verification are all present.

What is still not guaranteed:

1. Local MHTML reopening timed out once in Playwright after this capture, although its 58-resource structure parses cleanly; treat the MHTML as preservation evidence and use the PNG/DOM path for fast review.
2. MHTML does not guarantee autoplay video bytes; visible-state video/poster fidelity is preserved primarily by the PNG captures.
3. `OpenAI Sans` is identified but not redistributed; exact typography requires OpenAI’s own licensed font.
4. Optional `remake/` was intentionally skipped to spend the remaining quality budget on archive verification rather than adding an approximate imitation.

For PPT use, the black/white token system and grid/card logic are ready for human theme extraction; this batch does not modify `templates/`, `patterns/`, or `decks/`.

## Post-review usability fix — 2026-09-30 07:37

User-reported issue: opening `archive/dom.html` directly rendered incorrectly. Root causes were confirmed in the raw `outerHTML` snapshot: it lacked `<!doctype html>`, root-relative CSS resolved to nonexistent `file://` paths, hydration scripts were unsafe under `file://`, and lazy media depended on runtime observers.

Fixes:

1. Preserved the untouched capture as `archive/dom.raw.html`.
2. Rebuilt `archive/dom.html` as a static preview in standards mode.
3. Extracted 42 CSS files and 13 MHTML images to `archive/dom-assets/`.
4. Fetched the 6 additional image paths referenced only after the original full-page lazy-load pass and mapped every srcset variant locally.
5. Removed 108 runtime/hydration scripts and converted lazy images to eager loading.
6. Added `dom-preview-manifest.json`, refreshed manifests/checksums/verification, and updated documentation.

Chromium verification at 1440px: `CSS1Compat`, 44 stylesheets, 20/20 images loaded, no incomplete images, and key homepage sections present. No P0/P1 remains.

## 阶段6像素级复审 Round 1 — 2026-10-01 01:55

### 覆盖补齐与像素基线（9 处）

1. `sections/06-openai-for-business.png`：从 1440 原始全页截图按 y=4683、h=614 裁切，补上商业/产品转化区。
2. `sections/07-get-started-cta.png`：按 x=32、y=5417、w=1376、h=368 裁切，补上页尾大 CTA。
3. `sections/08-footer.png`：按 y=5904、h=688 裁切，补上完整页脚。
4. `sections/README.md`：声明 8 个区块覆盖顺序并补充产品区、CTA、页脚说明。
5. `archive/verification.json`：区块计数由 5 更新为 8，并列出新增文件。
6. `MANIFEST.json`：重新统计 91 个文件与总字节数。
7. `meta.md`：同步区块数量与批次体积口径。
8. `archive/stage6-baseline-1440.png`：记录修正前离线预览全页（1440×6649）。
9. `archive/stage6-computed-recheck.json` 与 `archive/stage6-pixel-baseline.json`：记录 1440×1000 DOM 计算样式与原始截图对齐后的像素差异基线。

### 结果

代表区域从“首屏/featured/新闻/stories/research”扩展到“产品商业区、收束 CTA、页脚”；三张新增截图均直接裁自 `screenshots/openai-home-1440-full.png`，不使用复刻图。基线显示离线预览比原始高 25px；按 featured 区后缘对齐后，主要剩余差异集中在视频帧与图标资源，另有全站 25px 纵向偏移待 Round 3 修正。

## 阶段6像素级复审 Round 2 — 2026-10-01 02:08

### 令牌修正（8 处）

1. `tokens.json`：拆分卡片 Meta `14px/19.6px/500` 与交互动作 `14px/14px/500`，修正原先“Meta / CTA”混写造成的行高误差。
2. `tokens.json`：补齐 Header 导航 `13px/19.68px/500`。
3. `tokens.json`：补齐 OpenAI for business 与 research 完全同构的三列 `[442.656px]` 卡片网格。
4. `tokens.json`：补齐 Get started CTA 桌面 `1376×368`、4% 表面、6.08px 圆角、12 列网格与移动 `327×385` / 8px gap。
5. `tokens.json`：补齐 Footer `120px 0 32px` 外距、5×256px 信息列、24px 列距、40px 列内节奏和 13px/19.68px 链接系统。
6. `notes.md`：同步以上真实 computed style，并记录阶段6证据来源与校正结论。
7. `archive/stage6-token-audit.json`：保存 1440×1000 DOM 的 nav/CTA/chip/卡片/商业区/CTA/footer 逐项样式与几何测量。
8. `archive/README.md`、`archive/verification.json`、`archive/SHA256SUMS`、`MANIFEST.json`：登记阶段6审计证据并刷新校验。

### 复核结论

原令牌的字体、色彩、prompt、featured、news、stories、research 主值均与复查一致；主要缺口是交互行高被误归入卡片 Meta，以及 nav、business、CTA、footer 未沉淀。375px 复查确认页面高度 `8695px`、section title `20px/24px/-0.2px`、CTA 标题 `32px/36.48px/-0.64px`、prompt `327×104/16px`。

## 阶段6像素级复审 Round 3 — 2026-10-01 02:15

### 像素修正（10 处）

1. `archive/dom.html`：定位 featured 右列第三卡保留下来的运行期补偿 `--pb:56.875px`；它使静态预览 grid 变为 `1388.953px`、页高变为 `6649px`。
2. `archive/dom.html`：将该补偿校准为 `31.953125px`，featured grid 回到 `1364.031px`，后续区块整体上移 `24.922px`。
3. `archive/stage6-corrected-1440.png`：重新以 1440×1000 无头 Chromium 截图，输出尺寸 `1440×6624`，与原始全页截图完全一致。
4. `archive/stage6-pixel-final.json`：记录修正后零纵向偏移像素对比；MAE 由 `4.342308` 降至 `1.290694`，>2 差异像素比例由 `10.847403%` 降至 `7.057617%`。
5. 复测 DOM 锚点：hero y112、featured y960、Recent y2444.031、Stories y3239.031、Research y3949.063、Business y4682.844、CTA y5416.641、footer y5904.328，与原始计算样式/截图锚点一致。
6. 复测 375×812：页高仍为 `8695px`，说明桌面像素校正未破坏移动布局。
7. `archive/verification.json`：写入 stage6 before/after 页高、像素指标与剩余保真边界。
8. `archive/README.md`、`meta.md`、`notes.md`：记录校正依据、结果与不可强行补偿的动态媒体/远程图标限制。
9. `web-clones/PROGRESS.md`：阶段6标记完成。
10. `archive/SHA256SUMS` 与 `MANIFEST.json`：覆盖新增最终截图/报告并刷新清单。

### 最终判定

结构性像素对齐完成：同 viewport 全页尺寸一致、纵向偏移为 0、代表区块锚点回位。剩余 7.06% >2 差异主要来自 autoplay 视频帧与未进入 MHTML 的远程 SVG `<use>`；不使用臆造图标或字体近似去伪装原始资源，原始 PNG 继续作为渲染真值。
