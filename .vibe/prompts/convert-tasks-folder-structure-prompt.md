# slug: convert-tasks-folder-structure

[TASK]
Reorganize the `.vibe/tasks` directory to match the new conventions:
1. Flatten simple task folders into single `.vibe/tasks/<task-slug>.md` files, merging any user instructions.
2. Retain only folders for tasks requiring multiple sub-tasks, placing the primary file and its sub-task `.task.md` files inside.
3. Confirm that no planned work or instructions are lost in the process.

[CONTEXT]
You run as an agentic CLI with shell access at the repository root.
Operations should be deterministic and idempotent.

[FORMAT]
- Preview planned file moves and merges in a table: | action | path | notes |
- Single confirmation prompt before applying changes.
- Final summary table with status for each change.

[TONE]
Concise and focused on essential file operations.