# Neovim Configuration

Minimal Neovim configuration for developers transitioning from traditional editors. This setup keeps the default look-and-feel, adds practical IDE features (LSP, completion, search), and provides familiar shortcuts (Ctrl+S/C/V/Z/Y) with discoverability via which-key.

- Leader key: `<Space>`
- UI: transparent background (terminal colors), default colorscheme
- Plugin manager: `lazy.nvim`

## Prerequisites

### Required

- Neovim with Lua config support (recommended: **Neovim 0.9+**; 0.10+ preferred)
- `git` (for bootstrapping `lazy.nvim`)

### Optional / feature-specific

- `make`
  - Enables building `telescope-fzf-native.nvim` (faster fuzzy finding)
  - Also enables LuaSnip optional `install_jsregexp` build step (non-Windows)

## Philosophy and defaults

- **Minimal, functional defaults**: default colorscheme, no heavy theming.
- **Terminal-first UI**: transparent background (`Normal`, `NormalFloat`, `SignColumn`), `termguicolors` enabled.
- **Familiar shortcuts**: save/copy/paste/undo/redo aligned with common editors.
- **Learn-as-you-go**: which-key provides keybinding discovery.

Notable editor options:

- Relative simplicity: line numbers enabled, cursorline enabled, `scrolloff=10`.
- Search: `ignorecase` + `smartcase`, `<Esc>` clears search highlight.
- Splits: open to the right/bottom (`splitright`, `splitbelow`).
- Clipboard: uses system clipboard (`unnamedplus`).
- Sign column: disabled (`signcolumn=no`).

## Plugins

| Plugin | Purpose |
|---|---|
| `folke/lazy.nvim` | Plugin manager (bootstrapped automatically). |
| `tpope/vim-sleuth` | Automatic indentation detection. |
| `numToStr/Comment.nvim` | Easy commenting. |
| `folke/which-key.nvim` | Keybinding discovery popup. |
| `echasnovski/mini.nvim` | Curated mini-modules: surround, pairs, textobjects (ai), indentscope, move, files. |
| `nvim-telescope/telescope.nvim` | Fuzzy finder (files/grep/buffers/help/keymaps/etc.). |
| `nvim-telescope/telescope-fzf-native.nvim` | Native FZF sorter for Telescope (requires `make`). |
| `ahmedkhalf/project.nvim` | Project root detection and Telescope projects picker. |
| `neovim/nvim-lspconfig` | LSP client configurations. |
| `williamboman/mason.nvim` | LSP/tool installer UI. |
| `williamboman/mason-lspconfig.nvim` | Bridges Mason ↔ lspconfig. |
| `WhoIsSethDaniel/mason-tool-installer.nvim` | Ensures configured tools are installed. |
| `j-hui/fidget.nvim` | LSP status/progress UI. |
| `hrsh7th/nvim-cmp` | Autocompletion engine. |
| `L3MON4D3/LuaSnip` | Snippet engine (optional build step uses `make`). |
| `saadparwaiz1/cmp_luasnip` | LuaSnip completion source. |
| `hrsh7th/cmp-nvim-lsp` | LSP completion source. |
| `hrsh7th/cmp-path` | Path completion source. |
| `nvim-treesitter/nvim-treesitter` | Syntax highlighting/indent based on Treesitter. |
| `nvim-neo-tree/neo-tree.nvim` | Optional file tree explorer (`:Neotree`). |
| `folke/trouble.nvim` | Diagnostics list UI (`:Trouble`). |
| `pablopunk/pi.nvim` | Minimal AI assistant integration for pi. |

## Keybindings

Leader key is `<Space>`.

### Essentials (editing)

| Mode | Key | Action |
|---|---|---|
| Normal | `<C-s>` | Save file (`:w`). |
| Insert | `<C-s>` | Save file (`Esc`, `:w`, return to insert). |
| Visual | `<C-c>` | Copy to system clipboard (`"+y`). |
| Visual | `<C-x>` | Cut to system clipboard (`"+d`). |
| Normal | `<C-v>` | Paste from system clipboard (`"+p`). |
| Insert | `<C-v>` | Paste from system clipboard (`<C-r>+`). |
| Normal | `<C-z>` | Undo (`u`). |
| Insert | `<C-z>` | Undo (temporary normal, `u`, back to insert). |
| Normal | `<C-y>` | Redo (`<C-r>`). |
| Insert | `<C-y>` | Redo (temporary normal, `<C-r>`, back to insert). |
| Normal | `+` | Increment number under cursor (`<C-a>`). |
| Normal | `-` | Decrement number under cursor (`<C-x>`). |
| Normal | `<Esc>` | Clear search highlight (`:nohlsearch`). |

Notes:

- Yank highlighting is enabled via `TextYankPost` autocmd.

### Window navigation

| Mode | Key | Action |
|---|---|---|
| Normal | `<C-h>` | Focus left split. |
| Normal | `<C-l>` | Focus right split. |
| Normal | `<C-j>` | Focus lower split. |
| Normal | `<C-k>` | Focus upper split. |

