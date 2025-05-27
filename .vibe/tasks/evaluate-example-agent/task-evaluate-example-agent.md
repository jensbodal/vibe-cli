# Evaluate Example Agent

The `example-agent` entry was removed from `mcp.json` in [commit 8f30a5d](../../../../commit/8f30a5d34f28d5e0e17473d6d2ab0e0a880d2fb9) because no implementation existed. This avoided referencing a project that didn't actually run.

A minimal agent was later created in [commit 9fd12ba](../../../../commit/9fd12ba1bc76298c2062ce0d3a5071f44acc431e) to serve as a simple demo. If we remove it again, reintroducing an example agent should meet these criteria:

* Provide at least one runnable entry point with unit tests.
* Document how the agent integrates with the rest of the repo.
* Ensure the agent is listed in `mcp.json` only when it has a working implementation.
