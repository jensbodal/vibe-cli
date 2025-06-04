# AI Tooling Configuration

This repository includes sample configuration files for several AI assistant tools. Each tool reads its settings from a deterministic location within the repo so new developers can get started quickly.

| Tool | Config Path | Notes |
|------|-------------|-------|
| **AIChat CLI** | `dev-setup/aichat-config.yaml` | Copy to `~/.config/aichat/config.yaml` |
| **Aider CLI** | `.aider.conf.yml` | Uses `gpt-4o-mini` and reads `CONTRIBUTING.md` |
| **Codex CLI** | `.codex/config.yaml` | Restricts commands to `npm test` |
| **ChatGPT/Codex Setup** | `scripts/setup_codex_cli.sh` | Installs the Codex CLI globally |
| **Windsurf** | `.windsurf/settings.json` | Points to a local MCP server |
| **Cursor** | `.cursor/mcp.json` | Sets the model and MCP server |
| **VS Code Copilot** | `.github/copilot-instructions.md` and `.vscode/settings.json` | Provides usage guidance |

Set `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GROQ_API_KEY` in your environment to switch models locally.
