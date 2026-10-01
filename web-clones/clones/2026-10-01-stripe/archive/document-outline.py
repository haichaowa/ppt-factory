#!/usr/bin/env python3
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parent
data = json.loads((ROOT / 'computed-styles.json').read_text())
outline = [{
  'order': i, 'tag': h['tag'], 'text': h['text'], 'className': h['className'],
  'box': {k:h[k] for k in ('x','y','width','height')},
  'computed': {k:h['styles'][k] for k in ('font-size','font-weight','line-height','letter-spacing','color','font-family')}
} for i,h in enumerate(data['headings'])]
(ROOT / 'document-outline.json').write_text(json.dumps({'headingCount':len(outline),'headings':outline}, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({'headingCount':len(outline),'h1':sum(x['tag']=='H1' for x in outline),'h2':sum(x['tag']=='H2' for x in outline),'h3':sum(x['tag']=='H3' for x in outline),'h4':sum(x['tag']=='H4' for x in outline)}, indent=2))
