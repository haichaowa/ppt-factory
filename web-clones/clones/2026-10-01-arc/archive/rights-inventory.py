#!/usr/bin/env python3
import json
from pathlib import Path
HERE=Path(__file__).resolve().parent
m=json.loads((HERE/'mhtml-manifest.json').read_text()); r=json.loads((HERE/'resource-download-manifest.json').read_text())
out={'source':'https://arc.net/','rightsHolder':'The Browser Company / respective font, media, quote and trademark rights holders','localStudyOnly':True,'redistribute':False,'commercialUse':False,'trainingUse':False,'mhtmlResourceDomains':m['domains'],'supplementedResourceDomains':sorted({x['url'].split('/')[2] for x in r['files']}),'notes':['Third-party publication quotations and logos retain their original rights.','Captured WOFF2 fonts are retained as rendering evidence only; do not reuse in products or decks.','Videos and product UI are retained for local design research only.']}
(HERE/'rights-inventory.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
