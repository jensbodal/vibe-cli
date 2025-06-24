# slug: git-local-branch-maintenance

[TASK]
Clean local Git branches
1. Fetch/prune; list branches fully merged into `origin/main` → mark **DELETE**
2. For each branch containing uncommitted or leftover changes: review the diff to understand why the changes were left, then decide whether to commit them (to be merged later) or discard/delete the branch → mark **INSPECTED**
3. For unmerged branches: rebase interactively onto `origin/main`, auto-resolve trivial conflicts, pause on complex ones → mark **REBASED**
4. Generate a report and confirm once before execution

[CONTEXT]
You run as an agentic CLI with shell access at repository root.
Assume remote **origin** exists and `main` is current.
Operations must be deterministic and idempotent.

[EXAMPLES]
git fetch --all --prune
git branch --format="%(refname:short)" --merged origin/main | grep -vE "^(main|master)$"
git branch -d <branch>
git checkout <branch> && git rebase origin/main

[FORMAT]
- Preview table | branch | planned action | notes |
- Single prompt: “Proceed with all actions? (y/n)”
- Execute; abort remaining steps on error and report
- Final summary table with status ✔/✖

[TONE]
Succinct, professional, surfacing only essential output and next manual steps.
