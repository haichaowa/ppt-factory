#!/usr/bin/env python3
import json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
m=json.loads((root/'archive/mhtml-manifest.json').read_text())
r=json.loads((root/'archive/resource-download-manifest.json').read_text())
output={
 'source':'https://www.framer.com/',
 'robots':{'file':'archive/robots.txt','homepageAllowed':True,'restrictedPathsNotVisited':['/api-proxy']},
 'mhtml':{'domains':m['domains'],'partCount':m['partCount'],'bytes':m['bytes'],'partsByDomain':{domain:sum(1 for x in m['parts'] if x['contentLocation'].startswith('http') and x['contentLocation'].split('/')[2]==domain) for domain in m['domains']},'contentTypes':m['contentTypes']},
 'supplementedMedia':{'count':len(r['resources']),'domains':sorted({x['source'].split('/')[2] for x in r['resources']}),'bytes':r['totalBytes']},
 'rightsHolders':{
   'siteCopyAndBrand':'Framer Software, Inc. / Framer brand rights holders',
   'customerLogosAndQuotes':'Respective customers and rights holders',
   'thirdPartyFontsAndAssets':'Respective font and media rights holders',
   'productVideos':'Framer Software, Inc. / respective rights holders'
 },
 'localUseOnly':True,
 'redistribution':False,
 'commercialUse':False,
 'trainingUse':False,
 'remakePolicy':'If a future optional remake is made, use original copy and graphics only; do not reproduce the Framer logo or protected media.'
}
(root/'archive/rights-inventory.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(output,ensure_ascii=False,indent=2))
