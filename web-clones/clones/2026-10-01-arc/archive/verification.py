#!/usr/bin/env python3
import json,struct,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; A=ROOT/'archive'
checks=[]
def add(name,ok,detail): checks.append({'check':name,'passed':bool(ok),'detail':detail})
def png_size(p):
 with p.open('rb') as f: b=f.read(24)
 return struct.unpack('>II',b[16:24])
expected_full={1440:(1440,6125),1280:(1280,5805),375:(375,3601)}
for w,(ew,eh) in expected_full.items():
 p=ROOT/'screenshots'/f'arc-home-{w}-fullpage.png'; size=png_size(p); add(f'fullpage-{w}',size==(ew,eh) and p.stat().st_size>50000,f'{size}, {p.stat().st_size} bytes')
expected_sections=[('01-dia-transition-banner.png',1234),('02-arc-editorial-hero.png',1840),('03-browser-story-video.png',2160),('04-spaces-product-video.png',2082),('05-footer-cta.png',460)]
for n,h in expected_sections:
 p=ROOT/'sections'/n; size=png_size(p); add(f'section-2x-{n}',size==(2880,h),f'{size}')
for w in expected_full:
 d=json.loads((A/f'viewport-{w}-metrics.json').read_text()); add(f'viewport-{w}-metrics',d['response']['status']==200 and not d['document']['overflowX'],f"HTTP {d['response']['status']}, height {d['document']['scrollHeight']}, overflowX {d['document']['overflowX']}")
mhtml=A/'arc-home.mhtml'; mm=json.loads((A/'mhtml-manifest.json').read_text()); add('mhtml',mhtml.stat().st_size==4097083 and mm['partCount']==14,f"{mhtml.stat().st_size} bytes, {mm['partCount']} parts")
robots=(A/'robots.txt').read_text(); add('robots-allows-home','Disallow' not in robots and 'User-Agent: *' in robots,robots.strip().replace('\n',' | '))
off=json.loads((A/'offline-browser-check.json').read_text()); add('offline-mhtml',off['metrics']['title']=='Arc from The Browser Company' and len(off['externalRequests'])==0,f"title={off['metrics']['title']}, externalRequests={len(off['externalRequests'])}")
res=json.loads((A/'resource-download-manifest.json').read_text()); ok=len(res['files'])==20 and all(x['status']==200 and hashlib.sha256((A/'resources'/x['name']).read_bytes()).hexdigest()==x['sha256'] for x in res['files']); add('supplemented-resources',ok,f"{len(res['files'])} files, {sum(x['bytes'] for x in res['files'])} bytes")
ev=json.loads((A/'design-evidence.json').read_text()); add('design-evidence',len(ev['viewports'])==2 and all(v['textLeaves'] for v in ev['viewports']),f"textLeaves={[v['textLeaves'] for v in ev['viewports']]}, fontFaces={len(ev['viewports'][0]['fontFaces'])}")
sec=json.loads((A/'security-scan.json').read_text()); add('security',not sec['findings'],f"scanned {sec['filesScanned']}, findings {len(sec['findings'])}")
ca=json.loads((A/'color-accessibility.json').read_text()); add('color-accessibility',len(ca['pairs'])==8 and all(x['passesAA'] for x in ca['pairs'][2:5]),f"pairs={len(ca['pairs'])}, min={min(x['ratio'] for x in ca['pairs'])}")
tokens=json.loads((ROOT/'tokens.json').read_text()); add('tokens',tokens['color']['palette']['brandCobalt']=='#3139FB' and tokens['archive']['mhtmlResourceParts']==14,'palette and archive references resolved')
out={'passed':sum(x['passed'] for x in checks),'total':len(checks),'allPassed':all(x['passed'] for x in checks),'checks':checks}
(A/'verification.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
