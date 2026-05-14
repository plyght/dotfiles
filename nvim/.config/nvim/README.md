# Neovim Configuration

AI-first, Mac-friendly Neovim config. This setup is intentionally not LazyVim and not a full classic IDE. It is a light editor shell for opening code when needed, navigating fast, and running real AI CLIs in Neovim terminal tabs/splits.

- Leader key: `<Space>`
- UI: transparent background, default colorscheme, small statusline
- Plugin manager: `lazy.nvim`
- Primary AI workflow: real terminal sessions for `pi`, `claude`, `codex`, or `opencode`

## Prerequisites

### Required

- Neovim 0.9+
- `git`

### Optional

- `make` for native Telescope FZF and Avante builds
- Nerd Font for icons
- AI CLIs on `$PATH`: `pi`, `claude`, `codex`, `opencode`

## Philosophy

- Keep Neovim minimal and understandable.
- Do not turn it into LazyVim or a heavy local IDE.
- Make AI terminals first-class: open Pi or another provider inside Neovim when useful.
- Keep local code viewing/editing strong with Treesitter, search, comments, surrounding, pairs, movement, file explorer, buffer tabs, and a current-directory recent-file splash screen.
- Skip LSP, Mason, completion popups, debugging, and diagnostics by default.

## Structure

```txt
init.lua
lua/config/options.lua
lua/config/keymaps.lua
lua/config/autocmds.lua
lua/config/lazy.lua
lua/config/ai_terminal.lua
lua/plugins/ai.lua
lua/plugins/editor.lua
lua/plugins/search.lua
lua/plugins/ui.lua
```

## Plugins

| Plugin | Purpose |
|---|---|
| `folke/lazy.nvim` | Plugin manager. |
| `tpope/vim-sleuth` | Automatic indentation detection. |
| `numToStr/Comment.nvim` | Comment toggling. |
| `folke/which-key.nvim` | Keybinding discovery. |
| `echasnovski/mini.nvim` | Surround, pairs, textobjects, move, files. |
| `nvim-treesitter/nvim-treesitter` | Syntax highlighting and indentation. |
| `nvim-telescope/telescope.nvim` | Buffers, help, keymaps, projects. |
| `dmtrKovalenko/fff.nvim` | Fast file finding and grep. |
| `folke/snacks.nvim` | Dashboard and sidebar explorer. |
| `akinsho/bufferline.nvim` | Minimal visible buffer tabs. |
| `yetone/avante.nvim` | Optional code-aware AI panel. |
| `pablopunk/pi.nvim` | Pi integration. |

## Keybindings

### AI

| Mode | Key | Action |
|---|---|---|
| Normal | `<leader>aa` | Pick an AI CLI and open it in a Neovim tab. |
| Normal | `<leader>as` | Pick an AI CLI and open it in a bottom split. |
| Normal | `<leader>ap` | Open `pi` in a Neovim terminal tab. |
| Normal | `<leader>aP` | Open `pi` in a bottom split. |
| Normal | `<leader>ai` | Ask pi through `pi.nvim`. |
| Visual | `<leader>ai` | Ask pi with selection. |
| Normal | `<leader>ac` | Cancel active pi request. |
| Normal | `<leader>al` | Open pi log. |
| Normal | `<leader>av` | Avante ask. |
| Visual | `<leader>ae` | Avante edit selection. |
| Normal | `<leader>at` | Toggle Avante. |
| Normal | `<leader>ar` | Refresh Avante. |
| Normal | `<leader>ax` | Clear Avante. |

Commands:

| Command | Action |
|---|---|
| `:Ai` | Pick an available AI CLI and open it in a tab. |
| `:Ai pi` | Open a specific command in a tab. |
| `:AiSplit` | Pick an available AI CLI and open it in a split. |
| `:AiSplit pi` | Open a specific command in a split. |

### Splash screen

The startup screen shows a centered time-aware greeting, a small rotating saying, and recent files from the current directory. If there are no recent files for the current directory, it falls back to a sorted file list favoring shallow, readable project files. It filters common noisy paths like `.git`, `.jj`, `node_modules`, `dist`, `target`, `.next`, `.venv`, caches, and build output.

| Mode | Key | Action |
|---|---|---|
| Normal | `j` | Move down recent files. |
| Normal | `k` | Move up recent files. |
| Normal | `<C-d>` | Scroll down. |
| Normal | `<C-u>` | Scroll up. |
| Normal | `<CR>` | Open selected file. |
| Normal | `q` | Close splash screen. |

### Files and navigation

| Mode | Key | Action |
|---|---|---|
| Normal/Insert/Visual | `<D-p>` | Find files. |
| Normal/Insert/Visual | `<D-S-p>` | Grep workspace. |
| Normal | `<C-p>` | Find files. |
| Normal | `<C-S-p>` | Grep workspace. |
| Normal/Insert/Visual | `<D-S-f>` | Grep workspace. |
| Normal/Insert/Visual | `<D-b>` | Toggle sidebar. |
| Normal/Insert/Visual | `<D-e>` | Switch buffer. |
| Normal | `<leader>e` | Mini file explorer. |
| Normal | `<leader>fp` | Find projects. |
| Normal | `<leader>fh` | Find help. |
| Normal | `<leader>fk` | Find keymaps. |
| Normal | `<leader>fb` | Find buffers. |

### Buffers

| Mode | Key | Action |
|---|---|---|
| Normal | `<Tab>` | Next buffer tab. |
| Normal | `<S-Tab>` | Previous buffer tab. |
| Normal | `<leader>bp` | Pick buffer tab. |
| Normal | `<leader>bc` | Close buffer. |
| Normal/Insert | `<D-w>` | Close buffer. |

### Editing

| Mode | Key | Action |
|---|---|---|
| Normal/Insert | `<D-s>` | Save. |
| Normal | `<C-s>` | Save. |
| Insert | `<C-s>` | Save and return to insert. |
| Normal/Insert | `<D-z>` | Undo. |
| Normal/Insert | `<D-S-z>` | Redo. |
| Visual | `<D-c>` | Copy. |
| Normal/Insert | `<D-v>` | Paste. |
| Normal/Visual | `<D-/>` | Toggle comment. |
| Visual | `<C-c>` | Copy. |
| Visual | `<C-x>` | Cut. |
| Normal | `<C-v>` | Paste. |
| Insert | `<C-v>` | Paste. |
| Normal | `<Esc>` | Clear search highlight. |

### Windows and terminal

| Mode | Key | Action |
|---|---|---|
| Normal | `<C-h>` | Focus left split. |
| Normal | `<C-l>` | Focus right split. |
| Normal | `<C-j>` | Focus lower split. |
| Normal | `<C-k>` | Focus upper split. |
| Terminal | `<Esc><Esc>` | Exit terminal mode. |

## Notes

This config intentionally removed the previous LSP/Mason/completion/Trouble layer. If local language intelligence becomes useful again, add it back as a small optional plugin module instead of migrating to a full distro.
