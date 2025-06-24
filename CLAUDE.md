# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a TypeScript/Node.js repository that collects agentic development tools and example applications built around the Model Context Protocol (MCP). It uses:
- **Bun** as the runtime (v1.2.10+)
- **Nx** for monorepo management
- **TypeScript** in strict mode
- **Model Context Protocol (MCP)** for AI tool integration

## Setup Commands

### Initial Setup
```bash
# Install dependencies (requires network access)
bun install

# Run the main project
bun run index.ts

# Setup Codex integration (optional)
scripts/setup_codex.sh
```

### Development Commands
```bash
# Run tests with coverage
bun test --coverage

# Run Nx commands
bun run nx <command>          # Using bun
pnpm nx <command>             # Using pnpm (alternative)

# Run specific app/lib
bun run libs/task-cli/src/index.ts <rss-feed-url>
```

### Bot-or-Not Game
```bash
# Run server and client (requires Node 18+ and pnpm)
pnpm --filter @bot-or-not/server dev
pnpm --filter @bot-or-not/client dev
```

## Architecture

### Core Components

**Nx Monorepo Structure**
- `apps/` - Applications (server, client, prompts)
- `libs/` - Shared libraries (task-cli)
- `agents/` - AI agent implementations
- `.vibe/` - Agent metadata and task management

**Key Applications**
- `apps/server/` - Node.js server with TypeScript, includes bot logic and routes
- `apps/client/` - React client with Vite, Tailwind CSS
- `apps/prompts/` - System prompts for bots
- `libs/task-cli/` - RSS news gatherer utility

### Testing Strategy
- Tests located in `__tests__/` directories within each project
- Uses Bun's built-in test runner
- Coverage reports available via `bun test --coverage`
- Example test files: `apps/server/src/__tests__/*.test.ts`

## Branch Naming Conventions

When creating branches, use the `claude/` prefix (e.g., `claude/add-feature`, `claude/fix-bug`).
Other AI tools should use their respective prefixes as documented in `AGENTS.md`.

## Key Configuration Files

- `nx.json` - Nx workspace configuration
- `tsconfig.base.json` - Base TypeScript configuration
- `package.json` - Main dependencies and scripts
- `mcp.json` - Model Context Protocol configuration
- `codex.yaml` - Codex integration settings
- `.vibe/` - Agent task management and metadata

## Environment Requirements

- **Node.js 18+** - Required for running applications
- **Bun v1.2.10+** - Primary runtime and package manager
- **pnpm** - Alternative package manager (optional)
- **LLM Server** - Ollama or LocalAI for bot functionality

## Environment Variables

For Bot-or-Not game:
- `OLLAMA_BASE_URL` - Ollama server endpoint
- `OPENAI_BASE_URL` and `OPENAI_API_KEY` - OpenAI-compatible API
- `REDIS_URL` - Redis connection string

## Testing

TypeScript builds must pass with `tsc --noEmit` using strict mode configuration.
All tests should be written using Bun's test framework in `__tests__/` directories.

## AI Integration

This repository is designed to work with various AI coding tools:
- Model Context Protocol (MCP) support via `mcp.json`
- Agent configuration in `AGENTS.md`
- Task management in `.vibe/tasks/`
- AI tool configurations in `dev-setup/`