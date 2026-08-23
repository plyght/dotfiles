#!/usr/bin/env bash
# Sync ~/.config/herdr into this repo, redacting anything secret-shaped.
# The live config is never modified; redaction happens only on the copy.
# Runtime state (logs, sockets, session history) is left out entirely.
set -euo pipefail

SRC="${1:-$HOME/.config/herdr}"
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../herdr/.config/herdr"

rsync -a --delete \
  --exclude '.git/' \
  --exclude '*.log' \
  --exclude '*.sock' \
  --exclude 'session.json' \
  --exclude 'session-history.json' \
  --exclude 'release-notes.json' \
  --exclude '*.bak' \
  --exclude '*.bak-*' \
  --exclude '*.bak.*' \
  --exclude '*.backup-*' \
  --exclude '.env' \
  --exclude '.env.*' \
  --exclude '*secret*' \
  --exclude '*credential*' \
  --exclude '*.pem' \
  --exclude '*.p8' \
  "$SRC/" "$DEST/"

SECRET_NAME='[A-Za-z0-9_-]*(token|secret|password|passwd|credential|apikey|api_key|access_key|private_key|signing_key|license_key|dsn)[A-Za-z0-9_-]*'

while IFS= read -r -d '' file; do
  perl -0pi -e "
    s/^(\\s*\\\"?${SECRET_NAME}\\\"?\\s*=\\s*).*\$/\\1\\\"REDACTED\\\"/gmi;
    s/^(\\s*\\\"${SECRET_NAME}\\\"\\s*:\\s*).*\$/\\1\\\"REDACTED\\\",/gmi;
    s/\\b(sk-[A-Za-z0-9_-]{8}|ghp_[A-Za-z0-9]{8}|github_pat_[A-Za-z0-9_]{8}|xox[abprs]-[A-Za-z0-9-]{8}|AKIA[A-Z0-9]{8})[A-Za-z0-9_-]*/\\1REDACTED/g;
  " "$file"
done < <(find "$DEST" -type f -print0)

echo "synced $SRC -> $DEST (secret-shaped values redacted)"
