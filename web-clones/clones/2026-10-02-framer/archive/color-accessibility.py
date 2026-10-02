#!/usr/bin/env python3
import json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
def srgb(value):
 value/=255
 return value/12.92 if value<=.04045 else ((value+.055)/1.055)**2.4
def luminance(rgb): return .2126*srgb(rgb[0])+.7152*srgb(rgb[1])+.0722*srgb(rgb[2])
def ratio(a,b):
 x,y=luminance(a),luminance(b);x,y=max(x,y),min(x,y);return (x+.05)/(y+.05)
def parse(value):
 if value.startswith('#'): value=value[1:]; return tuple(int(value[i:i+2],16) for i in (0,2,4))
 if value.startswith('rgb'):
  nums=[float(x) for x in value[value.find('(')+1:value.find(')')].split(',')]; return tuple(nums[:3]) if len(nums)==3 else tuple(nums)
 raise ValueError(value)
def over_black(value):
 rgb=parse(value)
 if len(rgb)==3:return rgb
 alpha=rgb[3]
 return tuple(round(alpha*channel) for channel in rgb[:3])
pairs=[
 ('text-primary',('#FFFFFF','#000000'),4.5,'normal text'),
 ('text-strong-secondary',('rgba(255,255,255,0.8)','#000000'),4.5,'normal text'),
 ('text-secondary',('rgba(255,255,255,0.6)','#000000'),4.5,'normal text'),
 ('text-faint',('rgba(255,255,255,0.4)','#000000'),4.5,'decorative metadata'),
 ('brand-link-on-primary',('#0000EE','#FFFFFF'),4.5,'normal text'),
 ('info',('#0099FF','#000000'),4.5,'normal text'),
 ('success-teal',('#00BB88','#000000'),4.5,'normal text'),
 ('success-green',('#4CD963','#000000'),4.5,'normal text'),
 ('accent-warm',('#D67A5C','#000000'),4.5,'normal text'),
]
out=[]
for name,(fg,bg),threshold,usage in pairs:
 fg_rgb=over_black(fg) if 'rgba' in fg else parse(fg); bg_rgb=parse(bg); r=ratio(fg_rgb,bg_rgb)
 out.append({'name':name,'foreground':fg,'foregroundComputed':f'rgb({fg_rgb[0]}, {fg_rgb[1]}, {fg_rgb[2]})','background':bg,'usage':usage,'wcag2_1AAThreshold':threshold,'ratio':round(r,2),'meetsAA':r>=threshold,'recommendation':'usable' if r>=threshold else 'decorative only; darken or increase alpha for essential text'})
output={'formula':'WCAG 2.1 relative luminance','pairs':out,'passCount':sum(x['meetsAA'] for x in out),'total':len(out),'minimumEssentialRatio':min(x['ratio'] for x in out if x['usage']!='decorative metadata')}
(root/'archive/color-accessibility.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(output,ensure_ascii=False,indent=2))
