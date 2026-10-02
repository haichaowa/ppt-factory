#!/usr/bin/env python3
import json,pathlib,re
root=pathlib.Path(__file__).resolve().parents[1]
patterns={
 'setCookie':re.compile(r'(?:^|[^A-Za-z])(?:set-cookie|Set-Cookie)\s*[:=]',re.I),
 'authorizationBearer':re.compile(r'(?:Authorization|Authorization:)\s*[:=]\s*(?:Bearer|Basic)\s+[A-Za-z0-9._~+/=-]+',re.I),
 'oauthToken':re.compile(r'(?:access_token|refresh_token|client_secret|api[_-]?key|apikey)\s*[:=]\s*["\'][A-Za-z0-9._~+/=-]{16,}["\']',re.I),
 'privateKey':re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----'),
 'awsKey':re.compile(r'AKIA[0-9A-Z]{16}'),
 'openAIKey':re.compile(r'sk-(?:proj-)?[A-Za-z0-9_-]{20,}'),
 'credentialQuery':re.compile(r'[?&](?:access_token|refresh_token|client_secret|api[_-]?key|apikey|sig|signature)=([^&\s"\']{12,})',re.I),
}
skip=set()
files=[]
for p in sorted(root.rglob('*')):
 if not p.is_file() or '__pycache__' in p.parts: continue
 rel=str(p.relative_to(root))
 if rel in skip or rel.startswith('archive/resources/'): continue
 if p.suffix.lower() in {'.png','.mp4'}: continue
 try: text=p.read_text(encoding='utf-8')
 except UnicodeDecodeError: continue
 hits=[]
 for name,rx in patterns.items():
  if rx.search(text): hits.append(name)
 if hits: files.append({'file':rel,'findings':hits})
output={'scope':'All Framer deliverable text/JSON/JS/MD/HTML files except binaries and downloaded media; includes raw MHTML/DOM and resource URL manifests.','patternCount':len(patterns),'findings':files,'findingCount':sum(len(x['findings']) for x in files)}
(root/'archive/security-scan.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(output,ensure_ascii=False,indent=2))
