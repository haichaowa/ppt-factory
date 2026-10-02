#!/usr/bin/env python3
import base64, hashlib, json, pathlib, re
from email.parser import BytesParser
from email import policy

archive = pathlib.Path(__file__).resolve().parent
source = archive / 'framer-home.mhtml'
raw = source.read_bytes()
msg = BytesParser(policy=policy.default).parsebytes(raw)
parts=[]
for part in msg.walk():
    if part.get_content_maintype() == 'multipart':
        continue
    payload = part.get_payload(decode=True) or b''
    location = part.get('Content-Location', 'cid:inline')
    content_type = part.get_content_type()
    parts.append({
        'contentLocation': location,
        'contentType': content_type,
        'bytes': len(payload),
        'sha256': hashlib.sha256(payload).hexdigest(),
        'encoding': part.get('Content-Transfer-Encoding', ''),
    })
domains = sorted({re.match(r'https?://([^/]+)', p['contentLocation']).group(1) for p in parts if p['contentLocation'].startswith('http')})
output={
    'source': str(source.relative_to(archive.parent)),
    'bytes': len(raw),
    'sha256': hashlib.sha256(raw).hexdigest(),
    'partCount': len(parts),
    'contentTypes': sorted({p['contentType'] for p in parts}),
    'domains': domains,
    'parts': parts,
}
(archive/'mhtml-manifest.json').write_text(json.dumps(output, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({k: output[k] for k in ['bytes','partCount','contentTypes','domains']}, indent=2))
