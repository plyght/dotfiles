---
description: Review staged or unstaged git changes
---

Review the current changes (`git diff` for unstaged, `git diff --cached` for staged). Focus on:

- Bugs, logic errors, and incorrect assumptions
- Security issues (secrets, injection, auth gaps)
- Error handling gaps and edge cases
- Performance concerns
- Breaking changes to public APIs

If both staged and unstaged exist, review both separately. Be specific with file paths and line numbers.
