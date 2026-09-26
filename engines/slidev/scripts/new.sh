#!/usr/bin/env bash
# 用法: npm run new -- <deck名称> [模板名]
# 示例: npm run new -- my-talk cn-seriph
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DECKS_DIR="$ROOT/decks"
TEMPLATES_DIR="$ROOT/templates"

NAME="${1:-}"
TEMPLATE="${2:-cn-default}"

if [[ -z "$NAME" ]]; then
  echo "用法: npm run new -- <deck名称> [模板名]"
  echo ""
  echo "可用模板:"
  ls "$TEMPLATES_DIR" | sed 's/^/  - /'
  exit 1
fi

if ! [[ "$NAME" =~ ^[a-zA-Z0-9][a-zA-Z0-9_-]*$ ]]; then
  echo "错误: deck 名称只能包含字母、数字、中划线、下划线，且以字母或数字开头: $NAME"
  exit 1
fi

if [[ ! -d "$TEMPLATES_DIR/$TEMPLATE" ]]; then
  echo "错误: 模板不存在: $TEMPLATE"
  echo "可用模板:"
  ls "$TEMPLATES_DIR" | sed 's/^/  - /'
  exit 1
fi

if [[ -e "$DECKS_DIR/$NAME" ]]; then
  echo "错误: deck 已存在: decks/$NAME"
  exit 1
fi

mkdir -p "$DECKS_DIR/$NAME"
cp -R "$TEMPLATES_DIR/$TEMPLATE/." "$DECKS_DIR/$NAME/"

echo "✅ 已创建: decks/$NAME （模板: $TEMPLATE）"
echo ""
echo "下一步:"
echo "  npm run dev -- decks/$NAME/slides.md      # 开发预览 http://localhost:3030"
echo "  npm run export -- decks/$NAME/slides.md   # 导出 PDF"
echo "  npm run build -- decks/$NAME/slides.md    # 构建静态网页"
