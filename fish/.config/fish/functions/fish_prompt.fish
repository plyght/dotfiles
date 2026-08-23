function fish_prompt
    set_color cyan
    echo -n (prompt_pwd)

    set_color magenta
    echo -n ' π '

    set_color normal
end
