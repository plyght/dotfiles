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

vim.api.nvim_create_autocmd('TextYankPost', {
  desc = 'Highlight when yanking text',
  group = vim.api.nvim_create_augroup('highlight-yank', { clear = true }),
  callback = function()
    vim.highlight.on_yank()
  end,
})

vim.api.nvim_exec_autocmds('ColorScheme', { pattern = '*' })
