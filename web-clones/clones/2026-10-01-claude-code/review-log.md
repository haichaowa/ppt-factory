# Claude Code archive review log

## Round 1 — archival integrity

**Reviewed:** 2026-10-01 13:06–13:09（Asia/Shanghai）
**Scope:** required deliverables, MIME structure, browser reopen, font integrity, PNG geometry, section uniqueness, checksums, and BACKLOG completion.

### Fixes (all committed in this round)

1. Corrected `archive/section-capture-manifest.json` from post-scroll viewport coordinates to document coordinates, and documented that width/height remain CSS pixels captured at DPR 2.
2. Replaced rounded Playwright size estimates with actual PNG physical dimensions for all five section captures.
3. Added SHA-256 hashes, exact byte counts, and a deterministic heading-to-section capture method to each section record.
4. Added screenshot SHA-256 values and clarified request-manifest provenance in `archive/capture-manifest.json`.
5. Added `archive/SHA256SUMS` covering 32 stable archive files and excluding only the checksum file and self-auditing verification record.
6. Added `archive/verify.py` and `archive/verification.json`, covering 11 structural and fidelity assertions.
7. Strengthened `archive/mhtml-browser-check.json` with browser/Playwright versions, MHTML hash, offline network policy, and part count.
8. Added a root `manifest.json` that maps every required deliverable to its canonical file and evidence source.
9. Expanded archive/meta documentation to explain the new checksum, verification, and root manifest artifacts.

**Result:** `archive/verification.json` reports `allPassed: true`; all 32 checksummed archive hashes match.
