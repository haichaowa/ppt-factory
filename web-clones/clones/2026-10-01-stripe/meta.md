# Stripe 首页高保真归档

- **来源**：<https://stripe.com/>
- **归档时间**：2026-10-01 15:19–15:26（Asia/Shanghai）
- **页面状态**：HTTP 200；最终 URL 保持 `https://stripe.com/`；标题 `Stripe | Financial Infrastructure to Grow Your Revenue`；1440/1280/375 三档全页截图高度分别为 14702px、15089px、20231px。
- **抓取方式**：
  - 使用 Playwright `1.62.1` / Chromium `141.0.7390.37` 打开实时页面，语言 `en-US`、时区 `Asia/Shanghai`、`prefers-reduced-motion: reduce`；
  - 先完整滚动页面触发 lazy media / carousel / 劳态状态，再通过 Chromium DevTools Protocol `Page.captureSnapshot(format="mhtml")` 生成单文件 MHTML；
  - 保存三档 CSS 像素 1x 的全页 PNG，并用 `deviceScaleFactor=2` 裁切五个代表区块；
  - 保存 live DOM、computed style 频率、标题/按钮/链接样式、Hero 图层、10 个 CSS 源文件与 2 个实际渲染 WOFF2 字体。
- **robots 结果**：`archive/robots.txt` 中 `User-agent: *` 未禁止首页；本页允许继续抓取。其显式 `Allow: /docs` 只覆盖文档路径，另有 `/handoff`、测试支付源、unsupported-browser 等与首页归档无关的 Disallow。针对 `ia_archiver` 的限制不影响本次 Playwright 归档。
- **MHTML 完整性**：`archive/stripe-home.mhtml` 为 2,280,686 bytes、35 个资源 part（1 HTML 主文档、10 CSS、22 WebP、2 MIME 辅助 part）。MHTML 未包含 JS 与字体字节，已按 performance 记录补充 `Sohne` 与 `Source Code Pro Medium` 两个 WOFF2 到 `archive/resources/`。
- **动态保真说明**：首页 Hero 为 `three.js r178` canvas 波形渐变，MHTML 不能重放脚本生成的 WebGL 状态；归档中的三档 PNG 和 2x 区块 PNG 是视觉 canonical。MHTML 适合研究 DOM/CSS/静态图片结构，不应视为像素完整重建。
- **资源权利清单**：MHTML 资源来自 `stripe.com`（1）、`b.stripecdn.com`（13）、`images.stripeassets.com`（21）；字体来自 `b.stripecdn.com`。所有权利归原权利人，归档不改变归属。
- **复现入口**：`archive/capture.js` 保留本次完整捕获流程；`archive/capture-manifest.json` 记录工具、响应、截图/区块坐标、哈希与资源覆盖。
- **版权口径**：页面文案、Logo、插画、产品 UI、字体与品牌资产版权归 Stripe / 各资源权利人。此目录仅供本地设计学习与内部研究，不二次分发、不商用、不用于对外发布，也不作为模型训练素材。
- **目录规模**：约 35 MiB；最大文件为五个 2x 区块与三档全页截图。

## 主要交付

| 类型 | 位置 |
|---|---|
| 三视口全页截图 | `screenshots/stripe-home-{1440,1280,375}-fullpage.png` |
| 浏览器单文件归档 | `archive/stripe-home.mhtml` |
| DOM / computed style / 资源证据 | `archive/` |
| 设计令牌 | `tokens.json` |
| 设计拆解 | `notes.md` |
| 2x 代表区块与评价 | `sections/` |
