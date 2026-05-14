local function greeting()
  local hour = tonumber(os.date('%H')) or 12
  local label
  local sayings

  if hour >= 5 and hour < 12 then
    label = 'morning'
    sayings = {
      'small steps. clean diffs.',
      'open gently, ship clearly.',
      'coffee, context, cadence.',
    }
  elseif hour >= 12 and hour < 17 then
    label = 'afternoon'
    sayings = {
      'keep the loop tight.',
      'read first, then reshape.',
      'one sharp edit at a time.',
    }
  elseif hour >= 17 and hour < 21 then
    label = 'evening'
    sayings = {
      'soft focus, strong taste.',
      'polish what matters.',
      'make it feel inevitable.',
    }
  elseif hour >= 21 and hour < 24 then
    label = 'night'
    sayings = {
      'quiet terminal, loud ideas.',
      'dim the noise, keep the signal.',
      'save before the rabbit hole.',
    }
  else
    label = 'late night'
    sayings = {
      'ship it or sleep on it.',
      'haunted commits behave better when small.',
      'the cursor knows too much.',
    }
  end

  local index = (tonumber(os.date('%j')) or 1) % #sayings + 1
  return table.concat({ 'good ' .. label, '', sayings[index] }, '\n')
end

local function project_files()
  return function()
    local cwd = vim.loop.fs_realpath(vim.fn.getcwd()) or vim.fn.getcwd()
    local ignored_names = {
      COMMIT_EDITMSG = true,
      MERGE_MSG = true,
      TAG_EDITMSG = true,
      SQUASH_MSG = true,
      EDIT_DESCRIPTION = true,
      gitrebase = true,
    }
    local ignored_dirs = {
      '.cache',
      '.git',
      '.jj',
      '.next',
      '.nuxt',
      '.pytest_cache',
      '.turbo',
      '.venv',
      'coverage',
      'dist',
      'node_modules',
      'target',
      'vendor',
    }

    local function hidden(rel)
      local basename = vim.fn.fnamemodify(rel, ':t')
      if ignored_names[basename] then
        return true
      end
      for _, dir in ipairs(ignored_dirs) do
        if rel == dir or rel:match('^' .. vim.pesc(dir) .. '/') or rel:match('/' .. vim.pesc(dir) .. '/') then
          return true
        end
      end
      return false
    end

    local seen = {}
    local items = {}

    local function add(path, rel, source)
      if seen[path] or hidden(rel) or vim.fn.filereadable(path) ~= 1 then
        return
      end
      seen[path] = true
      table.insert(items, {
        file = rel,
        icon = 'file',
        action = function()
          vim.cmd.edit(vim.fn.fnameescape(path))
        end,
        autokey = true,
        source = source,
      })
    end

    for _, raw in ipairs(vim.v.oldfiles) do
      local path = vim.loop.fs_realpath(raw)
      if path and vim.startswith(path, cwd .. '/') then
        add(path, path:sub(#cwd + 2), 'recent')
        if #items >= 12 then
          break
        end
      end
    end

    if #items == 0 then
      local fallback = {}
      for _, raw in ipairs(vim.fn.globpath(cwd, '**/*', false, true)) do
        local path = vim.loop.fs_realpath(raw)
        if path and vim.fn.filereadable(path) == 1 and vim.startswith(path, cwd .. '/') then
          local rel = path:sub(#cwd + 2)
          if not hidden(rel) then
            table.insert(fallback, {
              path = path,
              rel = rel,
              score = #vim.split(rel, '/', { plain = true }) * 1000 + #rel,
            })
          end
        end
      end
      table.sort(fallback, function(a, b)
        if a.score == b.score then
          return a.rel < b.rel
        end
        return a.score < b.score
      end)
      for _, file in ipairs(fallback) do
        add(file.path, file.rel, 'files')
        if #items >= 12 then
          break
        end
      end
    end

    if #items == 0 then
      return {
        {
          icon = ' ',
          desc = 'New File',
          action = ':ene | startinsert',
          autokey = true,
        },
      }
    end

    return items
  end
end

return {
  {
    'folke/which-key.nvim',
    event = 'VeryLazy',
    opts = {
      delay = 500,
    },
  },

  {
    'folke/snacks.nvim',
    lazy = false,
    priority = 1000,
    opts = function()
      return {
        explorer = {},
        dashboard = {
          width = 64,
          preset = {
            header = greeting(),
            keys = {
              { icon = ' ', key = 'f', desc = 'Find Files', action = ":lua require('fff').find_files()" },
              { icon = ' ', key = 'g', desc = 'Grep Workspace', action = ":lua require('fff').live_grep()" },
              { icon = ' ', key = 'b', desc = 'Buffers', action = ":lua require('telescope.builtin').buffers()" },
              { icon = '󰚩 ', key = 'a', desc = 'AI Terminal', action = ':Ai' },
              { icon = '󰊄 ', key = 'p', desc = 'Pi Terminal', action = ':Ai pi' },
              { icon = ' ', key = 'e', desc = 'Explorer', action = ":lua Snacks.explorer()" },
              { icon = ' ', key = 'c', desc = 'Config', action = ":lua Snacks.dashboard.pick('files', { cwd = vim.fn.stdpath('config') })" },
              { icon = ' ', key = 'q', desc = 'Quit', action = ':qa' },
            },
          },
          sections = {
            { section = 'header', padding = 2 },
            { section = 'keys', gap = 1, padding = 1 },
            { icon = ' ', title = 'Files', indent = 2, padding = 1, project_files() },
            { section = 'startup' },
          },
        },
      }
    end,
  },

  {
    'akinsho/bufferline.nvim',
    event = 'VeryLazy',
    dependencies = { 'nvim-tree/nvim-web-devicons' },
    keys = {
      { '<Tab>', '<cmd>BufferLineCycleNext<CR>', desc = 'Next buffer' },
      { '<S-Tab>', '<cmd>BufferLineCyclePrev<CR>', desc = 'Previous buffer' },
      { '<leader>bp', '<cmd>BufferLinePick<CR>', desc = '[B]uffer [P]ick' },
      { '<leader>bc', '<cmd>bd<CR>', desc = '[B]uffer [C]lose' },
    },
    opts = {
      options = {
        mode = 'buffers',
        separator_style = 'thin',
        show_buffer_close_icons = false,
        show_close_icon = false,
        always_show_bufferline = false,
        diagnostics = false,
        offsets = {
          {
            filetype = 'snacks_layout_box',
            text = 'Files',
            text_align = 'center',
          },
        },
      },
    },
  },
}
