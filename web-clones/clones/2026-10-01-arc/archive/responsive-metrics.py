#!/usr/bin/env python3
import json,struct
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parent
def png(p):
 with p.open('rb') as f:b=f.read(24)
 return struct.unpack('>II',b[16:24])
view=[]
for w in [1440,1280,375]:
 d=json.loads((HERE/f'viewport-{w}-metrics.json').read_text()); shot=ROOT/'screenshots'/f'arc-home-{w}-fullpage.png'; first=HERE/f'viewport-{w}-firstscreen.png'
 view.append({'width':w,'responseStatus':d['response']['status'],'finalURL':d['url'],'title':d['title'],'documentHeight':d['document']['scrollHeight'],'overflowX':d['document']['overflowX'],'headingCount':len(d['headings']),'mediaCount':len(d['media']),'topSectionCount':len(d['topSections']),'fullpageScreenshot':{'size':png(shot),'bytes':shot.stat().st_size},'firstscreenScreenshot':{'size':png(first),'bytes':first.stat().st_size}})
sections=[]
for p in sorted((ROOT/'sections').glob('*.png')):
 with p.open('rb') as f:b=f.read(24)
 sections.append({'file':str(p.relative_to(ROOT)),'pixels':struct.unpack('>II',b[16:24]),'bytes':p.stat().st_size})
out={'source':'https://arc.net/','viewports':view,'sections':sections}
(HERE/'responsive-metrics.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
