#!/usr/bin/env python3
import hashlib,json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
items=[
 ('hero-design-agent.mp4','https://framerusercontent.com/assets/2zyGmnAWVTTdkv4LY1mFKgEdhg.mp4','Hero product walkthrough','video/mp4'),
 ('community-loop-a.mp4','https://framerusercontent.com/assets/IxrpbsCJLku5W91FcYn0gQuQY.mp4','Community feed repeating card','video/mp4'),
 ('community-loop-b.mp4','https://framerusercontent.com/assets/d5okMiktMgbhCcGtgbr8gGqqHU.mp4','Community feed repeating card','video/mp4'),
 ('community-loop-c.mp4','https://framerusercontent.com/assets/EGqLxawrgBiyYfcyRAdEFPRAMWo.mp4','Community feed repeating card','video/mp4'),
]
out={'purpose':'Supplement MHTML because Chromium did not embed media bytes for the muted looping videos.','resources':[]}
for local,source,role,mime in items:
 p=root/'archive/resources'/local; data=p.read_bytes()
 out['resources'].append({'local':str(p.relative_to(root)),'source':source,'role':role,'mimeType':mime,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
out['totalBytes']=sum(x['bytes'] for x in out['resources'])
(root/'archive/resource-download-manifest.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'count':len(items),'totalBytes':out['totalBytes']},indent=2))
