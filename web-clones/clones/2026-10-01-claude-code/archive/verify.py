#!/usr/bin/env python3
import hashlib, json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
archive=root/'archive'
def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()
checks=[]
def check(name, passed, detail): checks.append({'name':name,'passed':bool(passed),'detail':detail})
required=[root/'meta.md',root/'notes.md',root/'tokens.json',archive/'claude-code.mhtml',archive/'robots.txt']
required += [root/'screenshots'/x for x in ['claude-code-1440x12338-fullpage.png','claude-code-1280x12130-fullpage.png','claude-code-375x17213-fullpage.png']]
required += [root/'sections'/x for x in ['01-hero-shell.png','02-pricing-plans.png','03-code-workflow.png','04-integrations.png','05-dark-newsletter.png']]
check('required deliverables',all(p.is_file() and p.stat().st_size>0 for p in required),f'{sum(p.is_file() and p.stat().st_size>0 for p in required)}/{len(required)} files present and non-empty')
json_files=list(archive.glob('*.json'))+[root/'tokens.json',root/'manifest.json']
parsed=[]
for p in json_files:
    try: json.loads(p.read_text()); parsed.append(p.name)
    except Exception: pass
check('JSON parseability',len(parsed)==len(json_files),f'{len(parsed)}/{len(json_files)} valid')
screens=[(1440,12338,'claude-code-1440x12338-fullpage.png'),(1280,12130,'claude-code-1280x12130-fullpage.png'),(375,17213,'claude-code-375x17213-fullpage.png')]
# PNG signature and dimensions are checked without external PIL dependencies.
def png_size(p):
    b=Path(p).read_bytes(); assert b[:8]==b'\x89PNG\r\n\x1a\n'; return int.from_bytes(b[16:20],'big'),int.from_bytes(b[20:24],'big')
sizes={name:png_size(root/'screenshots'/name) for _,_,name in screens}
check('full-page PNG geometry',all(sizes[n]==(w,h) for w,h,n in screens),str(sizes))
sections=sorted((root/'sections').glob('*.png'))
sec_sizes={p.name:png_size(p) for p in sections}
sec_hashes=[sha(p) for p in sections]
check('2x section captures',len(sections)==5 and len(set(sec_hashes))==5 and all(v[0]==2880 for v in sec_sizes.values()),str(sec_sizes))
mm=json.loads((archive/'mhtml-manifest.json').read_text())
check('MHTML structure',mm['resourcePartCount']==39 and mm['bytes']==(archive/'claude-code.mhtml').stat().st_size and mm['sha256']==sha(archive/'claude-code.mhtml'),f"{mm['resourcePartCount']} parts, {mm['bytes']} bytes")
bc=json.loads((archive/'mhtml-browser-check.json').read_text())
check('MHTML browser reopen',bc['offline']['title'].startswith('Claude Code') and bc['offline']['h1']=='Claude Code' and bc['offline']['fontChecks']=={'sans':True,'serif':True,'mono':True},str(bc['offline']))
fonts=json.loads((archive/'font-manifest.json').read_text())['supplementedFonts']
check('font supplement integrity',all((archive/f['file']).stat().st_size==f['bytes'] and sha(archive/f['file'])==f['sha256'] for f in fonts),f"{len(fonts)} WOFF2 files verified")
robots=(archive/'robots.txt').read_text()
check('robots compliance','User-Agent: *' in robots and 'Allow: /' in robots and 'Disallow:' not in robots,'root and referenced static paths allowed')
off=json.loads((archive/'offline-fidelity.json').read_text())
check('offline fidelity',len(off['blockedExternalRequests'])==0 and off['matchingRatio']>=.95 and off['offline']['fontChecks']=={'sans':True,'serif':True,'mono':True},f"{off['matchingRatio']:.6f} match, {off['meanAbsoluteChannelError']} MAE")
sums=(archive/'SHA256SUMS').read_text().splitlines()
ok=0
for line in sums:
    h,name=line.split('  ',1); p=archive/name
    if sha(p)==h: ok+=1
resp=json.loads((archive/'responsive-metrics.json').read_text())
check('responsive evidence parity',len(resp['viewports'])==3 and {v['viewport']['width'] for v in resp['viewports']}=={1440,1280,375},'1440/1280/375 computed-style records present')
prov=json.loads((archive/'token-provenance.json').read_text())
check('token provenance',len(prov['tokens'])==14 and all('computed' in x for x in prov['tokens'].values()),f"{len(prov['tokens'])} token families mapped to computed values")
access=json.loads((archive/'color-accessibility.json').read_text())
check('color accessibility',access['allMeasuredPairsMeetListedThreshold'] and all(x['passes'] for x in access['pairs']),str({x['name']:x['ratio'] for x in access['pairs']}))
token=json.loads((root/'tokens.json').read_text())
check('token audit parity',token['accessibility']['allMeasuredPairsMeetListedThreshold']==access['allMeasuredPairsMeetListedThreshold'] and isinstance(token['source']['capturedAt'],dict),'tokens.json points to and matches design audit evidence')
check('SHA256SUMS',ok==len(sums),f'{ok}/{len(sums)} hashes match')
check('BACKLOG completion','`clones/2026-10-01-claude-code/`' in (root.parents[1]/'BACKLOG.md').read_text(),'marked complete with output directory')
result={'round':2,'allPassed':all(x['passed'] for x in checks),'checks':checks}
(archive/'verification.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
raise SystemExit(0 if result['allPassed'] else 1)
