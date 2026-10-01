# Raycast archive review log

## Round 1 — capture integrity and reproducibility

**Reviewed:** 2026-10-01 09:29（Asia/Shanghai）
**Scope:** required deliverables, MHTML parse/offline behavior, capture-script correctness, component metric alignment, robots evidence, JSON/PNG validity, and checksum coverage.

### Fixes

1. Corrected `archive/capture.js` MHTML serialization from a mistaken second Base64 decode to direct UTF-8 writing, matching the successful standalone MHTML capture.
2. Rebuilt the script's component-selector logic around visible root sections matched by stable module class/text instead of `nth-child`, eliminating an offset caused by non-render root nodes.
3. Refreshed `archive/computed-styles.json` with 14 correctly aligned component records (navbar through footer) via the new `archive/measure-components.js`.
4. Corrected the capture script's representative-section indices and replaced element screenshots with stable full-page clipping; the five committed 2x PNGs now match their recorded CSS boxes exactly.
5. Added `archive/mhtml-browser-check.js` / `.json` / `.png`; Chromium loaded the MHTML from `file://` with network requests blocked, retained the title and H1, rendered 14 root children, and reported zero network errors.
6. Added `archive/SHA256SUMS` for all stable archive artifacts and `archive/verification.json` for machine-readable checks covering JSON, PNG geometry, 2x sections, MHTML inventory, robots, BACKLOG completion, and checksums.
7. Corrected `capture-manifest.json` tool provenance (Node `v23.11.0`) and linked the offline browser check, refreshed component metrics, and all capture scripts.
8. Expanded `archive/README.md` and `meta.md` to document the browser check, checksum inventory, and evidence exceptions.

**Result:** `archive/verification.json` reports `allPassed: true`; this round is committed separately.

## Round 2 — responsive evidence and token traceability

**Reviewed:** 2026-10-01 09:35（Asia/Shanghai）
**Scope:** cross-viewport DOM behavior, semantic outline, token-to-raw-evidence parity, documentation accuracy, manifest freshness, and checksum coverage.

### Fixes

1. Added `archive/viewport-metrics.js` / `.json`, remeasuring visible root boxes, page heights, body styles and selected typography at 1440, 1280 and 375.
2. Added `archive/document-outline.py` / `.json`, preserving all 24 semantic headings and their module classes from the live DOM snapshot.
3. Added `archive/token-evidence.py` / `.json`, cross-checking colors, typography, spacing, radius, keyboard shadow, mask, easing, page heights, mobile H1 and heading outline against raw artifacts.
4. Corrected responsive documentation: mobile section headings are 18/28.8px, AI description is 15/22.5px, and the desktop `Download for Mac` anchor is hidden at 375.
5. Documented the 25px live-versus-screenshot mobile height drift (15672px remeasured vs 15647px archived screenshot) instead of treating the two values as interchangeable.
6. Added the three new evidence artifacts and scripts to `capture-manifest.json`, `archive/README.md`, and `tokens.json`.
7. Updated `archive/verification.json` to round 2 with viewport root counts, height tolerance, outline count, token-evidence pass state, JSON validity and rebuilt checksum coverage.

**Result:** round-2 verification reports `allPassed: true`; all published token families trace to raw measured evidence. This round is committed separately.
