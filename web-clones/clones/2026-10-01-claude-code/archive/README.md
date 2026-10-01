# Archive inventory — Claude Code

- `claude-code.mhtml` — 主归档；CDP MHTML + 6 个补入 WOFF2 字体，离线可打开。
- `source.html`、`http-headers.txt` — 原始 HTML 与清洗后的 HTTP 响应头。
- `dom-snapshot.html` — 渲染后 DOM。
- `style-metrics-{1440,1280,375}.json` — 全页 computed style、频率统计和关键元素证据。
- `key-element-metrics.json` — 定价卡、产品 Shell、命令条、终端的定向层级与样式。
- `network-manifest.json` — 最终 1440 渲染请求清单。
- `font-manifest.json`、`resources/fonts/` — 6 个字体文件与来源、大小、SHA-256。
- `mhtml-manifest.json` — 39 个 MIME part 的 Content-Location、类型、字节数与 SHA-256。
- `mhtml-browser-check.json` — 本地 file URL 重开后的标题、H1、H2 数量、Shell 与字体检查。
- `offline-fidelity.json`、`live-firstscreen.png`、`offline-firstscreen.png`、`offline-fidelity-diff.png` — 首屏像素级离线保真验证。
- `section-capture-manifest.json` — 2× 区块截图几何与哈希。
- `capture.js`、`extract-element-metrics.js`、`supplement-mhtml-fonts.py`、`mhtml-manifest.py`、`validate-mhtml.js` — 可复现采集、补充字体、清单生成和离体验证脚本。
- `SHA256SUMS` — 32 个稳定 archive 文件的 SHA-256 校验；自校验文件 `verification.json` 与清单本身除外。
- `verification.json`、`verify.py` — 交付物、JSON、PNG 几何、MHTML、字体、robots、离线保真、checksum 与 BACKLOG 的自动复审记录。
