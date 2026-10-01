#!/usr/bin/env python3
"""Inventory a Chromium MHTML snapshot without fetching resources."""
import hashlib
import json
from collections import Counter
from email import policy
from email.parser import BytesParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
MHTML = ROOT / "stripe-home.mhtml"
msg = BytesParser(policy=policy.default).parsebytes(MHTML.read_bytes())
parts = []
for index, part in enumerate(part for part in msg.walk() if not part.is_multipart()):
    locations = [str(v) for h, v in part.raw_items() if h.lower() == "content-location"]
    payload = part.get_payload(decode=True) or b""
    location = locations[0] if locations else ""
    parts.append({
        "index": index,
        "contentType": part.get_content_type(),
        "contentLocation": location,
        "domain": urlparse(location).netloc,
        "decodedBytes": len(payload),
        "sha256": hashlib.sha256(payload).hexdigest(),
    })
manifest = {
    "file": "archive/stripe-home.mhtml",
    "fileBytes": MHTML.stat().st_size,
    "partCount": len(parts),
    "resourceCount": sum(bool(p["contentLocation"]) for p in parts),
    "domains": dict(sorted(Counter(p["domain"] for p in parts if p["domain"]).items())),
    "contentTypes": dict(sorted(Counter(p["contentType"] for p in parts).items())),
    "decodedBytes": sum(p["decodedBytes"] for p in parts),
    "parts": parts,
}
(ROOT / "mhtml-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
print(json.dumps({k: v for k, v in manifest.items() if k != "parts"}, indent=2))
