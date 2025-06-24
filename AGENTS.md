# Agent Guidelines

## General Agent Workflow

Before starting any work, agents should:

1. **Create a task** in `.vibe/tasks/` as a simple, single-step task:
   - File: `.vibe/tasks/<task-slug>.md`

2. **Complex tasks** requiring multiple sub-tasks or projects should be organized under a folder:
   - Folder: `.vibe/tasks/<task-slug>/`
   - Primary task file: `.vibe/tasks/<task-slug>/<task-slug>.md`
   - Sub-task files: `.vibe/tasks/<task-slug>/tasks/<unix-timestamp>-<subtask-slug>.task.md`

**Project naming examples**:
- `.vibe/tasks/fix-memory-leak/`
  - `fix-memory-leak.md`
  - `tasks/1719187200-identify-memory-sources.task.md`
  - `tasks/1719273600-add-caching.task.md`

## Branch Naming Conventions

Different AI coding tools and agents should use specific branch prefixes to maintain organization and avoid conflicts:

- **Claude Code**: `claude/...` (e.g., `claude/add-feature`, `claude/fix-bug`)
- **OpenAI Codex CLI**: `codexc/...` (e.g., `codexc/refactor-api`, `codexc/update-docs`)
- **Codex Web**: `codexw/...` (e.g., `codexw/ui-improvements`, `codexw/add-component`)
- **Aider**: `aider/...` (e.g., `aider/test-coverage`, `aider/performance-fix`)

This convention helps track which tool created which changes and prevents branch naming conflicts when multiple AI tools are used on the same repository.

## Dev Container

We use a devcontainer setup in `.devcontainer/devcontainer.json` with the following configuration:

```json
{
  "name": "vibe-cli-devcontainer",
  "image": "mcr.microsoft.com/devcontainers/base:0-ubuntu-22.04",
  "features": {
    "ghcr.io/devcontainers/features/zsh:1": {
      "installOhMyZsh": true,
      "customZshrc": false,
      "plugins": [
        "git",
        "zsh-autosuggestions",
        "zsh-syntax-highlighting"
      ]
    },
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.10"
    },
    "ghcr.io/devcontainers/features/node:1": {
      "version": "lts",
      "packageManager": "pnpm"
    },
    "ghcr.io/devcontainers/features/rust:1": {
      "version": "latest"
    },
    "ghcr.io/devcontainers/features/direnv:1": {},
    "ghcr.io/devcontainers/features/jq:1": {}
  },
  "settings": {
    "terminal.integrated.defaultProfile.linux": "zsh"
  },
  "extensions": [
    "ms-python.python",
    "ms-vscode-remote.remote-containers",
    "eamodio.gitlens",
    "GitHub.copilot",
    "ms-azuretools.vscode-docker"
  ],
  "postCreateCommand": "pip install --upgrade pip && pip install .[dev] && pnpm install && ./setup.sh",
  "remoteUser": "vscode"
}
```

### How it works

- **Base image**: Ubuntu 22.04 with a non-root `vscode` user.
- **Features**: installs Zsh/Oh-My-Zsh with plugins, Python 3.10, Node LTS + pnpm, Rust, direnv, jq.
- **Settings & extensions**: defaults the integrated shell to zsh and enables recommended VS Code extensions.
- **postCreateCommand**: bootstraps Python dev dependencies, Node packages, and then runs `./setup.sh` to apply dotfile symlinks.

### Auto-generating a devcontainer

You can also use the Dev Containers CLI to scaffold a configuration automatically:

```bash
npm install -g @devcontainers/cli
devcontainer init --workspace-folder . --template python-node
```

Then adjust the generated `.devcontainer/devcontainer.json` as needed.

This repository uses TypeScript in **strict mode**. Ensure all code builds with `tsc --noEmit` using the configuration in `tsconfig.base.json`.

## Testing

Run the full test suite before submitting a pull request:

```bash
bun test --coverage
```

## Nx Workspace

All applications and libraries are managed by [Nx](https://nx.dev). Run Nx commands via the npm script:

```bash
bun run nx <command>
```

You can also use `pnpm nx <command>` if you prefer `pnpm`.

## Pull Request Expectations

* Include unit tests and documentation for any new functionality.
* Update `README.md` and `mcp.json` if configuration or capabilities change.
* Keep the project catalog `.vibe/projects.md` up to date when adding or removing Nx projects.
* Before opening a pull request run:

```bash
git fetch origin main
git rebase -i origin/main
npm run lint
npm test
git push --force-with-lease
```

Your branch must contain a single commit on top of the latest `main` with no merge commits.

