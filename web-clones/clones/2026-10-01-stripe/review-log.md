# Stripe archive review log

## Round 1 — archive integrity, provenance and offline validation

**Reviewed:** 2026-10-01 15:26–15:36（Asia/Shanghai）
**Scope:** MHTML completeness, live key-element evidence, CSS token provenance, semantic outline, local offline loading, reproducibility, checksums and documentation.

### Fixes

1. Added `archive/mhtml-manifest.py/.json`, inventorying all 35 MHTML parts with Content-Location, domain, MIME type, decoded bytes and payload SHA-256; the docs now use the measured 3 HTML / 10 CSS / 22 WebP split.
2. Added `archive/key-element-metrics.js/.json`, remeasuring 19 named elements. This corrected the Hero evidence to canvas x=337, 1392.59×761, desktop fallback 1392×975 at y=-107, logo marquee 6192×72, and both H1 copies.
3. Added `archive/offline-browser-check.js/.json/.png`; the MHTML loads from `file://` with HTTP(S) blocked, preserves the title, two H1 copies, 58 headings, 10 stylesheets, Hero/dark/footer markers, and made zero external requests.
4. Added `archive/css-token-evidence.py/.json`, tracing 640 color/font/space declarations directly to the 10 archived CSS files, including 39 key tokens, 44 unique media conditions and 10 keyframes.
5. Added `archive/document-outline.py/.json`, preserving the complete 58-heading semantic outline and measured typography/geometry.
6. Corrected `archive/capture.js` top-level section discovery and expanded its custom-property traversal to recurse through media/support rules, making the reproduction script match the round-1 evidence approach.
7. Added `archive/review-manifest.json`, `archive/verification.py/.json` and `archive/SHA256SUMS`; verification checks JSON validity, PNG geometry/signatures, 2x section dimensions, MHTML inventory, offline state, token evidence, outline, BACKLOG completion and 31 archive checksums.
8. Updated `meta.md`, `notes.md` and `tokens.json` with exact canvas/fallback geometry, CSS token scale, media/keyframe counts, MHTML decoded size and offline validation evidence.

**Result:** round-1 `archive/verification.json` reports `allPassed: true` (18/18). This round is committed separately.
