# Add server route tests

The goal is to expand test coverage for the server by validating HTTP routes in `apps/server/src/index.ts`.

## Notes
- Existing tests already cover `maskMessage` and bot message handling under `apps/server/src/__tests__`.
- Testing the Express routes requires the `express` and `socket.io` dependencies which are not installed in this environment. As a result the `/prompt` route could not be executed under `bun test`.
- To complete this task, ensure dependencies are installed and add integration tests for the `/prompt` endpoint and other routes.
