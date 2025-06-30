# vibe-cli - Gemini Agent Guide

This guide provides essential information for the Gemini agent to understand and interact with the `vibe-cli` project.

## Project Overview

`vibe-cli` is a collection of agentic development tools and example applications built around the Model Context Protocol (MCP). It utilizes [Bun](https://bun.sh) as its runtime and leverages [Nx](https://nx.dev) for managing various applications and libraries within a monorepo structure.

## System Requirements

*   Node.js 18+
*   Bun v1.2.10 or newer

## Installation

To install project dependencies, run:

```bash
bun install
```

## Running the Project

To start the main application:

```bash
bun run index.ts
```

## Nx Workspace

This repository is configured as an Nx monorepo. Applications reside in `apps/` and libraries in `libs/`.
You can run Nx commands using:

```bash
bun run nx <command>
```

## Git Hooks

To enable shared Git hooks for linting, commit message format enforcement, branch checks, and dependency syncing, run:

```bash
git config core.hooksPath .githooks
```

## Project Catalog

The `.vibe/projects.md` file lists all Nx projects. This file should be updated whenever a project is added or removed.

## Running Tests

To execute all unit tests across the workspace:

```bash
bun run test
```

To include coverage reports:

```bash
bun run test -- --coverage
```

## Included Tools and Examples

*   **task-cli**: A small RSS-based news gatherer.
    Run with: `bun run libs/task-cli/src/index.ts <rss-feed-url> [rss-feed-url...]`
*   **Bot-or-Not**: An example chat game with a Node server and React client. Requires Node 18+, `pnpm` globally, and an LLM server (Ollama or LocalAI).
    Run locally:
    ```bash
    pnpm --filter @bot-or-not/server dev
    pnpm --filter @bot-or-not/client dev
    ```
*   **Generative AI Reporter Agent**: An agent that can be imported and run programmatically.
    Example usage:
    ```ts
    import { run } from "agents/generative-ai-reporter-agent";

    run({
      repoPath: "/path/to/repo",
      branch: "main",
    });
    ```

## Local Development Setup

To set up the local development environment (Redis and Ollama):

```bash
scripts/setup-local-dev.sh
```

Copy `.env.example` to `.env` and adjust values as needed.
Launch agentic apps with:

```bash
pnpm agentic:dev
```

The `.idea` folder can be used for local proof-of-concept work and is not part of the main project.

## AI Tooling

Sample configurations for various AI tools are available in `docs/ai-tooling.md`. For tools requiring global configuration (e.g., AIChat, Codex CLI), copy files from `dev-setup/` to your home directory.

