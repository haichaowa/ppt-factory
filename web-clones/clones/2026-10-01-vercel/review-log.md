# Vercel archive review log

## Round 1 — archival integrity

**Reviewed:** 2026-10-01 06:55（Asia/Shanghai）  
**Scope:** required deliverables, MHTML parseability, robots compliance, font completeness, PNG geometry, checksum coverage, and BACKLOG completion.

### Fixes (all committed in this round)

1. Added `archive/mhtml-manifest.json` with all 29 resource parts, decoded byte counts, SHA-256 values, Content-Location values, and transfer encodings.
2. Added `archive/capture-manifest.json` with exact Playwright/Chromium versions, capture method, screenshot geometry/hashes, viewport records, MHTML inventory, and font supplement totals.
3. Added `archive/mhtml-browser-check.json` by reopening the final MHTML in Chromium and asserting HTTP 200, the original document title, and the H1 text.
4. Added `archive/verification.json`, a machine-readable audit covering deliverables, JSON validity, MHTML structure and robots exclusions, PNG dimensions, section DPR, fonts, checksum entries, and BACKLOG completion.
5. Added `archive/SHA256SUMS` with 21 stable archive artifacts; excluded only the self-auditing verification document and the checksum file itself.
6. Expanded `archive/README.md` so each new manifest, browser check, and checksum file has a stated purpose and exact coverage exception.
7. Updated `meta.md` with exact Playwright/Chromium versions and the newly added audit inventory.
8. Expanded `tokens.json` evidence and capture-tool provenance so every token family traces back to the measured artifacts.

**Result:** `archive/verification.json` reports `allPassed: true`; this round is committed separately.
