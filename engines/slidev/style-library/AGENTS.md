# AI Agent Instructions

## Context

This directory is the Slidev engine's local style library, built from the official Slidev v53 Theme Gallery and Showcases. It is intended for style imitation and new deck generation.

## Required workflow

1. When the user provides a presentation outline, read `AI-USAGE.md` and `STYLE-SEEDS.md` before creating a new deck.
2. Choose one style seed explicitly; do not mix incompatible visual systems without a reason.
3. Read the selected style seed's source files and inspect its preview images when visual style matters.
4. Treat `catalog/slidev-official-catalog.json` as the machine-readable index.
5. Scaffold production decks in the parent engine with `npm run new -- <deck-name> [template]`, then customize the generated deck under `../decks/<deck-name>/`.
6. Prefer Slidev's official Skill and MCP tools for structured slide operations.
7. Keep deck source files under the deck directory: `slides.md`, `style.css`, `components/`, `styles/`, `public/`, and `package.json` where applicable. Do not edit `dist/` by hand.
8. Verify every generated deck in a browser. At minimum inspect cover, table of contents, section divider, densest content slide, and ending slide.
9. Use `slidev build` and `slidev export` as reproducible output commands.

## Style rules

- Learn layout systems, typography hierarchy, spacing, color, chart language, and rhythm.
- Do not copy third-party images, logos, fonts, brand assets, or substantial content.
- Replace screenshots and photos with user-owned or properly licensed assets.
- Keep one core idea per slide; move speech content to presenter notes.
- Preserve 16:9 unless the user explicitly requests another aspect ratio.
- Prefer reusable layouts/components/global styles over repeated inline markup.

## Useful commands

```bash
npx slidev slides.md --port 3030 --open
npx slidev format slides.md
npx slidev build slides.md
npx slidev export slides.md --format pdf
npx slidev export slides.md --format pptx
```
