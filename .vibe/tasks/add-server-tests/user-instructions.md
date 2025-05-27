# Running server tests

Follow these steps from the repository root to install dependencies, type check the server and run the tests.

1. Install dependencies with `bun install` (or `pnpm install`).
2. Type check the server project:

```bash
bun x tsc --noEmit -p apps/server/tsconfig.app.json
```

3. Execute the tests:

```bash
bun test
```
