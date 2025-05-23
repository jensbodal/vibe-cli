# vibe-cli

This is a minimal prototype for experimenting with agents that use the
Model Context Protocol (MCP). The project uses [Bun](https://bun.sh) for the
runtime and includes placeholder dependencies for `@openai/codex` and `nx`.

## Installing dependencies

The environment may not have network access, so `bun install` can fail when
it tries to download packages from npm. If you have network access you can
install dependencies with:


```bash
bun install
```

## Running the project


```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.10.
`mcp.json` in the repo root holds MCP-related configuration, while the `.vibe`
directory is reserved for project metadata used by agents.

# Codex Setup

This repository integrates [OpenAI Codex](https://github.com/openai/codex) using a helper script.

## Installing Codex

Run the setup script to clone the Codex repository and install its dependencies. By default
Codex is cloned to `vendor/codex`.

```bash
scripts/setup_codex.sh
```

The script will attempt to install dependencies using `npm` or `pip` depending on the files
present in the Codex repository. If Codex has different requirements, adjust the script
accordingly.

## Configuration

Codex can be configured with `codex.yaml`. The default configuration enables the OpenAI style:

```yaml
style: openai
```

Adjust this file to suit your workflow.

## Using Codex

After running the setup script, consult the Codex repository's documentation for available
commands. Typically you might run a CLI inside the cloned `vendor/codex` directory.

```
cd vendor/codex
# Example usage (replace with actual command)
./codex --help
```
