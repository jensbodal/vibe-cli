# Improve Test Coverage for apps/server

Increase unit and integration tests for the server application so critical paths are covered and regressions are less likely.

## Steps
1. Review the current implementation under `apps/server`.
2. Configure mocks for external services like `socket.io` and `ollama`.
3. Add tests for HTTP endpoints and socket events.
4. Run `bun test --coverage` to ensure coverage improvements.
