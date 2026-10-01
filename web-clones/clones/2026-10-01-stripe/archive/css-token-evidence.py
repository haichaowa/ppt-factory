#!/usr/bin/env python3
"""Extract selected design-token definitions from archived CSS sources."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parent
styles = ''.join(p.read_text(errors='ignore') for p in sorted((ROOT / 'styles').glob('*.css')))
interesting = re.compile(r'--hds-(?:color|font|space)-[A-Za-z0-9-]+')
all_defs = {}
for name, value in re.findall(r'(--[A-Za-z0-9-]+)\s*:\s*([^;{}]+)', styles):
    all_defs.setdefault(name, []).append(value.strip())
selected_names = sorted(n for n in all_defs if interesting.fullmatch(n))
selected = {n: {'definitions': list(dict.fromkeys(all_defs[n]))} for n in selected_names}
key = {
  '--hds-color-core-brand-600', '--hds-color-core-brand-700', '--hds-color-core-brand-800',
  '--hds-color-core-neutral-0', '--hds-color-core-neutral-50', '--hds-color-core-neutral-500',
  '--hds-color-core-neutral-700', '--hds-color-core-neutral-990', '--hds-color-core-neutralDark-50',
  '--hds-color-action-bg-solid', '--hds-color-action-bg-solidHover', '--hds-color-action-text-onSolid',
  '--hds-space-core-25', '--hds-space-core-50', '--hds-space-core-100', '--hds-space-core-150',
  '--hds-space-core-200', '--hds-space-core-300', '--hds-space-core-400', '--hds-space-core-600',
  '--hds-space-core-800', '--hds-space-core-1200', '--hds-space-core-1600',
  '--hds-space-core-radius-xs', '--hds-space-core-radius-sm', '--hds-space-core-radius-md',
  '--hds-space-core-radius-lg', '--hds-space-button-height',
  '--hds-font-heading-xl-size', '--hds-font-heading-xl-lineHeight', '--hds-font-heading-xl-letterSpacing', '--hds-font-heading-xl-weight',
  '--hds-font-heading-xxl-size', '--hds-font-heading-xxl-lineHeight', '--hds-font-heading-xxl-letterSpacing', '--hds-font-heading-xxl-weight',
  '--hds-font-family', '--hds-font-weight-normal', '--hds-font-weight-bold'
}
media_conditions = sorted(set(re.findall(r'@media([^{]+)\{', styles)))
keyframes = sorted(set(re.findall(r'@keyframes\s+([A-Za-z0-9_-]+)', styles)))
output = {
  'sourceFiles': [f'archive/styles/{p.name}' for p in sorted((ROOT / 'styles').glob('*.css'))],
  'sourceBytes': len(styles.encode()),
  'matchedTokenCount': len(selected_names),
  'keyTokens': {n:selected[n] for n in sorted(key & set(selected))},
  'allMatchedTokens': selected,
  'mediaConditions': media_conditions,
  'keyframes': keyframes,
  'notes': {
    'cssViewportOverride': 'The stylesheet defines typography/layout tokens at :root in media blocks; keyTokens preserves every matching declaration so responsive overrides remain visible.',
    'computedFallback': 'Live computed values remain canonical in computed-styles.json; this artifact gives direct CSS provenance.'
  }
}
(ROOT / 'css-token-evidence.json').write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'sourceBytes':output['sourceBytes'],'matchedTokenCount':len(selected_names),'keyTokenCount':len(output['keyTokens']),'mediaConditions':len(media_conditions),'keyframes':len(keyframes)}, indent=2))
