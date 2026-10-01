#!/usr/bin/env python3
import email, hashlib, json, mimetypes
from email import policy
from pathlib import Path
root = Path(__file__).resolve().parent
mhtml = root / 'claude-code.mhtml'
msg = email.message_from_bytes(mhtml.read_bytes(), policy=policy.default)
parts=[]
for i, part in enumerate(msg.walk()):
    if part.is_multipart(): continue
    payload=part.get_payload(decode=True) or b''
    location=part.get('Content-Location','')
    ctype=part.get_content_type()
    parts.append({
        'index': i,
        'contentLocation': location,
        'contentType': ctype,
        'transferEncoding': part.get('Content-Transfer-Encoding',''),
        'decodedBytes': len(payload),
        'sha256': hashlib.sha256(payload).hexdigest(),
    })
summary={}
for p in parts:
    ctype=p['contentType'].split(';')[0]
    summary[ctype]=summary.get(ctype,0)+1
out={
    'file':'claude-code.mhtml',
    'bytes':mhtml.stat().st_size,
    'sha256':hashlib.sha256(mhtml.read_bytes()).hexdigest(),
    'multipartCount':sum(1 for p in parts if p['contentType'].split(';')[0]=='multipart/mixed'),
    'resourcePartCount':len(parts),
    'contentTypeCounts':dict(sorted(summary.items())),
    'parts':parts,
}
(root/'mhtml-manifest.json').write_text(json.dumps(out,indent=2,ensure_ascii=False)+'\n')
print(json.dumps({k:v for k,v in out.items() if k!='parts'},indent=2))
