#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ADDON_DIR="$SCRIPT_DIR/anki-tetris-card"
RELEASE_DIR="$(mktemp -d)"

cp "$ADDON_DIR/__init__.py" "$RELEASE_DIR/"
cp "$ADDON_DIR/main.py" "$RELEASE_DIR/"
cp "$ADDON_DIR/constants.py" "$RELEASE_DIR/"
cp "$ADDON_DIR/settings.py" "$RELEASE_DIR/"

cp "$ADDON_DIR/config.json" "$RELEASE_DIR/"

cp -r "$ADDON_DIR/web/" "$RELEASE_DIR/"

(
  cd "$RELEASE_DIR"
  mkdir -p "$SCRIPT_DIR/dist"
  zip -r "$SCRIPT_DIR/dist/anki-tetris-card.ankiaddon" .
)

rm -rf "$RELEASE_DIR"
