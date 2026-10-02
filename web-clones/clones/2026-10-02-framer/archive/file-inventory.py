#!/usr/bin/env python3
import hashlib,json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
files=[]
for p in sorted(x for x in root.rglob('*') if x.is_file() and '__pycache__' not in x.parts and x.name not in {'SHA256SUMS'}):
 data=p.read_bytes(); rel=str(p.relative_to(root)); files.append({'file':rel,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
out={'count':len(files),'totalBytes':sum(x['bytes'] for x in files),'files':files}
(root/'archive/file-inventory.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'count':out['count'],'totalBytes':out['totalBytes']},indent=2))
