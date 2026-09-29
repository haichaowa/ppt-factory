# Archive contents

- `openai-home.mhtml` — primary high-fidelity capture. Open directly in Chromium/Chrome; MHTML bundles the rendered HTML with resources captured by the browser.
- `dom.html` — rendered DOM after the campaign banner was dismissed.
- `computed-styles-probe.json` — broad 1440px computed-style sample, including root CSS variables.
- `computed-styles-mobile.json` — broad 375px computed-style sample.
- `selected-computed-styles.json` — focused style records for navigation, prompt, media grids, cards, and section headers.
- `robots.txt` — capture-time robots policy.
- `mhtml-manifest.json` — machine-readable MHTML resource inventory with content type, byte count, and per-resource SHA-256.
- `verification.json` — automated checks for required files, token JSON validity, MHTML structure, checksums, and screenshot dimensions.
- `SHA256SUMS` — checksums for every archival artifact except the README files and the checksum file itself.

**Known fidelity note:** this MHTML contains 1 HTML part, 44 CSS parts, and 13 WebP image/poster parts (58 unique resources total). Browser autoplay video bytes are not guaranteed inside MHTML; the three full-page PNG screenshots preserve the rendered state used for analysis.

The original site was captured in English. The first browser locale resolution landed on `zh-Hans-CN`; the archived English page was subsequently loaded through `/en/`, which OpenAI canonicalized to `https://openai.com/`.
