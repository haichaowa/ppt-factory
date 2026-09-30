# Vercel archive evidence

- `vercel-home.mhtml` — Chrome DevTools Protocol MHTML capture, manually supplemented with the 12 allowed WOFF2 resources referenced by the page CSS/preloads. Chromium re-open test: title parsed as `Agentic Infrastructure - Vercel`.
- `dom-snapshot.html` — rendered DOM at the 1440px capture stage.
- `style-metrics.json` — root variables, computed element styles, frequencies, transitions, animations, and selected CSS rules.
- `key-element-metrics.json` — focused 1440px and 375px element measurements.
- `robots.txt` — robots state at capture time.
- `mhtml-manifest.json` — every MHTML resource part with decoded byte count, SHA-256, Content-Location, and transfer encoding.
- `capture-manifest.json` — browser/capture parameters, PNG geometry and hashes, MHTML inventory, and the exact Chromium reopen check.
- `mhtml-browser-check.json` — saved result of reopening the final MHTML in Chromium.
- `SHA256SUMS` — SHA-256 coverage for stable archive artifacts; it excludes only `verification.json` (which audits the hashes) and the checksum file itself.
- `font-manifest.json` and `resources/` — byte counts, URLs, and SHA-256 hashes for supplementary fonts.

The canonical visual record is the DPR-1 full-page PNG set and the DPR-2 section PNG set. `verification.json` is the machine-readable post-capture audit; it is intentionally outside `SHA256SUMS` so it can verify those hashes without containing its own.
