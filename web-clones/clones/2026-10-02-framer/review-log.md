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
