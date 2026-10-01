# Raycast 首页高保真归档

- **来源**：<https://www.raycast.com/>
- **归档时间**：2026-10-01 09:11–09:24（Asia/Shanghai）
- **页面状态**：HTTP 200；标题 `Raycast - Your shortcut to everything`；1440/1280 视口全页高 15983px，375 视口高 15647px
- **抓取方式**：
  - 使用 Playwright `1.62.1` / Chromium `141.0.7390.37` 打开实时页面；
  - 通过 Chromium DevTools Protocol `Page.captureSnapshot(format="mhtml")` 生成单文件 MHTML；
  - 在 1440、1280、375 三档视口保存 1x 全页 PNG；
  - 另存 live DOM、11 个 CSS 源文件、6 个实际渲染字体、计算样式与 PerformanceResourceTiming；
  - 代表区块用 1440 CSS 宽、`deviceScaleFactor=2` 裁切输出。
- **robots 结果**：`https://www.raycast.com/robots.txt` 对 `User-agent: *` 为 `Allow: /`；仅禁用 `/upgrade`、`/settings/sessions`、`/handles/new`、`/users/confirmation`，均不在本次首页归档范围。
- **MHTML 完整性**：71 个资源 part（1 HTML、11 CSS、41 WebP、18 JPEG），解码资源 2,335,433 bytes。Chromium MHTML 未内嵌字体，因此按 live performance 记录另行补充 6 个 WOFF2 到 `archive/resources/`。
- **版权口径**：页面文案、Logo、产品截图、扩展图标与媒体资源版权归 Raycast / 各资源权利人。此目录仅供本地设计学习与内部研究，不二次分发、不商用、不用于对外发布；保留原站权利信息。
- **复现入口**：
  - `archive/capture.js`：主捕获流程（已保留现场版本）；
  - `archive/capture-mhtml.js`：MHTML 专用重捕；
  - `archive/capture-sections.js`：2x 代表区块裁切；
  - `archive/mhtml-manifest.py`：MHTML part 清单。
- **目录规模**：约 14 MB；截图与区块为最大部分，归档文件均记录 SHA-256。

## 主要交付

| 类型 | 位置 |
|---|---|
| 三视口全页截图 | `screenshots/` |
| 浏览器单文件归档 | `archive/raycast-home.mhtml` |
| DOM/计算样式/资源清单 | `archive/` |
| 设计令牌 | `tokens.json` |
| 设计拆解 | `notes.md` |
| 2x 代表区块 | `sections/` |
| 归档说明 | `archive/README.md` |
