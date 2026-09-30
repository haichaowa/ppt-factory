# Archive contents

- `linear-home-robots-sanitized.mhtml` — Chromium MHTML snapshot after robots review. It retains 115 decoded parts: 1 HTML document, 113 CSS parts, and 1 permitted PNG. Twenty-eight rendered image parts served from the disallowed `/cdn-cgi/` path were removed; see `robots-sanitization.json`.
- `mhtml-manifest.json` — content type, decoded byte size, location, and SHA-256 for every MHTML part.
- `computed-styles.json` — 39 focused element records at 1440, 1280, and 375, including boxes, fonts, colors, gradients, spacing, layout, shadows, transitions, animations, and aggregate style frequency.
- `capture-manifest.json` — full-page dimensions, canonical URL, and section CSS geometry.
- `section-capture-manifest.json` — section selectors/geometry and device pixel ratio for the 2× section PNGs.
- `dom-snapshot.html` — decoded HTML part from the rendered page, retained as the DOM half of the robots fallback.
- `robots-sanitization.json` — exact count/byte summary of the removed disallowed MHTML parts.
- `resource-performance.json` — resource timing evidence used to identify the font files not embedded by MHTML after browser caching.
- `resources/` — three WOFF2 files referenced by the archived CSS (`InterVariable`, italic, and Berkeley Mono variable), retained separately to preserve typography fidelity.
- `robots.txt` — capture-time robots policy.
- `SHA256SUMS` — checksums for archival artifacts.

The sanitized MHTML preserves the rendered DOM, CSS, and permitted assets. Because Linear serves most homepage raster assets from `/cdn-cgi/`, which robots.txt disallows, those image bytes were removed. The three full-page PNGs and six 2× section PNGs are therefore the canonical rendered-image evidence. The font files are supplementary because the live browser served them from cache during `Page.captureSnapshot`; keeping them beside the MHTML preserves the exact font assets without redistributing them beyond this local study archive.
