# Production Deployment

This guide covers building the Bot-or-Not game for a production environment.

## Prerequisites

- **Node 18+** and **pnpm** installed globally
- A compatible LLM server such as **Ollama** or **LocalAI**

## Environment Variables

Set one of the following server endpoints depending on your LLM provider:

- `OLLAMA_BASE_URL`
- or `OPENAI_BASE_URL` and `OPENAI_API_KEY`

Additional variables can be configured in `apps/server/.env` if needed.

## Building for Production

Use Nx to build each application:

```bash
pnpm nx build server
pnpm nx build client
```

The builds are output to `dist/apps/server` and `dist/apps/client` respectively.
Deploy these artifacts to your preferred hosting environment.
