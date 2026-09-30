# Linear 首页高保真归档

- **来源**：<https://linear.app/>（英文首页，canonical 保持根路径）
- **抓取时间**：2026-10-01 04:13–04:21（Asia/Shanghai）
- **抓取方式**：Playwright Chromium 140 无头/独立上下文加载原站；先分段滚动触发 lazy media 与滚动状态，再执行三档全页截图。先使用 Chrome DevTools Protocol `Page.captureSnapshot(format: "mhtml")` 获取渲染状态；复核 robots 后移除 28 个位于禁抓 `/cdn-cgi/` 路径的图片 part，形成 `linear-home-robots-sanitized.mhtml`，并保留 `dom-snapshot.html`、三档截图与 2× 区块图作为保真补充。另用 DOM computed style 采样三档真实样式。
- **robots 核对**：`robots.txt` 对 `User-agent: *` 仅禁止 `/api/`、`/cdn-cgi/`，并允许 `/api/og/`；根路径允许抓取；复核 MHTML 清单时发现 28 个页面必需图片由 `https://linear.app/cdn-cgi/imagedelivery/...` 提供，虽由浏览器渲染自然加载，但该前缀被 robots 禁抓，因此已从本地归档字节中移除，并在 `archive/robots-sanitization.json` 记录数量与字节数。
- **归档内容**：
  - `archive/linear-home-robots-sanitized.mhtml`：robots 清理后的 MHTML，1.69 MiB，115 个资源 part（1 HTML、113 CSS、1 PNG）；`archive/dom-snapshot.html`：渲染后 HTML；`archive/robots-sanitization.json`：清理记录；
  - `archive/resources/`：3 个 WOFF2 字体（约 0.86 MiB（901,148 bytes）），补充 MHTML 因浏览器缓存未内嵌的 Inter Variable、Italic、Berkeley Mono；
  - `archive/computed-styles.json`：1440 / 1280 / 375 三档 computed style 与盒模型；
  - `archive/mhtml-manifest.json`、`archive/font-manifest.json`、`archive/capture-manifest.json`、`archive/section-capture-manifest.json`、`archive/resource-performance.json`、`archive/verification.json`、`archive/SHA256SUMS`；
  - `screenshots/`：1440、1280、375 三档全页 PNG；
  - `sections/`：6 个 2× DPR 代表区块 PNG；
  - `notes.md`、`tokens.json`、`review-log.md`。
- **归档体积**：约 15.2 MiB（archive 约 3.7 MiB、三档全页截图约 4.8 MiB、6 张 2× 区块截图约 6.6 MiB，说明与校验文件另计）。
- **保真说明**：因 robots 禁抓的 `/cdn-cgi/` 路径承载多数页面图片，归档降级为“清理版 MHTML + DOM 快照 + 多视口截图/区块图”：MHTML 保留 DOM/CSS/字体清单与允许 PNG，原始图片字节不保留；渲染视觉以 PNG 截图为 canonical。视频/持续动画的某一帧同样以截图为准，字体另存于 `resources/`。全页截图按 CSS 像素 DPR 1 保存，区块截图按 DPR 2 保存。
- **版权口径**：原站文本、图像、字体、产品界面与品牌资产版权归 Linear；本归档仅供本地设计学习与留存，不二次分发、不商用、不作为对外发布的复刻或训练素材。
