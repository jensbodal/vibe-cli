# AI Tooling Configuration

This repository includes sample configuration files for several AI assistant tools. Each tool reads its settings from a deterministic location within the repo so new developers can get started quickly.

| Tool                             | Config Path(s)                                  | Notes                                                                                 |
|----------------------------------|-------------------------------------------------|---------------------------------------------------------------------------------------|
| **Agents Shell**                 | `AGENTS.md`                                      | Agent workflow, branch naming, and devcontainer configuration for AI agents           |
| **Claude Code**                  | `CLAUDE.md`                                      | Guidance for Claude Code (claude.ai/code) when working with this repository           |
| **AIChat CLI**                   | `dev-setup/aichat-config.yaml`                  | Copy to `~/.config/aichat/config.yaml`                                                |
| **Aider CLI**                    | `.aider.conf.yml`                               | Merges global/home and project configs; supports CLI flags, env vars, and `.env`       |
| **Codex CLI**                    | `dev-setup/codex-config.yaml` → `~/.codex/config.yaml` | Restricts allowed commands, safeCommands, and approvalMode                               |
| **ChatGPT Codex** (Cloud Agent)  | `AGENTS.md`                                      | Use AGENTS.md for run instructions & conventions; define a Setup Script in the UI      |
| **Operator ChatGPT (O1/CUA)**    | `dev-setup/operator-instructions.yaml`           | YAML-based system-prompt workaround; read & prepend to first Operator prompt           |
| **Roo Code (Cline)**             | `dev-setup/example-clinerules.md` → `.clinerules/`<br>`dev-setup/example-clineignore` → `.clineignore` | Project rules and ignore list for Roo Code extension                                   |
| **Windsurf (Codeium)**           | `dev-setup/example-windsurf-rule.md` → `.windsurf/rules/` | Global & project-specific rules directory for Cascade agents                           |
| **Cursor (Project Rules)**       | `dev-setup/example-cursor-rule.md` → `.cursor/rules/` | Preferred over legacy `.cursorrules`; supports multiple rule files for granular control |
| **GitHub Copilot**               | `.github/copilot-instructions.md`                | Prepend custom instructions for repo-level Copilot chat & completions                   |

Set `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GROQ_API_KEY` in your shell or `.env` file so tools and scripts can authenticate.

> For detailed guidance on each tool, see [AI tooling reference](./ai-tooling-reference.md).
