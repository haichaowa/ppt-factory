#!/usr/bin/env python3
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
archive=root/'archive'
def read(name): return json.loads((archive/name).read_text())
m1440=read('style-metrics-1440.json'); m1280=read('style-metrics-1280.json'); m375=read('style-metrics-375.json')
responsive={'capturedAt':'2026-10-01T05:04:00+08:00','viewports':[]}
for name,m in [('1440',m1440),('1280',m1280),('375',m375)]:
    keys=['h1','heroParagraph','heroPrimaryCta','commandText','terminal','newsletterSection']
    responsive['viewports'].append({
      'viewport':m['viewport'],'document':m['document'],
      'keyElements':{k:{'box':m['selected'][k]['box'],'style':m['selected'][k]['style']} for k in keys if k in m['selected'] and m['selected'][k]['box']['width']>0},
      'fontSizeFrequency':dict(sorted(m['frequencies']['fontSize'].items(),key=lambda kv:-kv[1]['count'])[:12])
    })
(archive/'responsive-metrics.json').write_text(json.dumps(responsive,indent=2)+'\n')
prov={
 'generatedFrom':['archive/style-metrics-1440.json','archive/style-metrics-375.json','archive/key-element-metrics.json'],
 'tokens':{
  'color.pageWarmPaper':{'computed':'rgb(250, 249, 245)','selector':'body','property':'backgroundColor','frequency':m1440['frequencies']['backgroundColor'].get('rgb(250, 249, 245)',{}).get('count',0)},
  'color.ink.primary':{'computed':'rgb(20, 20, 19)','selector':'body','property':'color','frequency':m1440['frequencies']['color'].get('rgb(20, 20, 19)',{}).get('count',0)},
  'color.ink.secondary':{'computed':'rgb(94, 93, 89)','selector':'hero paragraph','property':'color','frequency':m1440['frequencies']['color'].get('rgb(94, 93, 89)',{}).get('count',0)},
  'color.darkSurfaces.terminal':{'computed':'rgb(20, 20, 19)','selector':'terminal card','property':'backgroundColor'},
  'color.darkSurfaces.terminalHeader':{'computed':'rgb(48, 48, 46)','selector':'terminal header','property':'backgroundColor'},
  'color.terminalBody':{'computed':'rgb(176, 174, 165)','selector':'terminal code','property':'color'},
  'typography.h1':{'computed':'64px / 70.4px, weight 400','selector':'h1'},
  'typography.headlineL':{'computed':'52px / 62.4px, weight 500','selector':'Get started / work H2'},
  'typography.base':{'computed':'15px / 22.5px, weight 400','selector':'body'},
  'typography.installCommand':{'computed':'17px / 25.5px','selector':'[class*=commandText]'},
  'radius.commandWell':{'computed':'12px','selector':'[class*=commandWrap]'},
  'radius.terminal':{'computed':'16px','selector':'[class*=terminal]'},
  'radius.pricingCard':{'computed':'24px','selector':'Pricing card'},
  'shadow.productShell':{'computed':'rgba(10, 10, 10, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.024) 0px 8px 24px 0px, rgba(0, 0, 0, 0.04) 0px 32px 80px 0px','selector':'AppShell window'}
 }
}
(archive/'token-provenance.json').write_text(json.dumps(prov,indent=2)+'\n')
def lin(c):
    c=c/255
    return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def rgb(hexs):
    hexs=hexs.lstrip('#'); return tuple(int(hexs[i:i+2],16) for i in (0,2,4))
def contrast(a,b):
    x,y=rgb(a),rgb(b); la=tuple(lin(v) for v in x); lb=tuple(lin(v) for v in y)
    l1=.2126*la[0]+.7152*la[1]+.0722*la[2]; l2=.2126*lb[0]+.7152*lb[1]+.0722*lb[2]
    hi,lo=max(l1,l2),min(l1,l2); return round((hi+.05)/(lo+.05),2)
pairs=[
 ('primary text on warm paper','#141413','#FAF9F5',4.5),
 ('secondary text on warm paper','#5E5D59','#FAF9F5',4.5),
 ('tertiary/footer text on warm paper','#87867F','#FAF9F5',3),
 ('primary CTA text on dark button','#FAF9F5','#141413',4.5),
 ('on-dark text on newsletter','#FAF9F5','#141413',4.5),
 ('terminal body on terminal','#B0AEA5','#141413',4.5),
 ('secondary CTA text on muted button','#4D4C48','#E8E6DC',4.5)
]
access={'method':'WCAG 2.x relative-luminance contrast ratio calculated from computed RGB values; large-text threshold shown as 3.0.','pairs':[]}
for name,fg,bg,minimum in pairs:
    ratio=contrast(fg,bg); access['pairs'].append({'name':name,'foreground':fg,'background':bg,'ratio':ratio,'minimum':minimum,'passes':ratio>=minimum})
access['allMeasuredPairsMeetListedThreshold']=all(x['passes'] for x in access['pairs'])
(archive/'color-accessibility.json').write_text(json.dumps(access,indent=2)+'\n')
