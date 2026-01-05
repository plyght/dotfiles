# Dotfiles

my personal dotfiles for macOS.

## Contents

- **claude**: [Claude Code](https://github.com/anthropics/claude-code) CLI config
- **equibop**: [Equicord](https://equicord.org/) Discord client config
- **flow**: [Flow Control](https://flow-control.dev/) editor config
- **ghostty**: [Ghostty](https://ghostty.org/) terminal dots
- **opencode**: [OhMyOpenCode](https://github.com/code-yeongyu/OhMyOpenCode) agent config
- **raycast**: [Raycast](https://raycast.com) extension dots

## Installation

Clone this repository to your home directory:

```bash
git clone https://github.com/plyght/dotfiles.git ~/dotfiles
```

Then (_I_) use [Stow](https://www.gnu.org/software/stow/) to symlink to ~/.config (or wherever your config dir is)
```bash
stow claude & stow equibop & stow flow & stow ghostty & stow opencode & stow raycast
```

## Usage

Each directory contains dotfiles for specific tools. Follow the individual setup instructions in each directory.

## Compatible Systems

these dots should work on most *nix systems.
