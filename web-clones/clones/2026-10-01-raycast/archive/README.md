# Archive inventory

- `raycast-home.mhtml` — Chromium-generated MHTML snapshot of the live homepage.
- `mhtml-capture.json` — MHTML capture time, method, byte size, SHA-256, HTTP status and title.
- `mhtml-manifest.json` / `mhtml-manifest.py` — decoded MIME-part inventory and reproducible generator.
- `dom-snapshot.html` — serialized live DOM after rendering and network settle.
- `computed-styles.json` — live DOM geometry, root section inventory, selected computed styles, CSS variables, computed-style frequencies and resource timings.
- `viewport-metrics.js` / `viewport-metrics.json` — remeasured 1440/1280/375 DOM geometry, visible root-section boxes and selected typography.
- `document-outline.py` / `document-outline.json` — semantic heading outline extracted from the serialized live DOM.
- `token-evidence.py` / `token-evidence.json` — cross-check of published colors, typography, spacing, radius, shadows, materials, motion and responsive values against raw evidence.
- `capture-manifest.json` — consolidated capture provenance, screenshot/section geometry, hashes, browser/tool versions and evidence counts.
- `robots.txt`, `live-response-headers.txt` — crawl allowance evidence and live HTTP response headers.
- `styles/` — 11 same-origin stylesheet sources fetched after rendering.
- `resources/` — 6 WOFF2 fonts actually used by the rendered homepage; Chromium's MHTML omitted font parts, so these are supplements for local fidelity and token research.
- `mhtml-browser-check.js` / `.json` / `.png` — offline file:// load test with all non-file network requests blocked; verifies title, H1, root children, and zero network failures.
- `measure-components.js` — refreshes the 14 correctly aligned component geometry/style records in `computed-styles.json`.
- `SHA256SUMS` — SHA-256 coverage for stable archive artifacts; excludes only this checksum file and the self-auditing `verification.json`.
- `verification.json` — round-level machine-readable audit.
- `capture.js`, `capture-mhtml.js`, `capture-sections.js` — capture scripts retained for reproducibility.
