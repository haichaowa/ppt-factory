# Archive contents

- `openai-home.mhtml` — primary high-fidelity capture. Open directly in Chromium/Chrome; MHTML bundles the rendered HTML with resources captured by the browser.
- `dom.html` — browsable static preview rebuilt from the rendered DOM after the campaign banner was dismissed. It includes DOCTYPE, local MHTML CSS/image assets, absolute navigation links, eager image loading, and no runtime scripts.
- `dom.raw.html` — untouched `document.documentElement.outerHTML` capture. It intentionally has no DOCTYPE/resource rewriting and is preservation evidence, not the recommended preview.
- `dom-assets/` — 61 local preview resources: 42 CSS files extracted from MHTML plus 19 WebP images (13 from MHTML and 6 fetched from the DOM’s original Contentful URLs).
- `dom-preview-manifest.json` — source-to-local mapping and byte inventory for the browsable DOM preview.
- `computed-styles-probe.json` — broad 1440px computed-style sample, including root CSS variables.
- `computed-styles-mobile.json` — broad 375px computed-style sample.
- `selected-computed-styles.json` — focused style records for navigation, prompt, media grids, cards, and section headers.
- `robots.txt` — capture-time robots policy.
- `mhtml-manifest.json` — machine-readable MHTML resource inventory with content type, byte count, and per-resource SHA-256.
- `verification.json` — automated checks for required files, token JSON validity, MHTML structure, checksums, and screenshot dimensions.
- `SHA256SUMS` — checksums for every archival artifact except the README files and the checksum file itself.

**Known fidelity note:** this MHTML contains 1 HTML part, 44 CSS parts, and 13 WebP image/poster parts (58 unique resources total). Browser autoplay video bytes are not guaranteed inside MHTML. `dom.html` preserves the static visible state with local CSS/images, while the three full-page PNG screenshots remain the canonical rendered-state evidence.

The original site was captured in English. The first browser locale resolution landed on `zh-Hans-CN`; the archived English page was subsequently loaded through `/en/`, which OpenAI canonicalized to `https://openai.com/`.
