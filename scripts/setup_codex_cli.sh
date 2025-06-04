#!/usr/bin/env bash
set -euo pipefail
npm i -g @openai/codex
if [[ -n "${OPENAI_API_KEY:-}" ]]; then
  echo "export OPENAI_API_KEY=$OPENAI_API_KEY" >> "$HOME/.bashrc"
  echo "OPENAI_API_KEY exported to ~/.bashrc"
fi
