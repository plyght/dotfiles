#!/usr/bin/env bash
# Sync the bunx-skills store (~/.agents) into this repo.
# Covers .skill-lock.json plus every installed skill, so a restore works even
# for the skills the lockfile does not cover. The live store is never modified.
#
# Unlike the fish/herdr syncs this does NOT rewrite secret-shaped names: these
# are upstream source trees where identifiers like `token` or `api_key` are real
# code. Instead it copies verbatim and reports any literal secret-shaped values
# for review; the TruffleHog pre-commit hook is the hard gate.
set -euo pipefail

SRC="${1:-$HOME/.agents}"
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../agents/.agents"

rsync -a --delete \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  --exclude '*.sock' \
  --exclude '.env' \
  --exclude '.env.*' \
  --exclude '*.pem' \
  --exclude '*.p8' \
  "$SRC/" "$DEST/"

echo "synced $SRC -> $DEST"

LITERAL='(sk-[A-Za-z0-9_-]{16}|ghp_[A-Za-z0-9]{20}|github_pat_[A-Za-z0-9_]{22}|xox[abprs]-[A-Za-z0-9-]{10}|AKIA[A-Z0-9]{12}|-----BEGIN [A-Z ]*PRIVATE KEY-----)'
hits=$(grep -rnIE "$LITERAL" "$DEST" || true)
if [ -n "$hits" ]; then
  echo
  echo "review: literal secret-shaped values found (upstream samples are usually fine):"
  echo "$hits"
fi
