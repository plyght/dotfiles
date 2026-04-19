vim.g.mapleader = ' '
vim.g.maplocalleader = ' '

vim.opt.number = true
vim.opt.mouse = 'a'
vim.opt.showmode = false
vim.opt.clipboard = 'unnamedplus'
vim.opt.breakindent = true
vim.opt.undofile = true
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.signcolumn = 'no'
vim.opt.updatetime = 250
vim.opt.timeoutlen = 300
vim.opt.splitright = true
vim.opt.splitbelow = true
vim.opt.list = true
vim.opt.listchars = { tab = '» ', trail = '·', nbsp = '␣' }
vim.opt.inccommand = 'split'
vim.opt.cursorline = true
vim.opt.scrolloff = 10
vim.opt.hlsearch = true
vim.opt.termguicolors = true
vim.opt.laststatus = 3
vim.opt.fillchars = { eob = " ", stl = " ", stlnc = " " }
vim.opt.statusline = "%{%(&filetype==#'ministarter')?'':'  %#StatusLineDim#%f%#StatusLineAccent#%m %= %#StatusLineDim#%y  %l:%c  '%}"

vim.api.nvim_create_autocmd('ColorScheme', {
  pattern = '*',
  callback = function()
    vim.api.nvim_set_hl(0, 'Normal', { bg = 'NONE', ctermbg = 'NONE' })
    vim.api.nvim_set_hl(0, 'NormalFloat', { bg = 'NONE', ctermbg = 'NONE' })
    vim.api.nvim_set_hl(0, 'SignColumn', { bg = 'NONE', ctermbg = 'NONE' })
    vim.api.nvim_set_hl(0, 'StatusLine', { bg = 'NONE', fg = '#6c7086' })
    vim.api.nvim_set_hl(0, 'StatusLineNC', { bg = 'NONE', fg = '#313244' })
    vim.api.nvim_set_hl(0, 'StatusLineDim', { bg = 'NONE', fg = '#585b70' })
    vim.api.nvim_set_hl(0, 'StatusLineAccent', { bg = 'NONE', fg = '#89b4fa' })
    vim.api.nvim_set_hl(0, 'MiniStarterHeader', { fg = '#6c7086', bold = false })
    vim.api.nvim_set_hl(0, 'MiniStarterFooter', { fg = '#45475a' })
    vim.api.nvim_set_hl(0, 'MiniStarterItem', { fg = '#cdd6f4' })
    vim.api.nvim_set_hl(0, 'MiniStarterSection', { fg = '#45475a' })
    vim.api.nvim_set_hl(0, 'MiniStarterCurrent', { fg = '#89b4fa', bold = true })
    vim.api.nvim_set_hl(0, 'MiniStarterItemPrefix', { fg = '#585b70' })
  end,
})

vim.cmd.colorscheme 'default'

vim.keymap.set('n', '<Esc>', '<cmd>nohlsearch<CR>')
vim.keymap.set('n', '<leader>q', vim.diagnostic.setloclist, { desc = 'Open diagnostic [Q]uickfix list' })
vim.keymap.set('t', '<Esc><Esc>', '<C-\\><C-n>', { desc = 'Exit terminal mode' })
vim.keymap.set('n', '<C-h>', '<C-w><C-h>', { desc = 'Move focus to the left window' })
vim.keymap.set('n', '<C-l>', '<C-w><C-l>', { desc = 'Move focus to the right window' })
vim.keymap.set('n', '<C-j>', '<C-w><C-j>', { desc = 'Move focus to the lower window' })
vim.keymap.set('n', '<C-k>', '<C-w><C-k>', { desc = 'Move focus to the upper window' })

vim.keymap.set('n', '<C-s>', '<cmd>w<CR>', { desc = 'Save file' })
vim.keymap.set('i', '<C-s>', '<Esc><cmd>w<CR>a', { desc = 'Save file' })
vim.keymap.set('n', '<C-z>', 'u', { desc = 'Undo' })
vim.keymap.set('i', '<C-z>', '<Esc>ua', { desc = 'Undo' })
vim.keymap.set('n', '<C-y>', '<C-r>', { desc = 'Redo' })
vim.keymap.set('i', '<C-y>', '<Esc><C-r>a', { desc = 'Redo' })
vim.keymap.set('v', '<C-c>', '"+y', { desc = 'Copy' })
vim.keymap.set('n', '<C-v>', '"+p', { desc = 'Paste' })
vim.keymap.set('i', '<C-v>', '<C-r>+', { desc = 'Paste' })
vim.keymap.set('v', '<C-x>', '"+d', { desc = 'Cut' })

