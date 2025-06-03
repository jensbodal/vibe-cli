# Handle server.listen errors

Add error handling for server startup failures and test the behavior.

## Steps
1. Update `apps/server/src/index.ts` so `server.listen` attaches an error handler that logs a message when listening fails.
2. Extend `apps/server/src/__tests__/index.test.ts` with a test that simulates a listen failure and verifies the logged output.
3. Ensure `bun test --coverage` and `tsc --noEmit` pass.
