#!/usr/bin/env python3
import json,re
from pathlib import Path
HERE=Path(__file__).resolve().parent
e=json.loads((HERE/'design-evidence.json').read_text())
css=json.loads((HERE/'css-token-evidence.json').read_text())
out={'source':'design-evidence.json + CSS token evidence','animations':e['viewports'][0]['animations'],'cssKeyframes':css['keyframes'],'keyframeRules':css['keyframeRules'],'observedInteractions':['transform 0.15s, background 0.15s','background 0.2s ease-in-out','transform 0.2s ease-in-out','opacity 0.1s ease-out'],'interpretation':'The only long-running CSS animation is the duplicated media marquee; interface changes stay short and low-amplitude.'}
(HERE/'motion-evidence.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
