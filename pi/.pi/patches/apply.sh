#!/usr/bin/env bash
# Re-applies local pi extension patches after a fresh install or update.
# Idempotent: skips files that already match. Cross-platform via `npm root -g`.
#
# Run after any: pi install <patched-pkg> | pi update | fresh dotfiles clone.
#
# Patches stored as full-file replacements under ./files/<pkg>/<rel-path>.
# To regenerate after upstream updates: edit the file in node_modules,
# then `cp` it back into ./files/<pkg>/<rel-path>.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FILES_DIR="$SCRIPT_DIR/files"

if ! command -v npm >/dev/null 2>&1; then
  echo "error: npm not found on PATH — needed to locate global node_modules" >&2
  exit 1
fi

NPM_ROOT="$(npm root -g)"

if [[ ! -d "$NPM_ROOT" ]]; then
  echo "error: npm global root not found at $NPM_ROOT" >&2
  exit 1
fi

ok=0
patched=0
skipped=0
missing=0

apply_one() {
  local rel="$1"
  local src="$FILES_DIR/$rel"
  local dst="$NPM_ROOT/$rel"

  if [[ ! -f "$dst" ]]; then
    printf '  \e[33mskip\e[0m  %s (package not installed)\n' "$rel"
    missing=$((missing + 1))
    return
  fi

  if cmp -s "$src" "$dst"; then
    printf '  \e[32mok\e[0m    %s\n' "$rel"
    ok=$((ok + 1))
    return
  fi

  cp "$src" "$dst"
  printf '  \e[36mpatched\e[0m %s\n' "$rel"
  patched=$((patched + 1))
}

echo "applying pi patches from $FILES_DIR"
echo "into npm global root: $NPM_ROOT"
echo

# Discover every file under files/ and apply it relative to npm root.
while IFS= read -r -d '' f; do
  rel="${f#$FILES_DIR/}"
  apply_one "$rel"
done < <(find "$FILES_DIR" -type f -print0)

echo
echo "summary: $ok already up-to-date, $patched newly patched, $missing missing, $skipped skipped"

if [[ $missing -gt 0 ]]; then
  echo
  echo "note: missing entries usually mean the package isn't installed on this machine."
  echo "      install it with \`pi install <pkg>\` then re-run this script."
fi
