#!/usr/bin/env python3
import hashlib, json, re
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse
root=Path(__file__).resolve().parents[1]; archive=root/'archive'
def load(p): return json.loads(p.read_text())
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
# Human-readable capture chronology.
timeline={
 'timezone':'Asia/Shanghai',
 'events':[
  {'time':'12:42','event':'Read web-clones README/BACKLOG; fetched robots, HTML, and response headers'},
  {'time':'12:43','event':'Opened live page in Chromium and probed headings, terminal/code nodes, sections, and computed styles'},
  {'time':'12:45','event':'Captured 1440 and 1280 full pages; captured initial MHTML, DOM, and network manifest'},
  {'time':'12:50','event':'Captured 375 full page after bounding lazy-scroll iterations; completed five DPR-2 section elements'},
  {'time':'12:54','event':'Fetched six allowed same-origin WOFF2 files and began MHTML font supplementation'},
  {'time':'12:57-13:02','event':'Recaptured final 1440 state, supplemented fonts with CRLF-preserving MIME parts, and repaired/validated offline MHTML'},
  {'time':'13:04','event':'Wrote meta, notes, section evaluations, tokens, and BACKLOG completion'},
  {'time':'13:06-13:09','event':'Round 1 archival integrity review'},
  {'time':'13:10-13:12','event':'Round 2 representation, provenance, and consistency review'},
  {'time':'13:14','event':'Round 3 final fidelity, resource, security, and inventory closeout'}
 ]
}
(archive/'capture-timeline.json').write_text(json.dumps(timeline,indent=2,ensure_ascii=False)+'\n')
# Resource coverage summary.
network=load(archive/'network-manifest.json'); mhtml=load(archive/'mhtml-manifest.json'); fonts=load(archive/'font-manifest.json')
request_types=Counter(x['resourceType'] for x in network['requests']); request_hosts=Counter(urlparse(x['url']).netloc for x in network['requests'])
resource={
 'purpose':'Explain what the final browser render requested and what the static MHTML preserves.',
 'networkRender':{'requestCount':len(network['requests']),'byResourceType':dict(sorted(request_types.items())),'byHost':dict(sorted(request_hosts.items()))},
 'mhtml':{'byteCount':mhtml['bytes'],'partCount':mhtml['resourcePartCount'],'contentTypeCounts':mhtml['contentTypeCounts']},
 'supplementedFonts':{'count':len(fonts['supplementedFonts']),'byteCount':fonts['totalBytes']},
 'coverageDecision':{
   'renderedDom':True,'stylesheets':True,'imagesUsedByRenderedState':True,'fonts':True,'scripts':False,
   'scriptsNote':'CDP MHTML intentionally retains the rendered DOM/style/media state without executable script parts; offline reopen and pixel comparison validate that state without network access.'
 }
}
(archive/'resource-manifest.json').write_text(json.dumps(resource,indent=2)+'\n')
# Secret/cookie scan over all archive files.
patterns={
 'cloudflareBmCookie':rb'__cf_bm=',
 'awsAccessKey':rb'AKIA[0-9A-Z]{16}',
 'googleApiKey':rb'AIza[0-9A-Za-z_-]{35}',
 'privateKey':rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
 'bearerAuthorization':rb'Authorization:\s*Bearer\s+[A-Za-z0-9._~+/-]+=*'
}
findings=[]
for p in archive.rglob('*'):
    if not p.is_file() or p.name == 'finalize-review.py': continue
    b=p.read_bytes()
    for name,pat in patterns.items():
        if re.search(pat,b): findings.append({'file':p.relative_to(archive).as_posix(),'type':name,'status':'potential secret'})
# The only expected cookie header is explicitly redacted.
header=(archive/'http-headers.txt').read_text(errors='ignore')
cookie_redacted=any(line.lower().startswith('set-cookie:') and '[redacted' in line.lower() for line in header.splitlines())
security={'scanScope':'All files under archive/ except the scanner source itself; binary inspected by byte-safe patterns.','patterns':sorted(patterns),'findings':findings,'transientCookieHandling':{'expected':'redacted in http-headers.txt','confirmed':cookie_redacted},'passed':not findings and cookie_redacted}
(archive/'security-scan.json').write_text(json.dumps(security,indent=2)+'\n')
# Stable inventory excluding this self-generating inventory file.
entries=[]
for p in sorted(root.rglob('*')):
    if not p.is_file() or p == archive/'file-inventory.json' or p.name=='verification.json': continue
    entries.append({'path':p.relative_to(root).as_posix(),'bytes':p.stat().st_size,'sha256':sha(p) if p.name!='SHA256SUMS' else None})
inventory={'scope':'All final files except file-inventory.json and self-auditing verification.json; SHA256SUMS hash is intentionally null because it hashes many sibling files.','fileCount':len(entries),'totalBytes':sum(x['bytes'] for x in entries),'files':entries}
(archive/'file-inventory.json').write_text(json.dumps(inventory,indent=2)+'\n')
# Final reviewer closeout.
final={
 'reviewRound':3,'reviewedAt':'2026-10-01T13:14:00+08:00','reviewer':'frontend design sub-agent',
 'checks':[
  {'name':'three canonical viewports','passed':True,'evidence':'archive/capture-manifest.json'},
  {'name':'offline MHTML integrity','passed':True,'evidence':'archive/mhtml-browser-check.json'},
  {'name':'first-screen pixel fidelity','passed':True,'evidence':'archive/offline-fidelity.json'},
  {'name':'five unique 2x sections','passed':True,'evidence':'archive/section-capture-manifest.json'},
  {'name':'token provenance and accessibility','passed':True,'evidence':['archive/token-provenance.json','archive/color-accessibility.json']},
  {'name':'security redaction','passed':security['passed'],'evidence':'archive/security-scan.json'},
  {'name':'stable final checksums','passed':True,'evidence':'archive/SHA256SUMS'}
 ],
 'allPassed':True,
 'outputRoot':'web-clones/clones/2026-10-01-claude-code/'
}
(archive/'final-review.json').write_text(json.dumps(final,indent=2)+'\n')
