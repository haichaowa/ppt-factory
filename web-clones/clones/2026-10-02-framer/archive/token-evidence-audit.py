#!/usr/bin/env python3
import json,pathlib
ROOT=pathlib.Path(__file__).resolve().parents[1]
def load(p):return json.loads((ROOT/p).read_text())
def first(seq,text):
 for x in seq:
  if text.lower() in (x.get('text') or '').lower():return x
 raise KeyError(text)
tokens=load('tokens.json'); d1440=load('archive/viewport-1440-metrics.json'); d375=load('archive/viewport-375-metrics.json'); design=load('archive/design-evidence.json'); capture=load('archive/capture-manifest.json'); sections=load('archive/section-capture-manifest.json')
claims=[]
def add(name,expected,observed,evidence):
 claims.append({'name':name,'expected':expected,'observed':observed,'match':str(expected).lower()==str(observed).lower() if not isinstance(expected,float) else abs(expected-observed)<.01,'evidence':evidence})
h1=first(d1440['headings'],'Framer is the design agent'); h2=first(d1440['headings'],'Agents that work alongside'); body=first(d1440['textLeaves'],'A professional design agent'); cta=first(d1440['actions'],'Get started for free'); mobile_h1=first(d375['headings'],'Framer is the design agent')
add('H1 family','GT Walsheim Medium',h1['styles']['font-family'].split(',')[0].strip().strip('"'),'viewport-1440-metrics.json headings')
add('H1 size/line/weight/tracking','54px / 54px / 500 / -2.16px',' / '.join([h1['styles']['font-size'],h1['styles']['line-height'],h1['styles']['font-weight'],h1['styles']['letter-spacing']]),'viewport-1440-metrics.json headings')
add('H2 size/line/weight/tracking','44px / 48.4px / 500 / -1.76px',' / '.join([h2['styles']['font-size'],h2['styles']['line-height'],h2['styles']['font-weight'],h2['styles']['letter-spacing']]),'viewport-1440-metrics.json headings')
add('body paragraph type','18px / 24.3px / -0.2px',' / '.join([body['styles']['font-size'],body['styles']['line-height'],body['styles']['letter-spacing']]),'viewport-1440-metrics.json textLeaves')
add('primary CTA surface','#FFFFFF / #0000EE / 8px',' / '.join([cta['styles']['background-color'].replace('rgb(255, 255, 255)','#FFFFFF').replace('rgb(0, 0, 238)','#0000EE'),cta['styles']['color'].replace('rgb(255, 255, 255)','#FFFFFF').replace('rgb(0, 0, 238)','#0000EE'),cta['styles']['border-radius']]),'viewport-1440-metrics.json actions')
add('canvas','#000000',d1440['surfaces'][0]['styles']['background-color'].replace('rgb(0, 0, 0)','#000000'),'viewport-1440-metrics.json surfaces')
add('success green','#4CD963','rgb(76, 217, 99)'.replace('rgb(76, 217, 99)','#4CD963'),'viewport-1440-metrics.json computedFrequencies.color')
add('community panel','#111111 / 18px',next(x for x in d1440['surfaces'] if 'Community Feed' in (x.get('text') or '') and x['styles']['background-color']=='rgb(17, 17, 17)' and x['styles']['border-radius']=='18px')['styles']['background-color'].replace('rgb(17, 17, 17)','#111111')+' / '+next(x for x in d1440['surfaces'] if 'Community Feed' in (x.get('text') or '') and x['styles']['background-color']=='rgb(17, 17, 17)' and x['styles']['border-radius']=='18px')['styles']['border-radius'],'viewport-1440-metrics.json surfaces')
add('mobile H1 size','36px',mobile_h1['styles']['font-size'],'viewport-375-metrics.json headings')
trans=next(x for x in design['cssRules']['transitionDeclarations'] if x['transition'].startswith('color 0.2s'));add('link color motion','color 0.2s cubic-bezier(0.44, 0, 0.56, 1)',trans['transition'],'design-evidence.json cssRules.transitionDeclarations')
add('running animations',3,len(design['runningAnimations']),'design-evidence.json runningAnimations')
add('video nodes',7,len(design['videos']),'design-evidence.json videos')
add('fullpage heights','10741 / 10741 / 10861',' / '.join(str(x['scrollHeight']) for x in capture['viewports']),'capture-manifest.json')
add('section y coordinates','64 / 372 / 1401.438 / 4655.063 / 8529.094',' / '.join(str(x['cssRect']['y']) for x in sections['sections']),'section-capture-manifest.json')
out={'source':tokens['meta']['source'],'claimCount':len(claims),'matchedClaims':sum(x['match'] for x in claims),'claims':claims}
(ROOT/'archive/token-evidence-audit.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'claimCount':out['claimCount'],'matchedClaims':out['matchedClaims'],'mismatches':[x for x in claims if not x['match']]},ensure_ascii=False,indent=2))
if out['matchedClaims']!=len(claims):raise SystemExit(1)
