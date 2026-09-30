# OpenAI 首页高保真归档

- **来源**：<https://openai.com/>（英文首页；请求 `/en/` 后站点规范化为根路径）
- **抓取时间**：2026-09-29 11:34–11:47（Asia/Shanghai）
- **抓取方式**：Playwright Chromium 有头会话通过 Cloudflare 后，用 Chrome DevTools Protocol `Page.captureSnapshot(format: mhtml)` 保存单文件 MHTML；另存渲染后 DOM 与计算样式探针。`wget`/无头请求被 Cloudflare 403 拦截，故采用动态渲染页“另存单文件（含资源）”方案。
- **robots 核对**：`robots.txt` 对 `User-agent: *` 为 `Allow: /`，仅 `/microsoft-for-startups/` 禁止；本次未抓取该路径。
- **归档内容**：`archive/openai-home.mhtml`（主归档）、`archive/dom.html`（可浏览静态 DOM 预览）、`archive/dom.raw.html`（原始 outerHTML）、`archive/dom-assets/`（本地 CSS/图片资源）、`archive/dom-preview-manifest.json`（预览资源映射）、`archive/computed-styles-probe.json`（真实计算样式）、`archive/selected-computed-styles.json`（代表性元素样式）、`archive/computed-styles-mobile.json`（375px 响应式计算样式）、`archive/robots.txt`、`archive/mhtml-manifest.json`（资源清单）与 `archive/verification.json`（自动核验）。
- **截图**：`screenshots/openai-home-1440-full.png`、`screenshots/openai-home-1280-full.png`、`screenshots/openai-home-375-full.png`。
- **归档体积**：约 25.2 MiB：archive 约 14.7 MiB、三档全页截图约 6.7 MiB、8 个区块截图与说明约 3.2 MiB。
- **版权口径**：原站文本、图像、视频、字体与品牌资产版权归 OpenAI；仅供本地设计学习与留存，不二次分发、不商用、不用于训练式复刻发布。

- **阶段6完成**：3 轮无头复核完成；8 个代表区块、令牌校正与 1440/375 页高对齐见 `archive/stage6-*.json` 与 `review-log.md`。
