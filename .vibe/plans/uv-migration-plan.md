# UV/UVX Migration Plan

## Current State
A comprehensive search for "pip" and "pipx" within the project's `.md`, `.json`, `.toml`, `.js`, `.yml`, `.sh`, and `.py` files, as well as within `.github/workflows/` directory, yielded no direct mentions or explicit usage of `pip` or `pipx`. This suggests that current Python dependency management might be handled implicitly or through other mechanisms not directly invoking these commands.

## Proposed Guidelines for Future Development

To ensure consistent use of `uv`/`uvx` for Python dependency management, the following guidelines are proposed:

1.  **Always use `uv` and `uvx`:**
    *   For installing dependencies, use `uv pip install` instead of `pip install`.
    *   For creating virtual environments, use `uv venv` instead of `python -m venv` or `virtualenv`.
    *   For running executables from packages, use `uvx` instead of `pipx`.

2.  **Update Documentation:**
    *   Any existing or new documentation (e.g., `README.md`, `CONTRIBUTING.md`, internal guides) that discusses Python environment setup or dependency management should exclusively refer to `uv` and `uvx`.

3.  **CI/CD Workflows:**
    *   Future CI/CD pipeline steps involving Python dependency installation or environment setup should be configured to use `uv` commands. This includes actions like `setup-python` if they offer `uv` integration, or direct `run` steps with `uv` commands.

4.  **Projen Configuration:**
    *   If `projen` is extended to manage Python projects or dependencies in the future, ensure that any generated configurations or scripts explicitly use `uv` and `uvx` commands. This will prevent `pip`/`pipx` from being reintroduced through automated generation.

## Verification
After implementing these guidelines, periodic reviews of new code, documentation, and CI/CD configurations should be conducted to ensure adherence to the `uv`/`uvx` standard.

## Next Steps
This plan will serve as a reference for future Python development within the project. No immediate code changes are required based on the current codebase analysis.
