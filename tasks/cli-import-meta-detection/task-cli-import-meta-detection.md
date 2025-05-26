# Update CLI invocation detection

* Replace `require.main` logic in `libs/task-cli` with an `import.meta.url` check.
* Ensure the CLI still functions when run via `bun run`.
* Remove CommonJS-specific `module` checks.
* Verify via `bun test` and manual execution.
