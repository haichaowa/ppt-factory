# Linear archive review log

## Round 1 — archival integrity

**Reviewed:** 2026-10-01 04:28（Asia/Shanghai）  
**Scope:** required outputs, robots compliance, MHTML structure, PNG dimensions, JSON validity, checksum coverage.

### Fixes (all committed in this round)

1. `web-clones/clones/2026-10-01-linear/archive/verification.json` — added a 10-check automated audit covering required files, six JSON documents, sanitized MHTML inventory, disallowed-part absence, three full-page PNG dimensions, six 2× section dimensions, three computed-style viewports, three supplementary fonts, checksum coverage, and BACKLOG completion.
2. `web-clones/clones/2026-10-01-linear/archive/SHA256SUMS` — added SHA-256 checksums for 13 archival artifacts, excluding only the archive README and the checksum file itself.
3. `web-clones/clones/2026-10-01-linear/archive/README.md` — documented `verification.json` and the exact checksum coverage/exceptions instead of referencing an unexplained checksum file.
4. `web-clones/clones/2026-10-01-linear/meta.md` — added `verification.json` and `SHA256SUMS` to the archive inventory so the audit trail is discoverable.
5. `web-clones/clones/2026-10-01-linear/tokens.json` — expanded the evidence list with `font-manifest.json` and `robots-sanitization.json`, making font and archive-provenance claims traceable.
6. `web-clones/clones/2026-10-01-linear/review-log.md` — created the required three-round review record and separated baseline capture findings from review fixes.

**Result:** `archive/verification.json` reports `allPassed: true`; this round is committed separately.
