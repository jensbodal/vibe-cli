# Document local agentic development setup

A new Docker Compose file and setup script allow running Redis and Ollama locally for agentic chat development. This task documents how to use these utilities in the README.

- Run `pnpm run local:setup` (or `bash scripts/setup-local-dev.sh`) to install dependencies and start the services.
- Edit `.env` (copied from `.env.example`) to set `REDIS_URL`, `OLLAMA_URL`, and other variables.
- Stop the containers with `pnpm run local:stop` when finished.
