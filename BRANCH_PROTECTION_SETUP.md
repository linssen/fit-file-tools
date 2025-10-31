# Branch Protection Setup Guide

To enforce the PR-based workflow and prevent direct commits to `main`, you need to configure branch protection rules on GitHub.

## Step-by-Step Setup

### 1. Rename Master to Main (Optional but Recommended)

Before setting up branch protection, rename your `master` branch to `main` for consistency:

```bash
# Rename local branch
git branch -m master main

# Push the new branch and set upstream
git push -u origin main

# Delete old master branch from remote
git push origin --delete master
```

On GitHub:
1. Go to Settings → General → Default branch
2. Click the switch icon and change to `main`
3. Click "Update"

### 2. Configure Branch Protection Rules

1. **Navigate to Branch Protection:**
   - Go to your repository on GitHub
   - Click Settings → Branches
   - Click "Add branch protection rule"

2. **Branch Name Pattern:**
   - Enter `main` in the "Branch name pattern" field

3. **Enable Protection Settings:**

   ✅ **Require a pull request before merging**
   - This prevents direct pushes to `main`
   - ✅ Require approvals: Set to 1 or more (recommended)
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners (if you have a CODEOWNERS file)

   ✅ **Require status checks to pass before merging**
   - This ensures all CI checks pass before merge
   - ✅ Require branches to be up to date before merging
   - Search and select these status checks:
     - `lint` (Lint Code)
     - `format` (Check Formatting)
     - `test` (Run Tests)
     - `build` (Build Application)

   ✅ **Require conversation resolution before merging**
   - Ensures all PR comments are addressed

   ✅ **Do not allow bypassing the above settings**
   - Even admins must follow the rules

4. **Optional but Recommended:**
   - ✅ Require linear history (prevents messy merge commits)
   - ✅ Include administrators (apply rules to everyone)

5. **Click "Create" to save the rule**

## Workflow After Setup

### For Contributors

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "Add my feature"
   ```

3. **Push to GitHub:**
   ```bash
   git push origin feature/my-feature
   ```

4. **Create a Pull Request:**
   - Go to GitHub
   - Click "Compare & pull request"
   - Fill in the PR template
   - Wait for all checks to pass ✅
   - Request review if needed
   - Merge when approved

### What Gets Checked on Every PR

The `pr-checks.yml` workflow automatically runs:

1. **Lint Job** (`yarn lint`)
   - TypeScript type checking
   - ESLint code quality checks

2. **Format Job** (`yarn format:check`)
   - Prettier code style verification

3. **Test Job** (`yarn test:coverage`)
   - Full Jest test suite
   - Coverage reports uploaded (optional Codecov integration)

4. **Build Job** (`yarn build`)
   - Production Vite build
   - Verification that build artifacts are created

All four jobs must pass ✅ before the PR can be merged.

### What Happens After Merge

When a PR is merged to `main`, the `deploy.yml` workflow automatically:

1. Runs linting (`yarn lint`)
2. Checks formatting (`yarn format:check`)
3. Runs tests (`yarn test`)
4. Builds production bundle (`yarn build`)
5. Deploys to GitHub Pages

If any step fails, deployment is blocked.

## Benefits of This Setup

✅ **Quality Assurance**: All code is linted, formatted, and tested before merge
✅ **Code Review**: Changes are reviewed before reaching production
✅ **Automated Testing**: CI runs tests automatically on every PR
✅ **Deployment Safety**: Only quality code reaches GitHub Pages
✅ **Team Collaboration**: Clear process for contributing changes
✅ **Git History**: Clean, linear history with meaningful PR descriptions

## Troubleshooting

### Status Checks Don't Appear

- Make sure you've pushed at least one PR after creating the workflows
- GitHub needs to see the workflow run once before it appears in the list
- Try creating a test PR to trigger the workflows

### Can't Merge Despite Green Checks

- Ensure the branch is up to date with `main`
- Check if there are unresolved conversations
- Verify all required reviewers have approved

### Need to Bypass Rules (Emergency)

If you're an admin and need to bypass rules temporarily:
1. Go to Settings → Branches
2. Temporarily disable "Include administrators"
3. Make your emergency commit
4. Re-enable the protection immediately

**Note:** This should only be used in true emergencies!

## Next Steps

1. Complete the branch rename (if applicable)
2. Set up branch protection rules
3. Create a test PR to verify the workflow
4. Invite collaborators and share this guide
5. Consider adding a CODEOWNERS file for automatic review assignment
