# Review log · OpenAI homepage archive

## Round 1 — 2026-09-29 11:50

### Scores (before → after)

| Dimension | Before | After | Reason |
|---|---:|---:|---|
| Correctness | 4.2 | 4.7 | Removed invalid `$schema` usage; checksums now cover all archive artifacts. |
| Completeness | 4.5 | 4.8 | Added mobile computed styles to metadata and explicit artifact inventories. |
| Polish | 4.0 | 4.6 | Fixed section filename/caption mismatch and documented exact screenshot dimensions. |
| Usability | 3.9 | 4.6 | A reviewer can now understand how to open the MHTML and navigate evidence without guessing. |

### P0/P1

- **P1-1 fixed**: `tokens.json` incorrectly declared itself as a JSON Schema document via `$schema`. Removed; it is a token data document.
- No P0 found.

### P2 fixes (6)

1. Renamed `sections/03-recent-news-rail.png` to `sections/03-recent-news-grid.png` to match the actual two-column grid.
2. Updated `sections/README.md` to reference the corrected filename.
3. Added `archive/README.md` explaining the MHTML, DOM, style probes, and locale capture detail.
4. Added `screenshots/README.md` with viewport and full-page dimensions.
5. Rebuilt `archive/SHA256SUMS` to cover MHTML, DOM, both computed-style probes, selected styles, and robots.txt—not only two files.
6. Corrected `meta.md` capture window to include the later 375px style capture.

### Post-fix verification

- Required paths present: archive / screenshots / sections / notes / tokens / meta.
- `python3 -m json.tool tokens.json` passes.
- PNG dimensions match the documented 1440, 1280, and 375 outputs.
- No P0/P1 remains.

## Round 2 — 2026-09-29 11:58

### Scores (before → after)

| Dimension | Before | After | Reason |
|---|---:|---:|---|
| Correctness | 4.7 | 4.9 | Added machine-readable MHTML structure validation and automated artifact verification. |
| Completeness | 4.8 | 4.9 | Documented that MHTML preserves HTML/CSS/images but not guaranteed autoplay video bytes. |
| Polish | 4.6 | 4.8 | Resource inventory, provenance, and review state are now explicit. |
| Usability | 4.6 | 4.9 | Reviewer can audit completeness without opening every binary manually. |

### P0/P1

- None found.

### P2 fixes (6)

1. Added `archive/mhtml-manifest.json` with all 58 unique resource locations, content types, byte counts, and hashes.
2. Added `archive/verification.json` to automate required-file, JSON, MHTML, checksum, and PNG dimension checks.
3. Documented the MHTML fidelity boundary: 1 HTML + 44 CSS + 13 WebP parts; autoplay video bytes are not guaranteed.
4. Added screenshot provenance: campaign banner dismissed and lazy content scrolled before capture.
5. Updated `meta.md` to reference the manifest and verification report.
6. Updated `web-clones/PROGRESS.md` with the complete OpenAI batch state and review entry point.

### Post-fix verification

- `overallPass: true`.
- Required files: all present.
- Token JSON valid; all archive checksums match.
- Screenshot dimensions match 1440×6624, 1280×6457, and 375×8695.
- No P0/P1 remains.
