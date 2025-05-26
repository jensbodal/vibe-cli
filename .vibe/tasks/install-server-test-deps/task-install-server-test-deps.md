# Install server test dependencies

Install development dependencies for the server to allow TypeScript compilation and Bun tests.

## Steps
1. Run `bun install` or `pnpm install` from the repository root so packages listed in `package.json` and `apps/server/package.json` are available.
2. Verify type checking succeeds by running `bun x tsc --noEmit -p apps/server/tsconfig.app.json`.
3. Once compilation works, proceed with adding tests under `apps/server`.