### Terminal mode

| Mode | Key | Action |
|---|---|---|
| Terminal | `<Esc><Esc>` | Exit terminal mode to normal (`<C-\\><C-n>`). |

### Files and project

| Mode | Key | Action |
|---|---|---|
| Normal | `<leader>e` | Open Mini Files explorer at current file. |
| Normal | `<leader>t` | Toggle Neo-tree file tree (`:Neotree toggle`). |
| Normal | `<C-p>` | Find files (Telescope). |
| Normal | `<C-S-p>` | Command palette (Pulse). |
| Normal | `<leader>ff` | Find files (Telescope). |
| Normal | `<leader>fg` | Live grep (Telescope). |
| Normal | `<leader>fb` | Buffers (Telescope). |
| Normal | `<leader>fh` | Help tags (Telescope). |
| Normal | `<leader>fk` | Keymaps (Telescope). |
| Normal | `<leader>fp` | Projects picker (Telescope projects extension). |

### Diagnostics

| Mode | Key | Action |
|---|---|---|
| Normal | `<leader>q` | Open diagnostics location list (`vim.diagnostic.setloclist`). |
| Normal | `<leader>xx` | Toggle Trouble diagnostics view. |
| Normal | `<leader>xd` | Toggle Trouble diagnostics for current buffer. |

### LSP (buffer-local, active after server attaches)

These mappings are created on `LspAttach` and only apply to buffers with an attached LSP client.

| Key | Action |
|---|---|
| `gd` | Go to definition (Telescope). |
| `gr` | Go to references (Telescope). |
| `gI` | Go to implementation (Telescope). |
| `gD` | Go to declaration (LSP). |
| `K` | Hover documentation. |
| `<leader>D` | Type definition (Telescope). |
| `<leader>ds` | Document symbols (Telescope). |
| `<leader>ws` | Workspace symbols (Telescope). |
| `<leader>rn` | Rename symbol. |
| `<leader>ca` | Code action. |

### Completion (insert mode)

Powered by `nvim-cmp`.

| Mode | Key | Action |
|---|---|---|
| Insert | `<C-n>` | Select next completion item. |
| Insert | `<C-p>` | Select previous completion item. |
| Insert | `<C-y>` | Confirm selection (selects first when none selected). |
| Insert | `<C-Space>` | Trigger completion menu. |
| Insert/Select | `<C-l>` | Expand/jump forward in snippet (LuaSnip). |
| Insert/Select | `<C-h>` | Jump backward in snippet (LuaSnip). |

### AI (pi.nvim)

This configuration integrates `pi.nvim` and defines a few convenience keymaps.

#### Keybindings

| Mode | Key | Action |
|---|---|---|
| Normal | `<leader>ai` | Ask pi with the current buffer as context. |
| Visual | `<leader>ai` | Ask pi with the current selection as additional context. |
| Normal | `<leader>ac` | Cancel the active pi request. |
| Normal | `<leader>al` | Open the pi session log. |

#### Commands

| Command | Action |
|---|---|
| `:PiAsk` | Prompt for input, sends it + current buffer as context. |
| `:PiAskSelection` | Same as `:PiAsk` but also sends the selected lines. |
| `:PiCancel` | Cancel the active pi request immediately. |
| `:PiLog` | Open the session log in a new split. |

## Language support

- LSP is configured via Mason + lspconfig.
- Configured LSP servers:
  - `lua_ls` (Lua)
- Ensured tools via Mason Tool Installer:
  - `stylua`

## Troubleshooting

### Plugins did not install / `lazy.nvim` missing

- Ensure `git` is installed and on your `$PATH`.
- Restart Neovim. The config bootstraps `lazy.nvim` into:
  - `~/.local/share/nvim/lazy/lazy.nvim`

### Telescope FZF native extension not available

`telescope-fzf-native.nvim` only builds when `make` is available.

- Install build tools (providing `make`) and restart Neovim.
- The config loads the extension with `pcall`, so missing `make` will simply fall back to Lua sorting.

### LuaSnip build step skipped

LuaSnip uses `make install_jsregexp` when possible (non-Windows and when `make` exists). If `make` is not available, snippets still work, but the optional regex engine is not installed.

### Background is not transparent

This config sets `Normal`, `NormalFloat`, and `SignColumn` background to `NONE` on every `ColorScheme` event.

- Ensure your terminal supports truecolor and transparency.
- Some terminal themes force a background color; adjust your terminal settings if needed.

### LSP keymaps not working

Most LSP mappings are buffer-local and only exist after an LSP client attaches.

- `lua_ls` should attach automatically for Lua files once installed by Mason.
- For other languages, add servers to the `servers` table in `init.lua` and ensure the server binary is installed.

### Diagnostics signs/column

`signcolumn` is explicitly set to `no`, which hides sign icons/column.

- If you expect sign icons for diagnostics/gutter, change `vim.opt.signcolumn` accordingly.
