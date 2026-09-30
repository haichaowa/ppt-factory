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

## Round 2 — consistency and self-audit correction

**Reviewed:** 2026-10-01 04:31（Asia/Shanghai）  
**Scope:** round-1 audit result, checksum semantics, font-family fidelity, and archive size/token consistency.

### Fixes (all committed in this round)

1. `web-clones/clones/2026-10-01-linear/archive/verification.json` — regenerated after `review-log.md` existed; the required-deliverables check now genuinely passes and `allPassed` is true.
2. `web-clones/clones/2026-10-01-linear/archive/SHA256SUMS` — rebuilt the 13 stable artifact checksums and explicitly excluded `verification.json` because it audits the checksum set and cannot contain its own hash.
3. `web-clones/clones/2026-10-01-linear/archive/README.md` — corrected the checksum exception wording to include self-auditing `verification.json`, preventing a misleading coverage claim.
4. `web-clones/clones/2026-10-01-linear/tokens.json` — restored the computed sans stack’s `"system-ui"` fallback between BlinkMacSystemFont and Roboto, matching `archive/computed-styles.json` exactly.
5. `web-clones/clones/2026-10-01-linear/meta.md` — corrected the supplementary font size to the exact 901,148 bytes (about 0.86 MiB) and aligned the archive-directory size with the final on-disk allocation.
6. `web-clones/clones/2026-10-01-linear/review-log.md` — recorded the round-2 correction so the initially failed round-1 audit is not silently misrepresented.

**Result:** `archive/verification.json` now reports `allPassed: true`; 13 stable archive artifacts are checksummed.

## Round 3 — fidelity and provenance closeout

**Reviewed:** 2026-10-01 04:34（Asia/Shanghai）  
**Scope:** checksum validity, computed-style/token parity, robots fallback clarity, and final documentation accuracy.

### Fixes (all committed in this round)

1. `web-clones/clones/2026-10-01-linear/archive/verification.json` — added a per-file SHA-256 verification check for all 13 entries in `SHA256SUMS`, not merely a coverage count.
2. `web-clones/clones/2026-10-01-linear/archive/verification.json` — added a primary font-stack parity check that compares `tokens.json` directly with the 1440px computed `root html` font family.
3. `web-clones/clones/2026-10-01-linear/archive/verification.json` — added a documentation check requiring `meta.md` and `archive/README.md` to state the robots fallback and canonical PNG evidence.
4. `web-clones/clones/2026-10-01-linear/meta.md` — extended the capture window through the 04:25 robots-sanitization step so post-processing is not presented as outside the archive operation.
5. `web-clones/clones/2026-10-01-linear/archive/README.md` — clarified that `dom-snapshot.html` is preservation evidence rather than a standalone offline visual preview.
6. `web-clones/clones/2026-10-01-linear/notes.md` — explicitly designated the three full-page PNGs and six 2× section PNGs as canonical visual evidence after `/cdn-cgi/` image-byte removal.
7. `web-clones/clones/2026-10-01-linear/sections/README.md` — tied the doubled PNG dimensions to both the CSS geometry and capture DPR recorded in `section-capture-manifest.json`.

**Result:** `archive/verification.json` reports `allPassed: true`; all 13 stable artifact hashes match, and the measured sans stack matches computed style exactly.
