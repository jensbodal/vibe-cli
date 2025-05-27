# vibe-cli

This repository collects a set of agentic development tools and example
applications built around the Model Context Protocol (MCP). It uses
[Bun](https://bun.sh) for the runtime and leverages [Nx](https://nx.dev) to
manage the various apps and libraries.

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
directory is reserved for project metadata used by agents. An example agent lives
in `agents/example` and simply prints a message when run. The
`GenerativeAIReporterAgent` under `agents/generative-ai-reporter-agent` ranks
repositories and outputs a small report.

You can run it with:

```bash
bun run agents/example/index.ts
```

All task documentation lives under `.vibe/tasks`.

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

## Nx Workspace

This repo is configured as an Nx monorepo. Apps live in `apps/` and libraries in `libs/`.
Run Nx commands with the provided npm script:

```bash
bun run nx <command>
```

`pnpm nx <command>` works as well if you prefer `pnpm`.

## Project Catalog

The `.vibe/projects.md` file lists all Nx projects. Update it whenever you add or remove a project.

## Running tests

Execute the unit tests with Bun. The server tests live under
`apps/server/src/__tests__`:

```bash
bun test --coverage
```

## Included tools and examples

### task-cli

A small RSS-based news gatherer.
Run it with:

```bash
bun run libs/task-cli/src/index.ts <rss-feed-url> [rss-feed-url...]
```

### Bot-or-Not

An example chat game split into a Node server and a React client. Up to eleven
human players can compete against a twelfth bot driven by a local LLM.

#### Prerequisites
* Node 18+
* `pnpm` installed globally
* An LLM server such as [Ollama](https://github.com/jmorganca/ollama) or [LocalAI](https://github.com/go-skynet/LocalAI)

Set one of `OLLAMA_BASE_URL` or `OPENAI_BASE_URL` and `OPENAI_API_KEY` as
needed.

#### Running locally

```bash
pnpm --filter @bot-or-not/server dev
pnpm --filter @bot-or-not/client dev
```

Open the client in the browser and follow the prompts to join the chat room.

### Scripts

Utility scripts live under the `scripts/` directory. `setup_codex.sh` clones the
OpenAI Codex repository and installs its dependencies.
