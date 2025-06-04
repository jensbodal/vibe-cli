# Fix invalid Nx targets in package.json

The initial agentic infrastructure commit introduced `agentic:dev` and `agentic:test` scripts that referenced Nx projects `agentic-chat-web` and `agentic-chat-api`. These projects do not yet exist in the repo, causing the scripts to fail.

This task removes those scripts until the correct project names are known. The setup script was updated to omit instructions for running them.