vim.keymap.set({ 'n', 'i', 'v' }, '<D-p>', function() require('fff').find_files() end, { desc = 'Find files' })
vim.keymap.set({ 'n', 'i', 'v' }, '<D-S-p>', function() require('fff').live_grep() end, { desc = 'Grep workspace' })
vim.keymap.set('n', '<C-p>', function() require('fff').find_files() end, { desc = 'Find files' })
vim.keymap.set('n', '<C-S-p>', function() require('fff').live_grep() end, { desc = 'Grep workspace' })
vim.keymap.set({ 'n', 'i', 'v' }, '<D-S-f>', function() require('fff').live_grep() end, { desc = 'Grep workspace' })
vim.keymap.set({ 'n', 'i', 'v' }, '<D-b>', function() require('snacks').explorer() end, { desc = 'Toggle sidebar' })
vim.keymap.set({ 'n', 'i', 'v' }, '<D-e>', function() require('telescope.builtin').buffers() end, { desc = 'Switch buffer' })
vim.keymap.set({ 'n', 'i' }, '<D-s>', '<Esc><cmd>w<CR>', { desc = 'Save' })
vim.keymap.set({ 'n', 'i' }, '<D-z>', '<Esc>ua', { desc = 'Undo' })
vim.keymap.set({ 'n', 'i' }, '<D-S-z>', '<Esc><C-r>a', { desc = 'Redo' })
vim.keymap.set('v', '<D-c>', '"+y', { desc = 'Copy' })
vim.keymap.set({ 'n', 'i' }, '<D-v>', '<C-r>+', { desc = 'Paste' })
vim.keymap.set('n', '<D-/>', 'gcc', { remap = true, desc = 'Toggle comment' })
vim.keymap.set('v', '<D-/>', 'gc', { remap = true, desc = 'Toggle comment' })
vim.keymap.set({ 'n', 'i' }, '<D-w>', '<cmd>bd<CR>', { desc = 'Close buffer' })

vim.api.nvim_create_autocmd('TextYankPost', {
  desc = 'Highlight when yanking text',
  group = vim.api.nvim_create_augroup('highlight-yank', { clear = true }),
  callback = function()
    vim.highlight.on_yank()
  end,
})

local lazypath = vim.fn.stdpath 'data' .. '/lazy/lazy.nvim'
if not vim.loop.fs_stat(lazypath) then
  local lazyrepo = 'https://github.com/folke/lazy.nvim.git'
  vim.fn.system { 'git', 'clone', '--filter=blob:none', '--branch=stable', lazyrepo, lazypath }
end
vim.opt.rtp:prepend(lazypath)

