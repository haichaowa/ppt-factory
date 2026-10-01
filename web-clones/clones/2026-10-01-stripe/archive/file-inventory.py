#!/usr/bin/env python3
"""Inventory all deliverables with bytes, type and stable SHA-256."""
import hashlib,json,struct
from pathlib import Path
TARGET=Path(__file__).resolve().parents[1]
def png(path):
 try:
  b=path.read_bytes();
  if b[:8]==b'\x89PNG\r\n\x1a\n': return {'type':'PNG','width':struct.unpack('>I',b[16:20])[0],'height':struct.unpack('>I',b[20:24])[0]}
 except: pass
 return {'type':'file'}
items=[]
for p in sorted(TARGET.rglob('*')):
 if not p.is_file() or p.name=='file-inventory.json': continue
 rel=str(p.relative_to(TARGET)); data=p.read_bytes()
 items.append({'path':rel,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),**png(p)})
out={'root':str(TARGET),'fileCount':len(items),'totalBytes':sum(x['bytes'] for x in items),'largestFiles':sorted(items,key=lambda x:x['bytes'],reverse=True)[:12],'files':items}
(TARGET/'archive/file-inventory.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'fileCount':out['fileCount'],'totalBytes':out['totalBytes'],'largest':[{'path':x['path'],'bytes':x['bytes']} for x in out['largestFiles']]},indent=2))
