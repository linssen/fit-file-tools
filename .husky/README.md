# Husky Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to manage Git hooks for code quality automation.

## Pre-commit Hook

The pre-commit hook automatically runs before each commit to ensure code quality:

### What it does:
1. **Lint-staged**: Automatically formats and lints staged files
   - Runs ESLint with auto-fix on TypeScript files
   - Runs Prettier on all staged files (TS, TSX, CSS, HTML)
   
2. **Tests**: Runs the full test suite (62 tests)
   - Ensures all tests pass before committing
   - Prevents broken code from being committed

### Configuration

**package.json** - lint-staged configuration:
```json
"lint-staged": {
  "src/**/*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "src/**/*.{css,html}": [
    "prettier --write"
  ]
}
```

### Skip hooks (if needed)

In rare cases where you need to skip the hooks:
```bash
git commit --no-verify -m "Your message"
```

⚠️ **Warning**: Only skip hooks when absolutely necessary and ensure manual testing before pushing.

## Benefits

- 🎨 **Consistent formatting**: Prettier ensures uniform code style
- 🔍 **Early error detection**: ESLint catches issues before commit
- ✅ **Test safety**: All tests must pass before commit
- 🚀 **Automated quality**: No manual linting/testing needed
- 👥 **Team consistency**: Everyone follows same standards
