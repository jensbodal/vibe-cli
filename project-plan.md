# Project Plan: PR Review and Cleanup

## Objective

Review and clean up open pull requests in the `vibe-cli` repository. This includes rebasing, evaluating relevance, and either closing or continuing review.

---

## ✅ PRs to Review

These PRs contain valuable changes and should be reviewed further:

- #82: Bootstrap projen configuration management
- #80: Add dev script and Projen task docs
- #78: Document absence of agentic scripts
- #75: Add agents workspace
- #74: Add usage example and tests for GenerativeAIReporterAgent
- #71: Add AI tooling templates and CI scaffold
- #70: Add GenerativeAIReporterAgent
- #62: Handle server listen errors
- #59: Remove duplicate prompt file
- #56: Add GenerativeAIReporterAgent
- #51: Add runtime engine requirements

### Next Steps

1. For each PR:
   - `git fetch origin pull/<PR_NUMBER>/head:pr-<PR_NUMBER>`
   - `git checkout pr-<PR_NUMBER>`
   - `git rebase origin/main`
   - Resolve conflicts if any
   - Push updated branch if needed
2. Review code and test locally
3. Leave comments or approve for merge

---

## ❌ PRs to Close

These PRs are outdated, duplicated, or no longer relevant:

- #76, #69, #68, #66, #65, #64, #58, #55, #54, #53, #52, #49, #48

### Next Steps

- Leave a comment explaining why the PR is being closed
- Close the PR via GitHub UI or CLI

---

## Automation (Optional)

Create a script to automate the fetch, checkout, and rebase process:

```bash
#!/bin/bash
set -e

for pr in 82 80 78 75 74 71 70 62 59 56 51; do
  echo "Processing PR #$pr"
  git fetch origin pull/$pr/head:pr-$pr
  git checkout pr-$pr
  git rebase origin/main || {
    echo "Conflict in PR #$pr, resolve manually"
    exit 1
  }
done
```

Save as `scripts/rebase-prs.sh` and run with `bash scripts/rebase-prs.sh`.

---

## Timeline

- Day 1: Rebase and review all PRs in review list
- Day 2: Close all PRs in close list
- Day 3: Merge approved PRs

---

## Owner

Assigned to: @jensbodal