require('lazy').setup({
  'tpope/vim-sleuth',
  
  { 'numToStr/Comment.nvim', opts = {} },
  
  {
    'folke/which-key.nvim',
    event = 'VeryLazy',
    opts = {
      delay = 500,
    },
  },
  
  {
    'echasnovski/mini.nvim',
    config = function()
      require('mini.surround').setup()
      require('mini.pairs').setup()
      require('mini.ai').setup()
      require('mini.move').setup()
      require('mini.files').setup()
      local starter = require('mini.starter')
      starter.setup({
        query_updaters = 'abcdefghilmnopqrstuvwxyz0123456789_-.',
        header = table.concat({
          '                   +++++++=+++++++=                   ',
          '                  +@@@@@@@-=@@@@@@@-                  ',
          '                 :@@@@@@@*  #@@@@@@@.                 ',
          '                 %@@@@@@@.  :@@@@@@@*                 ',
          '                =@@@@@@@-    =@@@@@@@-                ',
          '               :@@@@@@@#++++++#@@@@@@@.               ',
          '               #@@@@@@@@@@@@@@%@@@@@@@*               ',
          '              =@@@@@@@-@@@@@@@%+@@@@@@@-              ',
          '             .@@@@@@@* @@@@@@@%.%@@@@@@@.             ',
          '             #@@@@@@@. @@@@@@@% :@@@@@@@*             ',
          '            =@@@@@@@=  @@@@@@@%  +@@@@@@@-            ',
          '           .@@@@@@@#   @@@@@@@%  .%@@@@@@%.           ',
          '        :##%@@@@@@@%###-------=###%@@@@@@@%#*.        ',
          '         .*@@@@@@@@@@@@.      :@@@@@@@@@@@@+.         ',
          '           -@@@@@@@@@@@.      :@@@@@@@@@@%:           ',
          '            .*@@@@@@@@@.      :@@@@@@@@@+.            ',
          '              :--------#######*--------:              ',
          '                       @@@@@@@%                       ',
          '                       @@@@@@@%                       ',
          '                       @@@@@@@%                       ',
          '                       +++++++=                       ',
        }, '\n'),
        footer = '',
        items = {
          function()
            local cwd = vim.loop.fs_realpath(vim.fn.getcwd()) or vim.fn.getcwd()
            local seen = {}
            local items = {}
            for _, raw in ipairs(vim.v.oldfiles) do
              local path = vim.loop.fs_realpath(raw)
              if path and not seen[path] and vim.startswith(path, cwd .. '/') and vim.fn.filereadable(path) == 1 then
                seen[path] = true
                local rel = path:sub(#cwd + 2)
                table.insert(items, {
                  action = 'edit ' .. vim.fn.fnameescape(raw),
                  name = rel,
                  section = '',
                })
                if #items >= 5 then break end
              end
            end
            if #items == 0 then
              table.insert(items, { action = 'enew', name = 'new file', section = '' })
            end
            return items
          end,
        },
        content_hooks = {
          starter.gen_hook.adding_bullet('  '),
          starter.gen_hook.aligning('center', 'center'),
        },
      })

      vim.api.nvim_create_autocmd('User', {
        pattern = 'MiniStarterOpened',
        callback = function(event)
          vim.keymap.set('n', 'j', function() MiniStarter.update_current_item('next') end, { buffer = event.buf, silent = true, nowait = true })
          vim.keymap.set('n', 'k', function() MiniStarter.update_current_item('prev') end, { buffer = event.buf, silent = true, nowait = true })

          vim.api.nvim_set_hl(0, 'MiniStarterCursor', { blend = 100, nocombine = true })
          local saved_guicursor = vim.o.guicursor
          vim.o.guicursor = 'n-v-c-sm:MiniStarterCursor,i-ci-ve:ver25,r-cr-o:hor20'

          vim.api.nvim_create_autocmd({ 'BufLeave', 'BufWipeout', 'CmdlineEnter' }, {
            buffer = event.buf,
            callback = function()
              vim.o.guicursor = saved_guicursor
            end,
          })
          vim.api.nvim_create_autocmd('BufEnter', {
            buffer = event.buf,
            callback = function()
              vim.o.guicursor = 'n-v-c-sm:MiniStarterCursor,i-ci-ve:ver25,r-cr-o:hor20'
            end,
          })
          vim.api.nvim_create_autocmd('CmdlineLeave', {
            callback = function()
              if vim.bo.filetype == 'ministarter' then
                vim.o.guicursor = 'n-v-c-sm:MiniStarterCursor,i-ci-ve:ver25,r-cr-o:hor20'
              end
            end,
          })
        end,
      })
      
      vim.keymap.set('n', '<leader>e', function() require('mini.files').open(vim.api.nvim_buf_get_name(0)) end, { desc = 'File [E]xplorer' })
    end,
  },
  
  {
    'nvim-telescope/telescope.nvim',
    event = 'VimEnter',
    branch = '0.1.x',
    dependencies = {
      'nvim-lua/plenary.nvim',
      {
        'nvim-telescope/telescope-fzf-native.nvim',
        build = 'make',
        cond = function()
          return vim.fn.executable 'make' == 1
        end,
      },
      'ahmedkhalf/project.nvim',
    },
    config = function()
      require('project_nvim').setup {
        detection_methods = { 'pattern' },
        patterns = { '.git', 'package.json', 'Cargo.toml', 'go.mod', 'pyproject.toml' },
      }
      
      require('telescope').setup {}
      pcall(require('telescope').load_extension, 'fzf')
      pcall(require('telescope').load_extension, 'projects')
      
      local builtin = require 'telescope.builtin'
      vim.keymap.set('n', '<leader>fp', function() require('telescope').extensions.projects.projects {} end, { desc = '[F]ind [P]rojects' })
      vim.keymap.set('n', '<leader>fh', builtin.help_tags, { desc = '[F]ind [H]elp' })
      vim.keymap.set('n', '<leader>fk', builtin.keymaps, { desc = '[F]ind [K]eymaps' })
    end,
  },
  
  {
    'neovim/nvim-lspconfig',
    dependencies = {
      'williamboman/mason.nvim',
      'williamboman/mason-lspconfig.nvim',
      { 'j-hui/fidget.nvim', opts = {} },
    },
    config = function()
      vim.api.nvim_create_autocmd('LspAttach', {
        group = vim.api.nvim_create_augroup('lsp-attach', { clear = true }),
        callback = function(event)
          local map = function(keys, func, desc)
            vim.keymap.set('n', keys, func, { buffer = event.buf, desc = 'LSP: ' .. desc })
          end
          
          map('gd', require('telescope.builtin').lsp_definitions, '[G]oto [D]efinition')
          map('gr', require('telescope.builtin').lsp_references, '[G]oto [R]eferences')
          map('gI', require('telescope.builtin').lsp_implementations, '[G]oto [I]mplementation')
          map('<leader>D', require('telescope.builtin').lsp_type_definitions, 'Type [D]efinition')
          map('<leader>ds', require('telescope.builtin').lsp_document_symbols, '[D]ocument [S]ymbols')
          map('<leader>ws', require('telescope.builtin').lsp_dynamic_workspace_symbols, '[W]orkspace [S]ymbols')
          map('<leader>rn', vim.lsp.buf.rename, '[R]e[n]ame')
          map('<leader>ca', vim.lsp.buf.code_action, '[C]ode [A]ction')
          map('K', vim.lsp.buf.hover, 'Hover Documentation')
          map('gD', vim.lsp.buf.declaration, '[G]oto [D]eclaration')
          
          local client = vim.lsp.get_client_by_id(event.data.client_id)
          if client and client.server_capabilities.documentHighlightProvider then
            vim.api.nvim_create_autocmd({ 'CursorHold', 'CursorHoldI' }, {
              buffer = event.buf,
              callback = vim.lsp.buf.document_highlight,
            })
            vim.api.nvim_create_autocmd({ 'CursorMoved', 'CursorMovedI' }, {
              buffer = event.buf,
              callback = vim.lsp.buf.clear_references,
            })
          end
        end,
      })
      
      local capabilities = vim.lsp.protocol.make_client_capabilities()
      capabilities = vim.tbl_deep_extend('force', capabilities, require('cmp_nvim_lsp').default_capabilities())
      
      local servers = {
        lua_ls = {
          settings = {
            Lua = {
              diagnostics = { globals = { 'vim' } },
            },
          },
        },
      }
      
      require('mason').setup()
      
      require('mason-lspconfig').setup {
        ensure_installed = vim.tbl_keys(servers or {}),
        handlers = {
          function(server_name)
            local server = servers[server_name] or {}
            server.capabilities = vim.tbl_deep_extend('force', {}, capabilities, server.capabilities or {})
            require('lspconfig')[server_name].setup(server)
          end,
        },
      }
    end,
  },
  
  {
    'WhoIsSethDaniel/mason-tool-installer.nvim',
    dependencies = {
      'williamboman/mason.nvim',
      'williamboman/mason-lspconfig.nvim',
    },
    event = 'VeryLazy',
    config = function()
      require('mason-tool-installer').setup {
        ensure_installed = {
          'stylua',
        },
        run_on_start = true,
      }
    end,
  },
  
  {
    'hrsh7th/nvim-cmp',
    event = 'InsertEnter',
    dependencies = {
      {
        'L3MON4D3/LuaSnip',
        build = (function()
          if vim.fn.has 'win32' == 1 or vim.fn.executable 'make' == 0 then
            return
          end
          return 'make install_jsregexp'
        end)(),
      },
      'saadparwaiz1/cmp_luasnip',
      'hrsh7th/cmp-nvim-lsp',
      'hrsh7th/cmp-path',
    },
    config = function()
      local cmp = require 'cmp'
      local luasnip = require 'luasnip'
      luasnip.config.setup {}
      
      cmp.setup {
        snippet = {
          expand = function(args)
            luasnip.lsp_expand(args.body)
          end,
        },
        completion = { completeopt = 'menu,menuone,noinsert' },
        mapping = cmp.mapping.preset.insert {
          ['<C-n>'] = cmp.mapping.select_next_item(),
          ['<C-p>'] = cmp.mapping.select_prev_item(),
          ['<C-y>'] = cmp.mapping.confirm { select = true },
          ['<C-Space>'] = cmp.mapping.complete {},
          ['<C-l>'] = cmp.mapping(function()
            if luasnip.expand_or_locally_jumpable() then
              luasnip.expand_or_jump()
            end
          end, { 'i', 's' }),
          ['<C-h>'] = cmp.mapping(function()
            if luasnip.locally_jumpable(-1) then
              luasnip.jump(-1)
            end
          end, { 'i', 's' }),
        },
        sources = {
          { name = 'nvim_lsp' },
          { name = 'luasnip' },
          { name = 'path' },
        },
      }
    end,
  },
  
  {
    'nvim-treesitter/nvim-treesitter',
    build = ':TSUpdate',
    main = 'nvim-treesitter.configs',
    opts = {
      ensure_installed = { 'bash', 'c', 'lua', 'markdown', 'markdown_inline', 'vim', 'vimdoc' },
      auto_install = true,
      highlight = { enable = true },
      indent = { enable = true },
    },
  },
  

  {
    'folke/trouble.nvim',
    cmd = 'Trouble',
    keys = {
      { '<leader>xx', '<cmd>Trouble diagnostics toggle<CR>', desc = 'Diagnostics (Trouble)' },
      { '<leader>xd', '<cmd>Trouble diagnostics toggle filter.buf=0<CR>', desc = 'Buffer Diagnostics (Trouble)' },
    },
    opts = {},
  },
  
  {
    'folke/snacks.nvim',
    lazy = false,
    priority = 1000,
    opts = {
      explorer = {},
    },
  },


  {
    'dmtrKovalenko/fff.nvim',
    version = '0.5.2',
    build = function()
      require('fff.download').download_or_build_binary()
    end,
    lazy = false,
    opts = {
      prompt = '🪿 ',
      title = 'FFFiles',
      lazy_sync = true,
      debug = {
        enabled = false,
        show_scores = false,
      },
      logging = {
        enabled = true,
        log_level = 'info',
      },
    },
    config = function(_, opts)
      require('fff').setup(opts)
    end,
  },
  
  {
    'yetone/avante.nvim',
    build = 'make',
    event = 'VeryLazy',
    version = false,
    keys = {
      { '<leader>aa', '<cmd>AvanteAsk<CR>', desc = '[A]vante [A]sk' },
      { '<leader>ae', '<cmd>AvanteEdit<CR>', desc = '[A]vante [E]dit', mode = 'v' },
      { '<leader>at', '<cmd>AvanteToggle<CR>', desc = '[A]vante [T]oggle' },
      { '<leader>ar', '<cmd>AvanteRefresh<CR>', desc = '[A]vante [R]efresh' },
      { '<leader>ac', '<cmd>AvanteClear<CR>', desc = '[A]vante [C]lear' },
    },
    opts = {
      provider = 'openai',
      providers = {
        openai = {
          model = 'gpt-5.3-codex',
        },
      },
      hints = { enabled = false },
      mappings = {
        submit = {
          normal = '<CR>',
          insert = '<CR>',
        },
        cancel = {
          normal = { '<C-c>', 'q' },
          insert = { '<C-c>' },
        },
        sidebar = {
          switch_windows = '<Tab>',
          reverse_switch_windows = '<S-Tab>',
          close = { 'q' },
        },
      },
      windows = {
        width = 55,
        sidebar_header = { enabled = true },
        ask = { floating = true },
      },
      acp_providers = {
        ['claude-code'] = {
          command = 'bunx',
          args = { '@anthropic-ai/claude-code', '--chat' },
          env = { NODE_NO_WARNINGS = '1' },
        },
        ['gemini-cli'] = {
          command = 'gemini',
          args = { '--experimental-acp' },
          env = { NODE_NO_WARNINGS = '1' },
        },
      },
    },
    dependencies = {
      'MunifTanjim/nui.nvim',
      'nvim-tree/nvim-web-devicons',
      {
        'MeanderingProgrammer/render-markdown.nvim',
        opts = { file_types = { 'markdown', 'Avante' } },
        ft = { 'markdown', 'Avante' },
      },
    },
  },

  {
    'pablopunk/pi.nvim',
    config = function()
      require('pi').setup()

      vim.keymap.set('n', '<leader>ai', '<cmd>PiAsk<CR>', { desc = 'Ask pi' })
      vim.keymap.set('v', '<leader>ai', '<cmd>PiAskSelection<CR>', { desc = 'Ask pi (selection)' })
      vim.keymap.set('n', '<leader>ac', '<cmd>PiCancel<CR>', { desc = 'Cancel pi request' })
      vim.keymap.set('n', '<leader>al', '<cmd>PiLog<CR>', { desc = 'Open pi log' })
    end,
  },
}, {
  ui = {
    icons = vim.g.have_nerd_font and {} or {
      cmd = '⌘',
      config = '🛠',
      event = '📅',
      ft = '📂',
      init = '⚙',
      keys = '🗝',
      plugin = '🔌',
      runtime = '💻',
      require = '🌙',
      source = '📄',
      start = '🚀',
      task = '📌',
      lazy = '💤 ',
    },
  },
})
