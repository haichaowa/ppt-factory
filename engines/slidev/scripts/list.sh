#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "📦 模板 (templates/):"
for d in "$ROOT"/templates/*/; do
  name=$(basename "$d")
  desc=$(head -1 "$d/README.md" 2>/dev/null | sed 's/^# //' || true)
  printf "  %-16s %s\n" "$name" "$desc"
done

echo ""
echo "🎯 已有 deck (decks/):"
found=0
for d in "$ROOT"/decks/*/; do
  [[ -f "$d/slides.md" ]] || continue
  found=1
  printf "  %s\n" "$(basename "$d")"
done
[[ $found -eq 0 ]] && echo "  （空，用 npm run new -- <名称> 创建）"
