#!/usr/bin/env python3
"""Group archived resources by origin and rights-bearing type."""
import json
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlparse
ROOT=Path(__file__).resolve().parent
mm=json.loads((ROOT/'mhtml-manifest.json').read_text())
cm=json.loads((ROOT/'capture-manifest.json').read_text())
groups=defaultdict(list)
for p in mm['parts']:
 if p['contentLocation']:
  groups[p['domain']].append({'contentType':p['contentType'],'location':p['contentLocation'],'decodedBytes':p['decodedBytes']})
fonts=[{'domain':urlparse(x['href']).netloc,'href':x['href'],'file':x['file'],'bytes':x['bytes']} for x in cm['fontFiles']]
out={
 'scope':'Local study only; no redistribution or commercial use; rights remain with Stripe and third-party rights holders.',
 'mhtmlResourceCount':mm['resourceCount'],'mhtmlDomains':mm['domains'],'groups':{k:{'count':len(v),'contentTypes':dict(Counter(x['contentType'] for x in v)),'items':v} for k,v in groups.items()},'supplementalFonts':fonts,
 'notes':[
   'stripe.com contributes the main document.',
   'b.stripecdn.com contributes stylesheet and font assets used by the rendered page.',
   'images.stripeassets.com contributes marketing images/illustrations.',
   'Customer and third-party trademarks remain the property of their respective owners.'
 ]
}
(ROOT/'rights-inventory.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'mhtmlResourceCount':out['mhtmlResourceCount'],'domains':out['mhtmlDomains'],'supplementalFonts':len(fonts)},indent=2))
