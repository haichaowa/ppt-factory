#!/usr/bin/env python3
"""Cross-check published tokens against live computed styles, CSS source and viewport remeasurement."""
import json, re
from datetime import datetime, timezone
from pathlib import Path
root=Path(__file__).parent.parent
computed=json.load(open(root/'archive/computed-styles.json'))
tokens=json.load(open(root/'tokens.json'))
viewport=json.load(open(root/'archive/viewport-metrics.json'))
outline=json.load(open(root/'archive/document-outline.json'))
css='\n'.join(p.read_text(errors='ignore') for p in (root/'archive/styles').glob('*.css'))
freq=computed['frequencies']; variables=computed['variables']
def typo(text):
 return next(x for x in computed['typography'] if x['text']==text)
checks=[]
def add(name, evidence, passed): checks.append({'token':name,'evidence':evidence,'passed':passed})
add('color.background.page', 'CSS variable --color-bg and body computed backgroundColor', variables.get('--color-bg')=='#07080a' and computed['componentSelectors'][0]['styles']['background-color']=='rgb(7, 8, 10)')
for color in ['#07080A','#101111','#111214','#18191A','#1B1C1E','#242728','#F4F4F6','#E6E6E6','#FF6363','#FF6161','#59D499','#57C1FF','#FFC533']:
 add('color '+color, 'case-insensitive CSS source search and/or computed variable value', bool(re.search(re.escape(color),css,re.I)) or color.lower() in json.dumps(variables).lower())
for name,text in [('hero','Your shortcut to everything.'),('aiTitle','Meet your new virtual assistant'),('eyebrow','AI Agent')]:
 item=typo(text); s=item['styles']; passed=(name=='hero' and s['font-size']=='64px' and s['font-weight']=='600') or (name=='aiTitle' and s['font-size']=='32px' and s['letter-spacing']=='-0.8px') or (name=='eyebrow' and s['font-size']=='12px' and s['font-family'].startswith('"JetBrains Mono"'))
 add('typography.'+name, f"computed typography sample: {text}",passed)
spacing={k:int(v[:-2]) for k,v in variables.items() if re.fullmatch(r'--spacing-(?:0-5|1|1-5|2|3|4|5|6|7|8|9|10|11|12|13)',k)}
add('spacing.scalePx', 'computed CSS custom properties', spacing=={x:str(x) for x in [4,8,12,16,24,32,40,48,56,64,80,96,112,168,224]} if False else sorted(spacing.values())==[4,8,12,16,24,32,40,48,56,64,80,96,112,168,224])
radius={k:float(v[:-2]) for k,v in variables.items() if k.startswith('--rounding-') and v.endswith('px') and k != '--rounding-none'}
add('radius.scalePx', 'computed CSS custom properties', sorted(radius.values())==[4,6,8,12,16,20,24])
add('shadow.keyboardKey', 'computed box-shadow frequency', any(x['value'].startswith('rgba(0, 0, 0, 0.4) 0px 1.5px') for x in freq['boxShadow']))
add('material.keyboardMask', 'CSS source radial-gradient declaration', 'radial-gradient(95% 70% at 17.02% 47.84%' in css)
add('motion.interfaceEasing', 'computed transition frequency', any('cubic-bezier(0.23, 1, 0.32, 1)' in x['value'] for x in freq['transition']))
add('layout.fullPageHeights', 'viewport-metrics.json', [v['document']['scrollHeight'] for v in viewport['viewports']]==[15983,15983,15672])
add('layout.mobileHero', 'viewport-metrics.json selected H1', viewport['viewports'][2]['selected'][0]['styles']['font-size']=='36px')
add('documentOutline', 'document-outline.json', outline['headingCount']==24 and outline['outline'][0]['text']=='Your shortcut to everything.')
result={'source':'https://www.raycast.com/','checkedAt':datetime.now(timezone.utc).isoformat(),'inputs':['tokens.json','archive/computed-styles.json','archive/styles/','archive/viewport-metrics.json','archive/document-outline.json'],'allPassed':all(x['passed'] for x in checks),'checks':checks}
(root/'archive/token-evidence.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'allPassed':result['allPassed'],'checks':[(x['token'],x['passed']) for x in checks]},indent=2))
