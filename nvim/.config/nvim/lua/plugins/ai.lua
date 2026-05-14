return {
  {
    'yetone/avante.nvim',
    build = 'make',
    event = 'VeryLazy',
    version = false,
    keys = {
      { '<leader>av', '<cmd>AvanteAsk<CR>', desc = '[A]vante ask' },
      { '<leader>ae', '<cmd>AvanteEdit<CR>', desc = '[A]vante [E]dit', mode = 'v' },
      { '<leader>at', '<cmd>AvanteToggle<CR>', desc = '[A]vante [T]oggle' },
      { '<leader>ar', '<cmd>AvanteRefresh<CR>', desc = '[A]vante [R]efresh' },
      { '<leader>ax', '<cmd>AvanteClear<CR>', desc = '[A]vante clear' },
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
    },
  },

  {
    'pablopunk/pi.nvim',
    config = function()
      require('pi').setup()
      require('config.ai_terminal').setup()

      vim.keymap.set('n', '<leader>ai', '<cmd>PiAsk<CR>', { desc = 'Ask pi' })
      vim.keymap.set('v', '<leader>ai', '<cmd>PiAskSelection<CR>', { desc = 'Ask pi (selection)' })
      vim.keymap.set('n', '<leader>ac', '<cmd>PiCancel<CR>', { desc = 'Cancel pi request' })
      vim.keymap.set('n', '<leader>al', '<cmd>PiLog<CR>', { desc = 'Open pi log' })
    end,
  },
}
