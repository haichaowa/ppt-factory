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

## Round 3 — 2026-09-29 12:05

### Scores (before → after)

| Dimension | Before | After | Reason |
|---|---:|---:|---|
| Correctness | 4.9 | 5.0 | Checksum coverage now matches the archive README claim, including manifest and verification files. |
| Completeness | 4.9 | 5.0 | Top-level manifest and navigation close the review path from artifact to evidence. |
| Polish | 4.8 | 4.9 | Section captions now include exact pixel dimensions. |
| Usability | 4.9 | 5.0 | A first-time reviewer has a six-step reading order and fallback if MHTML reopening stalls. |

### P0/P1

- **P1-2 fixed**: after Round 2, `archive/README.md` claimed all archive artifacts were checksummed, but `mhtml-manifest.json` and `verification.json` had not yet been added to `SHA256SUMS`. Both are now covered.
- No P0 found; no remaining P1.

### P2 fixes (6)

1. Added top-level `README.md` with the intended six-step review order.
2. Added top-level `MANIFEST.json` listing 25 files and excluding the manifest itself with paths and byte sizes.
3. Included `mhtml-manifest.json` and `verification.json` in `archive/SHA256SUMS`.
4. Added exact pixel dimensions to every section caption.
5. Updated `meta.md` with the measured archive size after Round 2 additions.
6. Rewrote `web-clones/PROGRESS.md` to remove the stale “next: openai” entry and point to `claude.com/product/claude-code`.

### Post-fix verification

- Required files: 14/14 present.
- Token JSON valid.
- MHTML valid multipart with 58 unique resources.
- Full-page PNG dimensions all match.
- Five section screenshots present.
- Top-level manifest present.
- No P0/P1 remains.

## Honest final assessment

The batch is directly usable as a local design-research asset: the rendered page, three responsive full-page captures, five section captures, DOM, root variables, desktop/mobile computed styles, structured tokens, checksums, and machine verification are all present.

What is still not guaranteed:

1. Local MHTML reopening timed out once in Playwright after this capture, although its 58-resource structure parses cleanly; treat the MHTML as preservation evidence and use the PNG/DOM path for fast review.
2. MHTML does not guarantee autoplay video bytes; visible-state video/poster fidelity is preserved primarily by the PNG captures.
3. `OpenAI Sans` is identified but not redistributed; exact typography requires OpenAI’s own licensed font.
4. Optional `remake/` was intentionally skipped to spend the remaining quality budget on archive verification rather than adding an approximate imitation.

For PPT use, the black/white token system and grid/card logic are ready for human theme extraction; this batch does not modify `templates/`, `patterns/`, or `decks/`.

## Post-review usability fix — 2026-09-30 07:37

User-reported issue: opening `archive/dom.html` directly rendered incorrectly. Root causes were confirmed in the raw `outerHTML` snapshot: it lacked `<!doctype html>`, root-relative CSS resolved to nonexistent `file://` paths, hydration scripts were unsafe under `file://`, and lazy media depended on runtime observers.

Fixes:

1. Preserved the untouched capture as `archive/dom.raw.html`.
2. Rebuilt `archive/dom.html` as a static preview in standards mode.
3. Extracted 42 CSS files and 13 MHTML images to `archive/dom-assets/`.
4. Fetched the 6 additional image paths referenced only after the original full-page lazy-load pass and mapped every srcset variant locally.
5. Removed 108 runtime/hydration scripts and converted lazy images to eager loading.
6. Added `dom-preview-manifest.json`, refreshed manifests/checksums/verification, and updated documentation.

Chromium verification at 1440px: `CSS1Compat`, 44 stylesheets, 20/20 images loaded, no incomplete images, and key homepage sections present. No P0/P1 remains.
