#!/usr/bin/env python3
import hashlib, json, re, struct
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
A = ROOT/'archive'
def load(name): return json.loads((A/name).read_text())
def png_size(path):
 b=path.read_bytes(); return struct.unpack('>II', b[16:24])
checks=[]
def add(name, passed, details): checks.append({'name':name,'passed':bool(passed),'details':details})
for name in ['capture-manifest.json','computed-styles.json','mhtml-manifest.json','key-element-metrics.json','offline-browser-check.json','css-token-evidence.json','document-outline.json']:
 try: load(name); add(f'json_valid:{name}',True,{'bytes':(A/name).stat().st_size})
 except Exception as e: add(f'json_valid:{name}',False,str(e))
cm=load('capture-manifest.json')
add('viewport_png_geometry', all(s['png']['width']==s['requestedViewport'] and s['png']['height']>10000 for s in cm['screenshots']), [{s['requestedViewport']:s['png']} for s in cm['screenshots']])
add('section_png_2x', all(s['png']['width']==s['cssBox']['width']*2 and s['png']['height']==s['cssBox']['height']*2 for s in cm['sections']), {s['name']:s['png'] for s in cm['sections']})
for s in cm['screenshots']: add(f'png_signature:{s['file']}', (ROOT/s['file']).read_bytes()[:8]==b'\x89PNG\r\n\x1a\n', png_size(ROOT/s['file']))
mm=load('mhtml-manifest.json'); add('mhtml_inventory', mm['partCount']==35 and mm['domains'].get('stripe.com')==1 and mm['domains'].get('b.stripecdn.com')==13 and mm['domains'].get('images.stripeassets.com')==21, {'partCount':mm['partCount'],'domains':mm['domains']})
ob=load('offline-browser-check.json'); add('offline_browser', ob['loaded'] and ob['state']['title'].startswith('Stripe |') and len(ob['state']['h1'])>=2 and not ob['externalRequestsBlocked'], {'title':ob['state']['title'],'h1Copies':len(ob['state']['h1']),'headings':ob['state']['headings'],'blockedExternalRequests':len(ob['externalRequestsBlocked'])})
ct=load('css-token-evidence.json'); add('css_token_provenance', ct['matchedTokenCount']>500 and len(ct['keyTokens'])>=30, {'matchedTokenCount':ct['matchedTokenCount'],'keyTokenCount':len(ct['keyTokens']),'mediaConditions':len(ct['mediaConditions']),'keyframes':len(ct['keyframes'])})
outline=load('document-outline.json'); add('document_outline', outline['headingCount']==len(load('computed-styles.json')['headings']) and outline['headingCount']>=50, {'headingCount':outline['headingCount']})
backlog=(ROOT.parent.parent/'BACKLOG.md').read_text(); add('backlog_complete', '[x] stripe.com' in backlog and '2026-10-01-stripe' in backlog, None)
stable=[p for p in A.rglob('*') if p.is_file() and p.name not in {'verification.json','SHA256SUMS'}]
sums='\n'.join(f'{hashlib.sha256(p.read_bytes()).hexdigest()}  archive/{p.name}' for p in sorted(stable,key=lambda x:x.name))+'\n'
(A/'SHA256SUMS').write_text(sums)
add('checksums_generated', len(stable)>=25, {'files':len(stable),'bytes':len(sums.encode())})
output={'round':1,'allPassed':all(c['passed'] for c in checks),'passed':sum(c['passed'] for c in checks),'total':len(checks),'checks':checks}
(A/'verification.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(output,ensure_ascii=False,indent=2))
