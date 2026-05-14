return {
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
          return vim.fn.executable('make') == 1
        end,
      },
      'ahmedkhalf/project.nvim',
    },
    config = function()
      require('project_nvim').setup({
        detection_methods = { 'pattern' },
        patterns = { '.git', 'package.json', 'Cargo.toml', 'go.mod', 'pyproject.toml' },
      })

      require('telescope').setup({})
      pcall(require('telescope').load_extension, 'fzf')
      pcall(require('telescope').load_extension, 'projects')

      local builtin = require('telescope.builtin')
      vim.keymap.set('n', '<leader>fp', function()
        require('telescope').extensions.projects.projects({})
      end, { desc = '[F]ind [P]rojects' })
      vim.keymap.set('n', '<leader>fh', builtin.help_tags, { desc = '[F]ind [H]elp' })
      vim.keymap.set('n', '<leader>fk', builtin.keymaps, { desc = '[F]ind [K]eymaps' })
      vim.keymap.set('n', '<leader>fb', builtin.buffers, { desc = '[F]ind [B]uffers' })
    end,
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
}
