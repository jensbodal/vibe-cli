#!/usr/bin/env bash
# setup_browser.sh — auto-find or auto-install a Chromium browser and symlink it
set -euo pipefail

# ---------- helpers ---------------------------------------------------------
log()   { printf '\033[1;32m%s\033[0m\n' "$*"; }  # green messages
warn()  { printf '\033[1;33m%s\033[0m\n' "$*"; }  # yellow warnings
die()   { printf '\033[1;31m%s\033[0m\n' "$*"; exit 1; }

is_cmd() { command -v "$1" >/dev/null 2>&1; }

# ---------- step 1: locate an existing browser ------------------------------
find_browser() {
  local c
  for c in \
      google-chrome 'google-chrome-stable' chromium chromium-browser \
      brave-browser microsoft-edge msedge; do
    is_cmd "$c" && { command -v "$c"; return 0; }
  done

  # macOS .app bundles
  if [[ "$(uname)" == "Darwin" ]]; then
    local p
    for p in \
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
        "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"; do
      [[ -x "$p" ]] && { echo "$p"; return 0; }
    done
  fi
  return 1
}

BROWSER_BIN="$(find_browser || true)"

# ---------- step 2: install Chromium if none found --------------------------
if [[ -z "${BROWSER_BIN:-}" ]]; then
  log "No Chromium-based browser detected – attempting install …"

  if [[ "$(uname)" == "Darwin" ]]; then
    is_cmd brew || die "Homebrew not found; install it first → https://brew.sh"
    brew install --cask --quiet chromium \
      || brew install --cask --quiet google-chrome
  else
    if is_cmd apt; then
      sudo apt update -qq && sudo apt install -y chromium-browser || \
      sudo apt install -y chromium
    elif is_cmd dnf; then
      sudo dnf install -y chromium
    elif is_cmd yum; then
      sudo yum install -y chromium
    elif is_cmd pacman; then
      sudo pacman -Sy --noconfirm chromium
    else
      die "No supported package manager (apt/dnf/yum/pacman) found."
    fi
  fi

  BROWSER_BIN="$(find_browser)" || die "Install appeared to succeed but no browser executable was found."
fi

log "Using browser: $BROWSER_BIN"

# ---------- step 3: create symlinks -----------------------------------------
LINK_DIR="$HOME/.local/bin"
mkdir -p "$LINK_DIR"

ln -sf "$BROWSER_BIN" "$LINK_DIR/chrome"
ln -sf "$BROWSER_BIN" "$LINK_DIR/browser"
log "Symlinks created:
  $LINK_DIR/chrome  → $BROWSER_BIN
  $LINK_DIR/browser → $BROWSER_BIN"

# ---------- step 4: ensure $LINK_DIR is on PATH -----------------------------
case ":$PATH:" in
  *":$LINK_DIR:"*) : ;; # already present
  *)
    warn "Add $LINK_DIR to your PATH (e.g. add this line to ~/.bashrc or ~/.zshrc):"
    echo "export PATH=\"\$HOME/.local/bin:\$PATH\""
    ;;
esac

log "Done ✔  Any program can now just run 'chrome' or 'browser'."

