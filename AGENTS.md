# Agent Guidelines

This repository uses TypeScript in **strict mode**. Ensure all code builds with `tsc --noEmit` using the configuration in `tsconfig.base.json`.

## Testing

Run the full test suite before submitting a pull request:

```bash
bun test --coverage
```

## Nx Workspace

All applications and libraries are managed by [Nx](https://nx.dev). Run Nx commands via the npm script:

```bash
bun run nx <command>
```

You can also use `pnpm nx <command>` if you prefer `pnpm`.

## Pull Request Expectations

* Include unit tests and documentation for any new functionality.
* Update `README.md` and `mcp.json` if configuration or capabilities change.
* Keep the project catalog `.vibe/projects.md` up to date when adding or removing Nx projects.
* Ensure the `.vibe/tasks.md` file reflects the current outstanding tasks.

