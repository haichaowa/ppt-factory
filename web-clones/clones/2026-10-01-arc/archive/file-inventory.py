#!/usr/bin/env python3
import json,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
files=[]
for p in sorted(x for x in ROOT.rglob('*') if x.is_file()):
    if p.name in {'file-inventory.json','SHA256SUMS'} and p.parent.name=='archive': continue
    files.append({'path':str(p.relative_to(ROOT)),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(ROOT/'archive/file-inventory.json').write_text(json.dumps({'root':str(ROOT),'fileCount':len(files),'totalBytes':sum(x['bytes'] for x in files),'files':files},ensure_ascii=False,indent=2)+'\n')
