# Minimal fish config for nicojaffer2

set -gx EDITOR nvim

if test -e /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.fish
    source /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.fish
end

if status is-interactive
    # Homebrew is currently read-only from this user; load it first so user-local tools can override it below.
    if test -x /opt/homebrew/bin/brew
        eval (/opt/homebrew/bin/brew shellenv)
    end
    set -gx HOMEBREW_NO_AUTO_UPDATE 1
    set -gx HOMEBREW_NO_INSTALL_CLEANUP 1

    # Common system/user tool dirs.
    fish_add_path $HOME/.local/bin
    fish_add_path --move --prepend /opt/homebrew/bin /opt/homebrew/sbin
    set -l path_without_usr_local
    for path_entry in $PATH
        if test "$path_entry" != /usr/local/bin; and test "$path_entry" != /usr/local/sbin
            set -a path_without_usr_local $path_entry
        end
    end
    set -gx PATH $path_without_usr_local /usr/local/bin /usr/local/sbin

    # Docker Desktop per-user CLI.
    fish_add_path $HOME/.docker/bin

    # Bun: fully local/writable for this user.
    set -gx BUN_INSTALL /Users/nicojaffer2/.bun
    fish_add_path /Users/nicojaffer2/.bun/bin

    # npm: local/writable global installs for this user.
    set -gx npm_config_prefix /Users/nicojaffer2/.npm-global
    set -gx NPM_CONFIG_PREFIX /Users/nicojaffer2/.npm-global
    fish_add_path /Users/nicojaffer2/.npm-global/bin

    # Rust/Cargo/Rustup: local state and local shims for this user.
    set -gx CARGO_HOME /Users/nicojaffer2/.cargo
    set -gx RUSTUP_HOME /Users/nicojaffer2/.rustup
    fish_add_path /Users/nicojaffer2/.cargo/bin

    # Node runtime fallback: use existing old NVM Node unless/until we install a local Node manager.
    # npm global installs still go to ~/.npm-global because of npm_config_prefix above.
    if test -d /Users/nicojaffer/.nvm/versions/node/v22.12.0/bin
        fish_add_path /Users/nicojaffer/.nvm/versions/node/v22.12.0/bin
    end

    # Atuin history, now from local ~/.cargo/bin.
    if test -x /Users/nicojaffer2/.cargo/bin/atuin
        atuin init fish | source
    end

    # Quick jumps.
    alias oldhome 'cd /Users/nicojaffer'
    alias oldprojects 'cd /Users/nicojaffer/Projects'
    alias oldprojects2 'cd /Users/nicojaffer/projects'
    alias oldsrc 'cd /Users/nicojaffer/src'
end

# >>> grok installer >>>
fish_add_path $HOME/.grok/bin
# <<< grok installer <<<
if test -x /Users/nicojaffer2/.cargo/bin/zoxide
    /Users/nicojaffer2/.cargo/bin/zoxide init fish | source
end

# Added by Devin
fish_add_path /Users/nicojaffer2/.codeium/windsurf/bin
fish_add_path --move --prepend /Users/nicojaffer2/.bun/bin
fish_add_path --move --prepend $HOME/.local/bin
fish_add_path --move --prepend $HOME/.local/wax/bin

# User-space clock skew (-4h) — no admin/sudo
fish_add_path --move --prepend $HOME/.local/bin
if test -f $HOME/.local/share/time-skew/enabled
    and test -f $HOME/.local/wax/lib/faketime/libfaketime.1.dylib
    set -l _skew_lib $HOME/.local/wax/lib/faketime/libfaketime.1.dylib
    set -l _skew_off (tr -d '[:space:]' <$HOME/.local/share/time-skew/offset 2>/dev/null)
    test -n "$_skew_off"; or set _skew_off -4h
    if not string match -q "*$_skew_lib*" -- "$DYLD_INSERT_LIBRARIES"
        if set -q DYLD_INSERT_LIBRARIES
            set -gx DYLD_INSERT_LIBRARIES $_skew_lib:$DYLD_INSERT_LIBRARIES
        else
            set -gx DYLD_INSERT_LIBRARIES $_skew_lib
        end
    end
    set -gx FAKETIME $_skew_off
    set -gx FAKETIME_NO_CACHE 1
    set -gx FAKETIME_DONT_FAKE_MONOTONIC 1
end

if status is-interactive; and isatty stdin; and isatty stdout; and not set -q DWIW_SOCK; and not set -q DWIW_DISABLE; and command -q dwiw
    dwiw
    set -l dwiw_status $status
    if test $dwiw_status -eq 0
        exit 0
    end
    echo "dwiw exited with status $dwiw_status; continuing in plain fish" >&2
end
