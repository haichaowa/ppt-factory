#!/usr/bin/env python3
import json,re
from pathlib import Path
HERE=Path(__file__).resolve().parent
patterns={'setCookie':rb'(?:set-cookie:|document\.cookie\s*=)','authorizationHeader':rb'(?:authorization:|bearer\s+[a-z0-9._-]{15,})','oauthToken':rb'(?:oauth|access_token|refresh_token)','privateKey':rb'-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----','awsKey':rb'AKIA[0-9A-Z]{16}','openAIKey':rb'sk-[A-Za-z0-9_-]{20,}'}
findings=[]
for p in HERE.rglob('*'):
    if not p.is_file() or p.resolve()==Path(__file__).resolve() or p.suffix.lower() in {'.py','.json'}: continue
    try: data=p.read_bytes()
    except OSError: continue
    for name,pat in patterns.items():
        if re.search(pat,data,re.I): findings.append({'file':str(p.relative_to(HERE)),'pattern':name})
text_blobs=[]
for p in HERE.rglob('*'):
    if p.is_file() and p.suffix.lower() in {'.html','.json','.txt','.css'}: text_blobs.append(p.read_bytes())
urls=sorted(set(re.findall(rb'https?://([A-Za-z0-9.-]+)',b''.join(text_blobs))))
scanned=[]
for p in HERE.rglob('*'):
    if p.is_file() and p.resolve()!=Path(__file__).resolve() and p.suffix.lower() not in {'.py','.json'}: scanned.append(p)
out={'scope':'archive/** excluding scanner source and generated JSON','filesScanned':len(scanned),'patterns':list(patterns),'findings':findings,'externalHostnames':[u.decode() for u in urls]}
(HERE/'security-scan.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
