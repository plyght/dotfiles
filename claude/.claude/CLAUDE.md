• Preserve every existing comment verbatim—add nothing new (no headers, banners, license text, attribution, or placeholder prose).
• For JavaScript/TypeScript, use the Bun toolchain exclusively; never invoke npm, yarn, pnpm, or similar CLIs.
• For all other languages, rely on native tooling (Cargo, poetry, go run, etc.) and avoid unnecessary package managers.
• Inspect all project manifests (package.json, pyproject.toml, Cargo.toml, go.mod, etc.) before editing:
    – Verify tasks for formatting, linting, type-checking, and testing.
    – Add or update those tasks so each language has reliable commands covering these four quality gates (Bun-based for JS/TS; native tools elsewhere).
• After editing, ensure all quality-gate commands run cleanly.
• Add dependencies freely when needed, provided they have permissive licenses and introduce no telemetry.
• Do not embed secrets, API keys, hard-coded credentials, or outbound telemetry.
• Never stage, commit, or push—return the updated code only.
• Treat the repository as production-grade at all times.
• If **llms.txt** exists at the project root, read and honor its instructions before making changes.
• If subsequent user instructions differ from any guideline above, follow the new instructions unless they breach security constraints.