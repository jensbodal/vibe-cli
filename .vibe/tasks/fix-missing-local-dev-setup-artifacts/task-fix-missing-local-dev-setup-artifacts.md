# Fix missing local dev setup artifacts

Create the helper script and compose file referenced in the README.

- Add `scripts/setup-local-dev.sh` to start Redis and Ollama via Docker Compose.
- Provide `docker-compose.local.yml` defining both services.
- Update the README to explain how the script uses the compose file.
