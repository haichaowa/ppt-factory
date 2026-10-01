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

## Round 2 — representation, provenance, and consistency

**Reviewed:** 2026-10-01 13:10–13:12（Asia/Shanghai）
**Scope:** token-to-DOM traceability, responsive parity, contrast claims, documentation inventory, and machine-check consistency.

### Fixes (all committed in this round)

1. Replaced the ambiguous slash-separated capture time in `tokens.json` with explicit ISO 8601 start/end fields.
2. Added `archive/responsive-metrics.json` to compare document geometry and key element styles across all three required viewports.
3. Added `archive/token-provenance.json`, mapping 14 representative tokens to computed values, selectors/roles, properties, and source metrics.
4. Added `archive/color-accessibility.json` with seven WCAG relative-luminance calculations for text/background pairs.
5. Corrected the summary contrast values in `tokens.json` and documented exact ratios in `notes.md`, including the limited use case for `#87867F`.
6. Extended `archive/verify.py` to assert responsive evidence parity, token provenance, accessibility thresholds, and `tokens.json` audit parity.
7. Added the reproducible `archive/build-design-audits.py` generator for the three new design-audit records.
8. Updated archive and meta inventories so every downstream audit artifact has a stated purpose.

**Result:** round-2 `archive/verification.json` reports `allPassed: true`; all 36 checksummed archive hashes match.

## Round 3 — final fidelity, resource, security, and inventory closeout

**Reviewed:** 2026-10-01 13:14–13:16（Asia/Shanghai）
**Scope:** end-to-end provenance, live-to-MHTML resource coverage, privacy, final inventory, documentation accuracy, and final checksums.

### Fixes (all committed in this round)

1. Added `archive/capture-timeline.json` to make the capture, font supplementation, MHTML repair, and three review rounds chronologically auditable.
2. Added `archive/resource-manifest.json`, reconciling 89 live requests, 39 MHTML parts, and 6 supplemented fonts while documenting why executable scripts are absent from the static rendered-state snapshot.
3. Added `archive/security-scan.json` with byte-safe scans for cookies, cloud keys, API keys, bearer tokens, and private keys; confirmed the transient Cloudflare cookie remains redacted.
4. Added `archive/file-inventory.json` with final stable-file byte counts and hashes, plus explicit scope exclusions for self-auditing records.
5. Added `archive/final-review.json` and the reproducible `archive/finalize-review.py` closeout generator.
6. Extended round-3 `archive/verification.json` to assert resource provenance, security, inventory integrity, timeline completeness, and final review status.
7. Updated `meta.md` and `archive/README.md` with the final artifact inventory and approximately 14.5 MiB output size.
8. Rebuilt `archive/SHA256SUMS` for all 42 stable archive artifacts after the final evidence additions.

**Result:** final `archive/verification.json` reports `allPassed: true`; no secret patterns or unredacted transient cookies were found.
