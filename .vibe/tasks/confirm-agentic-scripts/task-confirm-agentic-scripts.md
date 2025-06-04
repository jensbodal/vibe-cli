# Confirm agentic scripts

Investigate Nx project names for the planned chat API and web app and update or remove the `agentic:dev` and `agentic:test` scripts accordingly.

## Findings

- The workspace currently defines the following Nx projects: `client`, `server`, and `task-cli`.
- There are no projects named `chat-api` or `web-app` yet.
- `package.json` contains no `agentic:dev` or `agentic:test` scripts.
- No `scripts/setup-local-dev.sh` file exists.

## Outcome

No code changes were needed. The scripts referenced in the request do not exist, so nothing required updating or removing.
