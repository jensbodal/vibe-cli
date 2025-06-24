# Convert tasks folder structure

Reorganize existing tasks in `.vibe/tasks` to follow the updated conventions:

- Flatten each simple task directory into a single file:
  - `.vibe/tasks/<task-slug>.md` containing both the primary task description and any user instructions.
- Only retain a folder under `.vibe/tasks/<task-slug>/` when a task requires multiple sub-tasks:
  - Primary file at `.vibe/tasks/<task-slug>/<task-slug>.md`
  - Sub-task files under `.vibe/tasks/<task-slug>/tasks/`

Ensure that no planned work or instructions are lost during the conversion.