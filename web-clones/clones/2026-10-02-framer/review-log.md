# Framer 归档复审记录

## Round 1 · 2026-10-02

**四维打分**：正确性 8.6 / 10；完整性 8.4 / 10；精致度 8.8 / 10；可用性 8.3 / 10。无 P0 / P1；发现并修复 7 处 P2。

**逐文件检查范围**
- 根层：`meta.md`、`notes.md`、`tokens.json`、`sections/README.md`、`screenshots/README.md`
- 截图：`screenshots/framer-home-1440-fullpage.png`、`screenshots/framer-home-1280-fullpage.png`、`screenshots/framer-home-375-fullpage.png`、`sections/01-hero-headline-cta.png`、`sections/02-hero-product-video.png`、`sections/03-agent-workflow.png`、`sections/04-platform-interface.png`、`sections/05-community-feed.png`
- 归档主文件：`archive/framer-home.mhtml`、`archive/framer-home.source.html`、`archive/live-dom.html`、`archive/robots.txt`、`archive/wget-capture.log`
- 归档清单与证据：`archive/capture-manifest.json`、`archive/screenshot-manifest.json`、`archive/section-capture-manifest.json`、`archive/mhtml-manifest.json`、`archive/performance-resources.json`、`archive/design-evidence.json`、`archive/viewport-1440-metrics.json`、`archive/viewport-1280-metrics.json`、`archive/viewport-375-metrics.json`
- 归档脚本：`archive/capture.js`、`archive/capture-design-evidence.js`、`archive/capture-sections.js`、`archive/mhtml-manifest.py`
- 首屏基准：`archive/viewport-1440-firstscreen.png`、`archive/viewport-1280-firstscreen.png`、`archive/viewport-375-firstscreen.png`
- 补充媒体：`archive/resources/hero-design-agent.mp4`、`archive/resources/community-loop-a.mp4`、`archive/resources/community-loop-b.mp4`、`archive/resources/community-loop-c.mp4`、`archive/resources/SHA256SUMS`
- 入口文件：`web-clones/README.md`、`web-clones/BACKLOG.md`、`web-clones/PROGRESS.md`

**具体修复（7 处 P2）**
1. `notes.md`：性能绿从 computed `rgb(76,217,99)` 误写为 `#4CD931`；已修正为 `#4CD963`，并同步修正 `tokens.json` 的色值与 11.41:1 对比度。
2. `archive/capture-sections.js`：原用 Playwright `boundingBox()` 记录区块，滚动后得到 -638.56 等视口坐标；已改为元素 `getBoundingClientRect().top + window.scrollY`，重跑后五个区块 y 坐标分别为 64、372、1401.44、4655.06、8529.09。
3. `archive/section-capture-manifest.json`：删除人工补 `documentY` 的做法，改为单一 `cssRect` 记录文档坐标；同时重截 3 个滚动相关区块，消除截图帧差异。
4. 新增 `archive/resource-download-manifest.py/.json`：逐个记录 4 个 MP4 的原 URL、用途、大小、SHA256，总计 8,745,466 bytes，补足 MHTML 不含视频字节的缺口。
5. 新增 `archive/security-scan.py/.json`：扫描交付文本 / JSON / JS / MD，6 类凭据模式均为 0 findings。
6. 新增 `archive/rights-inventory.py/.json`：明确 MHTML 域名、补充媒体权利归属、robots 访问口径，以及不二次分发 / 不商用 / 不作训练素材。
7. 新增 `archive/file-inventory.py/.json` 与 `archive/SHA256SUMS`：当前覆盖 46 个稳定交付文件，便于后续验证归档未被误改。

**诚实自评**
本目录已经可浏览、可追溯、可提取设计令牌；但离“直接发布级资料库”仍有差距：尚未做 MHTML 离线打开验证、三档截图与 MHTML 的像素保真度量、机器化总校验，`PROGRESS.md` 也还缺最终复审结论。下一轮重点是把可用性从“文件齐全”推进到“打开即验”。

## Round 2 · 2026-10-02

**四维打分**：正确性 9.2 / 10；完整性 9.4 / 10；精致度 9.2 / 10；可用性 9.2 / 10。无 P0 / P1；发现并修复 8 处 P2。

**逐文件检查范围**
在 Round 1 清单基础上逐一复核了新增与被修改文件：`meta.md`、`notes.md`、`tokens.json`、`archive/capture-sections.js`、`archive/section-capture-manifest.json`、`sections/03-agent-workflow.png`、`sections/04-platform-interface.png`、`sections/05-community-feed.png`、`archive/resource-download-manifest.py/.json`、`archive/security-scan.py/.json`、`archive/rights-inventory.py/.json`、`archive/file-inventory.py/.json`、`archive/SHA256SUMS`、`web-clones/BACKLOG.md`、`web-clones/PROGRESS.md`；并抽查全部 JSON 可解析、8 张 PNG 尺寸、4 个 MP4 hash。

**具体修复（8 处 P2）**
1. 新增 `archive/offline-browser-check.js/.json/.png/.diff.png`：离线打开 MHTML，确认 title、H1、6 个 H2、11 个 stylesheet、90 图、7 视频、152 链接与 1440 live DOM 一致，外网请求 0。
2. 新增首屏像素对比：MHTML/live exact match 86.4419%、MAE 13.778、175713 像素变化；把“能归档”升级为可量化的动态保真差异，避免误称 MHTML 可完整重放视频。
3. 新增 `archive/responsive-metrics.py/.json`：集中核对三档 HTTP、页高、overflow、截图像素、heading/media/text 样本数量，三档 `matchesExpected=true`。
4. 新增 `archive/color-accessibility.py/.json`：初版脚本把 rgba 透明色误按纯白计算，修复为 alpha 合成到黑底；9 组中 8 组核心文字 AA 通过，40% 白仅 3.66:1 且被明确限制为装饰性 metadata。
5. 新增 `archive/verification.py/.json`：40/40 项机器校验通过，覆盖 robots、三档截图、区块几何、MHTML、离线结构、外网隔离、视频 hash、安全、版权、tokens、BACKLOG、PROGRESS 与 SHA。
6. 修正 `archive/verification.py` 初稿两处错误：MHTML manifest 期望字节数由 4,724,433 改为 4,724,439；BACKLOG/PROGRESS 路径从 `clones/` 上溯到 `web-clones/`。
7. `tokens.json` 与 `meta.md` 补充离线核验、响应式、可访问性、verification 等证据入口，令结构化令牌可以反向追溯。
8. 放弃会因 macOS locale 触发 Perl panic 的 `shasum -c`，改为 Python 逐行校验 SHA256；40 项验证中当前 46+ 个稳定文件哈希全部通过。

**诚实自评**
现在主交付已经达到“打开目录即可核对”的可用度：浏览器可看三档与区块截图，MHTML 可离线打开，脚本和 JSON 可复现证据，版权边界明确。剩余不足是：尚未对 1280 / 375 的 MHTML 做逐档离线差异，未建立面向真人浏览的目录索引页，最后一轮还需复核提交边界与未跟踪文件，确保没有把旧批次未提交 remakes 混入本次成果。
