# Bot-or-Not Deployment Guide

This guide explains how to build and run the Bot-or-Not server and client in production.

## Environment Variables

Set the following variables before starting the apps:

- `OPENAI_BASE_URL` – endpoint for an OpenAI-compatible API (optional if using Ollama).
- `OLLAMA_BASE_URL` – endpoint for an Ollama server (used when `OPENAI_BASE_URL` is not set).
- `OPENAI_API_KEY` – API key for the selected LLM provider.

## Build

Using **bun**:

```bash
bun run nx build server
bun run nx build client
```

Using **pnpm**:

```bash
pnpm nx build server
pnpm nx build client
```

## Start

Using **bun**:

```bash
bun run nx start server
bun run nx preview client
```

Using **pnpm**:

```bash
pnpm nx start server
pnpm nx preview client
```

The server listens on `PORT` (default `3000`) and the client preview runs on `4173`.
