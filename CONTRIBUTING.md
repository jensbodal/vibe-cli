# Contributing

Please open pull requests with clear descriptions and add unit tests for new functionality.

## Pull Request Process

Before opening a PR, ensure your branch is up to date and contains a single commit:

```bash
git fetch origin main
git rebase -i origin/main # squash your commits here
npm run lint
npm test
git push --force-with-lease
```

The PR should have one linear commit on top of `main` with no merge commits.
