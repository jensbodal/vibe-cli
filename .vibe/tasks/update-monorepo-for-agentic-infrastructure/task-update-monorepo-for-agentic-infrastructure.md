# Update monorepo for agentic infrastructure

This task introduces the initial infrastructure pieces for the agentic chat work. It adds local service configuration and basic scripts.

## Changes
- Extended `package.json` with development dependencies and helper scripts.
- Added `docker-compose.local.yml` for running Redis and Ollama locally.
- Provided `.env.example` with environment defaults.
- Added `scripts/setup-local-dev.sh` for easy setup of local services.

These pieces enable starting Redis and Ollama containers, installing dependencies, and preparing the environment for further development.
