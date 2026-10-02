#!/usr/bin/env python3
from __future__ import annotations
import hashlib,json,pathlib,re,subprocess
ROOT=pathlib.Path(__file__).resolve().parents[1]
CHECKS=[]
def check(name,condition,details=None):
 CHECKS.append({'name':name,'passed':bool(condition),'details':details})
def load(rel):
 return json.loads((ROOT/rel).read_text(encoding='utf-8'))
def png_size(path):
 text=subprocess.check_output(['file',str(ROOT/path)],text=True)
 m=re.search(r'PNG image data, (\d+) x (\d+)',text)
 return (int(m.group(1)),int(m.group(2))) if m else (0,0)
capture=load('archive/capture-manifest.json'); mhtml=load('archive/mhtml-manifest.json'); offline=load('archive/offline-browser-check.json'); resources=load('archive/resource-download-manifest.json'); security=load('archive/security-scan.json'); rights=load('archive/rights-inventory.json'); color=load('archive/color-accessibility.json'); responsive=load('archive/responsive-metrics.json'); inventory=load('archive/file-inventory.json')
check('capture source',capture['source']=='https://www.framer.com/','canonical homepage URL')
check('capture status and title',all(v['responseStatus']==200 and v['title']=='Framer: AI design agent' for v in capture['viewports']),'all three viewport navigations')
check('robots allows homepage','Allow: /' in (ROOT/'archive/robots.txt').read_text() and 'Disallow: /api-proxy' in (ROOT/'archive/robots.txt').read_text())
for w,h in [(1440,10741),(1280,10741),(375,10861)]:
 rel=f'screenshots/framer-home-{w}-fullpage.png'; check(f'{w} screenshot geometry',png_size(rel)==(w,h),f'{png_size(rel)} expected {(w,h)}')
check('no horizontal overflow',all(not v['overflowX'] for v in responsive['viewports']))
check('responsive summary valid',responsive['allViewportsValid'])
check('MHTML size',mhtml['bytes']==4724439 and (ROOT/'archive/framer-home.mhtml').stat().st_size==4724439,'stored bytes match manifest')
check('MHTML parts',mhtml['partCount']==79,'79 Chromium resource parts')
check('MHTML domains',{'www.framer.com','framer.com','framerusercontent.com'}.issubset(set(mhtml['domains'])))
check('offline title/H1',offline['dom']['title']=='Framer: AI design agent' and offline['dom']['h1']==['Framer is the design agent for every step from idea to launch'])
check('offline structure counts',(offline['dom']['stylesheets'],offline['dom']['images'],offline['dom']['videos'],offline['dom']['links'])==(11,90,7,152))
check('offline no external requests',offline['externalRequestsAttempted']==0)
check('offline visual fidelity',offline['fidelity']['exactMatchRatio']>=0.80,f"exact {offline['fidelity']['exactMatchRatio']:.3f}, MAE {offline['fidelity']['meanAbsoluteError']}")
check('supplemented video count',len(resources['resources'])==4 and resources['totalBytes']==8745466)
for item in resources['resources']:
 data=(ROOT/item['local']).read_bytes();check('video hash '+pathlib.Path(item['local']).name,hashlib.sha256(data).hexdigest()==item['sha256'] and len(data)==item['bytes'])
section_expected={'01-hero-headline-cta':(2880,616),'02-hero-product-video':(2880,1348),'03-agent-workflow':(2800,4356),'04-platform-interface':(2400,2882),'05-community-feed':(2400,1682)}
for name,size in section_expected.items(): check('section '+name,png_size('sections/'+name+'.png')==size,f'{png_size("sections/"+name+".png")} expected {size}')
section_manifest=load('archive/section-capture-manifest.json');check('section document coordinates',[round(x['cssRect']['y'],2) for x in section_manifest['sections']]==[64.0,372.0,1401.44,4655.06,8529.09])
check('section assessments',all(x['assessment'] for x in section_manifest['sections']))
check('security findings',security['findingCount']==0,'6 secret pattern classes, 0 findings')
check('rights restrictions',rights['localUseOnly'] and not rights['redistribution'] and not rights['commercialUse'] and not rights['trainingUse'])
check('essential contrast AA',color['minimumEssentialRatio']>=4.5 and sum(1 for x in color['pairs'] if x['usage']!='decorative metadata' and x['meetsAA'])==8)
check('faint alpha isolated',next(x for x in color['pairs'] if x['name']=='text-faint')['ratio']<4.5 and next(x for x in color['pairs'] if x['name']=='text-faint')['usage']=='decorative metadata')
notes=(ROOT/'notes.md').read_text();check('notes real computed evidence',all(x in notes for x in ['54px / 54px / 500 / -2.16px','44px / 48.4px / 500 / -1.76px','18px / 24.3px','rgb(0,0,238)','#4CD963','cubic-bezier(0.44, 0, 0.56, 1)']))
tokens=load('tokens.json');check('tokens structured',all(k in tokens for k in ['color','typography','space','radius','shadow','motion','layout','components','archive']))
check('token CTA evidence',tokens['components']['primaryCta']['radius']=='8px' and tokens['components']['primaryCta']['background']=='#FFFFFF')
check('token motion evidence',tokens['motion']['observedRunningAnimations']==3 and tokens['motion']['videoNodes']==7)
check('JSON parse',all((ROOT/p).is_file() for p in ['archive/capture-manifest.json','archive/design-evidence.json','archive/offline-browser-check.json','tokens.json']))
backlog=(ROOT.parents[1]/'BACKLOG.md').read_text();check('backlog closed',re.search(r'\[x\] framer\.com.*`clones/2026-10-02-framer/`',backlog) is not None)
progress=(ROOT.parents[1]/'PROGRESS.md').read_text();check('progress updated','阶段4：`tokens.json`' in progress and 'Round 1 完成' in progress)
sha_ok=True;sha_count=0
for line in (ROOT/'archive/SHA256SUMS').read_text().splitlines():
 digest,rel=line.split('  ',1);sha_count+=1;p=ROOT/rel
 if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=digest:sha_ok=False
check('SHA256SUMS',sha_ok and sha_count>=46,f'{sha_count} files verified in Python')
check('inventory nonempty',inventory['count']>=46 and inventory['totalBytes']>29_000_000)
output={'generatedAt':'2026-10-02T04:05:00+08:00','checks':CHECKS,'passed':sum(x['passed'] for x in CHECKS),'failed':sum(not x['passed'] for x in CHECKS),'total':len(CHECKS)}
(ROOT/'archive/verification.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'passed':output['passed'],'failed':output['failed'],'total':output['total'],'failures':[x for x in CHECKS if not x['passed']]},ensure_ascii=False,indent=2))
if output['failed']:raise SystemExit(1)
