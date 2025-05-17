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
