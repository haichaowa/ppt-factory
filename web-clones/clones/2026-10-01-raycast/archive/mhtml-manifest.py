#!/usr/bin/env python3
"""Inventory every decoded MIME part in the Chromium MHTML capture."""
import email, hashlib, json, sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

mhtml = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).with_name('raycast-home.mhtml'))
out = Path(sys.argv[1] if len(sys.argv) > 1 else mhtml).with_name('mhtml-manifest.json')
with mhtml.open('rb') as f:
    message = email.message_from_binary_file(f)
parts = []
for index, part in enumerate(message.walk()):
    if part.is_multipart():
        continue
    payload = part.get_payload(decode=True) or b''
    parts.append({
        'index': index,
        'contentType': part.get_content_type(),
        'contentLocation': part.get('Content-Location'),
        'transferEncoding': part.get('Content-Transfer-Encoding'),
        'decodedBytes': len(payload),
        'sha256': hashlib.sha256(payload).hexdigest(),
    })
manifest = {
    'source': message.get('Snapshot-Content-Location'),
    'subject': message.get('Subject'),
    'snapshotDate': message.get('Date'),
    'inventoryGeneratedAt': datetime.now(timezone.utc).isoformat(),
    'mhtmlBytes': mhtml.stat().st_size,
    'mhtmlSha256': hashlib.sha256(mhtml.read_bytes()).hexdigest(),
    'partCountIncludingMultipart': len(list(message.walk())),
    'resourcePartCount': len(parts),
    'decodedResourceBytes': sum(p['decodedBytes'] for p in parts),
    'contentTypeCounts': dict(sorted(Counter(p['contentType'] for p in parts).items())),
    'parts': parts,
}
out.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
print(json.dumps({k: manifest[k] for k in ['partCountIncludingMultipart','resourcePartCount','decodedResourceBytes','contentTypeCounts']}, indent=2))
