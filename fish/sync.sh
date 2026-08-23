#!/usr/bin/env bash
# Sync ~/.config/fish into this repo, redacting anything secret-shaped.
# The live config is never modified; redaction happens only on the copy.
set -euo pipefail

SRC="${1:-$HOME/.config/fish}"
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.config/fish"

rsync -a --delete \
  --exclude '.git/' \
  --exclude 'fish_history' \
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

SECRET_NAME='[A-Za-z0-9_]*(KEY|TOKEN|SECRET|PASSWORD|PASSWD|CREDENTIAL|API|AUTH|SESSION|COOKIE|LICENSE|DSN)[A-Za-z0-9_]*'

while IFS= read -r -d '' file; do
  perl -0pi -e "
    s/^(\\s*set\\s+(?:-[A-Za-z-]+\\s+)*${SECRET_NAME})\\s+\\S.*\$/\\1 REDACTED/gm;
    s/^(\\s*(?:export\\s+)?${SECRET_NAME}=)\\S.*\$/\\1REDACTED/gm;
    s/^(SETUVAR(?:\\s+--[A-Za-z-]+)*\\s+${SECRET_NAME}:).*\$/\\1REDACTED/gm;
    s/\\b(sk-[A-Za-z0-9_-]{8}|ghp_[A-Za-z0-9]{8}|github_pat_[A-Za-z0-9_]{8}|xox[abprs]-[A-Za-z0-9-]{8}|AKIA[A-Z0-9]{8})[A-Za-z0-9_-]*/\\1REDACTED/g;
  " "$file"
done < <(find "$DEST" -type f -print0)

echo "synced $SRC -> $DEST (secret-shaped values redacted)"
