#!/usr/bin/env bash
set -euo pipefail
CODEX_DIR=${CODEX_DIR:-"vendor/codex"}

if [ -d "$CODEX_DIR/.git" ]; then
  echo "Codex already cloned to $CODEX_DIR"
else
  git clone https://github.com/openai/codex "$CODEX_DIR"
fi
cd "$CODEX_DIR"
if [ -f package.json ]; then
  npm install
elif [ -f requirements.txt ]; then
  pip install -r requirements.txt
else
  echo "No package.json or requirements.txt found. Please install dependencies manually." >&2
fi
