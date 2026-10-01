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
for name in ['capture-manifest.json','computed-styles.json','mhtml-manifest.json','key-element-metrics.json','offline-browser-check.json','css-token-evidence.json','document-outline.json','responsive-metrics.json','color-accessibility.json','motion-evidence.json']:
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
responsive=load('responsive-metrics.json')
add('responsive_viewports', len(responsive['viewports'])==3 and [v['viewport']['width'] for v in responsive['viewports']]==[1440,1280,375] and not any(v['document']['overflowX'] for v in responsive['viewports']), [{'width':v['viewport']['width'],'height':v['document']['scrollHeight'],'overflowX':v['document']['overflowX']} for v in responsive['viewports']])
mobile=next(v for v in responsive['viewports'] if v['viewport']['width']==375); desktop=next(v for v in responsive['viewports'] if v['viewport']['width']==1440)
add('responsive_typography', desktop['headings'][0]['font-size']=='48px' and mobile['headings'][0]['font-size']=='34px', {'desktopH1':desktop['headings'][0]['font-size'],'mobileH1':mobile['headings'][0]['font-size'],'desktopLineHeight':desktop['headings'][0]['line-height'],'mobileLineHeight':mobile['headings'][0]['line-height']})
add('responsive_layout_drift', desktop['elements']['hero']['rect']['height']==685 and mobile['elements']['hero']['rect']['height']<500 and desktop['elements']['heroPrimaryCta']['rect']['height']==48 and mobile['elements']['heroPrimaryCta']['rect']['height']==44, {'desktopHero':desktop['elements']['hero']['rect'],'mobileHero':mobile['elements']['hero']['rect'],'desktopCta':desktop['elements']['heroPrimaryCta']['rect'],'mobileCta':mobile['elements']['heroPrimaryCta']['rect']})
add('responsive_firstscreen_pngs', all((A/name).stat().st_size>100000 for name in ['viewport-1280-firstscreen.png','viewport-375-firstscreen.png']), responsive['screenshots'])
color=load('color-accessibility.json'); add('color_contrast_aa', color['allAaPassed'] and min(x['contrast'] for x in color['pairs'])>=4.5, {'pairs':len(color['pairs']),'minimum':min(x['contrast'] for x in color['pairs']),'aaaPairs':color['aaaPairs']})
motion=load('motion-evidence.json'); add('motion_evidence', len(motion['liveComputedTransitions'])>=20 and len(motion['cssKeyframes'])>=10 and motion['selectedElements']['heroCanvas']['engine']=='three.js r178', {'transitionFamilies':len(motion['liveComputedTransitions']),'keyframes':len(motion['cssKeyframes']),'reducedMotionConditions':len(motion['reducedMotionConditions'])})
backlog=(ROOT.parent.parent/'BACKLOG.md').read_text(); add('backlog_complete', '[x] stripe.com' in backlog and '2026-10-01-stripe' in backlog, None)
stable=[p for p in A.rglob('*') if p.is_file() and p.name not in {'verification.json','SHA256SUMS'}]
sums='\n'.join(f'{hashlib.sha256(p.read_bytes()).hexdigest()}  archive/{p.name}' for p in sorted(stable,key=lambda x:x.name))+'\n'
(A/'SHA256SUMS').write_text(sums)
add('checksums_generated', len(stable)>=30, {'files':len(stable),'bytes':len(sums.encode())})
output={'round':2,'allPassed':all(c['passed'] for c in checks),'passed':sum(c['passed'] for c in checks),'total':len(checks),'checks':checks}
(A/'verification.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(output,ensure_ascii=False,indent=2))
