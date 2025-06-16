#!/bin/bash
set -e

# PRs from pr-list-review.json
declare -a prs=(82 80 78 75 74 71 70 62 59 56 51)

for pr in "${prs[@]}"; do
  echo "➡️ Processing PR #$pr"
  
  # Fetch and checkout PR branch
  git fetch origin pull/$pr/head:pr-$pr
  git checkout pr-$pr
  
  # Attempt rebase with conflict handling
  if ! git rebase origin/main; then
    echo "❌ Conflict detected in PR #$pr"
    echo "Resolve conflicts manually then run:"
    echo "  git rebase --continue"
    echo "  git push --force-with-lease"
    exit 1
  fi
  
  echo "✅ PR #$pr successfully rebased"
done

echo ""
echo "🎉 All PR branches updated and rebased"
echo "Next steps:"
echo "1. Review each branch: git checkout pr-<NUM>"
echo "2. Run tests: bun test --coverage"
echo "3. Push updates: git push --force-with-lease"
