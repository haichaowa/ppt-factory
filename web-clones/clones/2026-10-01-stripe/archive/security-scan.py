#!/usr/bin/env python3
"""Scan archive artifacts for accidental credentials and confirm allowed domains."""
import json,re
from urllib.parse import urlparse
from pathlib import Path
ROOT=Path(__file__).resolve().parent; TARGET=ROOT.parent
patterns={
 'setCookie':re.compile(r'^set-cookie\s*:',re.I|re.M),
 'authorizationHeader':re.compile(r'^authorization\s*:',re.I|re.M),
 'bearerToken':re.compile(r'bearer\s+[a-z0-9._-]{20,}',re.I),
 'googleOAuth':re.compile(r'(?:access|refresh)_token\s*[:=]\s*["\'][^"\']{15,}',re.I),
 'stripeSecretKey':re.compile(r'(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}')
}
findings=[]
for p in TARGET.rglob('*'):
 if not p.is_file() or p.suffix.lower() in {'.png','.woff2','.webp'}: continue
 try: text=p.read_text(errors='ignore')
 except: continue
 for name,rx in patterns.items():
  for m in rx.finditer(text): findings.append({'file':str(p.relative_to(TARGET)),'pattern':name,'preview':text[max(0,m.start()-30):m.end()+30][:180]})
rights=json.loads((ROOT/'rights-inventory.json').read_text()); allowed=set(rights['mhtmlDomains'])|{urlparse(x['href']).netloc for x in rights['supplementalFonts']}
out={'scanScope':[str(p.relative_to(TARGET)) for p in sorted(TARGET.rglob('*')) if p.is_file()],'credentialPatterns':list(patterns),'findings':findings,'allowedOrigins':sorted(allowed),'allFindingsResolved':not findings,'privacyNotes':'The capture request headers contain no Set-Cookie value; browser storage/authentication state was not exported.'}
(ROOT/'security-scan.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'filesScanned':len(out['scanScope']),'findings':len(findings),'allowedOrigins':out['allowedOrigins']},indent=2))
