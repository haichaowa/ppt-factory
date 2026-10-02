#!/usr/bin/env python3
import json,pathlib,re,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
capture=json.loads((root/'archive/capture-manifest.json').read_text())
out={'source':capture['source'],'viewports':[]}
expected={1440:(1440,10741),1280:(1280,10741),375:(375,10861)}
for item in capture['viewports']:
 width=item['width']; png=root/f"screenshots/framer-home-{width}-fullpage.png"; info=subprocess.check_output(['file',str(png)],text=True);m=re.search(r'PNG image data, (\d+) x (\d+)',info)
 metrics=json.loads((root/f'archive/viewport-{width}-metrics.json').read_text())
 out['viewports'].append({'width':width,'height':item['height'],'httpStatus':item['responseStatus'],'title':item['title'],'scrollHeight':item['scrollHeight'],'scrollWidth':item['scrollWidth'],'overflowX':item['overflowX'],'screenshot':{'file':str(png.relative_to(root)),'pixelWidth':int(m.group(1)),'pixelHeight':int(m.group(2)),'bytes':png.stat().st_size},'counts':item['counts'],'headingCount':len(metrics['headings']),'mediaCount':len(metrics['media']),'textLeafSampleCount':len(metrics['textLeaves']),'expected':expected[width],'matchesExpected':(int(m.group(1)),int(m.group(2)))==expected[width] and item['scrollHeight']==expected[width][1] and not item['overflowX']})
out['allViewportsValid']=all(x['matchesExpected'] for x in out['viewports'])
(root/'archive/responsive-metrics.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'allViewportsValid':out['allViewportsValid'],'viewports':[(x['width'],x['scrollHeight'],x['overflowX'],x['matchesExpected']) for x in out['viewports']]},ensure_ascii=False,indent=2))
