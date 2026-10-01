#!/usr/bin/env python3
import json,re
from html.parser import HTMLParser
from pathlib import Path
HERE=Path(__file__).resolve().parent
html=(HERE/'live-dom.html').read_text(errors='replace')
def strip_tags(s):return re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',s)).strip()
def attr(tag,name):
 m=re.search(fr'<{tag}\b[^>]*\b{name}=["\']([^"\']+)',html,re.I);return m.group(1) if m else None
headings=[]
for level,text in re.findall(r'<h([1-4])\b[^>]*>(.*?)</h\1>',html,re.I|re.S):headings.append({'tag':f'h{level}','text':strip_tags(text),'ariaLabel':None})
out={'source':'https://arc.net/','title':strip_tags(re.search(r'<title[^>]*>(.*?)</title>',html,re.I|re.S).group(1)),'language':attr('html','lang'),'landmarks':{name:len(re.findall(fr'<{name}\b',html,re.I)) for name in ['header','nav','main','footer','aside']},'headings':headings,'linkCount':len(re.findall(r'<a\b',html,re.I)),'buttonCount':len(re.findall(r'<button\b',html,re.I)),'imageCount':len(re.findall(r'<img\b',html,re.I)),'videoCount':len(re.findall(r'<video\b',html,re.I)),'regionTextExcerpt':strip_tags(re.search(r'<main\b[^>]*>(.*?)</main>',html,re.I|re.S).group(1))[:1000]}
(HERE/'document-outline.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
