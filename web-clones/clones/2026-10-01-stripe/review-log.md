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

## Round 2 — responsive, accessibility and motion evidence

**Reviewed:** 2026-10-01 15:36–15:50（Asia/Shanghai）
**Scope:** three-viewport geometry, mobile typography/layout drift, color contrast, motion provenance, section manifest accuracy, and documentation parity.

### Fixes

1. Added `archive/viewport-metrics.js/.json`, remeasuring all three viewports with named-element geometry, top-level sections, heading styles and media state; 1440/1280/375 all report zero horizontal overflow.
2. Added live `archive/viewport-1280-firstscreen.png` and `archive/viewport-375-firstscreen.png`, providing first-screen corroboration beyond the canonical full-page PNGs.
3. Documented responsive behavior precisely: mobile H1 34/35.02/-0.34 vs desktop 48/55.2/-0.96; CTA 343×44 vs 141×48; Bento height 3379 with gap40 vs 2196 with gap64.
4. Added `archive/color-accessibility.py/.json`; all 8 measured pairs pass WCAG AA, with minimum 4.75:1 and four AAA-level pairs.
5. Added `archive/motion-evidence.py/.json`, joining 27 non-generic live transition families, 15 timing families, 10 CSS keyframes, 8 reduced-motion conditions and the three.js canvas evidence.
6. Corrected the responsive dark-section selector to select the final developer section instead of the first dark stats section, then refreshed the three-viewport measurements.
7. Corrected a misspelled `screenshots` field in the responsive reproduction script/manifest and fixed the Bento section README output height from 2880×2192 to 2880×4392.
8. Documented the 438px difference between the archived 1280 full-page PNG (15089px) and later live remeasure (14651px), attributing it to dynamic/lazy layout rather than silently mixing values.
9. Updated `meta.md`, `notes.md`, `tokens.json`, round-2 manifest, checksums and `archive/verification.json`.

**Result:** round-2 `archive/verification.json` reports `allPassed: true` (27/27). This round is committed separately.

## Round 3 — offline fidelity, rights provenance and final closeout

**Reviewed:** 2026-10-01 15:50–16:05（Asia/Shanghai）
**Scope:** live/MHTML pixel comparison, local visual fallback, third-party/resource rights, privacy scan, complete file inventory, checksum verification and final automation.

### Fixes

1. Added `archive/offline-fidelity.js/.json`, comparing 1,296,000 first-screen pixels. MHTML exact match is 7.258719% with MAE 27.476935; this quantifies rather than hides the missing three.js/WebGL state.
2. Added `archive/live-firstscreen.png` and `archive/offline-fidelity-diff.png`, making the live crop and every compared difference auditable.
3. Added `archive/offline-preview.html/.png` and `offline-preview-fidelity-diff.png`; the canonical-screenshot preview is pixel-exact (1,296,000/1,296,000, MAE 0).
4. Added `archive/rights-inventory.py/.json`, grouping all MHTML parts and supplemental fonts by origin/type and explicitly preserving third-party trademark rights.
5. Added `archive/security-scan.py/.json`; 70 files were scanned for Set-Cookie, Authorization/Bearer, OAuth token and Stripe secret-key patterns with zero findings, and only three allowed origins appear.
6. Added `archive/file-inventory.py/.json`, refreshing all deliverable paths, sizes, image geometry and SHA-256 values after round-3 edits.
7. Updated checksum verification to require every prior stable entry to exist and match before regeneration, excluding only the mutable audit driver and freshly rebuilt inventory, then rebuilt `archive/SHA256SUMS` for 55 stable archive artifacts.
8. Advanced `archive/verification.py/.json` to a 37-check final audit covering JSON, images, sections, MHTML, offline loading, CSS provenance, responsive data, contrast, motion, fidelity, rights, security, inventory, checksums and BACKLOG.
9. Corrected checksum path generation for nested `archive/styles/` and `archive/resources/` files, and changed missing checksum targets from silent skips into failures.
10. Expanded `meta.md`, `notes.md` and `tokens.json` with exact pixel metrics, rights/security results and final inventory/verification coverage.

**Result:** final `archive/verification.json` reports `allPassed: true` (37/37). This round is committed separately; no push was performed.
