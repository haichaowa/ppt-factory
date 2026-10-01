#!/usr/bin/env python3
"""Extract the semantic heading/link outline from the serialized live DOM."""
from html.parser import HTMLParser
from datetime import datetime, timezone
from pathlib import Path
import json

class OutlineParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack=[]; self.outline=[]; self.capture=None; self.buffer=[]
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag in {'h1','h2','h3','h4','h5','h6'}:
            self.capture={'tag':tag,'class':attrs.get('class',''),'text':''}; self.buffer=[]
        elif self.capture:
            self.stack.append(tag)
    def handle_data(self, data):
        if self.capture: self.buffer.append(data)
    def handle_endtag(self, tag):
        if self.capture and self.stack and tag == self.stack[-1]: self.stack.pop()
        elif self.capture and tag == self.capture['tag']:
            self.capture['text']=' '.join(''.join(self.buffer).split())
            self.outline.append(self.capture); self.capture=None; self.buffer=[]
p=OutlineParser(); p.feed(Path(__file__).with_name('dom-snapshot.html').read_text(errors='ignore'))
out={'source':'https://www.raycast.com/','extractedFrom':'archive/dom-snapshot.html','extractedAt':datetime.now(timezone.utc).isoformat(),'headingCount':len(p.outline),'outline':p.outline}
Path(__file__).with_name('document-outline.json').write_text(json.dumps(out,indent=2,ensure_ascii=False)+'\n')
print(json.dumps({'headingCount':len(p.outline),'first10':p.outline[:10]},indent=2,ensure_ascii=False))
