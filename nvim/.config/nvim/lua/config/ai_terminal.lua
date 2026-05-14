local M = {}

M.providers = {
  { name = 'pi', command = 'pi' },
  { name = 'claude', command = 'claude' },
  { name = 'codex', command = 'codex' },
  { name = 'opencode', command = 'opencode' },
}

local function executable(command)
  local program = vim.split(command, ' ')[1]
  return vim.fn.executable(program) == 1
end

local function open_terminal(command, modifier)
  modifier = modifier or 'tabnew'
  vim.cmd(modifier)
  vim.cmd('terminal ' .. command)
  vim.cmd('file ai://' .. command:gsub('%s+', '-'))
  vim.cmd('startinsert')
end

function M.open(command, modifier)
  open_terminal(command, modifier)
end

function M.pick(modifier)
  local available = vim.tbl_filter(function(provider)
    return executable(provider.command)
  end, M.providers)

  if #available == 0 then
    vim.notify('No AI CLIs found: pi, claude, codex, opencode', vim.log.levels.WARN)
    return
  end

  vim.ui.select(available, {
    prompt = 'Open AI terminal',
    format_item = function(provider)
      return provider.name .. '  (' .. provider.command .. ')'
    end,
  }, function(provider)
    if provider then
      open_terminal(provider.command, modifier)
    end
  end)
end

function M.setup()
  vim.api.nvim_create_user_command('Ai', function(opts)
    if opts.args ~= '' then
      open_terminal(opts.args, 'tabnew')
    else
      M.pick('tabnew')
    end
  end, { nargs = '*' })

  vim.api.nvim_create_user_command('AiSplit', function(opts)
    if opts.args ~= '' then
      open_terminal(opts.args, 'botright split')
    else
      M.pick('botright split')
    end
  end, { nargs = '*' })

  vim.keymap.set('n', '<leader>aa', function()
    M.pick('tabnew')
  end, { desc = '[A]I terminal tab' })
  vim.keymap.set('n', '<leader>as', function()
    M.pick('botright split')
  end, { desc = '[A]I terminal split' })
  vim.keymap.set('n', '<leader>ap', function()
    open_terminal('pi', 'tabnew')
  end, { desc = '[A]I [P]i terminal' })
  vim.keymap.set('n', '<leader>aP', function()
    open_terminal('pi', 'botright split')
  end, { desc = '[A]I [P]i split' })
end

return M
