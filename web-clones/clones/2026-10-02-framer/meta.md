# Framer 首页高保真归档

- **来源**：<https://www.framer.com/>（规范域名首页，最终 URL 无跳转）
- **抓取时间**：2026-10-02 11:45–11:49（Asia/Shanghai）
- **页面状态**：HTTP 200；标题 `Framer: AI design agent`。1440 / 1280 / 375 全页高度分别为 10741px、10741px、10861px，三档均无横向溢出。
- **抓取方式**：
  - 先核对 `archive/robots.txt`：`User-Agent: * Allow: /`，仅限制 API proxy 与部分查询串；本次未访问受限路径。
  - 本机没有 `wget` 可执行文件，无法执行 README 首选 wget 镜像方案（证据见 `archive/wget-capture.log`）。
  - 按降级优先级改用 Playwright Chromium 打开实时页面，通过 Chrome DevTools Protocol `Page.captureSnapshot(format="mhtml")` 保存单文件 MHTML（4,724,439 bytes、79 个资源 part）。
  - 同场保存 live DOM、三档 computed style / geometry、性能资源清单与三档全页截图；完整静态 HTML 另存为 `archive/framer-home.source.html`。
- **归档体积**：当前目录约 29 MiB；其中 archive 约 20 MiB，三档全页截图约 5.6 MiB，五个 2x 区块约 3.4 MiB。
- **视频补充**：Chromium MHTML 未嵌入 MP4 字节；已按实际 `video.currentSrc` 另存 4 个 muted loop 视频（1 个首屏产品演示 + 3 个社区循环，共 8.3 MiB），清单与 SHA256 见 `archive/resource-download-manifest.json`、`archive/resources/`。
- **截图**：`screenshots/framer-home-1440-fullpage.png`（1440×10741）、`screenshots/framer-home-1280-fullpage.png`（1280×10741）、`screenshots/framer-home-375-fullpage.png`（375×10861）。
- **MHTML 内容**：HTML、CSS、AVIF、JPEG、SVG；资源域名包含 `www.framer.com`、`framer.com`、`framerusercontent.com` 与一个嵌入的 Google accounts 图标。详细 part 清单见 `archive/mhtml-manifest.json`。
- **版权口径**：原站文本、图像、字体、产品 UI、Logo 与品牌资产版权归 Framer Software, Inc. / 相应权利人；本目录仅供本地学习留存，不二次分发、不商用、不对外发布，也不作为模型训练素材。
