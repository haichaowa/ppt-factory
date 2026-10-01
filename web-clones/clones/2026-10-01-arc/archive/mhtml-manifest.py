#!/usr/bin/env python3
import json
from collections import Counter
from email import policy
from email.parser import BytesParser
from pathlib import Path
from urllib.parse import urlparse
import hashlib
HERE=Path(__file__).resolve().parent
p=HERE/'arc-home.mhtml'
msg=BytesParser(policy=policy.default).parsebytes(p.read_bytes())
parts=[]
for part in msg.walk():
    loc=part.get('Content-Location')
    if not loc: continue
    body=part.get_payload(decode=True) or b''
    parts.append({'location':loc,'contentType':part.get_content_type(),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'domain':urlparse(loc).netloc or 'mhtml-embedded-cid'})
out={'file':'archive/arc-home.mhtml','bytes':p.stat().st_size,'parts':parts,'partCount':len(parts),'domains':dict(Counter(x['domain'] for x in parts)),'contentTypes':dict(Counter(x['contentType'] for x in parts))}
(HERE/'mhtml-manifest.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
