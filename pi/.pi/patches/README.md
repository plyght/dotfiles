# pi patches

Local modifications to upstream pi extension packages that live in
`node_modules` and would otherwise get clobbered on every `pi install` /
update. Stored here as full-file replacements so they travel with dotfiles
and survive across machines.

## Usage

After installing or updating any patched package on a new machine — or after
a fresh `stow pi` — run:

```bash
~/.pi/patches/apply.sh
```

Idempotent. Safe to re-run any time. Reports per-file: `ok`, `patched`, or
`skip` (package not installed yet).

## What's patched and why

### `pi-collapse-tools/collapse-tools.ts`
Suppresses the `Collapse Tools: outputs hidden (Cmd+O to expand) • wrapped: ...`
startup banner. Functionality unchanged — just stops the notify call on
session start.

### `pi-web-access/index.ts`
Removes the registration of the broken `code_search` tool. The upstream tool
calls Exa's `get_code_context_exa` MCP method which is currently unavailable
or renamed. Removing the registration prevents the agent from ever trying to
call it. All other pi-web-access tools remain.

### `pi-fff/src/register-tools.ts`
Two changes:
1. Skips registering the `read` tool so it doesn't conflict with
   `pi-collapse-tools`' `read` wrapping. fff still resolves `@path` autocompletes
   before they reach read.
2. Adds a `collapsedRenderResult` helper applied to `grep`, `find_files`, and
   `fff_multi_grep` so their output is hidden by default and respects the same
   `Cmd+O` expand toggle as `pi-collapse-tools`.

### `pi-fff/src/index.ts`
Suppresses the `fff path + grep mode enabled (N files)` startup banner.
Error-path warnings (e.g. `fff unavailable: ...`) intentionally left intact.

## Regenerating after an upstream update

If a package update lands a meaningful change you want to keep, the patch
becomes outdated. To rebase:

1. Run `pi install <pkg>` to pull the new upstream version
2. Re-apply your changes manually in `node_modules` (Edit the file)
3. Copy the result back into `files/<pkg>/<path>` in this directory
4. Commit

If the patch is still trivial (banner suppression, etc.), `apply.sh` will
just overwrite the new upstream file with your old patched copy on the next
run — usually fine, occasionally loses a fix. Read the upstream changelog if
in doubt.

## Wiring into your shell (optional)

To always run `apply.sh` after `pi install`:

```fish
# ~/.config/fish/functions/pi.fish
function pi
    command pi $argv
    and test "$argv[1]" = "install" -o "$argv[1]" = "update"
    and ~/.pi/patches/apply.sh
end
```

(Or the bash/zsh equivalent.) Optional — running manually after updates
works fine too.
