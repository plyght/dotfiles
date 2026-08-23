# Dotfiles

my personal dotfiles for macOS.

## Contents

- **claude**: [Claude Code](https://github.com/anthropics/claude-code) CLI config
- **equibop**: [Equicord](https://equicord.org/) Discord client config
- **flow**: [Flow Control](https://flow-control.dev/) editor config
- **fish**: [fish](https://fishshell.com) shell config (synced via `scripts/sync-fish.sh`, which redacts secret-shaped values)
- **ghostty**: [Ghostty](https://ghostty.org/) terminal dots
- **herdr**: [herdr](https://herdr.dev) multiplexer config (synced via `scripts/sync-herdr.sh`, which redacts secret-shaped values)
- **nvim**: [Neovim](https://neovim.io) editor config
- **opencode**: [OpenCode](https://github.com/anomalyco/opencode) AI config
- **pi**: [Pi](https://github.com/badlogic/pi-mono) coding agent config
- **raycast**: [Raycast](https://raycast.com) extension dots

## Installation

Clone this repository to your home directory:

```bash
git clone https://github.com/plyght/dotfiles.git ~/dotfiles
```

Then (_I_) use [Stow](https://www.gnu.org/software/stow/) to symlink to ~/.config (or wherever your config dir is)
```bash
stow claude & stow equibop & stow fish & stow flow & stow ghostty & stow herdr & stow nvim & stow opencode & stow pi & stow raycast
```

## Usage

Each directory contains dotfiles for specific tools. Follow the individual setup instructions in each directory.

## Compatible Systems

these dots should work on most *nix systems.
