# AI Tooling Reference

This document provides detailed configuration and usage guidelines for the supported AI tools in this repository.

## ChatGPT Codex (Cloud Agent)

OpenAI’s ChatGPT Codex (Cloud Agent) runs your codebase in an isolated container you configure per project via a declarative “environment.” In the ChatGPT UI (Plus/Pro), you:

1. **Create a Codex Environment** tied to this GitHub repo.
2. **Set environment variables and secrets** (e.g. `OPENAI_API_KEY`, `POSTGRES_USER`) in the UI’s Secrets panel.
3. **Specify a Setup Script** (Bash) that runs before each task to install dependencies, prepare databases, or vendor packages—since internet access is disabled once the task begins.
4. **Add `AGENTS.md`** (this repo’s root) as a persistent reference for run instructions, build steps, and conventions that Codex will read automatically.
5. **(Optional)** Provide Custom Instructions under General Settings as a global system prompt for style and branch conventions.

Keep any reusable support scripts (e.g. `scripts/setup_codex_task.sh`) in version control so Codex environments can be repro visioned consistently.

## Operator ChatGPT (O1/CUA) Workaround

Operator (operator.chatgpt.com) does not natively support system prompts or config files. Advanced users create a YAML bootstrap file and programmatically inject it into the first prompt:

```yaml
# Sample Operator ChatGPT instructions (operator-instructions.yaml)
codingStyle:
  indent: 2 spaces
  maxLineLength: 80
review:
  askAfterChange: true
  branchNaming: feature/<description>
```

Then, when launching Operator via API or local script, prepend the contents of `operator-instructions.yaml` to the user prompt to enforce consistent guidelines.

## Roo Code (Cline) Project Rules

Roo Code supports declarative per-repo “ground rules” via a `.clinerules/` directory (or a flat `.clinerules` file) plus an optional `.clineignore`. Example:

```bash
cp dev-setup/example-clinerules.md .clinerules/rules.md
cp dev-setup/example-clineignore .clineignore
```

Use `.clinerules/` to define:
- Style, review cadence, or language preferences.
- Guards such as “don’t edit docs without permission.”
- Splitting rules into categories/files for large teams.

`.clineignore` works like `.gitignore`, preventing the agent from reading or modifying specified paths.

## Aider CLI Configuration

Aider loads settings in this order (later overrides earlier):
1. Global YAML (`~/.aider.conf.yml`)
2. Project YAML (`.aider.conf.yml`)
3. CLI flags
4. Environment variables or `.env`

See `dev-setup/aichat-config.yaml` for a sample Aider config. You can include:
- LLM provider, model, and conversation style.
- File include/exclude patterns.
- API keys in `.env` (or inline in YAML for OpenAI/Anthropic).

## GitHub Copilot Repo Instructions

Drop a Markdown file at `.github/copilot-instructions.md` to supply repo-specific Copilot Custom Instructions. Copilot will prepend these to all chats and completion contexts:

```markdown
### Project-specific GitHub Copilot instructions
- Use our internal fixtures framework (`@org/test-utils`)
- Follow our commit message guidelines
- Avoid editing generated files in `dist/`
```

## Windsurf (Codeium) Rules

Windsurf supports global rules (`global_rules.md`) and per-project rules in `.windsurf/rules/`. To bootstrap:

```bash
cp AGENTS.md global_rules.md
mkdir -p .windsurf/rules
cp dev-setup/example-windsurf-rule.md .windsurf/rules/sample-rule.md
```

- **global_rules.md** applies across all workspaces.
- **.windsurf/rules/** files target specific globs or phases (e.g. tests vs. docs).

## Cursor Project Rules

Cursor’s current “Project Rules” format uses a `.cursor/rules/` directory. Legacy `.cursorrules` flat files still work but are deprecated. Example:

```bash
mkdir -p .cursor/rules
cp dev-setup/example-cursor-rule.md .cursor/rules/sample-style.md
```

Drop multiple rule files for granular control (e.g. `security.md`, `testing.md`).

---