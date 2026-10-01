#!/usr/bin/env python3
import base64, hashlib, json
from pathlib import Path
root=Path(__file__).resolve().parent
mhtml=root/'claude-code.mhtml'
raw=mhtml.read_bytes()
delimiter_line=next(line for line in raw.splitlines() if line.startswith(b'------MultipartBoundary'))
boundary=delimiter_line[2:]
part_delimiter=b'--'+boundary
final_delimiter=b'--'+boundary+b'--'
idx=raw.rfind(b'\r\n'+final_delimiter)
assert idx >= 0, 'MHTML final CRLF delimiter not found'
records=[]
for font in sorted((root/'resources/fonts').glob('*.woff2')):
    data=font.read_bytes()
    location='https://claude.com/_next/static/media/'+font.name
    encoded=b'\r\n'.join(base64.encodebytes(data).splitlines())
    headers=(f'\r\n{part_delimiter.decode()}\r\n'
             f'Content-Type: font/woff2\r\n'
             f'Content-Transfer-Encoding: base64\r\n'
             f'Content-Location: {location}\r\n\r\n').encode()
    part=headers+encoded
    marker=f'Content-Location: {location}\r\n'.encode()
    if marker not in raw:
        raw=raw[:idx]+part+raw[idx:]
        idx=raw.rfind(b'\r\n'+final_delimiter)
        assert idx >= 0, 'MHTML final CRLF delimiter disappeared'
        records.append({'file':f'resources/fonts/{font.name}','contentLocation':location,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
mhtml.write_bytes(raw)
(root/'font-manifest.json').write_text(json.dumps({'supplementedFonts':records,'totalBytes':sum(x['bytes'] for x in records)},indent=2)+'\n')
print(json.dumps({'fontCount':len(records),'totalBytes':sum(x['bytes'] for x in records)},indent=2))
