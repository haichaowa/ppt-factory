#!/usr/bin/env python3
"""WCAG 2.1 contrast audit for the measured Stripe palette."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parent
def rgb(color):
    color=color.strip()
    if color.startswith('#'):
        h=color[1:]; return tuple(int(h[i:i+2],16)/255 for i in (0,2,4))
    value=color[color.find('(')+1:color.find(')')]
    parts=[float(x) for x in value.split(',')[:3]]
    if max(parts)<=1: parts=[x*255 for x in parts]
    return tuple(x/255 for x in parts)
def channel(c): return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def luminance(c):
    r,g,b=rgb(c); return .2126*channel(r)+.7152*channel(g)+.0722*channel(b)
def contrast(a,b):
    la,lb=luminance(a),luminance(b); hi,lo=max(la,lb),min(la,lb); return (hi+.05)/(lo+.05)
pairs=[
 ('primary text / page','#0A2540','#FFFFFF','body',18,False),
 ('primary text / quiet','#0A2540','#F8FAFD','body',18,False),
 ('secondary text / page','#50617A','#FFFFFF','body',16,False),
 ('muted text / page','#64748D','#FFFFFF','body',16,False),
 ('brand link / page','#533AFD','#FFFFFF','body link',16,False),
 ('primary CTA / brand',' #FFFFFF','#533AFD','control',16,False),
 ('inverse text / developer','#FFFFFF','#020826','display',32,True),
 ('inverse text / raised','#F2F7FE','#2C2484','display',32,True),
]
rows=[]
for name,fg,bg,role,size,is_large in pairs:
    ratio=contrast(fg,bg); threshold=3 if is_large or size>=24 else 4.5; aaa=4.5 if is_large or size>=24 else 7
    rows.append({'name':name.strip(),'foreground':fg.strip(),'background':bg.strip(),'role':role,'fontSizePx':size,'largeText':is_large or size>=24,'contrast':round(ratio,2),'aaThreshold':threshold,'aaaThreshold':aaa,'aaPassed':ratio>=threshold,'aaaPassed':ratio>=aaa})
out={'standard':'WCAG 2.1 relative luminance','paletteSource':'live computed styles in computed-styles.json','pairs':rows,'allAaPassed':all(x['aaPassed'] for x in rows),'aaaPairs':[x['name'] for x in rows if x['aaaPassed']]}
(ROOT/'color-accessibility.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(out,ensure_ascii=False,indent=2))
