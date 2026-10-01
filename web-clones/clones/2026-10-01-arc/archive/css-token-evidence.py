#!/usr/bin/env python3
import json,re,hashlib
from collections import Counter
from email import policy
from email.parser import BytesParser
from pathlib import Path
HERE=Path(__file__).resolve().parent
css=[];seen_css=set()
msg=BytesParser(policy=policy.default).parsebytes((HERE/'arc-home.mhtml').read_bytes())
for part in msg.walk():
 if part.get('Content-Location') and part.get_content_type()=='text/css':
  value=part.get_payload(decode=True).decode('utf-8','replace');digest=hashlib.sha256(value.encode()).hexdigest()
  if digest not in seen_css: seen_css.add(digest);css.append(value)
text='\n'.join(css)
variableValues={}
for m in re.finditer(r'(--[A-Za-z0-9_-]+)\s*:\s*([^;}]+)',text): variableValues.setdefault(m.group(1),[]).append(m.group(2).strip())
variables={k:v[-1] for k,v in variableValues.items()}
fontFaces=re.findall(r'@font-face\s*\{([^}]+)\}',text)
families=[]
for face in fontFaces:
 m=re.search(r'font-family\s*:\s*([^;]+)',face,re.I); families.append(m.group(1).strip() if m else None)
keyframes=re.findall(r'@keyframes\s+([A-Za-z0-9_-]+)',text)
keyframeRules=[]
for m in re.finditer(r'@keyframes\s+([A-Za-z0-9_-]+)\s*\{',text):
 name=m.group(1);start=m.end()-1;depth=0
 for i in range(start,len(text)):
  if text[i]=='{':depth+=1
  elif text[i]=='}':
   depth-=1
   if depth==0:keyframeRules.append({'name':name,'css':text[start+1:i].strip()});break
media=sorted(set(re.findall(r'@media\s+([^{]+)',text)))
transitions=sorted(set(re.findall(r'transition\s*:\s*([^;}]+)',text,re.I)))
radii=Counter(re.findall(r'border-radius\s*:\s*([^;}]+)',text,re.I))
out={'source':'MHTML CSS parts','cssFragments':len(css),'combinedBytes':len(text.encode()),'sha256':hashlib.sha256(text.encode()).hexdigest(),'declaredCustomPropertiesLastValue':variables,'customPropertyDeclarationCounts':{k:len(v) for k,v in variableValues.items()},'observedRootCustomProperties':json.loads((HERE/'design-evidence.json').read_text())['viewports'][0]['cssVariables'],'keyframeRules':keyframeRules,'fontFaceCount':len(fontFaces),'renderedFontFaceCount':len(json.loads((HERE/'design-evidence.json').read_text())['viewports'][0]['fontFaces']),'fontFaceFamilies':sorted(set(families)),'keyframes':keyframes,'mediaConditions':media,'transitionValues':transitions[:100],'borderRadiusValues':dict(radii)}
(HERE/'css-token-evidence.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
