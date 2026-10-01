#!/usr/bin/env python3
import json
from pathlib import Path
HERE=Path(__file__).resolve().parent
def lum(h):
 h=h.lstrip('#'); vals=[]
 for i in (0,2,4):
  c=int(h[i:i+2],16)/255; vals.append(c/12.92 if c<=.03928 else ((c+.055)/1.055)**2.4)
 return .2126*vals[0]+.7152*vals[1]+.0722*vals[2]
def ratio(a,b):
 x,y=lum(a),lum(b); x,y=max(x,y),min(x,y); return round((x+.05)/(y+.05),2)
pairs=[('#FFFCEC','#3139FB','Hero/footer display text'),('#FFFFFF','#3139FB','White text on cobalt'),('#FFFFFF','#2702C2','Primary button text'),('#3139FB','#FFFCEC','Feature title'),('#000000','#FFFCEC','Announcement title'),('#696969','#FFFCEC','Feature body'),('#FFFADD','#3139FB','Hero notice'),('#FFFFFF','#000000','Announcement pill')]
out={'method':'WCAG 2.1 relative luminance / contrast ratio','pairs':[{'foreground':a,'background':b,'ratio':ratio(a,b),'passesAA':ratio(a,b)>=4.5,'usage':u} for a,b,u in pairs]}
(HERE/'color-accessibility.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
