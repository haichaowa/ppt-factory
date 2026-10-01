#!/usr/bin/env python3
"""Summarize resource provenance and rights-sensitive categories in the MHTML/font archive."""
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote

archive=Path(__file__).parent
manifest=json.load(open(archive/'mhtml-manifest.json'))
parts=manifest['parts']
def host(url):
    try:return urlparse(url).netloc or '(embedded document)'
    except:return '(unknown)'
def original_media_url(url):
    if not url: return ''
    if '/_next/image?' in url:
        q=parse_qs(urlparse(url).query).get('url',[''])
        if q and q[0].startswith('http'): return q[0]
    return url
host_counts=Counter(host(p.get('contentLocation')) for p in parts)
third_party=[p for p in parts if host(p.get('contentLocation')) not in {'www.raycast.com','(embedded document)'}]
optimized_external=[]
for p in parts:
    u=original_media_url(p.get('contentLocation') or '')
    if urlparse(u).netloc and urlparse(u).netloc not in {'www.raycast.com'}: optimized_external.append({'mhtmlLocation':p.get('contentLocation'),'originalUrl':u,'contentType':p['contentType'],'decodedBytes':p['decodedBytes']})
fonts=json.load(open(archive/'font-manifest.json'))['fonts']
result={
 'source':'https://www.raycast.com/',
 'generatedAt':datetime.now(timezone.utc).isoformat(),
 'purpose':'Local-only rights provenance for the archived homepage. This is not a license grant.',
 'mimeTypeCounts':manifest['contentTypeCounts'],
 'partHostCounts':dict(host_counts),
 'thirdPartyParts':{'count':len(third_party),'hosts':dict(Counter(host(p.get('contentLocation')) for p in third_party))},
 'nextImageOptimizedExternalAssets':optimized_external,
 'nextImageOptimizedExternalAssetCount':len(optimized_external),'nextImageOptimizedOriginalHostCounts':dict(Counter(urlparse(x['originalUrl']).netloc for x in optimized_external)),
 'fontSupplement':{'count':len(fonts),'hosts':dict(Counter(urlparse(f['url']).netloc for f in fonts)),'files':[f['file'] for f in fonts]},
 'notes':[
   'Page markup, CSS, logo marks, product screenshots and assets served from raycast.com / misc-assets.raycast.com remain the property of Raycast or its licensors.',
   'The 18 i.ytimg.com JPEG parts are video thumbnails referenced by the community section; any rights in those thumbnails remain with the video creators and/or YouTube.',
   'Six rendered WOFF2 fonts were downloaded from www.raycast.com for local fidelity only; font licensing follows the original upstream license and is not relicensed by this archive.',
   'No asset in this directory may be redistributed or used commercially.'
 ],
 'localUseOnly':True
}
(archive/'rights-inventory.json').write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n')
print(json.dumps({'mimeTypeCounts':result['mimeTypeCounts'],'partHostCounts':result['partHostCounts'],'thirdPartyParts':result['thirdPartyParts'],'optimizedExternalCount':len(optimized_external),'fonts':len(fonts)},indent=2))
